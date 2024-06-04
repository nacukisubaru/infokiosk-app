import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateObject from "react-date-object";

import excursionsApi from "../api/excursionsApi";
import districtApi from "../api/districtApi";
import { useAuthUserByPhoneWithVerifyRequest } from "../hooks/authHooks";
import moment from "moment";

import { useShowMessage } from "./appHooks";
import { 
    setExcursionList, 
    setChildPrice, 
    setAdultPrice, 
    setExcursionListPromo, 
    setExcursionPrice, 
    setCountPage, 
    setExcursionData,  
    toggleNoResultPopup,
    setCountPageSearch,
    unsetClickFilter,
    setExcursionDateList,
    setCountPageDate,
    setAvaliableGroups,
    toggleLoadingDataReservation
} from "../redux/actions/excursionActions";
import { 
    setCalendarValue, 
    setDataGroup, 
    setDataLocation, 
    setDataPlaces, 
    setFilterObjectsData, 
    setFilterPlacesData, 
    setSelectedGroupId, 
    setSelectedPlaceId, 
    setValueSelectGroup, 
    setValueSelectPlace,     
    setInputKeyboardEmail, 
    setInputKeyboardTel, 
    setPaymentLink, 
    setReservationId, 
    toggleSearchPopup,
    unsetVerify,
    disableBtnReservation,
    enableBtnReservation,
    quotasNotAvailable,
    quotasAvailable,
    toggleNoQuotPopup,
    setLimitPeople,
    smsSentPhone,
    toggleNoPayment,
    setDisabledBtnPlusAdult,
    setDisabledBtnPlusChild,
    setInputNumberValueAdult,
    setInputNumberValueChildren,
    openNoQuot,
    setVerify,
    closeSmsVerifyModal,
    setTempToken,
    setErrorTel,
    setErrorEmail,
    setListPlaces,
    setClosestDate,
    setClosestQuota,
    closeReservation,
    openReservation,
    setOrderId,
    setCurrentExcursionId,
    setDaysWeek,
    openSmsVerifyModal,
    closeNoQuoteModal,
    closeSelectGroup,
    closeSelectPlaces,
    closeModalCalendar,
    pageNotFound,
    countExcursions,
    closeVerifyKeyboard,
    setChoosePayment,
    setCardPayment,
} from "../redux/actions";

import imageForExcursion from "../assets/images/screen-main.jpg";

import { daysWeekStringToArray } from "../helpers/dateHelper";
import { numWord } from "../helpers/stringHelper";
import { setSnack } from "../redux/actions/reducerActions";
import { setMapGatheingPlaces } from "../redux/actions/mapActions";

const host = new excursionsApi().host;

const useInit = () => {
    const navigate = useNavigate();
    const exManager = useSelector((state) => state.excursionManager);
    const manager = useSelector((state) => state);
    const excursion = new excursionsApi();
    const district = new districtApi();
    const dispatch = useDispatch();
    const message = useShowMessage();
    const minutes = useSelector(state => state.timer.minutesPay);
    const seconds = useSelector(state => state.timer.secondsPay);
    const filter = useSelector(state => state.filter.filterArray);
    const arrayTypeIds = useSelector(state => state.filter.filterIds);
    const arrayLocationIds = useSelector(state => state.select.locationIds);
    const dateList = useSelector(state => state.calendar.valueList);
    const dateValue = useSelector(state => state.calendar.value);
    const date = new DateObject(useSelector(state => state.calendar.value)._d);
    const errorTel = useSelector(state => state.keyboard.showErrorTel);
    const errorEmail = useSelector(state => state.keyboard.showErrorEmail);
    const checkPolicy = useSelector(state => state.app.checkBoxPolicy);
    const email = useSelector((state) => state.keyboard.inputEmail);
    const phone =  useSelector((state) => state.keyboard.inputTel);
    const groupId = useSelector(state => state.select.selectGroupId);
    const adultCount = useSelector((state) => state.inputNumber.valueAdult);
    const childrenCount = useSelector((state) => state.inputNumber.valueChildren);
    const lastModifiedCounter = useSelector(state => state.inputNumber.lastModifiedCounter);
    const gatheringId = useSelector((state) => state.select.selectPlaceId);
    const ticketsQuantity = useSelector((state) => state.inputNumber.valueTotal);
    const reservationId = useSelector((state) => state.payment.reservationId);
    const excursionId = useSelector(state => state.excursionManager.currentExcursionId);
    const payerName = useSelector(state => state.payment.payerName);
    const countEx = useSelector((state) => state.excursionManager.countExcursions);
    const dataPlaces = useSelector(state => state.select.popupDataPlaces);
    const isComeBackToList = useSelector(state => state.app.comeBackToList);
    const placesPoints = useSelector(state => state.map.points.places);
    const inputSearch = useSelector((state) => state.keyboard.inputSearch);
    const avalGroups = useSelector((state) => state.excursionManager.avaliableGroups);

    return { 
        dispatch, 
        message, 
        excursion, 
        exManager, 
        manager, 
        district, 
        minutes, 
        seconds, 
        navigate, 
        filter, 
        arrayTypeIds, 
        arrayLocationIds,
        date,
        errorTel, 
        errorEmail,
        checkPolicy,
        email,
        phone,
        groupId,
        adultCount,
        childrenCount,
        lastModifiedCounter,
        gatheringId,
        ticketsQuantity,
        reservationId,
        excursionId,
        dateList,
        payerName,
        countEx,
        dataPlaces,
        isComeBackToList,
        placesPoints,
        inputSearch,
        dateValue,
        avalGroups
    };
};

const handlerErrorsQuery = (data, init, showMessage = false) => {

    if (data.hasOwnProperty("error_description")) {
        let status = "error";
        if(data.hasOwnProperty("error")) {
            status = data.error;
        }
        if(showMessage) {init.message.show(data.error_description, status);}
        return false;
    }

    if(data.hasOwnProperty('error')) {
        if(showMessage) {init.message.show(data.error, "error");}
        return false;
    }

    if (data.hasOwnProperty('result') && data.result === null) {
        return false;
    }

    if(data === []) {
        return false;
    }

    if(data === null) {
        return false;
    }

    return true;
}

export const mappingGroups = (arGroups, timeInTitle = false, setActive = false, setGroupId = false, isGatheringPlace = false) => {
    let arrayGroup = [];

    for(let group in arGroups) {
        let groupName = arGroups[group].name;

        if(timeInTitle) {
            if(isGatheringPlace && arGroups[group].hasOwnProperty('gatheringPlace')) {
                groupName = arGroups[group].gatheringPlace.name;
            }
            groupName = arGroups[group].time + ' ' + groupName;
        }

        let obj = {
            id: arGroups[group].id, 
            option: groupName,
        };

        if(setGroupId && arGroups[group].hasOwnProperty('groupId')) {
            obj.groupId = arGroups[group].groupId;
        }

        if(isGatheringPlace && arGroups[group].hasOwnProperty('gatheringPlace')) {
            obj.id = arGroups[group].gatheringPlace.id;
        }

        arrayGroup.push(obj);
    }
    if(arrayGroup.length > 0 && setActive) {
        arrayGroup[0].active = true;
    }
    
    return arrayGroup;
}

export const mappingGatheringPlaces = (arGroups) => {
    let arPlacesRes = [];
    if(arGroups.length > 0) {
        for(let group in arGroups) {
            if(arGroups[group].hasOwnProperty('arPlaces')) {
                mappingGroups(arGroups[group].arPlaces, true, true, true, true).map((item) => {
                    arPlacesRes.push(item);
                    return arPlacesRes;
                });
            }
        }
    }

    return arPlacesRes;
}

export const getGroupPlaces = (arGroups) => {
    let arPlaces = [];
    arGroups.map((group) => {
        group.arPlaces.map((arPlace) => {
            arPlaces.push(arPlace);
        })
    });

    return arPlaces;
}

export const findGroupPlaceByGathering = (arGroups, gatheringId, groupId) => {
    let arPlaces = [];
    const places = getGroupPlaces(arGroups);
    if(places) {
        places.map((place)=> {
            if(place.gatheringId === gatheringId && place.groupId === groupId) {
                arPlaces.push(place);
            }
        });
    }
    return arPlaces;
}

export const findGroupById = (arGroups, groupId) => {
    let arGroupsFind = [];
   
    arGroups.map((item) => {
        if(item.id === groupId) {
            arGroupsFind.push(item);
        }
    });
    
    return arGroupsFind;
}


export const findPriceByTicket = (prices, ticket, placeId = 0)=> {
    let ticketPrice = 0;

    Object.entries(prices).map((value) => {
        let priceObj = Object.values(value)[1];
        for(let inc in priceObj) {
            if(priceObj[inc] !== null) {
                if(typeof priceObj[inc] === "object") {
                    if(priceObj[inc] && priceObj[inc].name === ticket) {
                        if(placeId && inc === placeId || !placeId) {
                            ticketPrice = parseInt(priceObj[inc].price);
                            break;
                        }
                    }
                } else {
                    if(value[1].name === ticket) {
                        ticketPrice = parseInt(value[1].price);
                        break;
                    }
                }
            }
        }
    })

    return ticketPrice;
}

export const mappingMap = (data) => {
    const excursion = new excursionsApi();
    const createObjectMap = (id, data, isGatheringPlaces = false) => {
        let obj = {};
        if(data !== null && data.hasOwnProperty('name') && data.hasOwnProperty('address')) {
            obj = {id, name: data.name, address: data.address};

            if (Array.isArray(data.photo) && data.photo.length && data.photo[0]) {
                data.photo = data.photo.filter((photo)=>{
                    if(photo !== null) {
                        return photo;
                    }
                })
                obj.img = excursion.host + data.photo[0];
            } else if (!Array.isArray(data.photo) && data.photo !== "" && data.photo !== undefined) {
                obj.img = excursion.host + data.photo;
            }

            if (data.phone) {
                obj.phone = data.phone;
            }

            if(isGatheringPlaces) {
                if(data.hasOwnProperty('map') && data.map) {
                    obj.coord = [parseFloat(data.map.split(',')[0]), parseFloat(data.map.split(',')[1])];
                }
            } else {
                if(data.hasOwnProperty('coordinates') && data.coordinates) {
                    obj.coord = [parseFloat(data.coordinates.split(',')[0]), parseFloat(data.coordinates.split(',')[1])];
                }
            }
        }

        return obj;
    }

    const createArrayMap = (data) => {
        let arrayMap = [];
        let counter = 0;
        for(let inc in data) {
            counter++;
            if(data[inc].hasOwnProperty('mapObject')) {
                const obj = createObjectMap(counter, data[inc].mapObject, true);
                if(obj !== {}) {
                    arrayMap.push(obj);
                }
            } else {
                const obj = createObjectMap(counter, data[inc], false);
                if(obj !== {}) {
                    arrayMap.push(obj);
                }
            }
        }
        return arrayMap;
    }
    
    return createArrayMap(data);
}

export const defineTypeGroup = (type) => {
    if(type === "individual") {
        return "Индивидуальная";
    } else if(type === "group") {
        return "Групповая";
    } else if(type === "vip") {
        return "VIP";
    }

    return false;
}

export const groupHasArrPlaces = (arGroups) => {
    let hasPlaces = false;
    arGroups.map((group) => {
        if(group.arPlaces) {
            hasPlaces = true;
        }
    });
    

    return hasPlaces;
}

export const excursionListMap = (list) => {
    return list.map((excursion) => {
         return {
             id: excursion.id, 
             title: excursion.name, 
             description: excursion.previewTextRu, 
             price: excursion.minPrice.price, 
             days: excursion.week,
             duration: excursion.duration ? excursion.duration + ' ' + numWord(excursion.duration, ['час','часа','часов']) : '',
             imgText: defineTypeGroup(excursion.excursionType),
             img: excursion.hasOwnProperty('exPreviewPicture') && excursion.exPreviewPicture && 
             excursion.exPreviewPicture.length > 0 ? host + excursion.exPreviewPicture : imageForExcursion, 
             promo:excursion.isPromo}
     });    
}

export const createArrayPlaces = (places, gatheringPlaces = []) => {
    let count = 1;
    const result = places.map((item) => {
        const gatheringPl = item.gatheringPlace;
        const object = {
            id: count,
            name: gatheringPl.name,
            address: gatheringPl.address,
            time: item.time,
            coord: [parseFloat(gatheringPl.coordinates.split(',')[0]), parseFloat(gatheringPl.coordinates.split(',')[1])]
        };
        count++;

        const place = gatheringPlaces.filter((item) => {
            if(item.name === gatheringPl.name) {
                return item;
            }
        });

        if(place.length > 0) {
            object.img = place[0].img;
        }

        return object;
    });

    return result;
}

export const useGetExcursionById = (excursionId = 0) => {
    const init = useInit();
    const getClosestQuota = useGetClosestQuota();
    const queryAvaliableGroups = useGetAvaliableGroupsByQuota();
    const isAvaliableBooking = useCheckAvaliableBooking();
    const checkAvailableReservation = useCheckExcursionAvailableForReservation();
    const getRemainingQuota = useGetRemainingQuota();

    let changeCalendar = true;
    
    if(init.excursionId > 0) {
        changeCalendar = false;
    }

    if(!excursionId) {
        excursionId = init.excursionId;
    }

    const { isLoading, error, data, refetch } = useQuery(
        "excusrion data",
        () => init.excursion.getById(parseInt(excursionId)),
        {
            onSuccess: async ({ data }) => {
                init.dispatch(setCurrentExcursionId(0));
                init.dispatch(setInputKeyboardTel(''));
                init.dispatch(setInputKeyboardEmail(''));
                init.dispatch(setPaymentLink(""));
                init.dispatch(setReservationId(0));
                init.dispatch(unsetVerify());
                init.dispatch(smsSentPhone(""));
                init.dispatch(disableBtnReservation());
                init.dispatch(setTempToken(""));
                init.dispatch(setInputNumberValueAdult(1));
                init.dispatch(setInputNumberValueChildren(0));
                init.dispatch(setErrorTel(false));
                init.dispatch(setErrorEmail(false));
                init.dispatch(setSelectedGroupId(0));
                init.dispatch(setSelectedPlaceId(0));
                init.dispatch(closeModalCalendar());
                init.dispatch(closeNoQuoteModal());
                init.dispatch(closeSelectGroup());
                init.dispatch(closeSelectPlaces());
                init.dispatch(setSnack(false));
                init.dispatch(pageNotFound(false));
                init.dispatch(closeSmsVerifyModal());
                init.dispatch(closeVerifyKeyboard());
                
                //включаем состояние экрана выбора оплаты заранее при переходе на экран бронирования
                init.dispatch(setChoosePayment(true)); 
                init.dispatch(setCardPayment(false));
            
                if(handlerErrorsQuery(data, init)) {
                    init.dispatch(toggleLoadingDataReservation(true));
                    const excursion = data.result;
                    const periods = excursion.periodsArray;
                    excursion.periodsArray = [].concat(...periods);

                    await init.dispatch(setExcursionData(excursion));
                    init.dispatch(openReservation());

                    /*page not found если экскурсия не актуальная*/
                    if(data.result.status !== "ACTUAL") {
                        init.dispatch(pageNotFound(true));
                    }
                    
                    /*Получение массива дней недели*/
                    init.dispatch(setDaysWeek(daysWeekStringToArray(excursion.week)));

                    /*Получение состояния для карты*/
                    init.dispatch(setFilterObjectsData([]));
                    if(excursion.hasOwnProperty('arPlaces') && excursion.arPlaces.length > 0) {
                        init.dispatch(setFilterObjectsData(mappingMap(excursion.arPlaces)));
                    }
               
                    init.dispatch(setFilterPlacesData([]));
                    let gatheringPlaces = [];
                    if(excursion.hasOwnProperty('gatheringPlaces') && excursion.gatheringPlaces) {
                        gatheringPlaces = mappingMap(excursion.gatheringPlaces)
                        init.dispatch(setFilterPlacesData(gatheringPlaces));
                    }
          
                    /*Установка правил отмены*/
                    const rulesCancel = await init.excursion.getCancelRules(excursionId);
                   
                    if(rulesCancel.data.hasOwnProperty('result')) {
                        if(rulesCancel.data.result.hasOwnProperty('terms')) {
                            excursion.terms = rulesCancel.data.result.terms;
                        }
                        if(rulesCancel.data.result.hasOwnProperty('cancelRules')) {
                            excursion.rulesCancel = rulesCancel.data.result.cancelRules;
                        }
                    }

                    /*Получение ближайшей квоты и установка групп и мест сбора в зависимости от нее*/
                    const closestQuota = await getClosestQuota.getQuota(excursionId, changeCalendar, excursion.isPromo);
                    if(closestQuota) {
                        const reservationAvailable = await checkAvailableReservation.check(excursionId, closestQuota.date, 3);
                        if(reservationAvailable) {
                            const dateList = init.dateList;
                            let selectedDate = "";
                            selectedDate = closestQuota.date;
                            if(dateList && !excursion.isPromo) {
                                if(isAvaliableBooking.check(excursion.id, moment(init.dateList).format('DD-MM-YYYY'), closestQuota.groupId)) {
                                    selectedDate = moment(init.dateList).format('DD-MM-YYYY');
                                }
                            }
                            let gatheringId = 0;
                            if(closestQuota.gatheringId) {
                                gatheringId = closestQuota.gatheringId;
                            }

                            const avaliableGroups = await queryAvaliableGroups.getGroups(excursion.id, selectedDate, true, true);
                            if(avaliableGroups && groupHasArrPlaces(avaliableGroups)) {
                                const arPlaces = avaliableGroups[0].arPlaces;
                                if(arPlaces) {
                                    const places = createArrayPlaces(arPlaces, gatheringPlaces);
                                    init.dispatch(setMapGatheingPlaces(places));
                                }                            
                                const remainingQuota = await getRemainingQuota.refetch();
                                let remaining;
                                if (remainingQuota.data.data.result) remaining = remainingQuota.data.data.result.remaining;
                                let limit = 0;

                                if(remaining < avaliableGroups[0].maxSize) {
                                    limit = remaining;
                                } else {
                                    limit = avaliableGroups[0].maxSize;
                                }

                                init.dispatch(setLimitPeople(limit));
                                
                                if(limit <= 1) { 
                                    init.dispatch(setDisabledBtnPlusAdult(true));
                                    init.dispatch(setDisabledBtnPlusChild(true));
                                } else {
                                    init.dispatch(setDisabledBtnPlusAdult(false));
                                    init.dispatch(setDisabledBtnPlusChild(false));
                                }
                            }
                        }
                    } else {
                        /*Установка состояния бронирование закрыто если нет ближайшей квоты*/
                        init.dispatch(closeReservation());
                    }
                    init.dispatch(toggleLoadingDataReservation(false));
                } else {
                    if(data.error === "ELEMENT_NOT_FOUND") {
                        init.dispatch(pageNotFound(true));
                    }
                }
                
            },
            enabled: false
        }
    );

    return {
        isLoading,
        refetch,
        error,
        data,
        manager: init.manager,
        excursionManager: init.exManager,
        dispatch: init.dispatch,
    };
};

export const useGetAvaliableGroupsByQuota = () => {
    const init = useInit();
    const prices = useGetPrice();
    const getGroups = async (excursionId, date = "", groupId = 0, placeId = 0) => {
        if(date === "") {
            date = new DateObject(init.dateValue._d).format('DD-MM-YYYY');
        }
        const groups = await init.excursion.getAvaliableGroupsByQuota(excursionId, date);
        if(groups.data && groups.data.result) {
            const avaliableGroups = groups.data.result;
            const avaliableGroupsMap = mappingGroups(avaliableGroups, true, true);
            const arPlacesList = mappingGatheringPlaces(avaliableGroups);
            const arPlaces = mappingGatheringPlaces([avaliableGroups[0]]);
            const currentPlaces = getGroupPlaces([avaliableGroups[0]]);

            if(avaliableGroups[0].hasOwnProperty('maxSize')) {
                init.dispatch(setLimitPeople(avaliableGroups[0].maxSize));
            }

            let groupsById = [];
            let placesByGroupId = [];
            let placesGroup = [];

            if(groupId > 0) {
                groupsById = avaliableGroupsMap.filter((group) => group.id === groupId);

                const groupsPlaces = avaliableGroups.filter((group) => group.id === groupId);

                placesGroup = getGroupPlaces(groupsPlaces);
                if(groupsPlaces.length) {
                    placesByGroupId = mappingGatheringPlaces([groupsPlaces[0]]);
                }
            }
            let currentPlaceArray = [];
            if(placesByGroupId.length) {
                if(placeId > 0) {
                    const placeById = placesByGroupId.filter((place) => place.id === placeId);
                    
                    currentPlaceArray = placesGroup.filter((place) => place.id === placeId);

                    if(placeById.length) {
                        placesByGroupId = placeById;
                    }
                }
                
                init.dispatch(setSelectedPlaceId(placesByGroupId[0].id));
                init.dispatch(setValueSelectPlace(placesByGroupId[0].option));
            } else {
                init.dispatch(setSelectedPlaceId(arPlaces[0].id));
                init.dispatch(setValueSelectPlace(arPlaces[0].option));
            }

            init.dispatch(setListPlaces(arPlacesList));
            init.dispatch(setDataPlaces(arPlaces));            
            init.dispatch(setDataGroup(avaliableGroupsMap));

            if(groupsById.length) {
                init.dispatch(setValueSelectGroup(groupsById[0].option));
                init.dispatch(setSelectedGroupId(groupsById[0].id));
            } else {
                init.dispatch(setValueSelectGroup(avaliableGroupsMap[0].option));
                init.dispatch(setSelectedGroupId(avaliableGroupsMap[0].id));
            }
            await init.dispatch(setAvaliableGroups(avaliableGroups));

            //if(changePrice) {
            if(groupId && currentPlaceArray.length) {
                prices.get(groupId, currentPlaceArray[0].gatheringId, 1, date, avaliableGroups, excursionId);      
            } else {
                prices.get(avaliableGroupsMap[0].id, currentPlaces[0].gatheringId, 1, date, avaliableGroups, excursionId);
            }
            //}
            return groups.data.result;
        } else {
            if(groups.data.error || groups.data.error_description) {
                init.dispatch(toggleNoQuotPopup());
                init.dispatch(quotasNotAvailable());
                init.dispatch(disableBtnReservation());
            }
        }
        return false;
    }
    return {getGroups};
}

export const useGetExcursionList = (enabled = true, setList = false, page = 0) => {
    const init = useInit();
    let dateValue;
    if(!page) {
        page = init.exManager.countPage;
    }

    if (init.dateList === '') {
        dateValue = ''
    } else {
        const date = new DateObject(init.dateList._d);
        dateValue = date.format('DD-MM-YYYY');
    }
   
    const { isLoading, error, data, refetch } = useQuery(
        "excusrion list",
        () => init.excursion.getList(page, init.arrayTypeIds, dateValue, init.arrayLocationIds, init.inputSearch),
        {
            onSuccess: ({ data }) => {
                init.dispatch(setExcursionDateList([]));
                init.dispatch(setExcursionData({}));

                const res = handlerErrorsQuery(data.result, init);
                
                if(res && Array.isArray(data.result)) {
                    if(setList) {
                        init.dispatch(setList(data.result));
                    } else {
                        const excursionsWithoutPromo = data.result.filter((item) => {
                            if(!item.isPromo) {
                                return item;
                            }
                        });
                        if(excursionsWithoutPromo.length <= 0) {
                            init.dispatch(toggleNoResultPopup(true));
                            return;
                        }

                        init.dispatch(setExcursionList(excursionsWithoutPromo));
                        
                    } 
                    init.dispatch(unsetClickFilter());
                      
                    if(data.hasOwnProperty('next')) {
                        init.dispatch(setCountPage(data.next));
                    }
                    
                    init.dispatch(countExcursions(data.result.length));
                } else {
                    // if (init.exManager.clickFilter) init.dispatch(toggleNoResultPopup(true));
                    init.dispatch(unsetClickFilter());
                }

                init.dispatch(toggleSearchPopup(false)); 
            },
            enabled
        }
    );

    return {
        isLoading,
        error,
        data,
        excursionManager: init.exManager,
        refetch,
        dispatch: init.dispatch,
    };
};

export const useGetExcursionListPromo = () => {
    const init = useInit();
    const { isLoading, error, data, refetch } = useQuery(
        "excusrion list promo",
        () => init.excursion.getListByPromo(),
        {
            onSuccess: ({ data }) => {
                const res = handlerErrorsQuery(data.result, init);
                if(res) {               
                    init.dispatch(setExcursionListPromo(data.result));
                }
            },
        }
    );

    return {
        isLoading,
        error,
        data,
        excursionManager: init.exManager,
        refetch,
        dispatch: init.dispatch,
    };
};

export const useDateExcursionList = (togglePopup = true) => {
    const init = useInit();
 
    const { isLoading, error, data, refetch } = useQuery(
        "date excusrion list",
        () => init.excursion.getListbyDate(init.exManager.countPageDate, init.date.format('DD-MM-YYYY')),
        {
            onSuccess: ({ data }) => {
                const res = handlerErrorsQuery(data.result, init);
                
                if(res) {
                    const currentExId = init.exManager.excursionData.id;
                    const exDateList = data.result.filter((item)=>{
                        if(item.id !== currentExId) {
                            return item;
                        }
                    }); 
                    init.dispatch(setExcursionDateList(exDateList));
                    if(togglePopup) {
                        init.dispatch(toggleSearchPopup(false));
                    }
                    if(data.hasOwnProperty('next')) {
                        init.dispatch(setCountPageDate(data.next));
                    }
                } else {
                    if(togglePopup) {
                        init.dispatch(toggleSearchPopup(false));
                        init.dispatch(toggleNoResultPopup(true));
                    }
                }                
            },
            enabled: false
        }
    );

    return {
        isLoading,
        error,
        data,
        excursionManager: init.exManager,
        refetch,
        dispatch: init.dispatch,
    };
};

export const useGetPrice = (isCallUnlockReservBtn = true) => {
    const init = useInit();
    const select = init.manager.select; 
    const checkAvailableReservation = useCheckExcursionAvailableForReservation().check;

    const get = async (groupId = 0, gatheringPlaceId = 0, ticketsQuantity = 0, date = "", groups = [], excursionId = 0) => {

        if(ticketsQuantity === 0) {
            ticketsQuantity = init.manager.inputNumber.valueAdult + init.manager.inputNumber.valueChildren;
        }

        if(date === "") {
            if(init.manager.calendar.value && init.manager.calendar.value.hasOwnProperty('_d')) {
                date = new DateObject(init.manager.calendar.value._d).format('DD-MM-YYYY');
            }
        }
        
        if(groupId <= 0) {
        groupId = select.selectGroupId;
        }

        if(gatheringPlaceId <= 0) {
            gatheringPlaceId = select.selectPlaceId;
        }

        if(groups.length <= 0) {
            groups = init.avalGroups;
        }

        if(!excursionId) {
            excursionId = init.exManager.excursionData.id;
        }

        const reservationIsAvailable = await checkAvailableReservation(excursionId, date);
        if(reservationIsAvailable) {    
            const priceObj = await init.excursion.getPrice(groupId, gatheringPlaceId, ticketsQuantity, date);
            //if(changePlaces) {
            const selectedGroup = findGroupById(groups, groupId);
            if (selectedGroup.length) {
                const places = createArrayPlaces(selectedGroup[0].arPlaces, init.placesPoints);
                init.dispatch(setMapGatheingPlaces(places));
            }
            //}

            if(handlerErrorsQuery(priceObj.data.result, init) && typeof priceObj.data.result === "object" && Object.keys(priceObj.data.result).length) {
                const groupPlaceId = findGroupPlaceByGathering(groups, gatheringPlaceId, groupId)[0].id;
                const childPrice = findPriceByTicket(priceObj.data.result, "Детский", groupPlaceId);
                const adultPrice = findPriceByTicket(priceObj.data.result, "Взрослый", groupPlaceId);

                const pricesWithGatheringPlaces = Object.values(priceObj.data.result).filter((price) => {
                    if(!price.name) {
                        return price;
                    }
                });
                
                if(pricesWithGatheringPlaces.length) {
                    const group = findGroupById(groups, groupId);
                    const places = group[0].arPlaces.filter((place) => {
                        if(place.gatheringId === gatheringPlaceId) {
                            return place;
                        }
                    });

                    if(places.length) {
                        let placeExist = false;
                        const placeId = places[0].id;
                        pricesWithGatheringPlaces.map((value, key) => {
                            if(Object.keys(value).includes(placeId)) {
                                placeExist = true;
                            }
                        });

                        if(!placeExist) {
                            init.dispatch(toggleNoQuotPopup());
                            init.dispatch(quotasNotAvailable());
                            init.dispatch(disableBtnReservation());
                        }
                    }
                }

                if(childPrice) {
                    init.dispatch(setChildPrice(childPrice));
                } else {
                    init.dispatch(setChildPrice(0)); 
                }

                if(adultPrice) {
                    init.dispatch(setAdultPrice(adultPrice));
                } else {
                    init.dispatch(setAdultPrice(0));
                }


                init.dispatch(setExcursionPrice(priceObj.data.result));
                init.dispatch(quotasAvailable());

                if(
                    init.errorEmail === false && 
                    init.errorTel === false && init.email.length > 0 && 
                    init.phone.length > 2 && init.checkPolicy === true && isCallUnlockReservBtn) {
                        init.dispatch(enableBtnReservation());
                }

                return priceObj;
            } else {
                init.dispatch(setInputNumberValueAdult(1));
                init.dispatch(setInputNumberValueChildren(0));
                init.dispatch(toggleNoQuotPopup());
                init.dispatch(quotasNotAvailable());
                init.dispatch(disableBtnReservation());
            }
        }

        // init.dispatch(setChildPrice(0)); ??
        // init.dispatch(setAdultPrice(0));
        
        return false;
    }

    return {get};
}

export const usePrices = () => {
    const getPrices = useGetPrice();

    const { isLoading, error, data, refetch } = useQuery(
        "get prices",
        () => getPrices.get(),
        {
            onSuccess: ({ data }) => {},
            enabled: false
        }
    );

    return { isLoading, error, data, refetch };
}

export const useReservationStepOneWithCheckPrices = () => {
    const getPrices = useGetPrice();
    const authStepOne = useAuthUserByPhoneWithVerifyRequest();
    
    const { isLoading, error, data, refetch } = useQuery(
        "reservation with check prices",
        () => getPrices.get(),
        {
            onSuccess: ({ data }) => {
                console.log(data);
                if(data) { 
                    authStepOne.refetch();
                }
            },
            enabled: false
        }
    );

    return { isLoading, error, data, refetch };
}

export const useGetDistricts = () => {
    const init = useInit();
    const locations = useSelector(state => state.select.popupDataLocation);
    const { isLoading, error, data, refetch } = useQuery(
        "locations",
        () => init.district.getList(),
        {
            onSuccess: ({ data }) => {
                const res = handlerErrorsQuery(data, init);
                if(res) {
                    const hasActive = locations.some((location) => {
                        return location.active;
                    });
                    if(!hasActive) {
                        init.dispatch(setDataLocation(mappingGroups(data.result, false, false)));
                    }
                }
            },
        }
    );

    return {isLoading, error, data, refetch };
}

export const useReservationHasPayment = () => {
    const init = useInit();
    const checkPayment = async (redirectToMain = false) => {
        const response = await init.excursion.checkBookingPayment(init.manager.payment.reservationId);
        if(handlerErrorsQuery(response, init)) {
            if(response.data.result === true) {
                init.navigate("/reservation-success/");
            } else {
                if(redirectToMain) {
                    init.navigate("/");
                } else {
                    init.dispatch(toggleNoPayment());
                }
            }
        }
    }

    return {checkPayment};
}

export const useReservationHasPaymentWithCancel = () => {
    const init = useInit();
    const cancel = useCancelReservation();

    const { isLoading, error, data, refetch } = useQuery(
        "has payment with cancel",
        () => init.excursion.checkBookingPayment(init.manager.payment.reservationId),
        {
            onSuccess: ({ data }) => {
                const res = handlerErrorsQuery(data, init);
                if(res) {         
                    if(data.result !== true) {
                        cancel.refetch();
                    }
                    init.dispatch(setReservationId(0));
                }
            },
            enabled:false
        }
    );

    return { isLoading, error, data, refetch };
}

export const useGetRemainingQuota = () => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "remaining quota",
        () => init.excursion.getRemainingQuota(init.groupId, init.date.format('DD-MM-YYYY')),
        {
            onSuccess: ({ data }) => {},
            enabled:false
        }
    );

    return { isLoading, error, data, refetch };
}

export const useReservation = () => {
    const init = useInit();
    let tickets = {};
    if(init.exManager.excursionData.hasOwnProperty('arTicketsType')) {
        // const arr = [Object.values(init.exManager.excursionData.arTicketsType)];
        const ticketAdult = init.exManager.excursionData.arTicketsType.filter((item)=>{
            if(item.code === 'UT_ADULT') {return item;}
        });

        const ticketChild = init.exManager.excursionData.arTicketsType.filter((item)=>{
            if(item.code === 'UT_CHILD') {return item;}
        });

        if(ticketAdult.length > 0 && ticketChild.length > 0) {
            tickets = {"0":{"id" : ticketAdult[0].id, "count" : init.adultCount}, "1": {"id": ticketChild[0].id, "count": init.childrenCount}};
        }
    }

    const { isLoading, error, data, refetch } = useQuery(
        "reservation",
        () => init.excursion.reservation(
            init.payerName,            
            init.phone,
            init.email,
            init.groupId,
            init.gatheringId,
            init.adultCount,
            init.childrenCount,
            tickets,
            init.date.format("DD-MM-YYYY")
        ),
        {
            onSuccess: ({ data }) => {
                const res = handlerErrorsQuery(data, init, true);
                if(res) {
                    if(data.result.hasOwnProperty('paymentUrl') && !data.result.paymentUrl.hasOwnProperty('error')) {
                        init.dispatch(setPaymentLink(data.result.paymentUrl));
                        init.dispatch(setReservationId(data.result.id));
                        init.dispatch(setOrderId(data.result.orderId));
                        init.dispatch(setVerify());
                        init.dispatch(openSmsVerifyModal());
                        return true;
                    }

                    init.message.show(data.result, "error");
                }
                init.dispatch(closeSmsVerifyModal());
            },
            enabled:false
        }
    );

    return { isLoading, error, data, refetch };
}

export const useCancelReservation = () => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "cancel reservation",
        () => init.excursion.cancelReservation(init.reservationId),
        {
            onSuccess: ({ data }) => {},
            enabled:false
        }
    );

    return { isLoading, error, data, refetch };
}

export const useCheckAvaliableBooking = () => {
    const init = useInit();
    const check = async (excursionId, date, groupId) => {
       const data = await init.excursion.isAvaliableBooking(excursionId, date, groupId);
       if(handlerErrorsQuery(data.data, init) && handlerErrorsQuery(data.data.result, init)) {
            return data.data.result;
       }
       return false;
    }

    return {check};
}

export const useGetClosestQuota = () => {
    const init = useInit();
    const isAvaliableBooking = useCheckAvaliableBooking();
  
    const getQuota = async (excursionId = 0, changeCalendar = true, exIsPromo = false) => {

        if(excursionId <= 0) {
            excursionId = init.exManager.excursionData.id;
        }

        const data = await init.excursion.getClosestQuota(excursionId);
        if(handlerErrorsQuery(data.data, init) && handlerErrorsQuery(data.data.result, init)) {
            const result = data.data.result;
            let dateObj = new DateObject(result.date);
            let date = moment(dateObj.format('DD-MM-YYYY'), 'DD-MM-YYYY');

            init.dispatch(setClosestDate(date));
            init.dispatch(setClosestQuota(result));

            if(!init.dateList || exIsPromo) { 
                if(changeCalendar) {
                    init.dispatch(setCalendarValue(date));
                }
                // init.dispatch(setClosestDate(date));
                // init.dispatch(setClosestQuota(result));
            } else {
                const isAvaliable = await isAvaliableBooking.check(excursionId, moment(init.dateList).format('DD-MM-YYYY'), result.groupId);
                if(isAvaliable) {
                    init.dispatch(setCalendarValue(init.dateList)); 
                } else {
                    if(changeCalendar) {
                        init.dispatch(setCalendarValue(date));
                    }
                    // init.dispatch(setClosestDate(date));
                    // init.dispatch(setClosestQuota(result));
                }
            }

            return result;
        }

        return false;
    }

    return { getQuota };
}

export const useGetExcursionListByMapId = (mapId) => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "excursions by map id",
        () => init.excursion.getExcursionsByMapId(init.exManager.countPage, mapId),
        {
            onSuccess: ({ data }) => {
                if(handlerErrorsQuery(data, init) && handlerErrorsQuery(data.result, init)) {
                    init.dispatch(setExcursionList(data.result));
                    if(data.hasOwnProperty('next')) {
                        init.dispatch(setCountPage(data.next));
                    }

                    init.dispatch(countExcursions(data.result.length));
                }
            },
        }
    );

    return { isLoading, error, data, refetch };
}

export const useTypesNamesString = () => {
    const getTypesNames = (types) => {
        if(types) {
            const typeNames = Object.values(types).map((item)=> {
                return item.name;
            });
            return typeNames.join(', ').toLowerCase();
        }
        return false;
    }

    return [getTypesNames];
}

export const useCheckExcursionAvailableForReservation = () => {
    const init = useInit();
    const check = async (excursionId, date, quantityMonth = 3) => {
        const response = await init.excursion.checkExcursionAvailableForReservation(excursionId, date, quantityMonth);
        if(handlerErrorsQuery(response.data, init) && handlerErrorsQuery(response.data.result, init)) {
            if(response.data.result !== true) {
                init.dispatch(closeReservation());
                init.dispatch(disableBtnReservation());
            }

            return response.data.result;
        }

        return false;
    }

    return {check}
}