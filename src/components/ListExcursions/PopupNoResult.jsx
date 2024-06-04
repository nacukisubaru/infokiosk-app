/*REACT*/
import React from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { 
    closeSearch, 
    setClickFilter, 
    setCountPage, 
    setSearchBtn, 
    toggleLoading, 
    toggleNoResultPopup, 
    unsetClickFilter 
} from '../../redux/actions/excursionActions';
import { 
    resetFilter, 
    resetLocation, 
    resetLocationIds, 
    resetParentsFiltersNested, 
    setCalendarValueList, 
    setCatalogCountPage, 
    setChosenCalendarValueList, 
    setInputKeyboardSearch, 
    setOpenRecommend 
} from '../../redux/actions';

/*MUI*/
import { Modal, Box, Typography, Stack, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    modal: {
        minHeight: 460,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '870px',
        background: theme.palette.background.default,
        boxShadow: theme.shadows[5],
        borderRadius: 50,
        border: 'none',
        outline: 'none'
    },
    modalBody: {
        padding: '100px 50px 50px',
        textAlign: 'center'
    }
}));

export default function PopupNoResult({ data, callback }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(state => state.excursionManager.noResultPopup);
    const keyboard = useSelector(state => state.keyboard.keyboard);

    const resetHandler = async () => {
        await dispatch(toggleLoading(true));
        await dispatch(setCatalogCountPage(1));
        await dispatch(setCountPage(1));
        dispatch(setClickFilter());
        dispatch(toggleNoResultPopup(false));
        await dispatch(resetLocation());
        await dispatch(resetLocationIds());  
        await dispatch(setCalendarValueList(''));
        await dispatch(setChosenCalendarValueList(''));
        await dispatch(resetFilter());
        await dispatch(setInputKeyboardSearch(''));
        await dispatch(closeSearch());
        await dispatch(resetParentsFiltersNested());
        dispatch(setOpenRecommend());
        dispatch(setSearchBtn(false)); 
        if(callback) {
            callback.resetList && await callback.resetList();
            callback.resetPage && await callback.resetPage();
            callback.resetFilter && await callback.resetFilter();
        }

        if(data && data.excursionList) {
            await data.excursionList.refetch();
        }
        dispatch(unsetClickFilter());
        if(callback) {
            callback.modalSearchCallback && callback.modalSearchCallback();
        }

        if (keyboard.hasOwnProperty('clearInput')) {
            await keyboard.clearInput("default");
        }
        await dispatch(toggleLoading(false));   
    }

    return (
        <Modal
            open={ open }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={ classes.modal }>                
                <Box className={ classes.modalBody }>
                    <Typography variant="h4" mb={5}>К сожалению,  по вашему запросу ничего не найдено.</Typography>
                    <Typography variant="body1">Попробуйте изменить параметры поиска и мы поищем снова.</Typography>
                    <Stack 
                        spacing={5} 
                        direction="row" 
                        justifyContent="center"
                        alignItems="center" 
                        mt={15}
                    >
                        {/* <Button  variant='contained' onClick={ resetHandler }>
                            <Typography variant="button2">СБРОСИТЬ ФИЛЬТР</Typography>
                        </Button> */}
                        <Button  variant='contained' onClick={ resetHandler }>
                            <Typography variant="button2">ПОНЯТНО</Typography>
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>    
    )
}