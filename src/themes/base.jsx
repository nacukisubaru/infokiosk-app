import { createTheme } from '@mui/material/styles';
import "@fontsource/montserrat";

let theme = createTheme({
    'svg path': {
        fill: '#454f63'
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        color: '#000',
        h1: {
            fontSize: '48px',
            fontWeight: '600',
            lineHeight: '1.23',
            '@media (max-width: 900px)': {
                fontSize: '38px',
            },
            '@media (max-width: 575px)': {
                fontSize: '30px',
            },
        },
        h2: {
            fontSize: '36px',
            fontWeight: '600',
            lineHeight: '1.23',
            '@media (max-width: 900px)': {
                fontSize: '30px',
            },
            '@media (max-width: 575px)': {
                fontSize: '26px',
            },
        },
        h3: {
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.23',
            '@media (max-width: 900px)': {
                fontSize: '20px',
            },
            '@media (max-width: 575px)': {
                fontSize: '18px',
            },
        },
        h4: {
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: '1.23',
            '@media (max-width: 900px)': {
                fontSize: '16px',
            },
            '@media (max-width: 575px)': {
                fontSize: '14px',
            },
        },
        body1: {
            fontSize: '24px',
            lineHeight: '1.2',
            '@media (max-width: 900px)': {
                fontSize: '18px',
            },
            '@media (max-width: 575px)': {
                fontSize: '16px',
            },
        },
        body2: {
            fontSize: '16px',
            lineHeight: '1.2',
            '@media (max-width: 575px)': {
                fontSize: '14px',
            },
          },
          button: {
            fontSize: '24px',
            fontWeight: '500',
            lineHeight: '1.2',
            textTransform: 'unset',
            '@media (max-width: 900px)': {
                fontSize: '18px',
            },
            '@media (max-width: 575px)': {
                fontSize: '16px',
            },
          },
          button2: {
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.2',
            '@media (max-width: 900px)': {
                fontSize: '18px',
            },
            '@media (max-width: 575px)': {
                fontSize: '16px',
            },
          }
    },
    palette: {
        type: 'light',
        primary: { //blue
            main: '#708CB6'
        },
        secondary: { //grey       
            main: '#C4C4C4',
            darker: '#B0B0B0'
        },
        success: { 
            main: '#00D800'
        },
        error: { 
            main: '#FE002D'
        },
        warning: { 
            main: '#FFC573'
        },
        info: { 
            main: '#C4C4C4'
        },
        text: {
            primary: '#000000',
            secondary: '#1A1A1A',
            white: '#ffffff',
            card: '#000000',
            placeholder: '#727272'
        },
        background: {
            default: '#FFFFFF',
            buttonDefault: '#FFFFFF',
            buttonBg: '#E5E5E5',
            buttonAdd: '#708CB6',
            border: '#B0B0B0'
        }
    },
});

theme.components = {
    MuiContainer: {
        styleOverrides: {                
            root: {
                paddingLeft: '15px',
                paddingRight: '15px',
                '& a': {
                    textDecoration: 'none',
                },
                '@media (min-width: 900px)': {
                    maxWidth: '1080px',
                },
                '@media (min-width: 600px)': {                        
                    paddingLeft: '50px',
                    paddingRight: '50px',
                },
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                width: '320px',
                background: theme.palette.background.buttonDefault,
                color: theme.palette.text.primary,
                boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.45)',
                borderRadius: '20px',
                padding: '15px'
            },
            outlined: {
                border: 'none',
                '&:hover': {
                    backgroundColor: theme.palette.background.buttonBg,
                    boxShadow: 'none',
                    border: 'none'
                },
                '&:active': {
                    boxShadow: 'none',
                    backgroundColor: theme.palette.background.buttonAdd,
                },
                '&:focus': {
                    outline: 'none',
                },
            },
            contained: {
                background: theme.palette.background.buttonBg,
                '&:hover': {
                    color: theme.palette.text.white
                },
            }
        },
    },
    MuiInputLabel: {
        styleOverrides: {
            root: {
                position: 'static',
                transform: 'unset',
                '&.Mui-focused': {
                    color: theme.palette.text.primary
                },
                '& + .MuiInput-root': {
                    marginTop: 0,
                },
                '&[data-shrink=false]+.MuiInputBase-formControl .MuiInput-input::-webkit-input-placeholder': {
                    opacity: '1 !important',
                },
                '&[data-shrink=true]+.MuiInputBase-formControl .MuiInput-input::-webkit-input-placeholder': {
                    opacity: '0 !important',
                }
            }
        }
    },
    MuiInput: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.background.default,
                border: '2px solid',
                borderColor: theme.palette.background.border,
                borderRadius: 2,
                '& .MuiInputBase-input': {
                    transition: theme.transitions.create([
                      'border-color',
                      'background-color',
                      'box-shadow',
                    ]),
                },
                '&::before, &::after': {
                    display: 'none'
                }
            },
            input: {
                padding: '13px 10px',
                '&::-webkit-input-placeholder': {
                    opacity: '1',
                    color: theme.palette.text.placeholder
                },
            }            
        }        
    },
    MuiInputBase: {
        styleOverrides: {
            input: {
                '&::-webkit-input-placeholder': {
                    opacity: '1'
                }
            }
        }
    },
    MuiSelect: {
        styleOverrides: {
            select: {
                color: theme.palette.text.placeholder,                               
                // position: 'relative',
                // '&::after': {
                //     content: '""',
                //     display: 'block',
                //     width: '40px',
                //     height: '40px',
                //     background: `url(${arrowDown}) center center no-repeat`,
                //     backgroundSize: 'contain',
                //     position: 'absolute',
                //     top: '50%',
                //     right: '5px',
                //     transform: 'translateY(-50%)'
                // },
                // '[expanded=true]::after': {
                //     // background: `url(${arrowUp}) center center no-repeat`,
                //     transform: 'rotate(180deg)'
                // }
            },
            nativeInput: {
                '&:focus': {
                    opacity: '1'
                }
            },
            icon: {               
                // display: 'none'
            }
        }
    },
    MuiCheckbox: {
        styleOverrides: {
            root: {
                padding: '0',
                color: theme.palette.background.border,
                '&.Mui-checked': {
                    color: theme.palette.text.placeholder
                },
                '& svg': {
                    width: '34px',
                    height: '34px',
                    marginRight: '20px'
                }
                
            }
        }
    },
    MuiTabs: {
        styleOverrides: {
            indicator: {
                display: 'none'
            },
            flexContainer: {
                overflowX: 'scroll',
                overflowY: 'hidden',
                margin: '0 -10px',
                paddingBottom: '18px',
                '&::-webkit-scrollbar': {
                    height: '10px',
                    background: 'rgba(229, 229, 229, 0.3)',
                    borderRadius: '14px'
                },            
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(206, 210, 217, 0.8)',
                    borderRadius: '14px'
                }
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: {
                border: '1px solid',
                borderColor: theme.palette.secondary.main,
                boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.45)',
                margin: '0 10px',
                padding: '14px 16px',
                '&.Mui-selected': {
                    background: theme.palette.background.buttonBg,
                    color: theme.palette.text.primary
                }
            }
        }
    }
}

export default theme;