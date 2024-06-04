import { useSelector, useDispatch } from "react-redux";
import { setComeBackToList, setFilterList } from "../redux/actions";
import { useHandlerErrorsQuery } from "./appHooks";
import { useQuery } from "react-query";

export const useFilterList = (callback, arrayParse = false, changeKeys = false) => {
    const dispatch = useDispatch();
    const handlerErrors = useHandlerErrorsQuery();
    const isComeBackToList = useSelector(state => state.app.comeBackToList);
    const filter = useSelector(state => state.filter.filterArray);
    const { isLoading, error, data, refetch } = useQuery(
        "filter type list",
        () => callback(),
        {
            onSuccess: ({ data }) => {
                if (!handlerErrors.error(data, false) && !handlerErrors.error(data.result, false)) {  
                    if(!isComeBackToList) {                        
                        let values = data.result;
                        if(arrayParse) {
                          values = Object.values(data.result);
                        }
                        if(changeKeys) {
                            values = values.map((item) => {
                                return {ID: item.id, NAME: item.name, SHOW_IN_FILTER: item.showInFilter, SHOW_IN_PAGE: item.showInPage};
                            })
                        }
                        dispatch(setFilterList(values));   
                    }
                    dispatch(setComeBackToList(false));
                }
            },
        }
    );

    return {
        isLoading,
        error,
        data,
        filter: filter,
        refetch,
        dispatch,
    };
};