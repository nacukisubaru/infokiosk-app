/*REACT*/
import React, { useEffect, useState } from 'react';

/*REDUX*/
import { useSelector, useDispatch } from 'react-redux';
import { 
    openModalStay, 
    resetExList, 
    resetWhereToGoList, 
    setActiveTab, 
    setCatalogCountPage, 
    setCloseRecommend, 
    setComeBackLink, 
    setTabs, 
    setWhereToGoList 
} from '../redux/actions';
import { resetEventList, setEventList, setEventListPromo } from '../redux/actions/catalogActions';
import { setCountPage, setExcursionList, setHistoryBack } from '../redux/actions/excursionActions';
import { setMainEvents, setMainExcursions, setMainWhereToGo } from '../redux/actions/mainPageActions';

/*HOOKS*/
import { 
    useCatalogList, 
    useCatalogListMainpage, 
    useCatalogListPromo, 
    useGlobalSearch,  
    useWhereToGoList 
} from '../hooks/catalogHooks';
import { 
    excursionListMap,
    useGetExcursionList, 
    useGetExcursionListPromo, 
    useReservationHasPaymentWithCancel 
} from '../hooks/excursionHooks';
import { useWhereToGoListPromo } from '../hooks/whereToGoHooks';
import { useSettingBannerTerminal } from '../hooks/useSetting';
import { useCheckActiveUserInApp } from '../hooks/appHooks';

/*HELPERS*/
import { listMap } from '../helpers/arrayHelper';
import catalogApi from "../api/catalogApi";

/*MUI*/
import { makeStyles } from "@mui/styles";

/*COMPONENTS*/
import Banner from '../components/Banner';
import CardSmallList from '../components/ListExcursions/CardSmallList';
import CardList from '../components/Mainpage/CardList';
import TabsCard from '../components/TabsCard';
import PopupSearch from '../components/ListExcursions/PopupSearch';
import PopupNoResult from '../components/ListExcursions/PopupNoResult';
import PopupStay from '../components/PopupStay';

export const useStyles = makeStyles((theme) => ({
    tabsSearch: {
        '& .MuiTabs-root': {
            paddingTop: 40,
            paddingBottom: 23,
        },
        '& .MuiTabs-scroller > .MuiTabs-flexContainer': {
            overflowY: 'auto',
            overflowX: 'auto',
        }
    },
}));

export default function Mainpage() {
    const catalog = new catalogApi();
    const [panels, setPanels] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const updExList = useGetExcursionList(false);
    const WhereToGoList = useWhereToGoList();
    const getListMainpage = useCatalogListMainpage();
    useWhereToGoListPromo();
    useGetExcursionListPromo();
    useSettingBannerTerminal();
    const cancelPayment = useReservationHasPaymentWithCancel();
    const {ref, userActive, pause, activateUser, restartTimer} = useCheckActiveUserInApp(300000);

    const search = useSelector(state => state.excursionManager.search);
    const inputSearch = useSelector(state => state.keyboard.inputSearch);
    const listWhereToGo = useSelector((state) => state.catalog.whereToGoList);
    const listPromoWhereToGo = useSelector((state) => state.catalog.whereToGoListPromo);
    const listEvent = useSelector((state) => state.catalog.eventList);  
    const listPromoEvent = useSelector((state) => state.catalog.eventListPromo);
    const tab = useSelector(state => state.app.activeTab);
    const exList = useSelector(state => state.excursionManager.excursionList);
    const goList = useSelector(state => state.catalog.whereToGoList);
    const tabs = useSelector(state => state.app.tabs);
    const reservationId = useSelector((state) => state.payment.reservationId);

    const categoryIdWhere = catalog.CATEGORY_WHERE_TO_GO;
    const categoryIdEvents = catalog.CATEGORY_EVENTS;
    const categoryEventId = catalog.CATEGORY_EVENTS;
    const setListEvent = (list) => {return setMainEvents(list)}
    const setListWhere = (list) => {return setMainWhereToGo(list)};
    const callbackSetListEvent = (list) => {return setEventList(list)};
    const callbackPromoEventList = (list) => {return setEventListPromo(list)};
    useCatalogListPromo(categoryIdEvents, callbackPromoEventList);
    const useEventsList = useCatalogList(categoryEventId, callbackSetListEvent, true, false);
      
    const setExList = (data) => {
       return setMainExcursions(data);
    }
    const excursionList = useGetExcursionList(true, setExList, 1);
    const excursionsArrayPromo = excursionListMap(excursionList.excursionManager.excursionListPromo); 
    const {refetch} = useGlobalSearch(inputSearch);

    useEffect(() => {
        getListMainpage.get(categoryIdWhere, setListWhere);
        getListMainpage.get(categoryIdEvents, setListEvent);
    }, [categoryIdWhere, categoryIdEvents]);

    useEffect(()=> {
        const arrayTabs = [];
        const arrayPanels = [];

        if(exList.length > 0) {
            arrayTabs.push({
                name: "Экскурсии",
                click: () => {
                    dispatch(setActiveTab(0));
                    dispatch(setCloseRecommend());
                },
            });

            arrayPanels.push(
                <> 
                    <CardSmallList data={{
                        isPromo: excursionsArrayPromo.slice(-3),
                        notPromo: excursionListMap(exList), 
                        updList: updExList.refetch,
                    }} />
                </>
            );
        }

         if(listEvent.length > 0) {
            arrayTabs.push({
                name: "События",
                click: () => {
                    dispatch(setActiveTab(1));
                    dispatch(setCloseRecommend());
                },
            });

            arrayPanels.push(
                <>
                    <CardSmallList data={{
                        isPromo: (listPromoEvent.length > 0 && listEvent.length > 0) ? listMap(listPromoEvent, true).slice(-3) : [],
                        notPromo: listMap(listEvent),
                        updList: useEventsList.refetch,
                        link: "/events/", 
                    }} />
                </>,
            );    
        }

        if(goList.length > 0) {
            arrayTabs.push({
                name: "Куда сходить",
                click: () => {
                    dispatch(setActiveTab(2));
                    dispatch(setCloseRecommend());
                },
            });
            arrayPanels.push(
                <>           
                    <CardSmallList data={{
                        isPromo: (listPromoWhereToGo.length > 0 && goList.length > 0) ? listMap(listPromoWhereToGo, true).slice(-3) : [],
                        notPromo: listMap(listWhereToGo), 
                        updList: WhereToGoList.refetch,
                        link: "/where-to-go/",
                    }} />
                </>
            );
        }

        dispatch(setTabs(arrayTabs));
        setPanels(arrayPanels);

        dispatch(setComeBackLink('/mainpage'));
    }, [exList, goList, listEvent]);

    const reset = () => {
        dispatch(resetWhereToGoList([]));
        dispatch(setWhereToGoList([]));
        dispatch(resetExList());
        dispatch(setExcursionList([]));
        dispatch(resetEventList());
        dispatch(setEventList([]));
    }

    const callbackSearchInput = () => {
        dispatch(setCountPage(2));
        dispatch(setCatalogCountPage(2));
        reset();
    }

    const callbackSearchReset = async () => {
        await dispatch(setCountPage(1));
        await dispatch(setCatalogCountPage(1));
        await reset();
        await dispatch(setActiveTab(0));
        excursionList.refetch();
    }
    
    useEffect(()=>{
        dispatch(setHistoryBack(false));
    }, [dispatch]);

    useEffect(() => {
        if(userActive === false) {
            pause();
            dispatch(openModalStay());
        }
    }, [userActive]);

    useEffect(() => {
        if (reservationId > 0) {
            cancelPayment.refetch();
        }
    }, [cancelPayment, reservationId]);

   
    return (
        <>
            <div ref={ref}>
                <Banner data={{
                    searchListUpd:refetch,
                    callbacks: {
                        callbackSearchInput,
                        callbackSearchReset
                    },
                    keyboardCallback: () => {
                        activateUser();
                    }
                }}/>
                <main>
                    { !search ?
                        <CardList data={{
                            excursionList: excursionsArrayPromo,
                            excursionLink: "/excursion/",
                            eventList: listMap(listPromoEvent, true),
                            eventLink: "/events/",
                            whereToGoList: listMap(listPromoWhereToGo),
                            whereLink: "/where-to-go/"
                        }} />
                        :
                        <div className={classes.tabsSearch}>
                            {(exList.length > 0 || goList.length > 0 || listEvent.length > 0) && tabs.length > 0 && (
                                <TabsCard
                                    options={{
                                        tabs,
                                        panels,
                                        noScroll: true
                                    }}
                                    activeTab={tab}
                                />
                            )}
                        </div>
                    }
                    <PopupStay options={{onClose: restartTimer, subtitle: 'Сессия закончится через: '}} />
                    <PopupSearch />
                    <PopupNoResult/>
                </main>
            </div>
        </>
    )
}