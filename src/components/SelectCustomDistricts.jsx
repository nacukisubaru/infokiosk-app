/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { 
    checkActiveOption, 
    checkLocationIds, 
    closeSelectLocation, 
    openSelectLocation, 
    resetLocation, 
    resetLocationIds, 
    setActiveOptionLocation, 
    setSelectData, 
    setSelectFilterId, 
    setValueSelectLocation, 
    toggleSearchPopup 
} from "../redux/actions";
import { setClickFilter, toggleNoResultPopup, unsetClickFilter } from "../redux/actions/excursionActions";

/*MUI*/
import { Box } from "@mui/system";

/*COMPONENTS*/
import SelectCustom from "./SelectCustom";

export default function SelectCustomDistricts({data, userActiveCallback = () => {}, small}) {
    const dispatch = useDispatch();

    const openLocation = useSelector(state => state.select.openSelectLocation);
    const popupDataLocation = useSelector(state => state.select.popupDataLocation);
    const locationIds = useSelector(state => state.select.locationIds);

    const itemsActive = popupDataLocation.filter(item => {
        for (let i = 0; i < locationIds.length; i++) {
            if (item.id === locationIds[i]) {
                return item;
            }                       
        }
        return false; 
    });
    const valueLocation = itemsActive.map(item => item.option);

    const selectLoc = {
        label: '',
        value: valueLocation.join(', ') || 'Все локации',
        placeholder: '',
        popupData: {
            title: 'Выберите локацию',
            allLocationValue: 'Все локации',
            body: popupDataLocation,  
            open: openLocation,
            handlerOpen: () => {
                dispatch(setSelectData(selectLoc.popupData));
                dispatch(openSelectLocation());
            },
            handlerClose: () => {
                dispatch(closeSelectLocation());
                dispatch(setValueSelectLocation('')); 
                dispatch(checkLocationIds()); 
            },
            optionHandler: (id, value) => {                
                dispatch(setActiveOptionLocation(id));                
                dispatch(setValueSelectLocation(value));
                dispatch(checkActiveOption());      
            },
            resetHandler: async () => {
                dispatch(resetLocation()); 
            },
            resetBtnFilterHandler: async () => {
                dispatch(resetLocation());
                dispatch(resetLocationIds());    
                await data.callback && data.callback();
                dispatch(closeSelectLocation());
                data.reset && await data.reset();
                data.list && await data.list.refetch();  
                dispatch(unsetClickFilter());
            },
            allLocation: useSelector(state => state.select.allLocation),
            searchHandler: async () => {
                dispatch(closeSelectLocation());
                dispatch(toggleSearchPopup(true));          
                dispatch(setClickFilter()); 
                await dispatch(setSelectFilterId());
                await data.callback && data.callback();
                data.reset && await data.reset();
                if(data.list)  {
                    const result = await data.list.refetch();
                    if(result.data.data.result.hasOwnProperty('error')) {
                        dispatch(toggleNoResultPopup(true));
                    }
                }
            }
        }
    }

    return (<>
        <Box sx={{flex: '1'}}>
            <SelectCustom data={ selectLoc } userActiveCallback={userActiveCallback} small/>
        </Box>
    </>)
}