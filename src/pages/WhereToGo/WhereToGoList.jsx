/*REACT*/
import React, { useEffect } from "react";

/*REDUX*/
import { useSelector, useDispatch } from "react-redux";
import {
    resetWhereToGoList,
    setWhereToGoList,
    setCatalogCountPage,
    setPromoWhereToGoList,
    setComeBackLink,
    resetExList,
    openModalStay,
} from "../../redux/actions";
import { setCountPage, setExcursionList, setHistoryBack } from "../../redux/actions/excursionActions";

/*HOOKS*/
import {useFilterList} from "../../hooks/whereToGoHooks";
import { useCatalogList, useCatalogListPromo, useGetDistricts } from "../../hooks/catalogHooks";
import { useSettingBannerTerminal } from "../../hooks/useSetting";
import { useCheckActiveUserInApp } from "../../hooks/appHooks";

/*HELPERS*/
import { listMap } from "../../helpers/arrayHelper";
import catalogApi from "../../api/catalogApi";

/*MUI*/
import { Container } from "@mui/material";

/*COMPONENTS*/
import PopupStay from "../../components/PopupStay";
import Banner from "../../components/Banner";
import CardSmallList from "../../components/ListExcursions/CardSmallList";
import Filter from "../../components/Filters/Filter";
import PopupSearch from "../../components/ListExcursions/PopupSearch";
import Loading from "../../components/Loading";
import SelectCustomDistricts from "../../components/SelectCustomDistricts";

export default function WhereToGoList() {
    const catalog = new catalogApi();
    const dispatch = useDispatch();
    const {ref, userActive, activateUser, pause, restartTimer} = useCheckActiveUserInApp(300000);

    const categoryId = catalog.CATEGORY_WHERE_TO_GO;    
    const setList = (list) => {return setWhereToGoList(list)};
    const setPromoList = (list) => {return setPromoWhereToGoList(list)};
    const whereToGoList = useCatalogList(categoryId, setList);    
    const whereToGoListPromo = useCatalogListPromo(categoryId, setPromoList);
    const filterList = useFilterList();

    const list = useSelector((state) => state.catalog.whereToGoList);
    const listPromo = useSelector((state) => state.catalog.whereToGoListPromo);    
    
    useGetDistricts('WHERE_TO_GO');
    useSettingBannerTerminal();

    const listOptions = {
        notPromo: listMap(list, false, true),
        updList: whereToGoList.refetch,
        link: "/where-to-go/",
    };

    if (listPromo.length > 0) {
        listOptions.isPromo = listMap(listPromo, true, true).slice(-3);
    }

    const resetPage = async () => await dispatch(setCatalogCountPage(1));

    const resetList = async () => await dispatch(resetWhereToGoList());

    const callbackClickChip = async () => {
        await dispatch(resetWhereToGoList());
        await dispatch(setCatalogCountPage(1));
    }

    const callbackResetFilter = async () => {
        await dispatch(setWhereToGoList([]));
        await dispatch(setCatalogCountPage(1));
        await dispatch(resetWhereToGoList());
    }

    const callbackPopupClickChip = async () => await dispatch(setCatalogCountPage(1));

    const callbackPopupResetFilter = async () => await dispatch(setCatalogCountPage(1));

    const callbackPopupResetBtnFilter = async () => {
        await dispatch(resetWhereToGoList());
        await dispatch(setWhereToGoList([]));
        await dispatch(setCatalogCountPage(1));
    }

    const callbackSearchPopup = async () => {
        await dispatch(resetWhereToGoList());
        await dispatch(setWhereToGoList([]));
        await dispatch(setCatalogCountPage(1));
    }

    const callbackSearchInput = async () => {
        await dispatch(resetWhereToGoList());
        await dispatch(setWhereToGoList([]));
    }

    useEffect(()=>{
        dispatch(setComeBackLink(''));
        dispatch(setCountPage(1));
        dispatch(resetExList());
        dispatch(setExcursionList([]));
        dispatch(setHistoryBack(false));
    }, [dispatch]);
    
    useEffect(() => {
        if(userActive === false) {
            pause();
            dispatch(openModalStay());
        }
    }, [userActive]);

    return (
        <>
            <div ref={ref}>
                <Banner
                    data={{
                        searchListUpd: whereToGoList.refetch,
                        commonListUpd: whereToGoList.refetch,
                        callbacks: {
                            callbackSearchInput
                        },
                        keyboardCallback: () => {
                            activateUser();
                        }
                    }}
                ></Banner>
                {whereToGoList.isLoading || whereToGoListPromo.isLoading ? (
                    <Loading />
                ) : (
                    <main>
                        <Container
                            maxWidth="md"
                            sx={{ paddingTop: "30px", paddingBottom: "20px" }}
                        >
                            <Filter
                                options={{
                                    list: whereToGoList,
                                    filter: filterList,
                                    isNestedFilter: true,
                                    maxWidthTags: 1000,
                                    callbacks: {
                                        callbackClickChip,
                                        callbackResetFilter,
                                        callbackPopupClickChip,
                                        callbackPopupResetFilter,
                                        callbackPopupResetBtnFilter,
                                        callbackSearchPopup,
                                        resetList,
                                        resetPage
                                    }
                                }}
                                userActiveCallback={activateUser}
                            ></Filter>
                            <SelectCustomDistricts
                                data={{
                                    list: whereToGoList,
                                    callback: resetPage,
                                    reset: resetList,
                                }}
                                userActiveCallback={activateUser}
                                small
                            ></SelectCustomDistricts>
                        </Container>
                        <CardSmallList data={listOptions} />
                        <PopupSearch />
                        <PopupStay options={{onClose: restartTimer, subtitle: 'Сессия закончится через: '}}></PopupStay>
                    </main>
                )}
            </div>
        </>
    );
}
