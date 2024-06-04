/*REACT*/
import React from "react";

/*REDUX*/
import { useDispatch } from "react-redux";
import { setPageMapActive } from "../../redux/actions";

/*MUI*/
import { Box, Container, Modal, Slide, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*COMPONENTS*/
import SelectionOptions from "./SelectionOptions";
import TabsCard from "../TabsCard";
import MapYandex from "../MapYandex";
import SvgClose from "../Icons/SvgClose";

export const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        top: "500px",
        left: "0",
        bottom: "0",
        width: "100%",
        background: theme.palette.background.default,
        boxShadow: "1px 1px 6px rgba(0, 0, 0, 0.45)",
        borderRadius: "50px 50px 0 0",
        border: 'none',
        outline: 'none'
    },
    modalHeader: {
        padding: "50px 50px 10px",
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
        '& [role="tabpanel"] .MuiContainer-root': {
            padding: 0
        }
    },
    modalFooter: {
        marginTop: 80,
    },
    selectWrap: {
        padding: "0 75px",
    },
    selectItem: {
        background: theme.palette.primary.grey,
        borderRadius: 50,
        cursor: "pointer",
    },
    selectText: {
        display: "block",
        padding: 10,
        height: '66px',
        padding: '15px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
}));

export default function PopupSelect({ data, userActiveCallback = () => {}}) {
    data.balloonBtn = true;
    const classes = useStyles();
    const dispatch = useDispatch();

    const arrayTabs = [
        {
            name: "Список",
            click: () => {
                dispatch(setPageMapActive(false));
            },
        },
        {
            name: "Показать на карте",
            click: () => {
                dispatch(setPageMapActive(true));
            },
        },
    ];
    
    const map = {
        filter: false,
        objectPoints: false,
        placesPoints: true,
        balloonBtn: data.balloonBtn,
        setTimer: true,
        isPopupSelect: true
    };

    const handleClose = () => {
        dispatch(setPageMapActive(false));
        data.handlerClose();
    }

    const handleModalClick = () => {
        data.hasOwnProperty("onClickModal") && data.onClickModal();
        userActiveCallback();
    }

    return (
        <Modal
            open={data.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={handleModalClick}
        >
            <Slide
                direction="up"
                in={data.open}
                timeout={500}
                mountOnEnter
                unmountOnExit
            >
                <Box className={classes.modal}>
                    <Box className={classes.modalHeader}>
                        <div
                            className={classes.modalClose}
                            onClick={data.handlerClose}
                        >
                            <SvgClose />
                        </div>
                    </Box>
                    <Box className={classes.modalBody}>
                        <Typography variant="h2" component="div" mb={20}>
                            {data.title}
                        </Typography>
                        {data.includeMap ? (
                            <TabsCard
                                options={{
                                    tabs: arrayTabs,
                                    classNameTabs: data.classNameTabs || '', 
                                    panels: [
                                        <SelectionOptions
                                            classes={classes}
                                            data={data}
                                        ></SelectionOptions>,
                                        <Container
                                            maxWidth="md"
                                            sx={{ paddingTop: "40px" }}
                                        >
                                            <MapYandex data={map}></MapYandex>
                                        </Container>,
                                    ],
                                    noScroll: true
                                }}
                            ></TabsCard>
                        ) : (
                            <SelectionOptions
                                classes={classes}
                                data={data}
                            ></SelectionOptions>
                        )}
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
}
