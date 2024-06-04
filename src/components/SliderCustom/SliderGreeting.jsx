/*REACT*/
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Parser from "html-react-parser";

/*REDUX*/
import { useSelector } from "react-redux";

/*HOOKS*/
import { useGetAllScreensForSlider } from "../../hooks/useSetting";
import { useResetState } from "../../hooks/appHooks";
import { useReservationHasPaymentWithCancel } from "../../hooks/excursionHooks";

/*HELPERS*/
import { decodeHtml } from "../../helpers/stringHelper";

/*MUI*/
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*STYLES*/
import "./slick.css";
import "./slick-theme.css";

/*IMAGES*/
import img1 from "../../assets/images/index.jpg";
import img2 from "../../assets/images/excursion.jpg";
import img3 from "../../assets/images/events.jpg";
import img4 from "../../assets/images/togo.jpg";
import imgLogo from "../../assets/images/logo.svg";

export const useStyles = makeStyles((theme) => ({
    slider: {
        "& .slick-dots": {
            bottom: 200,
        },
        "& .slick-dots li button:before, & .slick-dots li.slick-active button:before":
            {
                display: "none",
            },
        "& .slick-dots li": {
            width: 25,
            height: 25,
            margin: "0 6px",
        },
        "& .slick-dots li button": {
            width: 25,
            height: 25,
            borderRadius: "50%",
            border: "3px solid",
            borderColor: theme.palette.primary.green,
        },
        "& .slick-dots li.slick-active button": {
            background: theme.palette.primary.green,
        },
    },
    slide: {
        width: 1080,
        height: 1920,
        backgroundSize: "cover",
        position: "relative",
        color: theme.palette.text.white,
        textAlign: "center",
        "&::after": {
            content: '""',
            display: "block",
            width: "100%",
            height: "100%",
            background: theme.palette.background.bgOpacity,
            position: "absolute",
            top: "0",
            left: "0",
        },
    },
    slideInner: {
        position: "relative",
        zIndex: "1",
        paddingTop: 280,
    },
    logo: {
        width: "815px",
        height: "215px",
        background: `url(${imgLogo}) center center no-repeat`,
        backgroundSize: "contain",
        margin: "0 auto",
    },
    subtitle: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(9),
    },
    btn: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.background.buttonBg,
        color: theme.palette.text.primary,
        borderRadius: 30,
        textDecoration: "none",
        padding: "18px 55px",
        fontWeight: 700,
        "&:hover": {
            backgroundColor: theme.palette.background.buttonBg,
            boxShadow: theme.shadows[3],
        },
        "&:active": {
            boxShadow: theme.shadows[3],
        },
        "& svg": {
            width: 25,
            height: 25,
        },
    },
}));

export default function SliderGreeting() {
    const classes = useStyles();
    const slider = useRef();
    const cancelPayment = useReservationHasPaymentWithCancel();
    const screenSettings = useGetAllScreensForSlider();
    const reservationId = useSelector((state) => state.payment.reservationId);
    useResetState();

    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const main = screenSettings.main;
    const excursion = screenSettings.excursion;
    const whereToGo = screenSettings.whereToGo;
    const event = screenSettings.event;

    const sloganMain =
        main && main.slogan ? main.slogan : "Начни свой visit в Сочи";
    const sloganEx =
        excursion && excursion.slogan ? excursion.slogan : "лучшие экскурсии";
    const sloganEvent = event && event.slogan ? event.slogan : "СОБЫТИЯ";
    const sloganGo =
        whereToGo && whereToGo.slogan ? whereToGo.slogan : "Куда сходить";

    useEffect(() => {
        if (reservationId > 0) {
            cancelPayment.refetch();
        }
    }, [cancelPayment.refetch, reservationId]);

    return (
        <div className={classes.slider}>
            <Slider {...settings} ref={slider}>
                <Box
                    component="div"
                    className={classes.slide}
                    sx={{
                        background: `url(${
                            main && main.photo ? main.photo : img1
                        }) center center no-repeat`,
                    }}
                >
                    <Box className={classes.slideInner}>
                        <Box component="div" className={classes.logo}></Box>
                        <Typography variant="h1" className={classes.subtitle}>
                            {Parser(decodeHtml(sloganMain))}
                        </Typography>
                        <Link to="/mainpage" className={classes.btn}>
                            <Typography variant="button2" mr={3}>
                                НАЧАТЬ
                            </Typography>
                            <svg
                                width="27"
                                height="26"
                                viewBox="0 0 27 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.83366 14.666H20.4503L12.317 22.7994C11.667 23.4494 11.667 24.516 12.317 25.166C12.967 25.816 14.017 25.816 14.667 25.166L25.6503 14.1827C26.3003 13.5327 26.3003 12.4827 25.6503 11.8327L14.6837 0.832715C14.0337 0.182715 12.9837 0.182715 12.3337 0.832715C11.6837 1.48271 11.6837 2.53272 12.3337 3.18272L20.4503 11.3327H1.83366C0.916992 11.3327 0.166992 12.0827 0.166992 12.9994C0.166992 13.916 0.916992 14.666 1.83366 14.666Z"
                                    fill="black"
                                />
                            </svg>
                        </Link>
                    </Box>
                </Box>

                <Box
                    component="div"
                    className={classes.slide}
                    sx={{
                        background: `url(${
                            excursion && excursion.photo
                                ? excursion.photo
                                : img2
                        }) center center no-repeat`,
                    }}
                >
                    <Box className={classes.slideInner}>
                        <Box component="div" className={classes.logo}></Box>
                        <Typography variant="h1" className={classes.subtitle}>
                            {Parser(decodeHtml(sloganEx))}
                        </Typography>
                        <Link to="/excursion" className={classes.btn}>
                            <Typography variant="button2" mr={3}>
                                ПОДОБРАТЬ
                            </Typography>
                            <svg
                                width="27"
                                height="26"
                                viewBox="0 0 27 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.83366 14.666H20.4503L12.317 22.7994C11.667 23.4494 11.667 24.516 12.317 25.166C12.967 25.816 14.017 25.816 14.667 25.166L25.6503 14.1827C26.3003 13.5327 26.3003 12.4827 25.6503 11.8327L14.6837 0.832715C14.0337 0.182715 12.9837 0.182715 12.3337 0.832715C11.6837 1.48271 11.6837 2.53272 12.3337 3.18272L20.4503 11.3327H1.83366C0.916992 11.3327 0.166992 12.0827 0.166992 12.9994C0.166992 13.916 0.916992 14.666 1.83366 14.666Z"
                                    fill="black"
                                />
                            </svg>
                        </Link>
                    </Box>
                </Box>

                <Box
                    component="div"
                    className={classes.slide}
                    sx={{
                        background: `url(${
                            event && event.photo ? event.photo : img3
                        }) center center no-repeat`,
                    }}
                >
                    <Box className={classes.slideInner}>
                        <Box component="div" className={classes.logo}></Box>
                        <Typography variant="h1" className={classes.subtitle}>
                            {Parser(decodeHtml(sloganEvent))}
                        </Typography>
                        <Link to="/events" className={classes.btn}>
                            <Typography variant="button2" mr={3}>
                                ВЫБРАТЬ
                            </Typography>
                            <svg
                                width="27"
                                height="26"
                                viewBox="0 0 27 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.83366 14.666H20.4503L12.317 22.7994C11.667 23.4494 11.667 24.516 12.317 25.166C12.967 25.816 14.017 25.816 14.667 25.166L25.6503 14.1827C26.3003 13.5327 26.3003 12.4827 25.6503 11.8327L14.6837 0.832715C14.0337 0.182715 12.9837 0.182715 12.3337 0.832715C11.6837 1.48271 11.6837 2.53272 12.3337 3.18272L20.4503 11.3327H1.83366C0.916992 11.3327 0.166992 12.0827 0.166992 12.9994C0.166992 13.916 0.916992 14.666 1.83366 14.666Z"
                                    fill="black"
                                />
                            </svg>
                        </Link>
                    </Box>
                </Box>

                <Box
                    component="div"
                    className={classes.slide}
                    sx={{
                        background: `url(${
                            whereToGo && whereToGo.photo
                                ? whereToGo.photo
                                : img4
                        }) center center no-repeat`,
                    }}
                >
                    <Box className={classes.slideInner}>
                        <Box component="div" className={classes.logo}></Box>
                        <Typography variant="h1" className={classes.subtitle}>
                            {Parser(decodeHtml(sloganGo))}
                        </Typography>
                        <Link to="/where-to-go" className={classes.btn}>
                            <Typography variant="button2" mr={3}>
                                ВЫБРАТЬ
                            </Typography>
                            <svg
                                width="27"
                                height="26"
                                viewBox="0 0 27 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.83366 14.666H20.4503L12.317 22.7994C11.667 23.4494 11.667 24.516 12.317 25.166C12.967 25.816 14.017 25.816 14.667 25.166L25.6503 14.1827C26.3003 13.5327 26.3003 12.4827 25.6503 11.8327L14.6837 0.832715C14.0337 0.182715 12.9837 0.182715 12.3337 0.832715C11.6837 1.48271 11.6837 2.53272 12.3337 3.18272L20.4503 11.3327H1.83366C0.916992 11.3327 0.166992 12.0827 0.166992 12.9994C0.166992 13.916 0.916992 14.666 1.83366 14.666Z"
                                    fill="black"
                                />
                            </svg>
                        </Link>
                    </Box>
                </Box>
            </Slider>
        </div>
    );
}
