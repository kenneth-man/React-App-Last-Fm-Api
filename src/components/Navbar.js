import React, { useContext } from 'react';
import { Context } from '../Context';
import Row from './Row';
import CommonClearButton from './CommonClearButton';
import { Link, NavLink } from 'react-router-dom';
import { navbarData } from '../data/navbarData';
import { Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import lastfmLogo from '../res/images/last-fm-logo.png';

const Navbar = () => {
    const { auth, toggleIsModalShown } = useContext(Context);
    const navbarStyles = {
        position: 'sticky',
        top: '0%',
        left: '0%',
        width: '100%',
        justifyContent: 'space-between',
        paddingX: '50px',
        paddingY: '20px',
        backgroundColor: 'black',
        borderBottom: '1px solid rgba(255,0,0,0.4)',
        paddingX: { xs:'30px', md:'50px' } 
    }

    return <Row 
        sx={navbarStyles}
    >
        <Link 
            to='/' 
            style={{ height: '60px' }}
        >
            <Box
                component='img'
                alt='last-fm-logo'
                src={lastfmLogo}
                sx={{ width: '60px' }}
            />
        </Link>
        <Row 
            extraClasses='space-x-10' 
            sx={{ display: { xs:'none', md:'flex' } }}
        >
            {
                navbarData.map((curr, index) =>
                    //maybe refactor into resuable component? but how do i pass in react router dom 'isActive' arg
                    <NavLink 
                        key={index}
                        to={curr.text === 'Profile' ? `${curr.route.split(':')[0]}${auth.currentUser.displayName}` : curr.route}
                        className={({ isActive }) => isActive ? `NavLink NavLink--active` : 'NavLink'}
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
        </Row>

        <CommonClearButton 
            onClick={toggleIsModalShown}
            sx={{ display: { xs:'block', md:'none' }, color: 'white' }}
        >
            <MenuIcon/>
        </CommonClearButton>
    </Row>
}

export default Navbar;