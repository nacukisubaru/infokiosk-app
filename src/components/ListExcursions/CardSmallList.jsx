/*REACT*/
import React from "react";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { setCloseRecommend, setOpenRecommend } from "../../redux/actions";
import { toggleLoading } from "../../redux/actions/excursionActions";

/*MUI*/
import { Grid, Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*HOOKS*/
import { useObserverScroll } from "../../hooks/useObserverScroll";

/*COMPONENTS*/
import CardSmall from "./CardSmall";
import Loading from "../Loading";

/*ICONS*/
import SvgArrowUp from "../Icons/SvgArrowUp";

export const useStyles = makeStyles((theme) => ({
    listBody: {
        height: "calc(100vh - 785px)",
        overflowX: "hidden",
        overflowY: "scroll",
        paddingBottom: 80,
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
    cardListHeader: {
        display: "flex",
        alignItems: "center",
    },
    item: {
        "&:nth-child(3n+3) .MuiPaper-root > a": {
            borderBottomRightRadius: "50px",
        },
        "&:nth-child(3n+1) .MuiPaper-root > a": {
            borderTopLeftRadius: "50px",
        },
        "&:nth-child(3n+2) .MuiPaper-root > a": {
            borderTopLeftRadius: "50px",
            borderBottomRightRadius: "50px",
        },
    },
    cardList: {
        background: theme.palette.primary.green,
        padding: "40px 0",
    },
    listHide: {
        height: 0,
        opacity: 0,
        visibility: "hidden",
        margin: 0,
        transition: "height 0.5s ease, opacity 0.5s ease",
    },
    listShow: {
        // height: 525,
        opacity: 1,
        transition: "height 0.5s ease, opacity 0.5s ease",
    },
    arrowUp: {
        transition: "transform 0.5s ease",
    },
    arrowDown: {
        transform: "rotate(180deg)",
        transition: "transform 0.5s ease",
    },
}));

export default function CardSmallList({ data }) {
    const cardsPromo = data.isPromo;
    const cardsNew = data.notPromo;

    const dispatch = useDispatch();
    const classes = useStyles();
    const openRecommend = useSelector((state) => state.recommend.openRecommend);
    const loading = useSelector((state) => state.excursionManager.loading);
    const optionsCard = {};

    if (data.hasOwnProperty("onClickCard")) {
        optionsCard.onClickCard = data.onClickCard;
    }
    if (data.hasOwnProperty("excursionsQuan")) {
        optionsCard.excursionsQuan = data.excursionsQuan;
    }

    const clickHandler = () => {
        if (openRecommend) {
            dispatch(setCloseRecommend());
        } else {
            dispatch(setOpenRecommend());
        }
    };

    const callbackFetch = async () => {
        await dispatch(toggleLoading(true));
        await data.updList();
        await dispatch(toggleLoading(false));
    };

    const targetRef = useObserverScroll(callbackFetch);

    return (
        <Box className={classes.listBody}>
            {cardsPromo !== undefined && cardsPromo.length > 0 && (
                <Box className={classes.cardList}>
                    <Container maxWidth="md">
                        <Box
                            className={classes.cardListHeader}
                            onClick={clickHandler}
                        >
                            <Typography variant="h3">
                                ВИЗИТ СОЧИ РЕКОМЕНДУЕТ
                            </Typography>
                            <SvgArrowUp
                                style={{ marginLeft: 20 }}
                                className={
                                    openRecommend
                                        ? classes.arrowUp
                                        : classes.arrowDown
                                }
                            />
                        </Box>

                        <Grid
                            container
                            mt={3}
                            justifyContent="flex-start"
                            spacing={5}
                            className={
                                openRecommend
                                    ? classes.listShow
                                    : classes.listHide
                            }
                        >
                            {cardsPromo.map((item) => {
                                item.link = data.link
                                    ? data.link
                                    : "/excursion/";
                                return (
                                    <Grid
                                        item
                                        xs={4}
                                        key={item.id}
                                        className={classes.item}
                                    >
                                        <CardSmall
                                            data={item}
                                            options={optionsCard}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Container>
                </Box>
            )}

            {cardsNew !== undefined && (
                <>
                    <Box style={{ marginTop: "30px" }}>
                        <Container maxWidth="md">
                            <Grid
                                container
                                mb={4}
                                justifyContent="flex-start"
                                rowSpacing={5}
                                columnSpacing={5}
                            >
                                {cardsNew.map((item) => {
                                    item.link = data.link
                                        ? data.link
                                        : "/excursion/";
                                    return (
                                        <Grid
                                            id={item.id}
                                            item
                                            xs={4}
                                            key={item.id}
                                            className={classes.item}
                                        >
                                            <CardSmall
                                                data={item}
                                                options={optionsCard}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Container>
                    </Box>
                    <div id="view" ref={targetRef}></div>
                </>
            )}
            {loading && <Loading />}
        </Box>
    );
}
