/*REACT*/
import React, { useEffect } from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { setClickFilter, setCountPage, setHistoryBack, unsetClickFilter } from '../redux/actions/excursionActions';
import { 
    toggleSearchPopup,
    closeModalCalendarList,
    setCalendarValueList,
    openModalCalendarList,
    resetExList,
    setComeBackLink,
    setChosenCalendarValueList,
    openModalStay,
} from '../redux/actions';

/*HOOKS*/
import { useFilterList } from '../hooks/filterHooks';
import { useSettingBannerTerminal } from '../hooks/useSetting';
import { useCheckActiveUserInApp } from '../hooks/appHooks';
import { 
    useGetExcursionList,  
    useGetExcursionListPromo, 
    useGetDistricts,
    excursionListMap
} from '../hooks/excursionHooks';

/*HELPERS*/
import excursionsApi from '../api/excursionsApi';

/*MUI*/
import { Container, Stack, Box } from '@mui/material';

/*COMPONENTS*/
import Filter from '../components/Filters/Filter';
import CardSmallList from '../components/ListExcursions/CardSmallList';
import InputDate from '../components/InputDate';
import Loading from '../components/Loading';
import PopupSearch from '../components/ListExcursions/PopupSearch';
import Banner from '../components/Banner';
import PopupStay from '../components/PopupStay';
import SelectCustomDistricts from '../components/SelectCustomDistricts';

export default function ListExcursions() {
    const exApi = new excursionsApi();
    const dispatch = useDispatch();   
    const excursionList = useGetExcursionList();    
    const excursionListPromo = useGetExcursionListPromo();
    const getFilterList = () => {return exApi.getFilterList(10000)};
    const filterList = useFilterList(getFilterList);
    const {ref, userActive, activateUser, pause, restartTimer} = useCheckActiveUserInApp(300000);

    const search = useSelector(state => state.excursionManager.search);
    const excursionsArray = useSelector(state => state.excursionManager.excursionList);
    const dateCalendar = useSelector(state => state.calendar.chosenValueList);
    
    useSettingBannerTerminal();
    useGetDistricts();

    useEffect(() => {
        if(userActive === false) {
            pause();
            dispatch(openModalStay());
        }
    }, [userActive]);    

    const excursionsArrayPromo = excursionListMap(excursionList.excursionManager.excursionListPromo);
    const excursionsArrayNotPromo = excursionListMap(excursionListPromo.excursionManager.excursionList);
    const excursionsArraySearch = excursionListMap(excursionsArray);

    const resetCallbackLocations = () => {
        dispatch(setCountPage(1));
        dispatch(setClickFilter());
        dispatch(unsetClickFilter());
    }

    const resetList = () => dispatch(resetExList());

    const optionsDate = {
        label: false,
        value: useSelector(state => state.calendar.valueList),
        handleOpen: () => dispatch(openModalCalendarList()),
        popupData: {
            open: useSelector(state => state.calendar.openCalendarList),
            handlerClose: () => {
                dispatch(closeModalCalendarList());
                dispatch(setChosenCalendarValueList(''));
            },
            onChangeHandler: (newValue) => dispatch(setChosenCalendarValueList(newValue)),
            resetHandler: async () => { 
                dispatch(setCalendarValueList(''));
                dispatch(setChosenCalendarValueList(''));
                await dispatch(setCountPage(1));
                dispatch(setClickFilter());
                dispatch(closeModalCalendarList()); 
                await excursionList.refetch();  
                dispatch(unsetClickFilter());             
            },
            searchHandler: async () => {
                dispatch(setCalendarValueList(dateCalendar));
                dispatch(closeModalCalendarList());
                await dispatch(setCountPage(1));
                dispatch(setClickFilter()); 
                await dispatch(toggleSearchPopup(true));
                await excursionList.refetch();
                await dispatch(toggleSearchPopup(false));
            },
        }
    }

    const callbackClickChip = async () => {
        await dispatch(resetExList());
        await dispatch(setCountPage(1));
        await dispatch(setClickFilter());
    }

    const callbackResetFilter = async () => {
        await dispatch(setCountPage(1));
        await dispatch(resetExList());
        await dispatch(setClickFilter());
        await dispatch(setClickFilter());
    }

    const callbackPopupClickChip = async () => {
        await dispatch(setCountPage(1));
        await dispatch(setClickFilter());
    }

    const callbackPopupResetFilter = async () => {
        await dispatch(resetExList());
        await dispatch(setCountPage(1));
        await dispatch(setClickFilter());
    }

    const callbackPopupResetBtnFilter = async () => {
        await dispatch(resetExList());
        await dispatch(setCountPage(1));
        dispatch(setClickFilter());
    }

    const callbackSearchPopup = async () => await dispatch(resetExList());
    
    useEffect(()=>{
        dispatch(setComeBackLink(''));
        dispatch(setHistoryBack(false));
    }, [dispatch]);

    return (
        <>
            <div ref={ref}>
                <Banner data={{ 
                    searchListUpd: excursionList.refetch, 
                    commonListUpd: excursionList.refetch,
                    keyboardCallback: () => {
                        activateUser();
                    }
                }} />
                {excursionList.isLoading ? <Loading />: (
                    <main ref={ref}>
                        <Container maxWidth="md" sx={{paddingTop: '30px', paddingBottom: '20px'}}>                        
                            <Filter 
                                options={{
                                    list: excursionList, 
                                    filter: filterList,
                                    callbacks: {
                                        callbackClickChip,
                                        callbackResetFilter,
                                        callbackPopupClickChip,
                                        callbackPopupResetFilter,
                                        callbackPopupResetBtnFilter,
                                        callbackSearchPopup
                                    }
                                }}
                                userActiveCallback={activateUser}
                            />
                            <Stack direction="row" spacing={5}>
                                <InputDate options={ optionsDate } userActiveCallback={activateUser} small/>
                                <Box sx={{flex: '1'}}>
                                    <SelectCustomDistricts  
                                        data={{
                                            list: excursionList,
                                            callback: resetCallbackLocations,
                                            reset: resetList
                                        }} 
                                        userActiveCallback={activateUser}
                                        small
                                    />
                                </Box>                        
                            </Stack>  
                        </Container> 
                        {search ?
                            <CardSmallList data={{
                                isPromo: excursionsArrayPromo.slice(-3), 
                                notPromo: excursionsArraySearch, 
                                updList: excursionList.refetch
                            }} /> 
                            :
                            <CardSmallList data={{
                                isPromo: excursionsArrayPromo.slice(-3), 
                                notPromo: excursionsArrayNotPromo, 
                                updList: excursionList.refetch
                            }} /> 
                        }

                        <PopupStay options={{onClose: restartTimer, subtitle: 'Сессия закончится через: '}} />
                        <PopupSearch />         
                    </main>
                )}
            </div>
        </>
    )
}