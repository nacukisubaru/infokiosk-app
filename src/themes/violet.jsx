import { createTheme } from '@mui/material/styles';

let theme = createTheme({
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
        fontFamily: [
            'Gropled',
            'sans-serif',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: '50px',
        fontWeight: '700',
        lineHeight: '1.23',
        textTransform: 'uppercase',
        '@media (max-width: 900px)': {
            fontSize: '40px',
        },
        '@media (max-width: 575px)': {
            fontSize: '32px',
        },
    },
    h2: {
        fontSize: '40px',
        fontWeight: '700',
        lineHeight: '1.23',
        '@media (max-width: 900px)': {
          fontSize: '38px',
      },
      '@media (max-width: 575px)': {
          fontSize: '30px',
      },
    },
    h3: {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '1.23',
      textTransform: 'uppercase',
      '@media (max-width: 900px)': {
          fontSize: '30px',
      },
      '@media (max-width: 575px)': {
          fontSize: '26px',
      },
    },  
    h4: {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '1.23',
      '@media (max-width: 900px)': {
          fontSize: '20px',
      },
      '@media (max-width: 575px)': {
          fontSize: '18px',
      },
    },
    h5: {
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '1.23',
      textTransform: 'uppercase',
      '@media (max-width: 900px)': {
          fontSize: '16px',
      },
      '@media (max-width: 575px)': {
          fontSize: '14px',
      },
    },
    h6: {
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '1.23',
      '@media (max-width: 900px)': {
          fontSize: '16px',
      },
      '@media (max-width: 575px)': {
          fontSize: '14px',
      },
    },
    h7: {
      fontSize: '18px',
      fontWeight: '700',
      lineHeight: '1.23',
      '@media (max-width: 900px)': {
          fontSize: '16px',
      },
      '@media (max-width: 575px)': {
          fontSize: '14px',
      },
    },
    body1: {
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '1.26',
        '@media (max-width: 900px)': {
          fontSize: '18px',
        },
        '@media (max-width: 575px)': {
            fontSize: '16px',
        },
    },
    body2: {
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1.2',
      '@media (max-width: 575px)': {
          fontSize: '14px',
      },
    },
    button: {
      fontSize: '20px',
      fontWeight: '700',
      lineHeight: '1.2',
      textTransform: 'uppercase',
      '@media (max-width: 900px)': {
        fontSize: '18px',
      },
      '@media (max-width: 575px)': {
          fontSize: '16px',
      },
    },
    subtitle1: {
      fontSize: '12px',
      fontWeight: '500',
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
    type: 'dark',
    primary: { // violet
      main: '#7348FF',
      darker: '#7348FF',
      green: '#D4FF48',
      red: '#F15D4C',
      grey: '#F3F1F6'
    },
    secondary: { // bg
      main: '#EEF0F4',
      darker: '#fff'
    },
    success: { // Green
      main: '#00D800'
    },
    error: { // Red
      main: '#FE002D'
    },
    warning: { // Orange
      main: '#FF9200'
    },
    info: { // Modal BG
      main: '#2a2e43'
    },
    text: {
      primary: '#000000',
      secondary: '#1A1A1A',
      white: '#ffffff',
      card: '#ffffff',
      placeholder: '#B9B9B9',
      green: '#D4FF48'
    },
    background: {
      default: "#FFFFFF",
      buttonDefault: '#FFFFFF',
      buttonBg: '#D4FF48',
      buttonAdd: '#708CB6',
      border: '#B0B0B0',
      bgOpacity: 'rgba(0, 0, 0, 0.2)',
      bgOpacity2: 'rgba(0, 0, 0, 0.3)',
      bgOpacityWhite: 'rgba(255, 255, 255, 0.17)',
      keyboard: '#D6D6DE'
    }
  },
  spacing: 4,
  shadows: [
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '1px 1px 5px rgba(115, 115, 115, 0.18)',
    '1px 1px 5px rgba(124, 150, 40, 0.31)',
    'inset 2px 4px 10px rgba(124, 150, 40, 0.31)',
    'inset 2px 4px 10px rgba(87, 105, 27, 0.35)',
    '1px 1px 6px rgba(0, 0, 0, 0.45)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
    '0px 1px 47px rgba(0, 0, 0, 0.09)',
  ]
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
                background: theme.palette.background.buttonDefault,
                color: theme.palette.text.primary,              
                borderRadius: 30,                             
                '&.Mui-disabled': {
                        background: theme.palette.text.placeholder,
                        color: theme.palette.text.white, 
                },
                '& .MuiTouchRipple-root': {
                        display: 'none'
                }
            },
            outlined: {
                padding: '15px 55px', 
                border: '3px solid',
                borderColor: theme.palette.primary.green,
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: theme.palette.background.buttonDefault,
                    borderColor: theme.palette.primary.green,
                },                
                '&:active': {
                        boxShadow: theme.shadows[3]
                },
                '&.Mui-disabled': {
                    border: 'none'
                },                
            },
            contained: {
                padding: '18px 55px', 
                boxShadow: 'none',
                background: theme.palette.background.buttonBg,
                '&:hover': {
                    backgroundColor: theme.palette.background.buttonBg
                },
                '&:active': {
                    boxShadow: theme.shadows[3]
                },
                '&.Mui-disabled:hover': {
                    background: theme.palette.text.placeholder,
                    color: theme.palette.text.white, 
                },
            },
      },
    },
    MuiInputLabel: {
        styleOverrides: {
            root: {
                position: 'static',
                transform: 'unset',
                color: theme.palette.text.primary,
                paddingLeft: '30px',
                marginBottom: 5,
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
                borderColor: theme.palette.primary.main,
                borderRadius: 30,
                '& .MuiInputBase-input': {
                    transition: theme.transitions.create([
                      'border-color',
                      'background-color',
                      'box-shadow',
                    ]),
                },
                '&::before, &::after': {
                    display: 'none'
                },
                
            },
            input: {
                padding: '16px 30px',
                borderRadius: 30,
                '&::-webkit-input-placeholder': {
                    opacity: '1',
                    color: theme.palette.text.placeholder
                },
                "&:focus, &:active": {
                    'WebkitBoxShadow': '0px 4px 10px rgba(115, 72, 255, 0.5)',
                    'MozBoxShadow': '0px 4px 10px rgba(115, 72, 255, 0.5)',
                    'boxShadow': '0px 4px 10px rgba(115, 72, 255, 0.5)'
                }
            }            
        }        
    },
    MuiInputBase: {
        styleOverrides: {
            input: {
                color: theme.palette.text.primary,
                '&::-webkit-input-placeholder': {
                    opacity: '1',
                    color: theme.palette.text.white
                }
            }
        }
    },
    MuiCheckbox: {
        styleOverrides: {
            root: {
                padding: '0',
                color: theme.palette.primary.main,
                '&.Mui-checked': {
                    color: theme.palette.primary.main
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
            root: {
                marginLeft: 'calc((100% - 1080px) / 2 + 50px)',
                minHeight: '92px',
                '[role="tabpanel"]': {
                    height: 'calc(100vh - 1094px)',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    paddingBottom: '40px',
                    '&::-webkit-scrollbar': {
                        width: '11px',
                        background: '#F4F4F4',
                        borderRadius: '10px'
                    },            
                    '&::-webkit-scrollbar-thumb': {
                        background: theme.palette.primary.main,
                        borderRadius: '10px'
                    }
                },
                '&.tabs-popup': {
                    marginBottom: '60px',
                },
                '&.tabs-popup .MuiTabs-scroller': {
                    zIndex: '1301'
                },
                '&.tabs-popup .MuiTabs-scroller > .MuiTabs-flexContainer': {
                    overflowX: 'auto',
                }
            },
            indicator: {
                display: 'none'
            },
            flexContainer: {
                alignItems: 'center',
                overflowX: 'auto',
                overflowY: 'hidden',
                padding: '10px 50px 27px 10px',
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                    height: '11px',
                    background: '#F4F4F4',
                    borderRadius: '10px'
                },            
                '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.primary.main,
                    borderRadius: '10px'
                }
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: {
                background: theme.palette.primary.grey,
                padding: '15px 35px',
                fontWeight: 500,
                textTransform: 'unset',
                position: 'relative',
                overflow: 'visible',
                '&:first-of-type, &:first-of-type::before': {
                    borderRadius: '83px 0 0 83px'
                },
                '&:last-child, &:last-child::before': {
                    borderRadius: '0 83px 83px 0',
                },
                '&::before': {
                    content: '""',
                    display: 'block',
                    width: 'calc(100% + 20px)',
                    height: '73px',
                    background: theme.palette.primary.grey,
                    position: 'absolute',
                    top: -9,
                    left: -10,
                    zIndex: -1
                },
                '&.Mui-selected': {
                    borderRadius: 83,
                    background: theme.palette.primary.main,
                    color: theme.palette.text.white
                }
            }
        }
    },
    MuiPickerStaticWrapper: {
        styleOverrides: {
            root: {
                minWidth: 480,
                maxHeight: 600,
                '& > div > div': {
                    width: 480,
                    maxHeight: 600,
                }
            }
        }
    },
    MuiCalendarPicker: {
        styleOverrides: {
            root: {
                width: 480,
                maxHeight: 600,
                '& > div:first-of-type': {
                    marginTop: 0,
                    marginBottom: 30,
                    padding: 0,
                    maxHeight: 60,
                    position: 'relative',
                    '& > div:last-of-type': {
                        '& .Mui-disabled': {
                            display: 'none'
                        },
                        '& button:first-of-type': {
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                            width: 60,
                            height: 60,
                            background: theme.palette.primary.grey,
                            '& svg': {
                                width: 40,
                                height: 40,
                                fill: theme.palette.primary.main
                            }
                        },
                        '& button:last-of-type': {
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            transform: 'translateY(-50%)',
                            width: 60,
                            height: 60,
                            background: theme.palette.primary.grey,
                            '& svg': {
                                width: 40,
                                height: 40,
                                fill: theme.palette.primary.main
                            }
                        }
                    },
                    '& [role="presentation"]': {
                        maxHeight: 60,
                        height: 60,
                        marginLeft: 'auto',
                        fontWeight: 700,
                        fontSize: 32,
                        textTransform: 'capitalize',
                        '& .MuiButtonBase-root': {
                            display: 'none'
                        }
                    },
                    
                },
                '& > div:last-of-type div': {
                    justifyContent: 'space-between',
                },
                '& > div:last-of-type .MuiTypography-root': {
                    width: 50,
                    height: 50,
                    fontWeight: 700,
                    fontSize: 24,
                    color: theme.palette.text.placeholder
                },
                '& .PrivatePickersSlideTransition-root': {
                    minHeight: 315,
                }
            },
            viewTransitionContainer: {
                marginTop: 35,
                overflowY: 'unset',
                '& > div > div': {
                    justifyContent: 'space-between',
                    marginBottom: 20
                },
                '& .MuiTypography-caption': {
                    width: 50,
                    height: 50,
                    fontWeight: 700,
                    fontSize: 24,
                    color: theme.palette.text.placeholder
                },
                '& [role="row"]': {
                    justifyContent: 'space-between',
                    marginBottom: 0
                },
                '& .PrivatePickersSlideTransition-root': {
                    minHeight: 315,
                    marginBottom: 0
                }
            }
        }
    },
    MuiPickersDay: {
        styleOverrides: {
            root: {
                width: 50,
                height: 50,
                fontWeight: 700,
                fontSize: 24,
                '&:not(.Mui-selected)': {                    
                    border: 'none',                    
                },
                '&.Mui-selected': {
                    color: theme.palette.text.primary,
                    background: theme.palette.primary.green,
                    fontWeight: 700,
                },
                '&.Mui-selected:hover, &:focus.Mui-selected': {
                    background: theme.palette.primary.green,
                },
                '&.Mui-disabled': {
                    color: theme.palette.text.placeholder
                }
            },
            today: {
                background: theme.palette.primary.grey
            }
        }
    },
    MuiRadio: {
        styleOverrides: {
            root: {
                padding: 13,
                '& svg': {
                    width: 33,
                    height: 33
                },
                '& [data-testid="RadioButtonUncheckedIcon"]': {
                    fill: theme.palette.text.placeholder
                },
                '&.Mui-checked [data-testid="RadioButtonUncheckedIcon"]': {
                    fill: theme.palette.primary.main
                },
                '& + .MuiTypography-root': {
                    fontSize: 24
                }
            }
        }
    },
    MuiModal: {
        styleOverrides: {
            root: {
                // zIndex: 100001
            }
        }
    }
}

export default theme;