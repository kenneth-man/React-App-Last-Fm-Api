import React, { useState } from 'react';
import { theme } from './Theme';
import ContextProvider from './Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { routesData } from './data/routesData';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Page404 from './pages/Page404';

//firebase sdk; 
//1) create project on firebase.com, add the sign in methods you require
//2) enable firestore api and create firstore database on google cloud platform
//3) update database rules (permissions) https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDwOwL2vCy1g8n3mbcxNt2MihTDkrejY1o",
    authDomain: "last-fm-89789.firebaseapp.com",
    projectId: "last-fm-89789",
    storageBucket: "last-fm-89789.appspot.com",
    messagingSenderId: "157308645014",
    appId: "1:157308645014:web:00e7d7515dded10d7bdcb7"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const App = () => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [isModalShown, setIsModalShown] = useState(false);

    //onAuthStateChanged parses a 'user' object in the callback function if signed in, otherwise 'user' is null; 'auth.currentUser' is same as 'user'
    onAuthStateChanged(auth, user => user ? setIsUserSignedIn(true) : setIsUserSignedIn(false));

    return <div className='App'>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <ContextProvider 
                    auth={auth} 
                    db={db}
                    isModalShown={isModalShown}
                    setIsModalShown={setIsModalShown}
                >
                    {isUserSignedIn && <Navbar/>}
                
                    <Routes>
                        {
                            routesData.map((curr, index) => 
                                isUserSignedIn ?
                                <Route 
                                    key={index}
                                    path={curr.route}
                                    element={curr.component}
                                /> :
                                <Route 
                                    key={index}
                                    path={curr.route}
                                    element={curr.route === '/' ? curr.componentAlt : curr.component}
                                /> 
                            )
                        }
                        <Route path="*" element={<Page404/>}/>
                    </Routes>

                    <Modal isModalShown={isModalShown}/>
                </ContextProvider>
            </BrowserRouter>
        </ThemeProvider>
    </div>
}

export default App;