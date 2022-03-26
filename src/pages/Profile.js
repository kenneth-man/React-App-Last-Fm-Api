import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Column from '../components/Column';
import ResultsGridContainer from '../components/ResultsGridContainer';
import Result from '../components/Result';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import CommonButton from '../components/CommonButton';
import { Typography } from '@mui/material';
import { h1MediaQ, h2MediaQ } from '../data/mediaQueryData';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import background from '../res/images/last-fm-background7.jpg'

const Profile = () => {
    const { logout, readDocumentWoId, readDocumentOnSnapshot, isLoading, setIsLoading } = useContext(Context);
    const [profileData, setProfileData] = useState(undefined);

    useEffect(async () => {
        setIsLoading(true);
        const currUser = await readDocumentWoId('users');
        readDocumentOnSnapshot('users', currUser[0].id, setProfileData);
        setIsLoading(false);
    }, [])

    return <Page 
        backgroundImage={background}
        extraClasses='space-y-10'
        sx={{ paddingTop: '50px' }}
    >
        {
            isLoading ?
            <Loading/> :
            (
                profileData ?
                <>
                    <Column extraClasses='space-y-8'>
                        <Typography 
                            variant='h3'
                            component='h1'
                            color='white'
                            sx={h1MediaQ}
                        >
                            {profileData.displayName}'s Account
                        </Typography>

                        <Typography 
                            variant='h5'
                            component='h2'
                            color='white'
                            sx={h2MediaQ}
                        >
                            Email: {profileData.email}
                        </Typography>

                        <Typography 
                            variant='h5'
                            component='h2'
                            color='white'
                            sx={h2MediaQ}
                        >
                            User Id: {profileData.uid}
                        </Typography>
                    </Column>

                    <ResultsGridContainer>
                        {
                            profileData.savedItems.map((curr, index) => 
                                <Result
                                    key={index}
                                    data={curr}
                                    isOnProfile={true}
                                />
                            ) 
                        }
                    </ResultsGridContainer>

                    <CommonButton 
                        onClick ={logout} 
                        text='Logout' 
                        endIcon={<MeetingRoomIcon/>}
                    />
                </> :
                <NoData/>
            )
        }
    </Page>
}

export default Profile;