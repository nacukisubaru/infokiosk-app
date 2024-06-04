/*REACT*/
import React, { useEffect, useRef } from "react";
import Parser from "html-react-parser";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { setPageMapActive } from "../../redux/actions";
import { setTabsValue } from "../../redux/actions/excursionActions";

/*HELPERS*/
import { decodeHtml, stripTagsAllow, numberRuFormat } from "../../helpers/stringHelper";
import { domain } from "../../helpers/httpHelper";

/*MUI*/
import { Tabs, Tab, Typography, Container } from "@mui/material";

/*COMPONENTS*/
import ExcursionForm from "./ExcursionForm";
import MapYandex from "../MapYandex";
import { TabPanel } from "../TabPanel";
import EventQr from "../EventQr";


export default function TabsForm({ data, tabRef, onClickLastTabs, tabsStyle = false }) {
    const tab = tabRef;
    const dispatch = useDispatch();
    const excursionManager = useSelector((state) => state.excursionManager);
    const tabsValue = useSelector((state) => state.excursionManager.tabsValue);

    useEffect(() => {
        dispatch(setTabsValue(0));
    }, [dispatch]);

    const handleChangeTabs = (event, newValue) => dispatch(setTabsValue(newValue));

    const onClickTabs = (bool) => dispatch(setPageMapActive(bool));

    const style = {
        height: "calc(100vh - 1015px)",
        overflowX: "hidden",
        overflowY: "auto",
        paddingBottom: "130px"
    };

    const tabStyle = {
        minHeight: '104px'      
    }

    const map = {
        onClickMap: data.activateUser,
        filter: true,
        objectPoints: true,
        placesPoints: true,
        balloonBtn: false,
        setTimer: true
    };

    const isSaleSkypass = data.excursion && data.excursion.isSaleSkypass ? data.excursion.isSaleSkypass : false;
    const skypass = isSaleSkypass;

    const text = {
        site: 'shop.krasnayapolyanaresort.ru',
        text1: '2. Выберите тип услуги и оформите заказ.'
    }

    return (
        <>
            {excursionManager.reservationEnable === true ? (
                <>
                    <Tabs
                        value={ tabsValue }
                        onChange={ handleChangeTabs }
                        variant="scrollable"
                        scrollButtons={ false }
                        aria-label="scrollable prevent tabs example"
                        ref={ tab }
                        sx={ tabsStyle && tabStyle }
                    >
                        <Tab label="Бронирование" onClick={ () => onClickLastTabs(0) }/>
                        <Tab label="Описание" onClick={ () => onClickTabs(false) }/>
                        <Tab label="Смотреть на карте" onClick={ () => onClickTabs(true) }/>
                        <Tab label="Доп. оплаты" onClick={ () => onClickTabs(false) }/>
                        {skypass && <Tab label="Купить" onClick={ () => onClickLastTabs(tab.current.scrollWidth) }/>}
                        <Tab label="Правила отмены" onClick={ () => onClickLastTabs(tab.current.scrollWidth) }/>
                    </Tabs>

                    <TabPanel value={tabsValue} index={0} style={style} className="tabpanel">
                        <Container maxWidth="md" sx={{ paddingTop: "30px" }}>
                            <ExcursionForm options={data} activeUserCallback={data.activateUser}></ExcursionForm>
                        </Container>
                    </TabPanel>

                    <TabPanel value={tabsValue} index={1} style={style}>
                        {data.excursion.detailTextRu ? (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                <Typography variant="h6" mb={4}>
                                    Что вас ожидает
                                </Typography>
                                {Parser(
                                  stripTagsAllow(decodeHtml(data.excursion.detailTextRu), "<br></br><b></b><u></u><i></i><p></p>")
                                )}
                               
                                { data.excursion.hasOwnProperty('minPrice') && data.excursion.minPrice && (
                                        <Typography variant="h6" mb={4} style={{marginTop:'25px'}}>
                                        От {numberRuFormat(data.excursion.minPrice.price)} &#8381;
                                        за взрослого
                                    </Typography>
                                )}
                                    
                            </Container>
                        ) : (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                <Typography variant="h6" mb={4}>
                                    Что вас ожидает
                                </Typography>
                                {Parser(
                                  stripTagsAllow(decodeHtml(data.excursion.previewTextRu), "<br></br><b></b><u></u><i></i><p></p>")
                                )}
                               
                                { data.excursion.hasOwnProperty('minPrice') && data.excursion.minPrice && (
                                        <Typography variant="h6" mb={4} style={{marginTop:'25px'}}>
                                        От {numberRuFormat(data.excursion.minPrice.price)} &#8381;
                                        за взрослого
                                    </Typography>
                                )}
                                    
                            </Container>
                        )
                    }
                    </TabPanel>

                    <TabPanel value={tabsValue} index={2} style={style}>
                        <MapYandex data={map} />
                    </TabPanel>

                    <TabPanel value={tabsValue} index={3} style={style}>
                        {data.excursion.additionalPayments ? (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                {Parser(
                                    decodeHtml(
                                        data.excursion.additionalPayments
                                    )
                                )}
                            </Container>
                        ) : (
                                <Container
                                    maxWidth="md"
                                    sx={{ paddingTop: "30px" }}
                                >
                                    Не предусмотрены
                                </Container>
                            )                
                        }
                    </TabPanel>

                    {skypass && (
                        <TabPanel value={tabsValue} index={4} style={style}>
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "40px" }}
                            >
                                <EventQr
                                    link={domain+'/skipass/'}
                                    text={text}
                                />
                            </Container>
                        </TabPanel>
                    )}
                    
                    <TabPanel value={tabsValue} index={skypass ? 5 : 4} style={style}>
                        {/* {data.excursion.hasOwnProperty("terms") && (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                <Typography variant="h6" mb={4}>
                                    Условия бронирования
                                </Typography>
                                {Parser(decodeHtml(data.excursion.terms))}
                            </Container>
                        )}  */}

                        {data.excursion.hasOwnProperty("rulesCancel") && (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                <Typography variant="h6" mb={4}>
                                    Правила отмены бронирования
                                </Typography>
                                {Parser(decodeHtml(data.excursion.rulesCancel))}
                            </Container>
                        )}   
                    </TabPanel>
                    
                </>
            ) : (
                <>
                    <Tabs
                        value={tabsValue}
                        onChange={handleChangeTabs}
                        variant="scrollable"
                        scrollButtons={false}
                        aria-label="scrollable prevent tabs example"
                    >
                        <Tab label="Описание" onClick={()=>{dispatch(setPageMapActive(false))}}/>
                        <Tab label="Смотреть на карте" onClick={()=>{dispatch(setPageMapActive(true))}}/>
                        <Tab label="Доп оплаты" onClick={()=>{dispatch(setPageMapActive(false))}}/>
                        {skypass && <Tab label="Купить" onClick={ () => onClickTabs(false) }/>}
                        <Tab label="Правила отмены" onClick={()=>{dispatch(setPageMapActive(false))}}/>
                    </Tabs>

                    <TabPanel value={tabsValue} index={0} style={style}>
                        {data.excursion.detailTextRu ? (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                <Typography variant="h6" mb={4}>
                                    Что вас ожидает
                                </Typography>
                                {Parser(
                                     stripTagsAllow(decodeHtml(data.excursion.detailTextRu), "<br></br><b></b><u></u><i></i><p></p>")
                                )}
                                
                                { data.excursion.hasOwnProperty('minPrice') && data.excursion.minPrice && (
                                        <Typography variant="h6" mb={4}>
                                        От {data.excursion.minPrice.price} &#8381;
                                        за взрослого
                                    </Typography>
                                )}
                            </Container>
                        ) : (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                <Typography variant="h6" mb={4}>
                                    Что вас ожидает
                                </Typography>
                                {Parser(
                                  stripTagsAllow(decodeHtml(data.excursion.previewTextRu), "<br></br><b></b><u></u><i></i><p></p>")
                                )}
                               
                                { data.excursion.hasOwnProperty('minPrice') && data.excursion.minPrice && (
                                        <Typography variant="h6" mb={4} style={{marginTop:'25px'}}>
                                        От {numberRuFormat(data.excursion.minPrice.price)} &#8381;
                                        за взрослого
                                    </Typography>
                                )}
                                    
                            </Container>
                        )}
                    </TabPanel>

                    <TabPanel value={tabsValue} index={1} style={style}>                        
                        <MapYandex data={map} />
                    </TabPanel>

                    <TabPanel value={tabsValue} index={2} style={style}>
                        {data.excursion.additionalPayments && (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                {Parser(
                                    decodeHtml(
                                        data.excursion.additionalPayments
                                    )
                                )}
                            </Container>
                        )}
                    </TabPanel>

                    {skypass && (
                        <TabPanel value={tabsValue} index={3} style={style}>
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "40px" }}
                            >
                                <EventQr
                                    link={domain+'/skipass/'}
                                    text={text}
                                />
                            </Container>
                        </TabPanel>
                    )}

                    <TabPanel value={tabsValue} index={skypass ? 4 : 3} style={style}>
                        {/* {data.excursion.hasOwnProperty("terms") && (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                <Typography variant="h6" mb={4}>
                                    Условия бронирования
                                </Typography>
                                {Parser(decodeHtml(data.excursion.terms))}
                            </Container>
                        )} */}

                        {data.excursion.hasOwnProperty("rulesCancel") && (
                            <Container
                                maxWidth="md"
                                sx={{ paddingTop: "30px" }}
                            >
                                <Typography variant="h6" mb={4}>
                                    Правила отмены бронирования
                                </Typography>
                                {Parser(decodeHtml(data.excursion.rulesCancel))}
                            </Container>
                        )} 
                    </TabPanel>
                </>
            )}
        </>
    );
}
