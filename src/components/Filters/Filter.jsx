/*REACT*/
import React, { useEffect, useRef, useState } from "react";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import {
    openModalFilter,
    setActiveFilter,
    resetFilter,
    toggleSearchPopup,
    setActiveNestedFilter,
    setAllActiveNestedFilters,
    setClippedFilter,
    disableAllNestedFilters,
    addParentFilter,
    activeParentNestedFilters,
    resetParentsFiltersNested,
    activeFilterBtnMore,
    setFilterId,
} from "../../redux/actions";
import {
    toggleNoResultPopup,
    unsetClickFilter,
} from "../../redux/actions/excursionActions";
import { setDisableFilter, setTagFiltered } from "../../redux/actions/filterActions";

/*HELPERS*/
import { filterActiveCount, getHtmlElementsWithFilter } from "../../helpers/filterHelper";
import { sortArray, arrayUnique } from "../../helpers/arrayHelper";

/*MUI*/
/*MUI*/
import { Grid, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*COMPONENTS*/
import PopupFilter from "./PopupFilter";
import PopupNoResult from "../ListExcursions/PopupNoResult";

export const useStyles = makeStyles((theme) => ({
    filterWrap: {
        maxHeight: 135,
        overflow: "hidden",
        marginBottom: theme.spacing(7.5),
    },
    filterButton: {
        border: "none",
        borderRadius: "25px",
        padding: "12px 6px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "600",
        lineHeight: "1.2",
        height: "46px",
        background: theme.palette.primary.grey,
        "&:hover": {
            background: theme.palette.primary.grey,
        },
    },
    filterButtonActive: {
        border: "none",
        borderRadius: "25px",
        padding: "12px 6px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "600",
        lineHeight: "1.2",
        height: "46px",
        background: theme.palette.primary.main,
        color: theme.palette.text.white,
        "&.MuiChip-clickable:hover": {
            background: theme.palette.primary.main,
        },
    },
}));

export default function Filter({ options, userActiveCallback = ()=>{} }) {
    const filterList = options.filter;
    const callbackClickChip = options.callbacks.callbackClickChip;
    const callbackResetFilter = options.callbacks.callbackResetFilter;

    const classes = useStyles();
    const filterWrap = useRef(null);
    const dispatch = useDispatch();    
    const [filterTags, setFilterTags] = useState([]);
    const isTagFiltered = useSelector((state) => state.filter.isTagFiltered);
    const allCategory = useSelector((state) => state.filter.allCategory);
    const filterNestedArray = useSelector((state) => state.filter.filterNestedArray);
    const clippedFilters = useSelector((state) => state.filter.clippedFilters);
    const filters = useSelector((state) => state.filter.filterArray);
    const filterIds = useSelector((state) => state.filter.filterIds);
    let countActive = 0;
    let filterData = filterList.filter;  

    if (options.isNestedFilter) {
        countActive = filterActiveCount(filterNestedArray, clippedFilters);
    } else {
        countActive = filterActiveCount(filters, clippedFilters);
    }

    const handleOpen = () => dispatch(openModalFilter());

    const handleClickChip = async (id) => {
        if (options.isNestedFilter) {
            await dispatch(setActiveNestedFilter(id));
        } else {            
            await dispatch(setActiveFilter(id));
            await dispatch(setFilterId(id));            
        }
        await callbackClickChip();
        await dispatch(toggleSearchPopup(true));
        const result = await options.list.refetch();
        dispatch(toggleSearchPopup(false));
        if (result.data.data.result.hasOwnProperty("error")) {
            dispatch(toggleNoResultPopup(true));
        }
        dispatch(setTagFiltered(false));          
    };

    const resetFilterHandler = async () => {
        if (options.isNestedFilter) {
            await dispatch(resetParentsFiltersNested());
            await dispatch(setAllActiveNestedFilters());
            await dispatch(setDisableFilter(false));
        } else {
            await dispatch(resetFilter());
        }
        await callbackResetFilter();
        await dispatch(toggleSearchPopup(true));
        await options.list.refetch();
        dispatch(toggleSearchPopup(false));
        dispatch(activeFilterBtnMore(false));
        dispatch(unsetClickFilter());
        dispatch(setTagFiltered(false));  
    };

    const modalSearchCallback = () => dispatch(setTagFiltered(false));

    const checkWidth = () => {
        let elements = [];
        let arrayWidth = [];
        let shortFilterList = [];
        let uniqueFilterList = [];

        const filterShowPage = filterList.filter.filter((item) => item.SHOW_IN_PAGE);
        if(filterShowPage.length > 0) filterData = sortArray(filterShowPage);

        if (options.isNestedFilter) {
            if (filterWrap.current) {
                elements = filterWrap.current.children;
    
                [...elements].forEach((el) => {
                    arrayWidth.push(el.clientWidth);
                });
            } 
            shortFilterList = arraySum(arrayWidth, filterData, true);
        } else {
            elements = getHtmlElementsWithFilter(filterData, filterWrap.current);
            [...elements].forEach((el) => {
                arrayWidth.push(el.clientWidth);
            });
            shortFilterList = arraySum(arrayWidth, filterData, false);
        }
         
        uniqueFilterList = arrayUnique(shortFilterList);
        setFilterTags(uniqueFilterList);
        dispatch(setTagFiltered(true));
        dispatch(setClippedFilter(shortFilterList));
    };

    const arraySum = (arrayWidth, elements, clipArrayWidth) => {
        let sum1 = 0;
        let sum2 = 0;
        let arrayEl = [];
        let arrayEl1 = [];
        let arrayEl2 = [];

        if (clipArrayWidth) {
            arrayWidth.shift(); //удаляем ширину Всех категорий
            arrayWidth.pop(); //удаляем ширину Ещё
        }

        //для первой строки
        for (let i = 0; i < arrayWidth.length; i++) {            
            for (let j = 0; j < elements.length; j++) {
                const width1 = 794; //988 - ширина Все категории (194)

                sum1 += arrayWidth[j];
                if (sum1 < width1) {
                    arrayEl1.push(elements[j]);
                }
            }
        }

        //для второй строки
        const newArr = arrayWidth.slice(arrayEl1.length);
        const newArrEl = elements.slice(arrayEl1.length);

        for (let i = 0; i < newArr.length; i++) {            
            for (let j = 0; j < newArrEl.length; j++) {
                const width2 = 878; //988 - ширина Ещё (110)

                sum2 += newArr[j];
                if (sum2 < width2) {
                    arrayEl2.push(newArrEl[j]);
                }
            }
        }

        arrayEl = [...arrayEl1, ...arrayEl2];
        return arrayEl;
    };

    const filterOptions = {
        filter: filterList,
        excursions: options.list,
    };
    if (options.isNestedFilter) {
        filterOptions.isNestedFilter = true;
    }

    const setAllActive = () => dispatch(setAllActiveNestedFilters());

    const callbackNoResult = {modalSearchCallback};
    
    if (options.callbacks && options.callbacks.resetList) {
        callbackNoResult.resetList = options.callbacks.resetList;
    }
    if (options.callbacks && options.callbacks.resetPage) {
        callbackNoResult.resetPage = options.callbacks.resetPage;
    }
    if (options.isNestedFilter) {
        callbackNoResult.resetFilter = setAllActive;
    }

    // Тэги по умолчанию из useFilterList
    useEffect(() => {
        if (!filterList.isLoading) {
            setFilterTags(filterData);
        }
    }, [filterList.isLoading, filterData]);

    // Проверка ширины тэгов и обрезание их количества до указанной ширины, при срабатывании событий
    useEffect(() => {
        if (filterTags.length && isTagFiltered === false) {
            setTimeout(checkWidth, 200);            
        }        
    }, [
        filterTags,
        isTagFiltered,
        handleClickChip,
        resetFilterHandler,
        modalSearchCallback,
    ]);

    const handlerNestedFilters = async (parentId) => {
        if (options.isNestedFilter) {
            await dispatch(disableAllNestedFilters());
            await dispatch(addParentFilter(parentId));
            await dispatch(activeParentNestedFilters());
        }
    };
// console.log('filterIds', filterIds);
// console.log(countActive);
    return (
        <>
            <Grid
                container
                rowSpacing={5}
                columnSpacing={4.5}
                className={classes.filterWrap}
                ref={filterWrap}
            >
                <Grid item>
                    <Chip
                        label="Все категории"
                        variant="outlined"
                        onClick={resetFilterHandler}
                        className={
                            allCategory
                                ? classes.filterButtonActive
                                : classes.filterButton
                        }
                    />
                </Grid>
                {!filterList.isLoading && filterTags
                    ? filterTags.map((data) => {
                          return (
                              <Grid item key={data.ID}>
                                  <Chip
                                      label={
                                          options.isNestedFilter
                                              ? data.TEXT
                                              : data.NAME
                                      }
                                      variant="outlined"
                                      onClick={async () => {
                                        if (data.active && filterIds.length === 1) {
                                            await resetFilterHandler();
                                        } else {
                                            if (options.isNestedFilter) {
                                                await handlerNestedFilters(data.ID);
                                            }
                                            await handleClickChip(data.ID);
                                        }                                          
                                      }}
                                      className={
                                          data.active
                                              ? classes.filterButtonActive
                                              : classes.filterButton
                                      }
                                  />
                              </Grid>
                          );
                      })
                    : null}
                <Grid item>
                    <Chip
                        label={countActive ? "+ Ещё " + countActive : "+ Ещё "}
                        variant="outlined"
                        onClick={handleOpen}
                        className={
                            countActive > 0
                                ? classes.filterButtonActive
                                : classes.filterButton
                        }
                    />
                </Grid>
            </Grid>
            {!filterList.isLoading && (
                <PopupFilter
                    data={filterOptions}
                    callback={modalSearchCallback}
                    callbacks={options.callbacks}
                    userActiveCallback={userActiveCallback}
                />
            )}
            <PopupNoResult
                data={{ excursionList: options.list }}
                callback={callbackNoResult}
            />
        </>
    );
}