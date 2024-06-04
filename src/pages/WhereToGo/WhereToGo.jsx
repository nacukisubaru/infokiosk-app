/*REACT*/
import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Parser from "html-react-parser";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { openModalStay, setActiveNestedFilter, setActiveTab, setComeBackLink, setComeBackToList } from "../../redux/actions";
import { setHistoryBack } from "../../redux/actions/excursionActions";
import { setTagFiltered } from "../../redux/actions/filterActions";

/*HOOKS*/
import { useWhereToGoGetById } from "../../hooks/whereToGoHooks";
import { excursionListMap, useGetExcursionListByMapId } from "../../hooks/excursionHooks";
import { useCheckActiveUserInApp } from "../../hooks/appHooks";

/*HELPERS*/
import { decodeHtml, stripTagsAllow } from "../../helpers/stringHelper";
import { arrayPhotoMap } from "../../helpers/arrayHelper";
import RestApi from "../../api/restApi";

/*MUI*/
import { Container, Typography } from "@mui/material";

/*COMPONENTS*/
import FancyBox from "../../components/Images/FancyBox/FancyBox";
import Loading from "../../components/Loading";
import TabsCard from "../../components/TabsCard";
import MapYandex from "../../components/MapYandex";
import CardSmallList from "../../components/ListExcursions/CardSmallList";
import BottomPanel from "../../components/BottomPanel";
import PopupStay from "../../components/PopupStay";

/*PAGES*/
import NotFound from "../404";

export default function WhereToGo() {
    const rest = new RestApi();
    const { id } = useParams();    
    const dispatch = useDispatch();
    const getWhereToGo = useWhereToGoGetById(id);
    const getExcursionsByMapId = useGetExcursionListByMapId(id);
    const {ref, userActive, pause, restartTimer} = useCheckActiveUserInApp(300000);

    const whereToGoData = useSelector((state) => state.catalog.whereToGo);
    const excursions = useSelector(state => state.excursionManager.excursionList);
    const comeBackLink = useSelector(state => state.app.comeBackLink);
    const tabs = useSelector(state => state.app.tabs);

    const photos = arrayPhotoMap(whereToGoData.images, rest.host + whereToGoData.PREVIEW_PICTURE);
    const arrTabs = [{name:"Описание"}, {name:"Показать на карте"}];    
    const exByMapId = getExcursionsByMapId.data;
       
    if(!getExcursionsByMapId.isLoading && excursions.length > 0 && exByMapId.data.result && exByMapId.data.result.error !== "ELEMENT_NOT_FOUND") {
        arrTabs.push({name:"Экскурсии"});
    }

    const map = {
        filter: false,
        objectPoints: true,
        placesPoints: false,
        balloonBtn: false,
        setTimer: false,
        zoom: 20
    };

    const panelData = [
        {
            url: comeBackLink ? comeBackLink: '/where-to-go',
            variant: 'outlined',
            name: 'НАЗАД К СПИСКУ',
            disabled: false,
            handler: () => {
                dispatch(setTagFiltered(false));  
                dispatch(setComeBackToList(false));
            }
        }
    ];

    const callbackComeBackLink = useCallback(() => {
        if(comeBackLink !== '/mainpage') {
            dispatch(setComeBackLink('/where-to-go/'));
        }
    }, [dispatch, comeBackLink]); 

    useEffect(() => {
        if(excursions.length > 0) { 
            callbackComeBackLink();
        }
    }, [excursions, callbackComeBackLink]);

    useEffect(()=>{
        dispatch(setHistoryBack(true));
        const index = tabs.findIndex((tab) => {
            if(tab.name === "Куда сходить") {
                return true;
            }
            return false;
        });
        dispatch(setActiveTab(index));
    }, [dispatch, tabs]);

    useEffect(() => {
        if(userActive === false) {
            pause();
            dispatch(openModalStay());
        }
    }, [userActive]);

    return (
        <>
            <div ref={ref}>
                {getWhereToGo.isLoading ? (
                    <Loading />
                ) : (
                    <>
                    {Object.keys(whereToGoData).length !== 0 ? (
                        <main>
                            <Container
                                maxWidth="md"
                                sx={{
                                    paddingTop: "35px",
                                    paddingBottom: "35px",
                                }}
                            >
                                <FancyBox images={photos}/>
                                <Typography variant="h4" mt={10}>
                                    {Parser(decodeHtml(whereToGoData.title + ' | ' + whereToGoData.sectionName))}
                                </Typography>
                            </Container>
                                
                            <TabsCard
                                options={{
                                    tabs: arrTabs,
                                    panels: [
                                        <Container maxWidth="md" sx={{ paddingTop: "20px" }}>
                                            {Parser(stripTagsAllow(decodeHtml(whereToGoData.text), "<br></br><b></b><u></u><i></i><p></p>"))}
                                        </Container>,
                                        <MapYandex data={map}></MapYandex>,
                                        <>
                                            {!getExcursionsByMapId.isLoading && excursions.length > 0 && (exByMapId.data.result && exByMapId.data.result.error !== "ELEMENT_NOT_FOUND") && (
                                                   <CardSmallList data={{
                                                    notPromo: excursionListMap(excursions), 
                                                    updList: getExcursionsByMapId.refetch,
                                                }} /> 
                                            )}
                                        </>
                                    ],
                                }}
                            />
                            <BottomPanel data={ panelData } />
                            <PopupStay options={{onClose: restartTimer, subtitle: 'Сессия закончится через: '}} />
                        </main>
                    ): <NotFound />}
                    </>
                )}
            </div>
        </>
    );
}
