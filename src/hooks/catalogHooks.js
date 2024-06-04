import catalogApi from "../api/catalogApi";
import districtApi from "../api/districtApi";
import { useDispatch, useSelector } from "react-redux";
import {
    setCatalogCountPage,
    setDataLocation,
    toggleSearchPopup,
    setFilterObjectsData, 
    setFilterPlacesData,
    setWhereToGoList
} from "../redux/actions";
import { useHandlerErrorsQuery, useCreateMapObject } from "./appHooks";
import { useQuery } from "react-query";
import {
    setExcursionList,
    toggleNoResultPopup,
    unsetClickFilter,
} from "../redux/actions/excursionActions";
import { mappingGroups } from "./excursionHooks";
import DateObject from "react-date-object";
import { setFilterByDateInWork } from "../redux/actions/filterActions";
import moment from "moment";
import { setCatalogCountPageSearch, setEventList } from "../redux/actions/catalogActions";


const useInit = () => {
    const dispatch = useDispatch();
    const handlerErrors = useHandlerErrorsQuery();
    const searchWorking = useSelector((state) => state.excursionManager.search);
    const catalog = new catalogApi();
    const district = new districtApi();
    const arrayCategoryIds = useSelector((state) => state.filter.filterIds);
    const countPage = useSelector((state) => state.catalog.countPage);
    const arrayLocationIds = useSelector((state) => state.select.locationIds);
    const dateList = useSelector((state) => state.calendar.valueList);
    const [createMapObject] = useCreateMapObject();
    const IsFilterByDateWorking = useSelector((state) => state.filter.IsFilterByDateWorking);
    const countPageSearch = useSelector((state) => state.catalog.countPageSearch);
    const isComeBackToList = useSelector((state)=> state.app.comeBackToList);
    const inputSearch = useSelector((state) => state.keyboard.inputSearch);

    return {
        dispatch,
        handlerErrors,
        searchWorking,
        catalog,
        arrayCategoryIds,
        arrayLocationIds,
        countPage,
        countPageSearch,
        district,
        dateList,
        createMapObject,
        IsFilterByDateWorking,
        isComeBackToList,
        inputSearch
    };
};

export const useElementGetById = (eventId, setData) => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "catalog element",
        () => init.catalog.getElementById(eventId),
        {
            onSuccess: ({ data }) => {
                
                if(!init.handlerErrors.error(data, false) && !init.handlerErrors.error(data.result, false)) {
                    if(Array.isArray(data.result) && data.result.length > 0) {
                    // if((Array.isArray(data.result) && data.result.length > 0) || data.result) {
                        const elementData = data.result[0];
                        const image = elementData.PREVIEW_PICTURE ? elementData.PREVIEW_PICTURE : elementData.images[0] && elementData.images[0];
                        const phone = elementData.phone ? elementData.phone.join(' ') : '';
                        
                        init.dispatch(setData(elementData));
 
                        /*Установка точки на карте*/
                        init.dispatch(setFilterObjectsData([]));
                        init.dispatch(setFilterPlacesData([]));
                        init.dispatch(setFilterObjectsData([init.createMapObject(1, elementData.title, image,  elementData.address, elementData.map, phone)]));
                    }
                }
            },
        }
    );

    return { isLoading, error, data, refetch };
}

export const useCatalogList = (categoryId, setList, isEvents = false, enabled = true) => {
    const init = useInit();
    let dateValue = "";
    let dateValueEquals = "";
   
    let orderByDate = false;

    if (isEvents) {
        dateValue = moment().format("DD-MM-YYYY");
        orderByDate = true;
    }

    if (init.dateList !== "") {
        const date = new DateObject(init.dateList._d);
        dateValueEquals = date.format("DD-MM-YYYY");
        dateValue = "";
    }

    const { isLoading, error, data, refetch } = useQuery(
        "catalog list",
        () =>
            init.catalog.getList(
                init.countPage,
                categoryId,
                init.arrayCategoryIds,
                init.arrayLocationIds,
                dateValue,
                dateValueEquals,
                init.inputSearch,
                orderByDate,
                isEvents
            ),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    init.dispatch(setList(data.result, init.IsFilterByDateWorking));
                    init.dispatch(setFilterByDateInWork(false));
                    if (data.hasOwnProperty("next")) {
                        init.dispatch(setCatalogCountPage(data.next));
                    }
                    init.dispatch(toggleSearchPopup(false)); 
                    return;
                }
                
            },
            enabled
        }
    );

    return { isLoading, error, data, refetch };
};

export const useWhereToGoList = () => {
    const init = useInit();
   
    const { isLoading, error, data, refetch } = useQuery(
        "catalog where to go list",
        () =>
            init.catalog.getList(init.countPage, 101, [], [], '', '', init.inputSearch),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    init.dispatch(setWhereToGoList(data.result, init.IsFilterByDateWorking));
                    init.dispatch(setFilterByDateInWork(false));
                    if (data.hasOwnProperty("next")) {
                        init.dispatch(setCatalogCountPage(data.next));
                    }
                    return;
                }
            },
            enabled: false
        }
    );

    return { isLoading, error, data, refetch };
};

export const useCatalogListMainpage = () => {
    const init = useInit();
    
    const get = async (categoryId, setList) => {
        const result = await init.catalog.getList(
            init.countPage,
            categoryId,
            init.arrayCategoryIds,
            init.arrayLocationIds,
        );

        if (result.data.result) {
            if (!init.searchWorking) {
                let isSearch = false;

                init.dispatch(setList(result.data.result, isSearch));
            }
        }
        return result;
    }

    return {get};
};

export const useCatalogListPromo = (categoryId, setPromoList) => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "catalog list promo",
        () => init.catalog.getListByPromo(init.countPage, categoryId),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    init.dispatch(setPromoList(data.result.items));
                }
            },
        }
    );

    return { isLoading, error, data, refetch };
};

export const useSearchInCatalogList = (categoryId, string, setList, isEvent = false) => {
    const init = useInit();
    let dateValue = "";
    if(isEvent) {
        dateValue = moment().format("DD-MM-YYYY");
    }

    const { isLoading, error, data, refetch } = useQuery(
        "search catalog",
        () => init.catalog.searchInCatalogByName(string, categoryId, init.countPageSearch, dateValue),
        {
            onSuccess: async ({ data }) => {
                const res =
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false);

                if (res && Array.isArray(data.result)) {
                    init.dispatch(setList(data.result));
                    if (data.hasOwnProperty("next")) {
                        init.dispatch(setCatalogCountPageSearch(data.next));
                    }
                }

                init.dispatch(toggleSearchPopup(false));
                init.dispatch(unsetClickFilter());
            },
            enabled: false,
        }
    );

    return {
        isLoading,
        error,
        data,
        excursionManager: init.exManager,
        refetch,
        dispatch: init.dispatch,
    };
};

export const useGetDistricts = (districtType) => {
    const init = useInit();
    const locations = useSelector(state => state.select.popupDataLocation);
    const { isLoading, error, data, refetch } = useQuery(
        "locations catalog",
        () => init.district.getList(districtType),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    const hasActive = locations.some((location) => {
                        return location.active;
                    });
                    if(!hasActive) {
                        init.dispatch(setDataLocation(mappingGroups(data.result, false, false)));
                    }
                }
            },
        }
    );

    return { isLoading, error, data, refetch };
};


export const useGlobalSearch = (q) => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "global search",
        () =>  init.catalog.globalSearch(q.trim()),
        {
            onSuccess: async ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    const searchRes = data.result;
                    const {events, excursions, whereToGo} = searchRes;

                    let excursionList = [];
                    let eventList = [];
                    let whereToGoList = [];
                    
                    if(Object.values(excursions).length > 0) {
                        delete excursions.next;
                        delete excursions.total;
                        excursionList = Object.values(excursions);
                        if(!excursionList.includes('Page not found') || !excursionList.includes(null)) {
                            excursionList = excursionList.filter((item) => {
                                if(!item.isPromo) {
                                    return item;
                                }
                            });
                            
                            init.dispatch(setExcursionList(excursionList));
                        }
                    }
                    
                    if(!whereToGo.error) {
                        delete whereToGo.next;
                        delete whereToGo.total;
                        eventList = Object.values(whereToGo);
                        init.dispatch(setWhereToGoList(eventList));
                    }

                    if(!events.error) {
                        delete events.next;
                        delete events.total;
                        whereToGoList = Object.values(events);
                        init.dispatch(setEventList(whereToGoList));
                    }

                    if((excursions.error || excursionList <= 0) && (events.error || eventList.length <= 0) && (whereToGo.error || whereToGoList.length <= 0)) {
                       init.dispatch(toggleNoResultPopup(true));      
                    }
                }
            },
            enabled: false
        }
    );

    return {
        isLoading, 
        error, 
        data, 
        refetch
    };
}