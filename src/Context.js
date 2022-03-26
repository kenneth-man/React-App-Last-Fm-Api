import React, { createContext, useState, useEffect, useRef } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, doc, query, addDoc, getDoc, getDocs, onSnapshot, updateDoc, deleteDoc, orderBy, limit, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export const Context = createContext();

const ContextProvider = ({ children, auth, db, isModalShown, setIsModalShown }) => { 
    const provider = new GoogleAuthProvider();
    const [isLoading, setIsLoading] = useState(false);
    const [navbarName, setNavbarName] = useState('n/a');
    const [detailsParams, setDetailsParams] = useState(undefined);
    const [tagQuery, setTagQuery] = useState('');
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    const navigate = useNavigate();
    const isInitialRender = useRef(true);
    const initialFetchString = 'a';
    const { REACT_APP_API_KEY } = process.env;

    //check if valid email
    const checkValidEmail = inputEmail => inputEmail.match(validEmailRegex) ? true : false;

    //check if valid password
    const checkValidPassword = (inputPassword, inputPasswordConfirm) => inputPassword.length > 8 && inputPassword === inputPasswordConfirm ? true : false;
    
    //toggle 'isModalShown' state
    const toggleIsModalShown = () => setIsModalShown(!isModalShown);

    //login account with google account
    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch(error){
            console.log(error);
        }
    }

    //logout of account
    const logout = async () => {
        if(auth.currentUser){
            try {
                await signOut(auth);
            } catch(error) {
                console.log(error);
            }
        }
    }

    //check if a user already exist in the 'users' collection in firestore
    const checkUserAlreadyExists = async uid => {
        try {
            const allUsers = await readAllDocuments('users');
            const userAlreadyExists = allUsers ? allUsers.find(curr => curr.uid === uid) : false;
            return userAlreadyExists;
        } catch(error){
            console.log(error);
        }
    }

    //scroll to top of specified DOM element
    const scrollToTop = () => {
        document.querySelector('.Page').scrollTo({
            top: document.querySelector('.Page'),
            behavior: 'smooth'
        });
    }

    //scroll to bottom of specified DOM element
    const scrollToBottom = () => {
        const element = document.querySelector('.App');

        //scrollTo after data updates; not immediately otherwise will scroll to just before added message/post
        setTimeout(() => {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: 'smooth'
            });
        }, 500);
    }

    //fetch search data from last fm api
    const fetchSearchData = async (query, search, setState, pgNum) => {
        try {
            const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=${query}.search&${query}=${search}&page=${pgNum}&api_key=${REACT_APP_API_KEY}&limit=50&format=json`);
            const data = await response.json();
            const nestedDataProp = `${query}matches`;

            //nested props for data array = data.results.(queryName)matches.(queryName)
            if(setState){
                setState(data.results[nestedDataProp][query])
            } else {
                return data.results[nestedDataProp][query]
            }

            setIsLoading(false);
        } catch(error){
            console.log(error);
        }
    }

    //example paths
    //  http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=YOUR_API_KEY&artist=Cher&album=Believe&format=json
    //  http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=YOUR_API_KEY&artist=Cher&format=json
    //  http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=YOUR_API_KEY&artist=cher&track=believe&format=json
    const fetchInfoData = async (query, queryParams, setState) => {
        try { 
            const queryParamsArray = queryParams.map(curr => `&${Object.keys(curr)[0]}=${Object.values(curr)[0]}`);
            const queryParamsString = queryParamsArray.join('');
            const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=${query}.getinfo&api_key=${REACT_APP_API_KEY}${queryParamsString}&format=json`);
            const data = await response.json();
            setState(data[query]);

            setIsLoading(false);
        } catch(error){
            console.log(error.message);
        }
    }

    const fetchTagData = async (tagName, infoTypes, setState) => {
        try {
            //looping async operation
            const newStateData = await infoTypes.reduce(async (promisedAcc, infoType) => {
                const acc = await promisedAcc;

                const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.${infoType.query}&tag=${tagName}&api_key=${REACT_APP_API_KEY}&format=json`);
                const data = await response.json();

                return [
                    ...acc, 
                    {   
                        data: data[infoType.dataProp], 
                        title: infoType.title, 
                        componentType: infoType.componentType 
                    }
                ];
            }, Promise.resolve([]));

            setState(newStateData);
            setIsLoading(false);
        } catch(error){
            console.log(error);
        }
    }

    const fetchChartData = async (infoTypes, setState) => {
        try {
            const newStateData = await infoTypes.reduce(async (promisedAcc, infoType) => {
                const acc = await promisedAcc;

                const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.${infoType.query}&api_key=${REACT_APP_API_KEY}&format=json`);
                const data = await response.json();

                return [
                    ...acc, 
                    {   
                        data: data[infoType.dataProp], 
                        title: infoType.title, 
                        componentType: infoType.componentType 
                    }
                ];
            }, Promise.resolve([]));

            console.log(newStateData);
            setIsLoading(false);
            setState(newStateData);
        } catch(error){
            console.log(error);
        }
    }

    //when searching for results, should always show results from first page; On initial page render search for results containing 'initialFetchString's value
    const fetchFirstPage = async (initialRenderFetch, queryParam, searchStr, setState) => {
        await fetchSearchData(queryParam, initialRenderFetch ? initialFetchString : searchStr, setState, 1);
    }

    //calculate total pages from a search; api doesn't provide total number of pages for a search
    const calcPageTotal = async (queryParam, searchStr, setTotalState, setIsCalcState) => {
        setIsCalcState(true);

        let currPage = 1;
        let foundPageTotal = false;

        //increment by 100 to speed up runtime; if data length is empty, go back a previous page one by one till data returned > 0
        while(!foundPageTotal){
            const data = await fetchSearchData(queryParam, searchStr, false, currPage);

            if(data.length === 0){
                let prevPageContainsData = false;
                currPage -= 1;

                while(!prevPageContainsData){
                    const previousData = await fetchSearchData(queryParam, searchStr, false, currPage);

                    if(previousData.length === 0){
                        currPage -= 1;
                    } else {
                        prevPageContainsData = true;
                    }
                }

                foundPageTotal = true;
            } else {
                currPage += 100;
            }
        }

        setTotalState(currPage);
        setIsCalcState(false);
    }

    const removeFromSavedItems = async (data) => {
        const currUser = await readDocumentWoId('users');
        
        const filteredSavedItems = currUser[0].savedItems.filter(curr => 
            curr.mbid ?
            curr.mbid !== data.mbid :
            curr.name !== data.name
        )

        await updateDocument('users', currUser[0].id, 'savedItems', filteredSavedItems);
    }

    

    ///////////////////////////
    //FIREBASE CRUD FUNCTIONS//
    ///////////////////////////

    //CREATE DOCUMENT (AND CREATE COLLECTION IF DOESN'T EXIST)
    const createDocument = async (collectionName, dataObj) => {
        try {
            const docRef = await addDoc(collection(db, collectionName), dataObj);
            return docRef.id;
        } catch(error){
            console.log(error);
        }
    }

    //READ DOCUMENT
    const readDocument = async (collectionName, documentId) => {
        try {
            const document = await getDoc(doc(db, collectionName, documentId));
            return document.data();
        } catch(error){
            console.log(error);
        }
    }

    //READ DOCUMENT WITHOUT SPECIFYING DOC ID
    const readDocumentWoId = async collectionName => {
        try {
            const response = await readAllDocuments(collectionName);

            //if collection name is 'users', return the currently signed in user's object in an array
            if(collectionName === 'users') return response.filter(curr => curr.uid === auth.currentUser.uid);

            return response;
        } catch(error){
            console.log(error);
        }
    }

    //READ ALL DOCUMENTS
    const readAllDocuments = async (collectionName, orderedBy = false, limit = false, includeId = true) => {
        try {
            let allDocuments;
            let returnArray = [];

            orderedBy ?
            (
                limit ?
                allDocuments = await getDocs(query(collection(db, collectionName), orderBy(orderedBy), limit(limit))) :
                allDocuments = await getDocs(query(collection(db, collectionName), orderBy(orderedBy)))
            ) :
            (
                limit ?
                allDocuments = await getDocs(query(collection(db, collectionName), limit(limit))) :
                allDocuments = await getDocs(query(collection(db, collectionName)))
            )

            includeId ?
            allDocuments.forEach(doc => returnArray.push({ 
                ...doc.data(),
                id: doc.id
            })) :
            allDocuments.forEach(doc => returnArray.push({ 
                ...doc.data() 
            }));

            return returnArray;
        } catch(error){
            console.log(error);
        }
    }

    //READ DOCUMENT ONSNAPSNOT
    const readDocumentOnSnapshot = (collectionName, documentId, setState) => {
        const firebaseQuery = query(collection(db, collectionName));

        onSnapshot(firebaseQuery, snapshot => {
            let returnArray = [];
            
            snapshot.forEach(doc => 
                documentId === doc.id && 
                returnArray.push({
                    ...doc.data(),
                    id: doc.id 
                })
            )

            setState(returnArray[0]);
        });
    }

    //READ ALL DOCUMENTS ONSNAPSHOT
    const readAllDocumentsOnSnapshot = (collectionName, orderedBy, setState = false, fieldKey = false, fieldValue = false) => { 
        //'query' method is used for specifying which documents you want to retrieve from a collection
        const messagesQuery = 
            fieldKey ? 
            query(collection(db, collectionName), where(fieldKey, '==', fieldValue), orderBy(orderedBy), limit(1000)) : 
            query(collection(db, collectionName), orderBy(orderedBy), limit(1000));

        //attaching a permanent listener that listens for realtime updates
        onSnapshot(messagesQuery, snapshot => {
            let returnArray = [];
        
            snapshot.forEach(doc => returnArray.push({
                ...doc.data(),
                id: doc.id 
            }))

            if(setState){
                setState(returnArray);
            } else {
                return returnArray;
            }
        });
    }

    //UPDATE DOCUMENT
    const updateDocument = async (collectionName, documentId, key, value, overwriteField = true) => {
        try {
            let field = {};
            const existingDocumentData = await readDocument(collectionName, documentId);

            //assigning the 'key' parameter of this function, as the key for updating a field in the specified firestore document;
            //https://stackoverflow.com/questions/4244896/dynamically-access-object-property-using-variable
            overwriteField ?
            field[key] = value :
            field[key] = [...existingDocumentData[key], value];

            await updateDoc(doc(db, collectionName, documentId), field);
        } catch(error){
            console.log(error);
        }
    }

    //DELETE DOCUMENT
    const deleteDocument = async (collectionName, documentId) => {
        try {
            await deleteDoc(doc(db, collectionName, documentId));
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => 
        onAuthStateChanged(auth, async user => {
            if(user){
                const { uid, displayName, email } = auth.currentUser;
                const doesUserAlreadyExist = await checkUserAlreadyExists(uid);

                //used for new email and password registrations
                const generateNameFromEmail = inputEmail => inputEmail.split('@')[0];
                
                // updating auth and firebase
                if(!doesUserAlreadyExist){
                    //if registered via email, update the user a 'diplayName' and 'photoURL' in firebase auth; these properties already come with google accounts 
                    if(!displayName){
                        //doesn't cause state change of 'auth' object
                        await updateProfile(auth.currentUser, {
                            displayName: generateNameFromEmail(email)
                        });
                        setNavbarName(generateNameFromEmail(auth.currentUser.email));
                    } else {
                        setNavbarName(displayName);
                    }

                    //add new user's document data in firebase to easily maniplute data using firebase CRUD operations (auth data is only currently signed in user)
                    const docRefId = await createDocument('users', {
                        uid,
                        displayName: auth.currentUser.displayName,
                        email,
                        savedItems: []
                    });

                    //adding the document id to newly created user document; if field key doesn't exist, 'updateDoc' creates one
                    await updateDocument('users', docRefId, 'id', docRefId, true);
                } else {
                    setNavbarName(displayName);
                }
            } 

            isInitialRender.current ? isInitialRender.current = false : navigate('/');
            setIsLoading(false);
        })
    , [])


    return <Context.Provider value={{ 
        auth, db, isLoading, navbarName, isModalShown, initialFetchString, detailsParams, tagQuery, setTagQuery, fetchSearchData, calcPageTotal, fetchFirstPage,
        toggleIsModalShown, setIsLoading, setNavbarName, checkValidEmail, checkValidPassword, loginWithGoogle, logout, scrollToTop, scrollToBottom, createDocument, fetchInfoData, 
        fetchTagData, readDocument, readDocumentWoId, readAllDocuments, readDocumentOnSnapshot, readAllDocumentsOnSnapshot, updateDocument, deleteDocument, setDetailsParams, 
        removeFromSavedItems, fetchChartData
    }}>
        {children}    
    </Context.Provider>
}

export default ContextProvider;