import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Column from '../components/Column';
import CommonButton from '../components/CommonButton';
import CommonInput from '../components/CommonInput';
import Loading from '../components/Loading';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { h1MediaQ, h2MediaQ, inputMediaQ } from '../data/mediaQueryData';
import background from '../res/images/last-fm-background.jpg';


const Register = () => {
    const { auth, checkValidEmail, checkValidPassword, isLoading, setIsLoading } = useContext(Context);
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordCheck, setRegisterPasswordCheck] = useState('');

    const registerWithEmailOnSubmit = async event => {
        try {
            event.preventDefault();

            if(checkValidEmail(registerEmail) && checkValidPassword(registerPassword, registerPasswordCheck)){
                setIsLoading(true);
                await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            } else {
                throw new Error('Invalid Email/Password or non-matching passwords')
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
                <Column extraClasses='space-y-8'>
                    <Typography 
                        variant='h3' 
                        component='h1'
                        color='white'
                        sx={h1MediaQ}
                    >
                        Register an account with us!
                    </Typography>
                    <Typography 
                        variant='h5'
                        component='h2'
                        color='white'
                        sx={h2MediaQ}
                    >
                        Lorem ipsum dolor sit amet ipsum dolor sit amet Lorem ipsum dolor sit amet ipsum dolor sit amet
                    </Typography>
                </Column>
                <form onSubmit={e => registerWithEmailOnSubmit(e)}>
                    <Column extraClasses='space-y-8'>    
                        <CommonInput
                            placeHolder="Your new account's email"
                            type='text'
                            colour='secondary'
                            state={registerEmail} 
                            setState={setRegisterEmail}
                            sx={inputMediaQ}
                        />
                        <CommonInput
                            placeHolder="Your new account's password"
                            type='password'
                            colour='secondary'
                            state={registerPassword} 
                            setState={setRegisterPassword}
                            sx={inputMediaQ}
                        />
                        <CommonInput
                            placeHolder="Your new password"
                            type='password'
                            colour='secondary'
                            state={registerPasswordCheck} 
                            setState={setRegisterPasswordCheck}
                            sx={inputMediaQ}
                        />
                        <CommonButton
                            text='Register'
                            endIcon={<SendIcon/>}
                            type='submit'
                        />
                    </Column>
                </form>
            </>
        }
    </Page>
}

export default Register;