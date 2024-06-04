/*REACT*/
import React from 'react';

/*MUI*/
import { Grid, Typography, Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import CardItem from './CardItem';
import Loading from '../Loading';

/*IMAGES*/
import imgBg from '../../assets/images/bg-red.jpg';

export const useStyles = makeStyles((theme) => ({
    cardList: {
        marginBottom: theme.spacing(10)
    },
    cardTitle: {
        marginBottom: theme.spacing(8)
    },
    text: {
        fontWeight: '600',
        display: '-webkit-box',     
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '3',
        overflow: 'hidden'
    },
    link: {
        color: theme.palette.text.card
    },
    item: {
        '&.MuiGrid-grid-xs-4': {
            flexBasis: '37.333333%',
            maxWidth: '37.333333%',
        },        
        '&:nth-child(even) .MuiPaper-root': {
            borderBottomRightRadius: '50px',
        },
        '&:nth-child(odd) .MuiPaper-root': {
            borderTopLeftRadius: '50px',
        }
    }
}));

export default function CardList({ data }) {
    const classes = useStyles();

    const excursions = data.excursionList.length > 2 ? data.excursionList.slice(0, 2) : data.excursionList;
    const whereToGo = data.whereToGoList.length > 2 ? data.whereToGoList.slice(0, 2) : data.whereToGoList;
    const events = data.eventList.length > 2 ? data.eventList.slice(0, 2) : data.eventList;

    const cards = [
        {
            title: 'экскурсии',            
            bg: false,
            cards: [...excursions, {
                img: '',
                text: 'смотреть экскурсии ещё',
                theme: 'violet',
                url: '/excursion',
            }],
            link: data.excursionLink
        },
        {
            title: 'КУДА СХОДИТЬ',
            bg: false,
            url: '/',
            cards: [...whereToGo, {
                img: '',
                text: 'смотреть куда пойти ещё',
                theme: 'green',
                url: '/where-to-go',
            }],
            link: data.whereLink
        },
        {
            title: 'СОБЫТИЯ',
            bg: true,
            url: '/',
            cards: [...events, {
                img: '',
                text: 'смотреть события ещё',
                theme: 'white',
                url: '/events',
            }],
            link: data.eventLink
        }
    ];

    let bgStyle = {};    

    return (
        <Box sx={{paddingTop: '45px'}}>
            {(excursions.length === 0 || whereToGo.length === 0 || events.length === 0) ? <Loading /> : (
                <>
                {cards.map((card, i) => {
                    if (card.bg) {
                        bgStyle = {
                            background: `url(${ imgBg }) center center no-repeat`, 
                            backgroundSize: 'cover',
                            padding: '30px 0 135px',
                            marginBottom: '0 !important',
                            '& .MuiTypography-h3': {
                                color: '#ffffff'
                            }
                        }
                    }
                    return (                    
                        <Box key={ i } className={ classes.cardList } sx={ bgStyle }>
                            <Container maxWidth="md">
                                <Typography variant="h3" className={ classes.cardTitle }>{ card.title }</Typography>
                                <Grid container justifyContent="flex-start" spacing={5}>
                                    {card.cards.map((item, i) => {
                                        return item.url ? 
                                            (<Grid item xs={3} key={ i } className={ classes.item }>
                                                <CardItem data={{ item, link: card.link }} />
                                            </Grid>)
                                        :   (<Grid item xs={4} key={ i } className={ classes.item }>
                                                <CardItem data={{ item, link: card.link }} />
                                            </Grid>)
                                    })}                         
                                </Grid>
                            </Container>
                        </Box> 
                    )                
                })}
                </>
            )}
        </Box>
    )
}