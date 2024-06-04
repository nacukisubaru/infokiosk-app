/*REACT*/
import React from 'react';
import { Link } from "react-router-dom";
import Parser from "html-react-parser";

/*HELPERS*/
import { decodeHtml } from '../../helpers/stringHelper';
import { stripTags } from '../../helpers/stringHelper';

/*MUI*/
import { Card, Typography, Box, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*ICONS*/
import SvgPerson from '../Icons/SvgPerson';
import SvgPlacemark from '../Icons/SvgPlacemark';


export const useStyles = makeStyles((theme) => ({
    cardSm: {
        boxShadow: 'none',
        background: 'transparent'
    },
    cardImgWrap: {
        display: 'block',
        overflow: 'hidden'
    },
    cardImg: {        
        height: '250px',
        backgroundSize: 'cover', 
        position: 'relative',
    },
    cardImgInner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180.67deg, rgba(0, 0, 0, 0.4) 0.58%, rgba(0, 0, 0, 0) 43.23%, rgba(0, 0, 0, 0.4) 96.33%)',
        position: 'absolute',
        top: '0',
        left: '0'
    },
    cardImgText: {
        padding: '10px',
        color: theme.palette.text.white
    },
    cardImgTextRight: {
        padding: '10px 10px 10px 30px',
        color: theme.palette.text.white,
        textAlign: 'right'
    },
    dateEvent: {
        marginTop: '185px',
        display: 'flex',
        justifyContent: 'left',
        marginLeft: '15px',
        color: theme.palette.text.white
    },
    cardText: {
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 180        
    },
    cardTextSm: {
        display: '-webkit-box',     
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '4',
        overflow: 'hidden',
        marginBottom: theme.spacing(5),
    },
    cardTitle: {
        display: '-webkit-box',     
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
        overflow: 'hidden',
    },
    cadLink: {
        display: 'block',
        height: 44,
        color: 'inherit',
        marginBottom: theme.spacing(5)
    },
    cardPrice: {
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        // flex: 'auto',
        '& span': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: 260
        }        
    }
}));

export default function CardSmall({data, options}) {
    const classes = useStyles();

    return (
        <Card className={ classes.cardSm }>
            <Link to={data.link+data.id} className={ classes.cardImgWrap } >
                <Box className={ classes.cardImg } sx={{background: `url(${ data.img }) center center no-repeat`}} onClick={()=>{options.onClickCard && options.onClickCard(data.id)}}>
                    <Box className={ classes.cardImgInner }>
                        <Stack direction="row" justifyContent="end" className={ classes.cardImgTextRight }>
                            <Typography variant="subtitle1">{ data.imgText }</Typography>
                        </Stack>
                        {(data.link !== '/where-to-go/' && data.dateEvent && !data.timeEvent) && (
                             <Stack direction="row" justifyContent="end" className={ classes.dateEvent }>
                                <Typography variant="subtitle1" style={{fontSize: '14px', fontWeight: 300, whiteSpace: 'nowrap'}}>{data.dateEvent}</Typography>
                             </Stack>
                        )}
                       
                        {(data.link !== '/where-to-go/' && data.dateEvent && data.timeEvent) && (
                             <Stack direction="row" justifyContent="end" className={ classes.dateEvent }>
                                <Typography variant="subtitle1" style={{fontSize: '14px', fontWeight: 300, whiteSpace: 'nowrap'}}>{data.dateEvent + " | " + data.timeEvent}</Typography>
                            </Stack>
                        )}

                        <Stack direction="row" justifyContent="start" className={ classes.cardImgText } spacing={3}>                            
                            { data.days && <Typography variant="subtitle1">{ data.days }</Typography> }
                            { data.duration && <Typography variant="subtitle1">{ data.duration }</Typography> }
                            { (data.link === '/where-to-go/' && data.excursionsQuan > 0) && <Typography variant="subtitle1">{ `Экскурсий: ${data.excursionsQuan} шт.` }</Typography> }
                        </Stack>
                    </Box>                    
                </Box>
            </Link>
            <Box className={ classes.cardText }>
                <Link to={data.link+data.id} className={ classes.cadLink }>
                    <Typography variant="h7" className={ classes.cardTitle } onClick={()=>{options.hasOwnProperty('onClickCard') && options.onClickCard(data.id)}}>{ stripTags(decodeHtml(data.title)) }</Typography>
                </Link>
                <Typography variant="body2" className={ classes.cardTextSm }>{Parser(stripTags(decodeHtml(data.description)))}</Typography>
                <Typography variant="h7" component="p" className={ classes.cardPrice }>
                    { data.price && ( <SvgPerson style={{marginRight: '16px'}} />)}
                    { data.price && ( <span>от { data.price } ₽</span>) }
                    { data.district && ( <SvgPlacemark style={{marginRight: '16px'}} />)}
                    { data.district && (<span>{data.district}</span>)}
                </Typography>
            </Box>                  
        </Card>
    )
}