/*REACT*/
import React, { useEffect } from "react";

/*REDUX*/
import { useSelector, useDispatch } from "react-redux";
import {
    closeModalCalendarList,
    openModalCalendarList,
    openModalStay,
    setCalendarValueList,
    setCatalogCountPage,
    setChosenCalendarValueList,
    setComeBackLink,
    toggleSearchPopup,
} from "../../redux/actions";
import { resetEventList, setEventList, setEventListPromo } from "../../redux/actions/catalogActions";
import { setClickFilter, toggleNoResultPopup, unsetClickFilter } from "../../redux/actions/excursionActions";
import { setFilterByDateInWork } from "../../redux/actions/filterActions";

/*HOOKS*/
import { useCatalogList, useCatalogListPromo, useGetDistricts } from "../../hooks/catalogHooks";
import { useFilterList } from "../../hooks/filterHooks";
import { useSettingBannerTerminal } from "../../hooks/useSetting";
import { useCheckActiveUserInApp } from "../../hooks/appHooks";

/*HELPERS*/
import { listMap } from "../../helpers/arrayHelper";
import catalogApi from "../../api/catalogApi";

/*MUI*/
import { Box, Container, Stack } from "@mui/material";

/*COMPONENTS*/
import Banner from "../../components/Banner";
import CardSmallList from "../../components/ListExcursions/CardSmallList";
import PopupSearch from "../../components/ListExcursions/PopupSearch";
import Loading from "../../components/Loading";
import InputDate from "../../components/InputDate";
import SelectCustomDistricts from "../../components/SelectCustomDistricts";
import Filter from "../../components/Filters/Filter";
import PopupStay from "../../components/PopupStay";

export default function EventsList() {
    const catalog = new catalogApi();
    const dispatch = useDispatch();
    const {ref, userActive, activateUser, pause, restartTimer} = useCheckActiveUserInApp(300000);

    const categoryId = catalog.CATEGORY_EVENTS;
    const setList = (list, searchWorking) => {return setEventList(list, searchWorking)};
    const setPromoList = (list) => {return setEventListPromo(list)};
    const eventList = useCatalogList(categoryId, setList, true);    
    const eventListPromo = useCatalogListPromo(categoryId, setPromoList);
    
    const getFilterList = () => {return catalog.getEventTypes()};
    const filterList = useFilterList(getFilterList, true, true);
    
    const list = useSelector((state) => state.catalog.eventList);
    const listPromo = useSelector((state) => state.catalog.eventListPromo);
    const dateCalendar = useSelector(state => state.calendar.chosenValueList);

    useGetDistricts('EVENTS');
    useSettingBannerTerminal();

    const listOptions = {
        notPromo: listMap(list),
        updList: eventList.refetch,
        link: "/events/",
    };
    
    if (listPromo.length > 0) {
        listOptions.isPromo = listMap(listPromo, true).slice(-3);
    }
    
    const optionsDate = {
        label: false,
        value: useSelector(state => state.calendar.valueList),
        handleOpen: () => {
             dispatch(openModalCalendarList());
        },
        popupData: {
            open: useSelector(state => state.calendar.openCalendarList),
            handlerClose: () => {
                dispatch(closeModalCalendarList());
                dispatch(setChosenCalendarValueList(''));
            },
            onChangeHandler: (newValue) => {
                dispatch(setChosenCalendarValueList(newValue))
            },
            resetHandler: async () => { 
                await resetEventList();
                await setEventList([]);
                await dispatch(setCalendarValueList(''));
                await dispatch(setChosenCalendarValueList(''));
                await dispatch(resetEventList());
                await dispatch(setCatalogCountPage(1));
                await dispatch(setClickFilter());
                await dispatch(closeModalCalendarList()); 
                await eventList.refetch();
                dispatch(unsetClickFilter());  
            },
            searchHandler: async () => {
                dispatch(setCalendarValueList(dateCalendar));
                dispatch(setFilterByDateInWork(true));
                dispatch(closeModalCalendarList());
                await dispatch(setCatalogCountPage(1));
                dispatch(setClickFilter()); 
                await dispatch(toggleSearchPopup(true));
                const data = await eventList.refetch();
                if(data.data.data.result.error) {
                    dispatch(toggleNoResultPopup(true));
                }
                await dispatch(toggleSearchPopup(false));
            },
        }
    }

    const resetPage = async () => await dispatch(setCatalogCountPage(1));

    const resetList = async () => await dispatch(resetEventList());

    const callbackClickChip = async () => {
        await dispatch(resetEventList());
        await dispatch(setCatalogCountPage(1));
    }

    const callbackResetFilter = async () => {
        await dispatch(setEventList([]));
        await dispatch(setCatalogCountPage(1));
        await dispatch(resetEventList());
    }

    const callbackPopupClickChip = async () => await dispatch(setCatalogCountPage(1));

    const callbackPopupResetFilter = async () => await dispatch(setCatalogCountPage(1));

    const callbackPopupResetBtnFilter = async () => {
        await dispatch(resetEventList());
        await dispatch(setEventList([]));
        await dispatch(setCatalogCountPage(1));
    }

    const callbackSearchPopup = async () => {
        await dispatch(resetEventList());
        await dispatch(setEventList([]));
        await dispatch(setCatalogCountPage(1));
    }

    const callbackSearchInput = async () => {
        await dispatch(resetEventList());
        await dispatch(setEventList([]));
    }

    useEffect(() => {
        dispatch(setComeBackLink(''));
    }, [dispatch]);

    useEffect(() => {
        if (userActive === false) {
            pause();
            dispatch(openModalStay());
        }
    }, [userActive]);

    return (
        <>
            <div ref={ref}>
                <Banner data={{
                    searchListUpd: eventList.refetch, 
                    commonListUpd: eventList.refetch,
                    callbacks: {
                        callbackSearchInput
                    },
                    keyboardCallback: () => {
                        activateUser();
                    }
                }}
                />
                {eventList.isLoading || eventListPromo.isLoading ? (
                    <Loading />
                ) : (
                    <main>
                        <Container maxWidth="md" sx={{ paddingTop: "30px", paddingBottom: "20px" }}>
                            
                            <Filter
                                options={{
                                    list: eventList,
                                    filter: filterList,
                                    maxWidthTags: 1000,
                                    callbacks: {
                                        callbackSearchPopup,
                                        callbackPopupResetBtnFilter,
                                        callbackPopupClickChip,
                                        callbackPopupResetFilter,
                                        callbackClickChip,
                                        callbackResetFilter,
                                        resetList,
                                        resetPage,
                                    }
                                }}
                                userActiveCallback={activateUser}
                            ></Filter> 
                            <Stack direction="row" spacing={5}>
                                <InputDate 
                                    options={ optionsDate } 
                                    userActiveCallback={activateUser}
                                    small
                                />
                                <Box sx={{flex: '1'}}>
                                    <SelectCustomDistricts 
                                        data={{
                                            list: eventList,
                                            callback: resetPage,
                                            reset: resetList
                                        }}
                                        userActiveCallback={activateUser}
                                        small
                                    />
                                </Box>                        
                            </Stack>  
                        </Container>
                        <CardSmallList data={ listOptions } />
                        <PopupStay options={{onClose: restartTimer, subtitle: 'Сессия закончится через: '}}></PopupStay>
                        <PopupSearch />
                    </main>
                )}
            </div>
        </>
    );
}
