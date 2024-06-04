/*REACT*/
import React from 'react';
import Parser from "html-react-parser";

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { closeSelectPlaces, setSelectedPlaceId, setValueSelectPlace, toggleMapBaloon } from '../redux/actions';

/*HOOKS*/
import { usePrices } from '../hooks/excursionHooks';

/*HELPERS*/
import { decodeHtml } from '../helpers/stringHelper';

/*MUI*/
import { Box, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
/*COMPONENTS*/
export const useStyles = makeStyles((theme) => ({
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2
    },
    mapBaloon: {
        width: 240,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: '52%',
        left: '68%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0 50px',
        background: theme.palette.background.default,
        filter: 'drop-shadow(1px 1px 6px rgba(0, 0, 0, 0.45))',
    },
    mapBaloonWithoutImg: {
        width: 240,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: '52%',
        left: '68%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0 50px',
        background: theme.palette.background.default,
        filter: 'drop-shadow(1px 1px 6px rgba(0, 0, 0, 0.45))',
    },
    modalClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: theme.palette.primary.grey,
        cursor: 'pointer',
        marginLeft: 'auto',
        position: 'absolute',
        zIndex: 1,
        bottom: 10,
        right: 10,
        zIndex: 1,
        '& svg': {
            fill: theme.palette.primary.main
        }
    },
    modalText: {
        width: '100%',
        padding: '40px 30px',
        flexGrow: 1,
        position: 'relative',
        textAlign: 'left',
        maxHeight: 260,
        '& .MuiTypography-body2': {
            fontSize: 13
        },
    },
    modalTextWithoutImg: {
        width: '100%',
        padding: '40px 30px 60px',
        flexGrow: 1,
        position: 'relative',
        textAlign: 'left',
        '& .MuiTypography-body2': {
            fontSize: 13
        }
    },
    mapBaloonArrow: {
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '28px', 
        borderColor: 'transparent white transparent transparent',
        position: 'absolute',
        bottom: 0,
        left: '-55px'
    },
    mapBaloonArrowWithoutImg: {
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '28px', 
        borderColor: 'transparent white transparent transparent',
        position: 'absolute',
        top: '50%',
        left: '-55px',
        transform: 'translateY(-50%)'
    },
    mapBaloonImg: {
        width: 240,
        height: 240,
        objectFit: 'cover',
        borderRadius: '0 50px',
    },
    searchButton: {
        background: theme.palette.primary.green,
        borderRadius: '50px',
        padding: '7px 21px',
        marginTop: 10,
        '&:hover': {
            background: theme.palette.primary.green
        },
        '&:active': {
            boxShadow: 'inset 2px 4px 10px rgba(87, 105, 27, 0.35)'
        },
        '& .MuiTouchRipple-root': {
            display: 'none'
        }
    },
    arrowIcon: {
        width: '27px', 
        height: '25px',
        fill: theme.palette.primary.main
    },
    cardTextSm: {
        display: '-webkit-box',     
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '5',
        overflow: 'hidden',
        // marginBottom: theme.spacing(5),
        width: '190px'
    },
}));

export default function MapBaloon({ btn, onCloseHandler }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const getPrices = usePrices().refetch;
    const selectedPoint = useSelector(state => state.map.selectedPoint);
    const popupPlaces = useSelector(state => state.select.popupDataPlaces).body;
    
    const time =  selectedPoint && selectedPoint.time !== undefined ? selectedPoint.time : '';
    let address = '';

    if (selectedPoint) {
        if (selectedPoint.address.includes('Россия, Краснодарский край')) {
            address = selectedPoint.address.replace(('Россия, Краснодарский край, '), '');
        } else {
            address = selectedPoint.address;
        }
    }

    const handleClose = (e) => {
        e.stopPropagation();
        dispatch(toggleMapBaloon());
        onCloseHandler();
    }

    const handleCloseBg = (e) => {       
        if (e.target === e.currentTarget) {
            dispatch(toggleMapBaloon());
            onCloseHandler();
        }        
    }

    const clickHandler = async (point) => {
        dispatch(closeSelectPlaces());
        let selectedPlace = {};
        popupPlaces.map((place) => {
            if(place.option.indexOf(point.name) > -1) {
                place.active = true;
                selectedPlace = place;
            } else {
                place.active = false;
            }
        });

        if(selectedPlace !== {}) {
           await dispatch(setSelectedPlaceId(selectedPlace.id));
           await dispatch(setValueSelectPlace(selectedPlace.option));
        }

        await getPrices();
        dispatch(toggleMapBaloon());
        onCloseHandler();
    }    

    return (
        <>
            {selectedPoint && 
                <Box className={ classes.bg } onClick={ e => handleCloseBg(e) }>
                    <Box className={ selectedPoint.img ? classes.mapBaloon : classes.mapBaloonWithoutImg }>
                        <div className={ classes.modalClose } onClick={ e => handleClose(e) }>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.7237 2.23611L17.7654 0.277779L10.0015 8.04167L2.23763 0.277779L0.279297 2.23611L8.04319 10L0.279297 17.7639L2.23763 19.7222L10.0015 11.9583L17.7654 19.7222L19.7237 17.7639L11.9599 10L19.7237 2.23611Z" fill="#7348FF"/>
                            </svg>
                        </div> 
                        
                        <Box className={ selectedPoint.img ? classes.modalText : classes.modalTextWithoutImg }>                  
                            { selectedPoint.name && <Typography variant="h7" component="p" mb={3.5}  className={ classes.cardTextSm }>{time + ' ' + Parser(decodeHtml(selectedPoint.name ))}</Typography> }
                            { selectedPoint.address && <Typography variant="body2" component="p"  className={ classes.cardTextSm }>Адрес: { Parser(decodeHtml(address)) }</Typography> }
                            { selectedPoint.phone && <Typography variant="body2" component="p" mt={3.5}>Тел.: { selectedPoint.phone }</Typography> }
                            <span className={ selectedPoint.img ? classes.mapBaloonArrow : classes.mapBaloonArrowWithoutImg }></span>
                            { btn && 
                                <IconButton type="button" className={ classes.searchButton } aria-label="baloon" onClick={ () => clickHandler(selectedPoint) }>                   
                                    <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.0453 9.04134H14.7385L9.19303 14.1247C8.74985 14.5309 8.74985 15.1976 9.19303 15.6038C9.63621 16.0101 10.3521 16.0101 10.7953 15.6038L18.2839 8.73926C18.7271 8.33301 18.7271 7.67676 18.2839 7.27051L10.8067 0.395508C10.3635 -0.0107422 9.64757 -0.0107422 9.20439 0.395508C8.76121 0.801758 8.76121 1.45801 9.20439 1.86426L14.7385 6.95801H2.0453C1.4203 6.95801 0.908936 7.42676 0.908936 7.99967C0.908936 8.57259 1.4203 9.04134 2.0453 9.04134Z" fill="#7348FF"/>
                                    </svg>
                                </IconButton>
                            }
                        </Box>  

                        {selectedPoint.img ?
                            <img src={ selectedPoint.img } alt="" className={ classes.mapBaloonImg } /> : null
                        }                         
                    </Box> 
                </Box>
            } 
        </>       
    )
}