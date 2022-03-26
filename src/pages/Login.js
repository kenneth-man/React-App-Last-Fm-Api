import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Column from '../components/Column';
import Loading from '../components/Loading';
import CommonInput from '../components/CommonInput';
import CommonLink from '../components/CommonLink';
import CommonButton from '../components/CommonButton';
import { Typography } from '@mui/material';
import background from '../res/images/last-fm-background.jpg';
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';
import { h1MediaQ, h2MediaQ, inputMediaQ } from '../data/mediaQueryData';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const { auth, loginWithGoogle, isLoading, setIsLoading } = useContext(Context);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const loginWithEmailOnSubmit = async event => {
        try {   
            event.preventDefault(); 

            if(loginEmail && loginPassword){
                setIsLoading(true);
                await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            } else {
                throw new Error('Empty input field values');
            }
        } catch(error){
            alert(error.message);
        }
    }

    return <Page 
        justifyContent='space-evenly'
        backgroundImage={background}
    >
        {
            isLoading ? 
            <Loading/> :
            <>
                <Typography 
                    variant='h3' 
                    component='h1' 
                    color='white'
                    sx={h1MediaQ}
                >
                    Last FM API Tracker - to learn Material UI 5
                </Typography>

                <Column extraClasses='space-y-4'>
                    <Typography 
                        variant='h5' 
                        component='h2' 
                        color='white'
                        sx={h2MediaQ}
                    >
                        Login with your Google Account
                    </Typography>
                    <CommonButton
                        onClick={loginWithGoogle}
                        text='Google Login'
                        endIcon={<GoogleIcon/>}   
                    />
                </Column>

                <form onSubmit={e => loginWithEmailOnSubmit(e)}>
                    <Column extraClasses='space-y-4'>
                        <Typography 
                            variant='h5' 
                            component='h2' 
                            color='white'
                            sx={h2MediaQ}
                        >
                            Or login with Email and Password
                        </Typography>
                        <CommonInput
                            placeHolder='Please input your Email...'
                            type='text'
                            colour='secondary'
                            state={loginEmail}
                            setState={setLoginEmail}
                            sx={inputMediaQ}
                        />
                        <CommonInput
                            placeHolder='Please input your Password...'
                            type='password'
                            colour='secondary'
                            state={loginPassword}
                            setState={setLoginPassword}
                            sx={inputMediaQ}
                        />
                        <CommonButton
                            text='Email Login'
                            endIcon={<SendIcon/>}
                            type='submit'
                        />
                    </Column>
                </form>

                <CommonLink 
                    route='/Register'
                    text='Not Registered? Click here to register'
                    colour='white'
                />
            </>
        }
    </Page>
}

export default Login;