/*REACT*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Parser from "html-react-parser";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../../redux/actions/catalogActions";
import { openModalStay, setComeBackToList } from "../../redux/actions";
import { setTagFiltered } from "../../redux/actions/filterActions";

/*HOOKS*/
import { useElementGetById } from "../../hooks/catalogHooks";
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
import BottomPanel from "../../components/BottomPanel";
import PopupStay from "../../components/PopupStay";
import EventQr from "../../components/EventQr";

/*PAGES*/
import NotFound from "../404";

export default function EventsDetail() {
    const rest = new RestApi();
    const { id } = useParams();
    const dispatch = useDispatch();
    const getEvent = useElementGetById(id, setEvent);
    const [kassirQrLink, setKassirQrLink] = useState("");
    const { ref, userActive, pause, restartTimer } =
        useCheckActiveUserInApp(300000);

    const eventData = useSelector((state) => state.catalog.event);
    const comeBackLink = useSelector((state) => state.app.comeBackLink);

    const photos = arrayPhotoMap(
        eventData.images,
        rest.host + eventData.PREVIEW_PICTURE
    );
    const arrTabs =
        kassirQrLink !== ""
            ? [
                  { name: "Описание" },
                  { name: "Показать на карте" },
                  { name: "Купить" },
              ]
            : [{ name: "Описание" }, { name: "Показать на карте" }];

    const [dateEvent, setDateEvent] = useState("");

    useEffect(() => {
        if (getEvent.data && getEvent.data.data.result) {
            if (getEvent.data.data.result[0].kassirUrl)
                setKassirQrLink(getEvent.data.data.result[0].kassirUrl);
        }
    }, [getEvent.data]);

    useEffect(() => {
        let datesStr =
            eventData.dateEvent && eventData.dateEndEvent
                ? eventData.dateEvent + "-" + eventData.dateEndEvent
                : eventData.dateEvent
                ? eventData.dateEvent
                : "";
        if(datesStr) {
            if(eventData.timeEvent) {
                datesStr += " | " + eventData.timeEvent
            }
        }
        setDateEvent(datesStr);
    }, [eventData]);

    useEffect(() => {
        if (userActive === false) {
            pause();
            dispatch(openModalStay());
        }
    }, [userActive]);

    const map = {
        filter: false,
        objectPoints: true,
        placesPoints: false,
        balloonBtn: false,
        setTimer: false,
        zoom: 20,
    };

    const panelData = [
        {
            url: comeBackLink ? comeBackLink : "/events",
            variant: "outlined",
            name: "НАЗАД К СПИСКУ",
            disabled: false,
            handler: () => {
                dispatch(setTagFiltered(false));
                dispatch(setComeBackToList(false));
            },
        },
    ];

    const text = {
        site: 'KASSIR.RU',
        text1: '2. Выберите билеты и оформите заказ.'
    }

    return (
        <>
            <div ref={ref}>
                {getEvent.isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {Object.keys(eventData).length !== 0 ? (
                            <main>
                                <Container
                                    maxWidth="md"
                                    sx={{
                                        paddingTop: "30px",
                                        paddingBottom: "30px",
                                    }}
                                >
                                    <FancyBox images={photos} />
                                    <Typography variant="h4" mt={7.5}>
                                        {Parser(
                                            decodeHtml(
                                                eventData.title +
                                                    " | " +
                                                    eventData.sectionName
                                            )
                                        )}
                                    </Typography>
                                </Container>

                                <TabsCard
                                    options={{
                                        tabs: arrTabs,
                                        panels:
                                            kassirQrLink !== ""
                                                ? [
                                                      <Container
                                                          maxWidth="md"
                                                          sx={{
                                                              paddingTop:
                                                                  "20px",
                                                          }}
                                                      >
                                                          <Typography
                                                              variant="h5"
                                                              style={{
                                                                  marginBottom:
                                                                      "30px",
                                                              }}
                                                          >
                                                              {eventData.dateEvent &&
                                                              eventData.dateEndEvent
                                                                  ? eventData.dateEvent +
                                                                    "-" +
                                                                    eventData.dateEndEvent
                                                                  : eventData.dateEvent &&
                                                                    eventData.dateEvent}
                                                          </Typography>
                                                          {eventData.text
                                                              ? Parser(
                                                                    stripTagsAllow(
                                                                        decodeHtml(
                                                                            eventData.text
                                                                        ),
                                                                        "<br></br><b></b><u></u><i></i><p></p>"
                                                                    )
                                                                )
                                                              : Parser(
                                                                    stripTagsAllow(
                                                                        decodeHtml(
                                                                            eventData.preview
                                                                        ),
                                                                        "<br></br><b></b><u></u><i></i><p></p>"
                                                                    )
                                                                )}
                                                      </Container>,
                                                      <MapYandex
                                                          data={map}
                                                      ></MapYandex>,
                                                      <Container
                                                          maxWidth="md"
                                                          sx={{
                                                              paddingTop:
                                                                  "40px",
                                                          }}
                                                      >
                                                          <EventQr
                                                              link={
                                                                  kassirQrLink
                                                              }
                                                              text={text}
                                                          />
                                                      </Container>,
                                                  ]
                                                : [
                                                      <Container
                                                          maxWidth="md"
                                                          sx={{
                                                              paddingTop:
                                                                  "20px",
                                                          }}
                                                      >
                                                          <Typography
                                                              variant="h5"
                                                              style={{
                                                                  marginBottom:
                                                                      "30px",
                                                              }}
                                                          >
                                                              {dateEvent}
                                                          </Typography>
                                                          {eventData.text
                                                              ? Parser(
                                                                    stripTagsAllow(
                                                                        decodeHtml(
                                                                            eventData.text
                                                                        ),
                                                                        "<br></br><b></b><u></u><i></i><p></p>"
                                                                    )
                                                                )
                                                              : Parser(
                                                                    stripTagsAllow(
                                                                        decodeHtml(
                                                                            eventData.preview
                                                                        ),
                                                                        "<br></br><b></b><u></u><i></i><p></p>"
                                                                    )
                                                                )}
                                                      </Container>,
                                                      <MapYandex
                                                          data={map}
                                                      ></MapYandex>,
                                                  ],
                                        kassirQr: kassirQrLink !== "" && true,
                                    }}
                                />
                                <BottomPanel data={panelData} />
                                <PopupStay
                                    options={{
                                        onClose: restartTimer,
                                        subtitle: "Сессия закончится через: ",
                                    }}
                                />
                            </main>
                        ) : (
                            <NotFound />
                        )}
                    </>
                )}
            </div>
        </>
    );
}
