/*REACT*/
import React, { useEffect } from 'react';
import DateObject from 'react-date-object';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { 
    closeModalCalendar, 
    setActiveOptionGroup, 
    setActiveOptionPlace, 
    setCalendarValue, 
    setCurrentExcursionId, 
    setSelectedGroupId, 
    setSelectedPlaceId, 
    toggleNoQuotPopup 
} from '../../redux/actions';

/*HOOKS*/
import { excursionListMap, useDateExcursionList, useGetExcursionById } from '../../hooks/excursionHooks';

/*MUI*/
import { Modal, Slide, Box, Typography, Stack, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import Loading from '../Loading';
import CardSmallList from '../ListExcursions/CardSmallList';

export const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        top: '500px',
        left: '0',
        bottom: '0',
        width: '100%',
        background: theme.palette.background.default,
        boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.45)',
        borderRadius: '50px 50px 0 0',
        border: 'none',
        outline: 'none'
    },
    modalHeader: {
        padding: '50px 50px 10px',
    },
    modalClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: theme.palette.primary.grey,
        cursor: 'pointer',
        marginLeft: 'auto',
        '& svg': {
            fill: theme.palette.primary.main
        }
    },
    modalBody: {
        height: 'calc(100% - 230px)',
        padding: '0 0 50px',
    },
    center: {
        textAlign: 'center',
    }
}));

export default function PopupNoQuot({searchHandler = () => {}, onClickModal = () => {}, getGroupHandler = () => {}}) {  
    const dispatch = useDispatch();
    const classes = useStyles();     
    const excursionsByDate = useDateExcursionList(false, true).refetch;
    
    const date = useSelector(state => state.calendar.value);
    const excursionId = useSelector(state => state.excursionManager.currentExcursionId);
    const open = useSelector(state => state.excursionManager.noQuotPopup);
    const closestDate = useSelector(state => state.calendar.closestDate);
    const excursionDateList = useSelector(state => state.excursionManager.excursionDateList);
    const firstSelectGroup = useSelector(state => state.select.firstSelectGroup);
    const firstSelectPlace = useSelector(state => state.select.firstSelectPlace);
    const excursionById = useGetExcursionById(0);
    const currentDate = new DateObject(date._d).format('DD-MM-YYYY');

    const closestDateHandler = async () => {
        // await dispatch(setCalendarValue(closestDate));
        searchHandler();
        dispatch(toggleNoQuotPopup());
    }

    const resetFilter = () => {
        dispatch(setCalendarValue(closestDate));
        dispatch(setActiveOptionGroup(firstSelectGroup.id));
        dispatch(setSelectedGroupId(firstSelectGroup.id));
        dispatch(setActiveOptionPlace(firstSelectPlace.id));
        dispatch(setSelectedPlaceId(firstSelectPlace.id));
        getGroupHandler();
        dispatch(toggleNoQuotPopup());
    }

    useEffect(()=> {
        if(open) excursionsByDate();
    }, [open, excursionsByDate]);

    const setExcursion = (id) => {
        dispatch(setCurrentExcursionId(parseInt(id)));
        dispatch(toggleNoQuotPopup());
    }

    useEffect(() => {
        if(excursionId > 0) {
            excursionById.refetch();
            dispatch(closeModalCalendar());
            dispatch(toggleNoQuotPopup());
        }
    }, [excursionId]);

    return (
        <Modal
            open={ open }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={ onClickModal }
        >
            <Slide direction="up" in={ open } timeout={500} mountOnEnter unmountOnExit>
                <Box className={ classes.modal }>
                    <Box className={ classes.modalHeader } />
                    
                    <Box className={ classes.modalBody }>
                        <Typography variant="h4" mb={15} className={ classes.center }>К сожалению, на { currentDate } г. <br /> свободных мест не осталось. Посмотрим на другую дату?</Typography>
                        
                        <Stack 
                            spacing={5} 
                            direction="row" 
                            justifyContent="center"
                            alignItems="center" 
                            mb={15}
                        >
                            <Button variant="outlined" onClick={ resetFilter }>
                                <Typography variant="button2">СБРОСИТЬ ФИЛЬТР</Typography>
                            </Button>
                            <Button variant="contained" onClick={ resetFilter }>
                                <Typography variant="button2">НА БЛИЖАЙШУЮ ДАТУ</Typography>
                            </Button>
                        </Stack>

                        <Typography variant="h4" mb={10} className={ classes.center }>Но у нас есть кое-что интересное для вас</Typography>
                        {excursionDateList.length > 0 ? (
                              <CardSmallList data={{
                                notPromo: excursionListMap(excursionDateList), 
                                updList: excursionsByDate,
                                onClickCard: setExcursion
                            }} /> 
                        ): <Loading />}
                    </Box> 
                </Box>
            </Slide>
        </Modal>    
    )
}