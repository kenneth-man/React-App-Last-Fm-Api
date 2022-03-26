import React, { useContext } from 'react';
import { Context } from '../Context';
import { NavLink } from 'react-router-dom';
import Column from './Column';
import CommonClearButton from './CommonClearButton';
import { Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { navbarData } from '../data/navbarData';

const Modal = ({ isModalShown }) => {
    const { auth, toggleIsModalShown } = useContext(Context);
    const modalStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: isModalShown ? '50' : '-50'
    }

    return <Box sx={modalStyles}>
        <CommonClearButton 
            onClick={toggleIsModalShown}
            sx={{ position: 'absolute', top: '35px', right: '30px', color: 'white' }}
        >
            <ClearIcon/>
        </CommonClearButton>

        <Column extraClasses='space-y-10'>
            {
                navbarData.map((curr, index) =>
                    //maybe refactor into resuable component? but how do i pass in react router dom 'isActive' arg
                    <NavLink 
                        key={index}
                        to={curr.text === 'Profile' ? `${curr.route.split(':')[0]}${auth.currentUser?.displayName}` : curr.route}
                        className={({ isActive }) => isActive ? `NavLink NavLink--active` : 'NavLink'}
                        onClick={toggleIsModalShown}
                    >
                        {curr.icon}
                        <Typography 
                            variant='subtitle2' 
                            component='h4'
                            sx={{marginLeft: '3px'}}
                        >
                            {curr.text}
                        </Typography>
                    </NavLink>    
                )
            }
        </Column>
    </Box>
}

export default Modal;