import { createTheme } from '@mui/material/styles';

//all theme properties - https://mui.com/customization/theming/#theme-provider
export const theme = createTheme({
    //use if you want to change styling for each different mui component variant
    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             color: 'white',
        //             backgroundColor: 'primary'
        //         },
        //     },
        // },
        // MuiTextField: {
        //     styleOverrides: {
        //         root: {
        //             color: 'white',
        //             backgroundColor: 'white',
        //             borderRadius: '5px',
        //             width: '400px',
        //         }
        //     }
        // }
        MuiTypography: {
            styleOverrides: {
                h3: {
                    fontSize: '40px',
                    fontWeight: '100',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                },
                h4: {
                    fontSize: '24px',
                    fontWeight: '300'
                },
                h5: {
                    fontSize: '21px',
                    fontWeight: '300'
                },
                h6: {
                    fontSize: '18px',
                    fontWeight: '300'
                }
            }
        }
    },
    //Fonts to use
    typography: {
        fontFamily: [
            'Heebo'
        ]
    },
    //custom default colours
    palette: {
        primary: {
            main: 'rgba(255,0,0,0.8)'
        }
    },
});