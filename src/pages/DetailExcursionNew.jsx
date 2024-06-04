/*REACT*/
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

/*REDUX*/
import { useSelector, useDispatch } from "react-redux";
import { setGatheringId, setGroup, setTabsValue } from "../redux/actions/excursionActions";
import { correctCode, disableBtnReservation, openModalStay, openSmsVerifyModal, setComeBackToList, setInputKeyboardTel, setPageMapActive, setQuotasMessage } from "../redux/actions";
import { setTagFiltered } from "../redux/actions/filterActions";

/*HOOKS*/
import { 
    useGetExcursionById, 
    useTypesNamesString, 
    defineTypeGroup,
    useReservation, 
    useCheckExcursionAvailableForReservation,
    useReservationStepOneWithCheckPrices
} from "../hooks/excursionHooks";
import { useCheckActiveUserInApp } from "../hooks/appHooks";

/*HELPERS*/
import {numWord} from "../helpers/stringHelper";
import { arrayPhotoMap } from "../helpers/arrayHelper";
import RestApi from "../api/restApi";

/*MUI*/
import { Container, Typography } from "@mui/material";

/*COMPONENTS*/
import TabsForm from "../components/DetailExcursion/TabsForm";
import FancyBox from "../components/Images/FancyBox/FancyBox";
import Loading from "../components/Loading";
import BottomPanel from "../components/BottomPanel";
import PopupSmsCode from "../components/DetailExcursion/PopupSmsCode";
import PopupErrorMessage from "../components/DetailExcursion/PopupErrorMessage";
import PopupStay from "../components/PopupStay";

/*PAGES*/
import NotFound from "./404";
import { useRef } from "react";

export default function DetailExcursionNew() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const tabRef = useRef(null);
    const excursion = useGetExcursionById(id);
    const authStepOne = useReservationStepOneWithCheckPrices();
    const {ref, userActive, activateUser, pause, start, restartTimer} = useCheckActiveUserInApp(300000);
    const reservation = useReservation();
    const data = excursion.excursionManager.excursionData;
    const phone = useSelector(state => state.keyboard.inputTel);
    const currentPhone = useSelector(state => state.smsVerify.smsSentPhone);
    const errorTel = useSelector(state => state.keyboard.showErrorTel);
    const errorEmail = useSelector(state => state.keyboard.showErrorEmail);
    const btnReservation = useSelector(state => state.app.disableBtnReserv);    
    const authToken = useSelector(state => state.authManager.tmpToken);    
    const paymentLink = useSelector(state => state.payment.paymentLink);
    const isPageFound = useSelector(state => state.excursionManager.pageNotFound);
    const comeBackLink = useSelector(state => state.app.comeBackLink);
    const photos = arrayPhotoMap(data.photo, new RestApi().host + data.exPreviewPicture); 
    const dateReservation = useSelector(state => state.calendar.value);
    const tabsValue = useSelector((state) => state.excursionManager.tabsValue);
    
    useEffect(() => {
        if(userActive === false) {
            pause();
            dispatch(openModalStay());
        }
    }, [userActive]);
    
    useEffect(() => {
        excursion.refetch();
    }, []);

    const excursionParams = {
        excursionTitle: defineTypeGroup(data.excursionType),
        excursionInfo: {
          days: data.week,
        },
        fancyBoxImages: photos,
    };

    if(data.duration) {
        excursionParams.excursionInfo.length = data.duration + ' ' + numWord(data.duration, ['час','часа','часов']);
    }

    if(data.placesCntMin || data.placesCntMax) {
        excursionParams.excursionInfo.seats = data.placesCntMin + '-' + data.placesCntMax + " мест";
    }

    const handleInputChange = (event) => {};
    const handleChangePlaces = (event) => excursion.dispatch(setGatheringId(event.target.value));
    const handleChangeGroup = (event) => excursion.dispatch(setGroup(event.target.value));
    const handleSubmit = () => {};
    const checkAvailableReservation = useCheckExcursionAvailableForReservation().check;
    const [getTypesNames] = useTypesNamesString();
    const typesStr = getTypesNames(data.type);

    const reservationHandler = async () => {
        if(authToken.length <= 0) {
            if(phone === currentPhone) {
                dispatch(openSmsVerifyModal());
            } else {
                if(!errorTel && !errorEmail) {
                    const reservationIsAvailable = await checkAvailableReservation(data.id, dateReservation.format('YYYY-MM-DD'));
                    if(reservationIsAvailable) {
                        authStepOne.refetch();
                    }
                }
            }
        } else {
            if(paymentLink.length > 0) {
                dispatch(openSmsVerifyModal());
            } else {
                reservation.refetch();
            }
        }
    }

    const onClickLastTabs = (scroll) => {
        dispatch(setPageMapActive(false));
        const tabWrap1 = tabRef.current.children[1];
        const tabWrap2 = tabWrap1.querySelector('.MuiTabs-flexContainer');
        tabWrap2.scrollLeft = scroll;
    }

    const panelData = [
        {
            url: excursion.excursionManager.historyBack ? '' : comeBackLink ? comeBackLink : '/excursion',
            variant: 'outlined',
            name: excursion.excursionManager.historyBack ? 'НАЗАД': 'НАЗАД К СПИСКУ',
            disabled: false,
            handler: () => {
                if(excursion.excursionManager.historyBack) {
                    window.history.back();
                }
                dispatch(setInputKeyboardTel('')); 
                dispatch(setTagFiltered(false));  
                dispatch(setComeBackToList(false));      
                dispatch(correctCode());     
                dispatch(disableBtnReservation());   
                dispatch(setQuotasMessage(false));  
            }
        },
        {
            url: '',
            variant: 'contained',
            name: 'ЗАБРОНИРОВАТЬ',
            disabled: btnReservation,
            handler: () => {
                if (tabsValue === 0) {
                    reservationHandler();
                } else {
                    dispatch(setTabsValue(0));
                    onClickLastTabs(0);
                    if (!btnReservation) reservationHandler();                   
                }                
            }
        }
    ];

    return (
        <>
            <div ref={ref}>
                {excursion.isLoading ? (
                    <Loading />
                ) : (
                    <>
                    {!isPageFound ? (
                        <main>                            
                            <Container maxWidth="md" sx={{paddingTop: '30px', paddingBottom: '30px'}}>
                                <FancyBox
                                    images={excursionParams.fancyBoxImages}
                                    excursionTitle={excursionParams.excursionTitle}
                                    excursionInfo={excursionParams.excursionInfo}
                                />
                                {typesStr ? (
                                     <Typography variant="h4" mt={7.5}>{data.name + ' | ' + typesStr}</Typography>  
                                ): (
                                    <Typography variant="h4" mt={7.5}>{data.name}</Typography>  
                                )}    
                            </Container>
                            
                            <TabsForm 
                                data={{
                                    activateUser,
                                    timer:{pause, start, userActive, activateUser},
                                    form: {
                                        handleInputChange,
                                        handleChangePlaces,
                                        handleChangeGroup,
                                        handleSubmit,
                                    },
                                    excursion: data,
                                }}
                                tabRef={tabRef}
                                onClickLastTabs={onClickLastTabs}
                                tabsStyle={true}
                            />

                            <BottomPanel data={ panelData } />
                            <PopupSmsCode options={{startTimer: start, pauseTimer: pause, activateUser, sendSmsAgain:authStepOne}}/>
                            <PopupErrorMessage options={{onClickModal:activateUser}}/>
                            <PopupStay options={{onClose: restartTimer, subtitle: 'Сессия закончится через: '}} />
                        </main>
                    ) : <NotFound />}                    
                    </>
                )}
            </div>
        </>
    )        
}