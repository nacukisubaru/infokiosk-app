/*REACT*/
import React from 'react';
import { Link } from "react-router-dom";

/*MUI*/
import { Card, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*ICONS*/
import SvgArrowRight from '../Icons/SvgArrowRight';

export const useStyles = makeStyles((theme) => ({
    card: {
        backgroundSize: 'cover',         
        height: '300px', 
        boxShadow: 'none',
        color: theme.palette.text.card,
        position: 'relative',
    },    
    cardInner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '16px', 
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180.6deg, rgba(0, 0, 0, 0) 57.09%, rgba(0, 0, 0, 0.4) 99.48%)',
        position: 'absolute',
        top: '0',
        left: '0'
    },
    text: {
        display: '-webkit-box',     
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
        overflow: 'hidden'
    },
    data: {
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 10
    },
    linkCard: {
        display: 'block',
        height: '100%',
        color: theme.palette.text.card,
        position: 'relative',
    },
    link: {
        color: theme.palette.text.card,
        position: 'relative',
    },
    cardViolet: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '300px', 
        boxShadow: 'none',
        padding: '15px',        
        background: theme.palette.primary.main,
        borderBottomRightRadius: '50px',
        '& .MuiTypography-root': {
            color: theme.palette.primary.green
        },
        '& .MuiButtonBase-root': {
            marginTop: theme.spacing(8)
        },       
    },
    cardGreen: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '300px', 
        boxShadow: 'none',
        padding: '15px', 
        background: theme.palette.primary.green,
        borderBottomRightRadius: '50px',
        '& .MuiTypography-root': {
            color: theme.palette.primary.main
        },
        '& .MuiButtonBase-root': {
            background: theme.palette.primary.main,
            marginTop: theme.spacing(8)
        },
        '& .MuiButtonBase-root:hover': {
            background: theme.palette.primary.main
        },
        '& .MuiButtonBase-root:active': {
            boxShadow: 'inset 2px 4px 10px rgba(87, 105, 27, 0.35)'
        },
        '& svg': {
            fill: theme.palette.primary.green,
        }
    },
    cardWhite: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '300px', 
        boxShadow: 'none',
        padding: '15px 20px 15px 15px', 
        background: theme.palette.background.default,
        borderBottomRightRadius: '50px',
        '& .MuiTypography-root': {
            color: theme.palette.primary.red
        },
        '& .MuiButtonBase-root': {
            background: theme.palette.primary.red,
            marginTop: theme.spacing(8)
        },
        '& .MuiButtonBase-root:hover': {
            background: theme.palette.primary.red
        },
        '& .MuiButtonBase-root:active': {
            boxShadow: 'inset 2px 4px 10px rgba(87, 105, 27, 0.35)'
        },
        '& svg': {
            fill: theme.palette.background.default,
        }
    },
    searchButton: {
        background: theme.palette.primary.green,
        borderRadius: '50px',
        padding: '14px 38px',
        '&:hover': {
            background: theme.palette.primary.green
        },
        '&:active': {
            boxShadow: 'inset 2px 4px 10px rgba(87, 105, 27, 0.35)'
        }
    },
    arrowIcon: {
        width: '33px', 
        height: '32px',
        fill: theme.palette.primary.main
    }
}));

export default function CardItem({ data }) {
    const classes = useStyles();

    const CardEl = () => {
        return (
            <>
                <Card className={ classes.card } sx={{background: `url(${data.item.img}) center center no-repeat`}}>
                    <Link to={ data.link+data.item.id } className={ classes.linkCard }>                        
                        <span className={ classes.cardInner }>     
                            {(data.item.dateEvent && !data.item.timeEvent) && <span className={ classes.data }>{data.item.dateEvent}</span>}
                            {(data.item.dateEvent && data.item.timeEvent) && <span className={ classes.data }>{data.item.dateEvent + " | " + data.item.timeEvent}</span>}                                                   
                            <Typography variant="h7" className={ classes.text }>{ data.item.title }</Typography>
                        </span>
                    </Link>
                </Card>
            </>            
        )
    }

    const CardViolet = () => {
        return (
            <>
                <Card className={ classes.cardViolet }>
                    <Typography variant="h5">{ data.item.text }</Typography>
                    <Link to="/excursion" className={ classes.link }>
                        <IconButton type="button" className={ classes.searchButton }>
                            <SvgArrowRight className={ classes.arrowIcon } />
                        </IconButton>
                    </Link>
                </Card>
            </>            
        )
    }

    const CardGreen = () => {
        return (
            <>
                <Card className={ classes.cardGreen }>
                    <Typography variant="h5">{ data.item.text }</Typography>
                    <Link to="/where-to-go" className={ classes.link }>
                        <IconButton type="button" className={ classes.searchButton }>
                            <SvgArrowRight className={ classes.arrowIcon } />
                        </IconButton>
                    </Link>
                </Card>
            </>            
        )
    }

    const CardWhite = () => {
        return (
            <>
                <Card className={ classes.cardWhite }>
                    <Typography variant="h5">{ data.item.text }</Typography>
                    <Link to="/events" className={ classes.link }>
                        <IconButton type="button" className={ classes.searchButton }>
                            <SvgArrowRight className={ classes.arrowIcon } />
                        </IconButton>
                    </Link>
                </Card>
            </>            
        )
    }

    let result;

    if (data.item.theme === 'violet') {
        result = <CardViolet />
    } else if (data.item.theme === 'green') {
        result = <CardGreen />
    } else if (data.item.theme === 'white') {
        result = <CardWhite />
    } else {
        result = <CardEl />
    }

    return (
        <>
            { result }
        </>
    )
}