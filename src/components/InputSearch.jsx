/*REACT*/
import React, { useRef, useEffect } from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { 
    resetWhereToGoList, 
    setCloseKeyboardSearch, 
    setInputKeyboardSearch, 
    setLayoutKeyboardSearch, 
    setOpenKeyboardSearch, 
    setOpenRecommend, 
    setWhereToGoList, 
    setCatalogCountPage, 
    toggleSearchPopup,  
    setKeyboard, 
    setTooltip, 
    setCloseRecommend, 
    resetExList
} from '../redux/actions';
import { 
    setClickFilter, 
    setCountPage, 
    setCountPageSearch, 
    setSearch, 
    toggleNoResultPopup, 
    setSearchClick, 
    toggleLoading, 
    unsetClickFilter,
    setSearchBtn, 
} from '../redux/actions/excursionActions';
import { resetEventList, setCatalogCountPageSearch, setEventList } from '../redux/actions/catalogActions';

/*MUI*/
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import KeyboardCustom from './KeyboardCustom/KeyboardCustom';

/*ICONS*/
import SvgSearch from './Icons/SvgSearch';
import SvgArrowRight from './Icons/SvgArrowRight';
import SvgClose from './Icons/SvgClose';

export const useStyles = makeStyles((theme) => ({
    searchWrap: {
        width: 'calc(100% - 200px)',
        display: 'flex', 
        alignItems: 'center', 
        boxShadow: 'none', 
        border: '3px solid',
        borderColor: theme.palette.primary.green,
        borderRadius: '50px',
        background: theme.palette.background.bgOpacityWhite,
        paddingLeft: '35px',
        color: theme.palette.text.white
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
        },
        '& .MuiTouchRipple-root': {
            display: 'none'
        }
    },
    arrowIcon: {
        width: '33px', 
        height: '32px',
        fill: theme.palette.primary.main
    },
    searchIcon: {
        width: '30px', 
        height: '30px',
        fill: theme.palette.primary.green,
        marginRight: '25px'
    },
    buttonFind: {
        background: '#C4C4C4', 
        borderLeft: '2px solid #B0B0B0', 
        color: '#000', 
        fontSize: '1.5rem', 
        padding: '9px 75px', 
        borderRadius: '0', 
        textTransform: 'capitalize',
        '@media (max-width: 575px)': {
            display: 'none'
        },
    },
    tooltipWrap: {
        flex: 1,
        position: 'relative'
    },
    tooltip: {
        display: 'none',
        position: 'absolute',
        bottom: '-60px',
        left: 0,
        background: theme.palette.background.default,
        padding: '10px 20px',
        borderRadius: 30,
        color: theme.palette.text.primary,
        fontSize: 12,
        lineHeight: '17px'
    },
    tooltipActive: {
        display: 'block',
        position: 'absolute',
        bottom: '-60px',
        left: 0,
        background: theme.palette.background.default,
        padding: '10px 20px',
        borderRadius: 30,
        color: theme.palette.text.primary,
        fontSize: 12,
        lineHeight: '17px'
    }
}));

export default function InputSearch({ data, callbacks, keyboardCallback }) {
    const keyboardRef = useRef();
    const inputRef = useRef(null);
    const dispatch = useDispatch(); 
    const classes = useStyles();
    const inputSearch = useSelector(state => state.keyboard.inputSearch); 
    const tooltip = useSelector(state => state.keyboard.tooltip);      
    const searchBtn = useSelector(state => state.excursionManager.searchBtn);

    const globalSearch = data.hasOwnProperty('global') ? true : false;

    useEffect(() => {
        dispatch(setTooltip(false));
        const onClick = e => {
            if (inputRef.current) {
                if (!(inputRef.current.contains(e.target) || e.target.getAttribute('aria-label') === 'search' || e.target.tagName === 'path' || e.target.tagName === 'svg')) {
                    dispatch(setTooltip(false));
                }
            }            
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const resetInput = async (e) => {
        e.preventDefault();

        dispatch(setTooltip(false));
        await dispatch(resetExList());
        await dispatch(setCountPage(1));
        await dispatch(setClickFilter());
        await dispatch(setInputKeyboardSearch(''));
        await dispatch(setSearch(false));
        await dispatch(setSearchBtn(false));
        await dispatch(setOpenRecommend());
        await dispatch(resetWhereToGoList());
        await dispatch(resetEventList());
        await dispatch(setEventList([]));
        await dispatch(setWhereToGoList([]));
        await dispatch(setCatalogCountPage(1));
        await dispatch(setCatalogCountPageSearch(1));
        callbacks && callbacks.callbackSearchReset && await callbacks.callbackSearchReset();
        if (!globalSearch) {  
            data && data.commonListUpd && await data.commonListUpd();
        }
        dispatch(unsetClickFilter());
        keyboardRef.current.clearInput("default");
    }
    
    const searchHandler = async (e) => {
        if (e !== undefined) {
            e.preventDefault();
        }

        if(inputSearch.length > 2) {
            await dispatch(resetExList());
            dispatch(setTooltip(false));
            dispatch(setClickFilter());
            await dispatch(setCountPage(1));
            await dispatch(setCatalogCountPage(1));
            await dispatch(setCountPageSearch(1));
            dispatch(setCloseRecommend()); 
            dispatch(setSearch(true)); 
            dispatch(setSearchBtn(true)); 
            dispatch(toggleSearchPopup(true));
            callbacks && callbacks.callbackSearchInput && await callbacks.callbackSearchInput();

            if (globalSearch) {
                dispatch(setSearchClick(true));
                await data.searchListUpdExcursion();
                await data.searchListUpdEvent();
                await data.searchListUpdWhere();
                dispatch(setSearchClick(false));
            } else {
                const searchData = await data.searchListUpd();
                dispatch(toggleSearchPopup(false));
                const result = searchData.data.data.result;
                if(result.error || (Array.isArray(result) && result.length <= 0)) {
                    dispatch(toggleNoResultPopup(true));
                }
            }
            dispatch(setKeyboard(keyboardRef.current));
            dispatch(toggleLoading(false));
        } else {
            dispatch(setTooltip(true));
        }
    }
    
    const keyboard = {
        keyboardRef: keyboardRef,
        layout: useSelector(state => state.keyboard.layoutSearch),
        input: useSelector(state => state.keyboard.inputSearch),
        open: useSelector(state => state.keyboard.openKeyboardSearch),
        closeHandler: setCloseKeyboardSearch,
        setInputValue: setInputKeyboardSearch,
        setLayout: setLayoutKeyboardSearch,
        enterHandler: searchHandler,
        listUpd: data && data.commonListUpd && data.commonListUpd
    }

    const handleOpenKeyBoard = async () => {
        await dispatch(setSearchBtn(false));
        dispatch(setOpenKeyboardSearch());
    }

    return (
        <>
            <Paper className={ classes.searchWrap } component="form">
                <SvgSearch className={ classes.searchIcon } />
                <Box className={ classes.tooltipWrap }>
                    <Box component="span" className={ tooltip ? classes.tooltipActive : classes.tooltip }>Необходимо ввести больше 2-х символов</Box>
                    <InputBase
                        sx={{ ml: 1, flex: 1, width: '100%', '& .MuiInputBase-input': {color: '#ffffff'} }}
                        placeholder="Поиск"
                        inputProps={{ 'aria-label': 'search', 'autoComplete': "off" }}
                        name="search"
                        onClick={ handleOpenKeyBoard }
                        value={ inputSearch }
                        onFocus={() => dispatch(setTooltip(false))}
                        ref={ inputRef }
                    />
                </Box>
                
                
                {searchBtn ?
                    <IconButton type="submit" className={ classes.searchButton } aria-label="reset" onClick={ e => resetInput(e) }>
                        <SvgClose className={ classes.arrowIcon } />
                    </IconButton>                    
                    :
                    <IconButton type="button" className={ classes.searchButton } aria-label="search" onClick={ e => searchHandler(e) }>                   
                        <SvgArrowRight className={ classes.arrowIcon } />
                    </IconButton>
                }                 
            </Paper>
            <KeyboardCustom props={ keyboard } activeUserCallback={keyboardCallback} />
        </>
    )    
}