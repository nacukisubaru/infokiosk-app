import { useDispatch, useSelector } from "react-redux";
import catalogApi from "../api/catalogApi"
import { useQuery } from "react-query";
import { useHandlerErrorsQuery } from "./appHooks";
import { activeParentNestedFilters, setAllActiveNestedFilters, setComeBackToList, setFilterNestedData,  setFilterObjectsData, setFilterPlacesData,  setPromoWhereToGoList, setWhereToGo } from "../redux/actions";
import { useCreateMapObject } from "./appHooks";
import * as uuid from 'uuid';

const useInit = () => {
    const dispatch = useDispatch();
    const catalog = new catalogApi();
    const handlerErrors = useHandlerErrorsQuery();
    const countPage = useSelector(state => state.catalog.countPage);
    const [createMapObject] = useCreateMapObject();
    const filter = useSelector(state => state.filter.filterNestedArray);
    const filterWithoutChild = getFilterTagsWithoutChildren(useSelector(state => state.filter.filterNestedArray));
    const filterTagsWithChildren = getFilterTagsWithChildren(useSelector(state => state.filter.filterNestedArray));
    const arrayCategoryIds = useSelector(state => state.filter.filterIds);
    const arrayLocationIds = useSelector(state => state.select.locationIds);
    const searchWorking = useSelector(state => state.excursionManager.search);
    const clippedFilters = useSelector(state => state.filter.clippedFilters);
    const isComeBackToList = useSelector(state => state.app.comeBackToList);
    const categoryId = useSelector(state => state.catalog.categoryId);
    const category = arrayCategoryIds.length > 0 ? arrayCategoryIds : categoryId;

    return {
        dispatch, 
        catalog, 
        countPage, 
        handlerErrors, 
        createMapObject,
        categoryId, 
        filter,
        filterWithoutChild,
        filterTagsWithChildren,
        arrayCategoryIds,
        category,
        arrayLocationIds,
        searchWorking,
        clippedFilters,
        isComeBackToList
    }
}

export const getFilterTagsWithoutChildren = (list) => {
    return list.filter((element) => {
         if(element.PARAMS.length <= 0) {
             return element;
         }
     });
 }
 
export const getFilterTagsWithChildren = (list) => {
    return list.filter((element) => {
        if(element.PARAMS.length > 0) {
            return element;
        }
    });
}

export const setAllCategoryInArray = (array) => {
    array.map((item) => {
        if(item.PARAMS.length > 0) {
            item.PARAMS.splice(0, 0, {ID: uuid.v4(), PARENT_ID: item.ID, TEXT: "Все", active: true, isAll: true});
        }
    });
}

export const useWhereToGoGetById = (whereToGoId) => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "where to go element",
        () => init.catalog.getElementById(whereToGoId),
        {
            onSuccess: ({ data }) => {
                if(!init.handlerErrors.error(data, false) && !init.handlerErrors.error(data.result, false)) {
                    if(Array.isArray(data.result) && data.result.length > 0) {
                        const whereToGoData = data.result[0];
                        const image = whereToGoData.PREVIEW_PICTURE ? whereToGoData.PREVIEW_PICTURE : whereToGoData.images[0] && whereToGoData.images[0];
                        const phone = whereToGoData.phone ? whereToGoData.phone.join(' ') : '';

                        init.dispatch(setWhereToGo(whereToGoData));
     
                        /*Установка точки на карте*/
                        init.dispatch(setFilterObjectsData([]));
                        init.dispatch(setFilterPlacesData([]));
                        init.dispatch(setFilterObjectsData([init.createMapObject(1, whereToGoData.title, image,  whereToGoData.address, whereToGoData.map, phone)]));
                    }
                }
            },
        }
    );

    return { isLoading, error, data, refetch };
}

export const useWhereToGoListPromo = () => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "where to go list promo",
        () => init.catalog.getListByPromo(init.countPage, 101),
        {
            onSuccess: ({ data }) => {
                if(!init.handlerErrors.error(data, false) && !init.handlerErrors.error(data.result, false)) {
                    init.dispatch(setPromoWhereToGoList(data.result.items));
                }
            },
        }
    );

    return { isLoading, error, data, refetch };
}

export const useFilterList = () => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "where to go filter",
        () => init.catalog.getCategoriesWhereToGo(),
        {
            onSuccess: async ({ data }) => {
                if(!init.handlerErrors.error(data, false) && !init.handlerErrors.error(data.result, false)) {
                    // console.log(init.isComeBackToList);
                    if(!init.isComeBackToList) {
                        const arrayFilters = Object.values(data.result);
                        setAllCategoryInArray(arrayFilters);
                        await init.dispatch(setFilterNestedData(arrayFilters));
                        // await init.dispatch(setAllActiveNestedFilters());
                    }

                    init.dispatch(setComeBackToList(false));
                }
            },
        }
    );

    return {
        isLoading, 
        error, 
        data, refetch,
        filter: init.filter,
        filterWithoutChild: init.filterWithoutChild,
        filterTagsWithChildren: init.filterTagsWithChildren
    };
}