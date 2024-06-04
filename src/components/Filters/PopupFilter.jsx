/*REACT*/
import React from "react";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import {
    closeModalFilter,
    resetFilter,
    setActiveFilter,
    toggleSearchPopup,
    setActiveNestedFilter,
    setAllActiveNestedFilters,
    addParentFilter,
    disableAllNestedFilters,
    activeParentNestedFilters,
    disableParentFilter,
    resetParentsFiltersNested,
    setFilterPopupId,
    setFilterCommonId,
    deactivateFilter,
} from "../../redux/actions";
import {
    toggleNoResultPopup,
    unsetClickFilter,
} from "../../redux/actions/excursionActions";
import { setDisableFilter, setTagFiltered } from "../../redux/actions/filterActions";


/*MUI*/
import { Modal, Slide, Box, Typography, Stack, Button, Grid, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*IMAGES*/
import SvgClose from "../Icons/SvgClose";

export const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        top: "500px",
        left: "0",
        bottom: "0",
        width: "100%",
        background: theme.palette.background.default,
        borderRadius: "50px 50px 0 0",
        border: 'none',
        outline: 'none'
    },
    modalHeader: {
        padding: "50px 50px 40px",
    },
    modalClose: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: theme.palette.primary.grey,
        cursor: "pointer",
        marginLeft: "auto",
        "& svg": {
            fill: theme.palette.primary.main,
        },
    },
    modalBody: {
        height: "calc(100% - 230px)",
        padding: "0 50px 50px",
        overflowX: "hidden",
        overflowY: "scroll",
        textAlign: "center",
        "&::-webkit-scrollbar": {
            width: "11px",
            background: "#F4F4F4",
            borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.primary.main,
            borderRadius: "10px",
        },
    },
    modalFooter: {
        marginTop: 80,
    },
    filterWrap: {
        marginBottom: theme.spacing(6),
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

export default function PopupFilter({ data, callback, callbacks, userActiveCallback = ()=>{} }) {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.filter.openFilter);
    const allCategory = useSelector((state) => state.filter.allCategory);
    const filterIds = useSelector((state) => state.filter.filterIds);
    const filterNestedParentsIds = useSelector((state) => state.filter.filterNestedParentsIds);

    const handleClose = () => {
        dispatch(closeModalFilter(false));
        if (!data.isNestedFilter) {
            dispatch(deactivateFilter());
            dispatch(setFilterPopupId(''));
        }        
        dispatch(setTagFiltered(false));
    }

    const handleClickChip = async (id) => {
        if (data.isNestedFilter) {
            await dispatch(setActiveNestedFilter(id));
            return;
        } else {
            await dispatch(setActiveFilter(id));
            await dispatch(setFilterPopupId(id));          
        }
        await callbacks.callbackPopupClickChip();
    };

    const resetFilterHandler = async () => {
        if (data.isNestedFilter) {
            await dispatch(resetParentsFiltersNested());
            await dispatch(setAllActiveNestedFilters());
            await dispatch(setDisableFilter(false));
        } else {
            await dispatch(resetFilter());
            dispatch(setFilterPopupId(''));
        }

        await callbacks.callbackPopupResetFilter();        
        callback();
    };

    const resetBtnFilterHandler = async () => {
        await dispatch(toggleSearchPopup(true));
        if (data.isNestedFilter) {
            await dispatch(resetParentsFiltersNested());
            await dispatch(setAllActiveNestedFilters());
            await dispatch(setDisableFilter(false));
        } else {
            await dispatch(resetFilter());
            dispatch(setFilterPopupId(''));
        }

        await callbacks.callbackPopupResetBtnFilter();
        dispatch(closeModalFilter(false));
        await data.excursions.refetch();
        await dispatch(toggleSearchPopup(false));
        dispatch(unsetClickFilter());        
        callback();
    };

    const searchHandler = async () => {
        if (!data.isNestedFilter) {
            dispatch(setFilterCommonId());
            dispatch(setFilterPopupId(''));
        }        
        await callbacks.callbackSearchPopup();
        dispatch(closeModalFilter(false));
        dispatch(toggleSearchPopup(true));
        const result = await data.excursions.refetch();
        await dispatch(toggleSearchPopup(false));
        if (result.data.data.result.hasOwnProperty("error")) {
            dispatch(toggleNoResultPopup(true));
        }
        callback();
    };

    const classes = useStyles();
    const dataFilter = data.isNestedFilter
        ? data.filter.filterTagsWithChildren
        : data.filter.filter;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={userActiveCallback}
        >
            <Slide
                direction="up"
                in={open}
                timeout={500}
                mountOnEnter
                unmountOnExit
            >
                <Box className={classes.modal}>
                    <Box className={classes.modalHeader}>
                        <div
                            className={classes.modalClose}
                            onClick={handleClose}
                        >
                            <SvgClose />
                        </div>
                    </Box>

                    <Box className={classes.modalBody}>
                        {!data.isNestedFilter && (
                            <Box>
                                <Typography variant="h4" mb={20}>
                                    Выберите категорию
                                </Typography>
                                <Grid
                                    container
                                    rowSpacing={5}
                                    columnSpacing={4.5}
                                    className={classes.filterWrap}
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
                                    {dataFilter.map((data) => {
                                        return (
                                            <Grid
                                                item
                                                key={
                                                    data.ID +
                                                    new Date().getSeconds()
                                                }
                                            >
                                                <Chip
                                                    label={data.NAME}
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handleClickChip(data.ID)
                                                    }
                                                    className={
                                                        data.active
                                                            ? classes.filterButtonActive
                                                            : classes.filterButton
                                                    }
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        )}

                        {data.isNestedFilter && (
                            <Box>
                                <Typography variant="h4" mb={20}>
                                    Выберите категорию
                                </Typography>
                                <Grid
                                    container
                                    rowSpacing={5}
                                    columnSpacing={4.5}
                                    className={classes.filterWrap}
                                    sx={{marginBottom: '80px !important'}}
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
                                    {data.filter.filter.map((data) => {
                                        return (
                                            <Grid
                                                item
                                                key={
                                                    data.ID +
                                                    new Date().getSeconds()
                                                }
                                            >
                                                <Chip
                                                    label={data.TEXT}
                                                    variant="outlined"
                                                    onClick={async () => {
                                                        if (data.active && filterNestedParentsIds.length === 1) {
                                                            await dispatch(resetParentsFiltersNested());
                                                            await dispatch(setAllActiveNestedFilters());
                                                            await dispatch(setDisableFilter(false));
                                                            await callbacks.callbackPopupResetFilter();        
                                                            callback();
                                                        } else {
                                                            await dispatch(disableAllNestedFilters());
                                                            await dispatch(addParentFilter(data.ID));
                                                            await dispatch(activeParentNestedFilters());
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
                                    })}
                                </Grid>
                            </Box>
                        )}

                        {data.isNestedFilter &&
                            dataFilter.map((data) => {
                                return (
                                    <Box
                                        key={data.ID + new Date().getSeconds()}
                                    >
                                        <Typography variant="h4" mb={20}>
                                            {data.TEXT}
                                        </Typography>
                                        <Grid
                                            container
                                            rowSpacing={5}
                                            columnSpacing={4.5}
                                            className={classes.filterWrap}
                                            sx={{marginBottom: '80px !important'}}
                                        >
                                            {data.PARAMS.map((param) => {
                                                return (
                                                    <Grid
                                                        item
                                                        key={
                                                            param.ID +
                                                            new Date().getSeconds()
                                                        }
                                                    >
                                                        <Chip
                                                            label={param.TEXT}
                                                            variant="outlined"
                                                            onClick={async () => {
                                                                if (param.active && filterIds.length === 1) {                                         
                                                                    await dispatch(resetParentsFiltersNested());
                                                                    await dispatch(setAllActiveNestedFilters());
                                                                    await dispatch(setDisableFilter(false));
                                                                    await callbacks.callbackPopupResetFilter();        
                                                                    callback();
                                                                } else {
                                                                    await dispatch(disableAllNestedFilters());
                                                                    await dispatch(disableParentFilter(data.ID));
                                                                    await handleClickChip(param.ID);
                                                                }                                                                
                                                            }}
                                                            className={
                                                                param.active
                                                                    ? classes.filterButtonActive
                                                                    : classes.filterButton
                                                            }
                                                        />
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </Box>
                                );
                            })}

                        <Stack
                            spacing={5}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.modalFooter}
                        >
                            <Button
                                variant="outlined"
                                onClick={resetBtnFilterHandler}
                            >
                                <Typography variant="button2">
                                    Сбросить
                                </Typography>
                            </Button>
                            <Button variant="contained" onClick={searchHandler}>
                                <Typography variant="button2">
                                    Применить
                                </Typography>
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
}
