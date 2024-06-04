/*REACT*/
import React, { useEffect, useRef } from "react";

/*REDUX*/
import { useSelector, useDispatch } from "react-redux";
import {
    setSelectData,
    closeSelectGroup,
    setValueSelectGroup,
    openSelectGroup,
    setActiveOptionGroup,
    setInputNumberValueAdult,
    setInputNumberValueChildren,
    setInputNumberValueTotal,
    setLayoutKeyboardEmail,
    closeModalCalendar,
    setCalendarValue,
    openModalCalendar,
    setDataPlaces,
    setPrevGroup,
    setPrevPlace,
    setChosenCalendarValue,
    setPaymentSum,
    setLimitPeople,
    setQuotasMessage,
    setLimitPeopleQuota,
    setDisabledBtnPlusAdult,
    setDisabledBtnPlusChild,
    setErrorEmailExist,
} from "../../redux/actions";
import {
    closeSelectPlaces,
    openSelectPlaces,
    setActiveOptionPlace,
    setCloseKeyboardEmail,
    setCloseKeyboardTel,
    setInputKeyboardEmail,
    setInputKeyboardTel,
    setOpenKeyboardEmail,
    setOpenKeyboardTel,
    setSelectedGroupId,
    setSelectedPlaceId,
    setValueSelectPlace,
} from "../../redux/actions";

/*HOOKS*/
import { useValidateEmail } from "../../hooks/authHooks";
import {
    useGetAvaliableGroupsByQuota,
    useGetClosestQuota,
    useGetRemainingQuota,
    usePrices,
} from "../../hooks/excursionHooks";

/*HELPERS*/
import { numWord, numberRuFormat } from "../../helpers/stringHelper";
import { getWeekDay } from "../../helpers/dateHelper";
import moment from "moment";

/*MUI*/
import { Typography, Grid, Box, Stack } from "@mui/material";

/*COMPONENTS*/
import SelectCustom from "../SelectCustom";
import InputDate from "../InputDate";
import InputPhone from "../InputPhone";
import InputCustom from "../InputCustom";
import InputNum from "../InputNumber";
import CheckboxPolicy from "../CheckboxPolicy";
import PopupNoQuot from "./PopupNoQuot";
import InputMessage from "../InputMessage";
import Loading from "../Loading";
import { toggleLoadingDataReservation } from "../../redux/actions/excursionActions";

export default function ExcursionForm({
    options,
    activeUserCallback = () => {},
}) {
    const keyboardRef = useRef();
    const inputNumberRef = useRef(null);
    const dispatch = useDispatch();
    const getPrices = usePrices().refetch;
    const getClosestDate = useGetClosestQuota().getQuota;
    const getAvaliableGroups = useGetAvaliableGroupsByQuota().getGroups;
    const getRemainingQuota = useGetRemainingQuota();
    const validateEmail = useValidateEmail();

    const exManager = useSelector((state) => state.excursionManager);
    const openGroup = useSelector((state) => state.select.openSelectGroup);
    const openPlace = useSelector((state) => state.select.openSelectPlaces);
    const popupDataGroup = useSelector(
        (state) => state.select.popupDataGroup.body
    );
    const popupDataPlaces = useSelector(
        (state) => state.select.popupDataPlaces.body
    );
    const valueGroup = useSelector((state) => state.select.valueSelectGroup);
    const groupId = useSelector((state) => state.select.selectGroupId);
    const valuePlaces = useSelector((state) => state.select.valueSelectPlace);
    const totalValueNum = useSelector((state) => state.inputNumber.valueTotal);
    const isShow = useSelector((state) => state.keyboard.showErrorEmail);
    const message = useSelector((state) => state.keyboard.errorEmail);
    const adultNum = useSelector((state) => state.inputNumber.valueAdult);
    const childrenNum = useSelector((state) => state.inputNumber.valueChildren);
    const adultPrice = useSelector(
        (state) => state.excursionManager.adultPrice
    );
    const childrenPrice = useSelector(
        (state) => state.excursionManager.childPrice
    );
    const inputEmail = useSelector((state) => state.keyboard.inputEmail);
    const maxChild = parseInt(
        useSelector((state) => state.excursionManager.excursionData.maxChildAge)
    );
    const minChild = parseInt(
        useSelector((state) => state.excursionManager.excursionData.minChildAge)
    );
    const adultAge = parseInt(maxChild) + 1;
    const listPlaces = useSelector((state) => state.select.listPlaces);
    const closestDate = useSelector((state) => state.calendar.closestDate);
    const dateCalendar = useSelector((state) => state.calendar.chosenValue);
    const stateLimitPeople = useSelector(
        (state) => state.inputNumber.limitPeople
    );
    const limitPeopleQuota = useSelector(
        (state) => state.inputNumber.limitPeopleQuota
    );
    const quotasMessage = useSelector(
        (state) => state.inputNumber.quotasMessage
    );
    const { daysOfWeek, periodsArray } = useSelector(
        (state) => state.excursionManager.excursionData
    );
    const isLoadingDataForReservation = useSelector(
        (state) => state.excursionManager.isLoadingDataForReservation
    );

    const handleOpenPlaces = () => {
        dispatch(setSelectData(selectPlaces.popupData));
        dispatch(openSelectPlaces());
    };
    const handleClosePlaces = () => {
        const idSelect = popupDataPlaces.filter(
            (item) => item.option === valuePlaces
        );
        dispatch(setSelectedPlaceId(idSelect[0].id));
        dispatch(setActiveOptionPlace(idSelect[0].id));
        dispatch(closeSelectPlaces());
    };
    const handleOptionPlaces = (id) => {
        dispatch(setActiveOptionPlace(id));
        dispatch(setSelectedPlaceId(id));
    };

    const handleOpenGroup = () => {
        dispatch(setSelectData(selectGroup.popupData));
        dispatch(openSelectGroup());
    };
    const handleCloseGroup = () => {
        const idSelect = popupDataGroup.filter(
            (item) => item.option === valueGroup
        );
        dispatch(setSelectedGroupId(idSelect[0].id));
        dispatch(setActiveOptionGroup(idSelect[0].id));
        dispatch(closeSelectGroup());
    };
    const handleOptionGroup = (id) => {
        dispatch(setActiveOptionGroup(id));
        dispatch(setSelectedGroupId(id));
    };

    useEffect(() => {
        if (listPlaces.length > 0) {
            const dataPlaces = listPlaces.filter(
                (item) => item.groupId === groupId
            );
            if (dataPlaces.length > 0) {
                dispatch(setSelectedPlaceId(dataPlaces[0].id));
                dispatch(setValueSelectPlace(dataPlaces[0].option));
                dispatch(setDataPlaces(dataPlaces));
            }
        }
    }, [groupId, dispatch, listPlaces]);

    // useEffect(() => {
    //     if (totalValueNum > 1) {
    //         checkQuotas();
    //     }
    // }, [checkQuotas, totalValueNum, stateLimitPeople]);

    const getLimitForInput = async (availableGroups, groupId) => {
        const remainingQuota = await getRemainingQuota.refetch();
        const remaining = remainingQuota.data.data.result.remaining;
        let limit = 0;
        for (let inc in availableGroups) {
            if (availableGroups[inc].id === groupId) {
                limit = availableGroups[inc].maxSize;
                if (remaining < availableGroups[inc].maxSize) {
                    limit = remaining;
                }
            }
        }
        return limit;
    };

    const handleSearchPriceGroup = async () => {
        const valueSelect = popupDataGroup.filter(
            (item) => item.active === true
        );
        const idSelect = popupDataGroup.filter(
            (item) => item.option === valueGroup
        );
        dispatch(setValueSelectGroup(valueSelect[0].option));
        dispatch(setPrevGroup(idSelect[0].id));
        const limit = await getLimitForInput(
            exManager.avaliableGroups,
            valueSelect[0].id
        );
        if (limit <= 1) {
            dispatch(setDisabledBtnPlusAdult(true));
            dispatch(setDisabledBtnPlusChild(true));
        } else {
            dispatch(setDisabledBtnPlusAdult(false));
            dispatch(setDisabledBtnPlusChild(false));
        }
        dispatch(setLimitPeople(limit));
        dispatch(setLimitPeopleQuota(limit - 1));
        await dispatch(setInputNumberValueAdult(1));
        await dispatch(setInputNumberValueChildren(0));
        dispatch(setInputNumberValueTotal());
        getPrices();
        dispatch(closeSelectGroup());
    };

    const handleSearchPricePlace = () => {
        const valueSelect = popupDataPlaces.filter(
            (item) => item.active === true
        );
        const idSelect = popupDataPlaces.filter(
            (item) => item.option === valuePlaces
        );
        dispatch(setValueSelectPlace(valueSelect[0].option));
        dispatch(setPrevPlace(idSelect[0].id));
        getPrices();
        dispatch(closeSelectPlaces());
    };

    const handleCancelChoiceGroup = () => {
        dispatch(setValueSelectGroup(popupDataGroup[0].option));
        dispatch(setActiveOptionGroup(popupDataGroup[0].id));
        dispatch(setSelectedGroupId(popupDataGroup[0].id));
        dispatch(setInputNumberValueAdult(1));
        dispatch(setInputNumberValueChildren(0));
        dispatch(setLimitPeopleQuota(stateLimitPeople - 1));
        dispatch(closeSelectGroup());
    };

    const handleCancelChoicePlace = () => {
        dispatch(setValueSelectPlace(popupDataPlaces[0].option));
        dispatch(setActiveOptionPlace(popupDataPlaces[0].id));
        dispatch(setSelectedPlaceId(popupDataPlaces[0].id));
        dispatch(setInputNumberValueAdult(1));
        dispatch(setInputNumberValueChildren(0));
        dispatch(setLimitPeopleQuota(stateLimitPeople - 1));
        dispatch(closeSelectPlaces());
    };

    let selectGroup = {
        label: "Группа*",
        value: valueGroup,
        placeholder: "Выберите группу",
        popupData: {
            title: "Выберите группу",
            body: popupDataGroup,
            open: openGroup,
            handlerOpen: handleOpenGroup,
            handlerClose: handleCloseGroup,
            optionHandler: handleOptionGroup,
            onClickModal: options.activateUser,
            searchHandler: () => handleSearchPriceGroup(),
            resetBtnFilterHandler: () => handleCancelChoiceGroup(),
            isCancel: true,
        },
    };

    let selectPlaces = {
        label: "Место сбора и время*",
        value: valuePlaces,
        placeholder: "Выберите место",
        popupData: {
            title: "Выберите место и время сбора",
            body: popupDataPlaces,
            open: openPlace,
            handlerOpen: handleOpenPlaces,
            handlerClose: handleClosePlaces,
            optionHandler: handleOptionPlaces,
            onClickModal: options.activateUser,
            searchHandler: () => handleSearchPricePlace(),
            resetBtnFilterHandler: () => handleCancelChoicePlace(),
            isCancel: true,
            includeMap: true,
            classNameTabs: "tabs-popup",
            balloonBtn: false,
        },
    };

    /*handler before dispath phone*/
    const handlerInputPhone = (phone, event) => {
        let isDispatch = true;
        if (event === "{bksp}") {
            if (phone === "+") {
                isDispatch = false;
            }
        }
        if (isDispatch) {
            return setInputKeyboardTel(phone);
        }
    };

    const updateGroupsAndSetLimitInput = async () => {
        if (dateCalendar !== "") {
            const groups = await getAvaliableGroups(
                exManager.excursionData.id,
                dateCalendar.format("YYYY-MM-DD"),
                true,
                true
            );
            if (groups) {
                const limit = await getLimitForInput(
                    groups,
                    groups[0].id
                );
                if (limit <= 1) {
                    dispatch(setDisabledBtnPlusAdult(true));
                    dispatch(setDisabledBtnPlusChild(true));
                } else {
                    dispatch(setDisabledBtnPlusAdult(false));
                    dispatch(setDisabledBtnPlusChild(false));
                }
                dispatch(setLimitPeople(limit));
                dispatch(setLimitPeopleQuota(limit - 1));
            }
        }
    }

    /*input date*/
    const optionsDate = {
        label: true,
        value: useSelector((state) => state.calendar.value),
        handleOpen: () => dispatch(openModalCalendar()),
        popupData: {
            open: useSelector((state) => state.calendar.openCalendar),
            handlerClose: () => {
                dispatch(closeModalCalendar());
                dispatch(setChosenCalendarValue(""));
            },
            onChangeHandler: (newValue) =>
                dispatch(setChosenCalendarValue(newValue)),
            resetHandler: async () => {
                await dispatch(toggleLoadingDataReservation(true));
                dispatch(setCalendarValue(closestDate));
                dispatch(closeModalCalendar());
                dispatch(setChosenCalendarValue(""));
                dispatch(setInputNumberValueAdult(1));
                dispatch(setInputNumberValueChildren(0));
                dispatch(setLimitPeopleQuota(stateLimitPeople - 1));
                await updateGroupsAndSetLimitInput();
                await dispatch(toggleLoadingDataReservation(false));
            },
            searchHandler: async () => {
                await dispatch(toggleLoadingDataReservation(true));
                if (dateCalendar !== "") {
                    await dispatch(setCalendarValue(dateCalendar));
                    await dispatch(setInputNumberValueAdult(1));
                    await dispatch(setInputNumberValueChildren(0));
                    await dispatch(setInputNumberValueTotal());
                    await updateGroupsAndSetLimitInput();
                }
                dispatch(closeModalCalendar());
                await dispatch(toggleLoadingDataReservation(false));
            },
            disableDates: true,
            onClickModal: options.activateUser,
        },
    };

    const searchPopupHandler = async () => {
        // const resClosestDate = await getClosestDate();
        // if (resClosestDate && resClosestDate.hasOwnProperty("date")) {
        //     let placeId = 0;
        //     if (resClosestDate.gatheringId) {
        //         placeId = resClosestDate.gatheringId;
        //     }
        //     await dispatch(setCalendarValue(closestDate));
        //     getAvaliableGroups(
        //         exManager.excursionData.id,
        //         resClosestDate.date,
        //         resClosestDate.groupId,
        //         placeId
        //     );
        // }
    };

    const resetPopupHandler = async () => {
        await dispatch(toggleLoadingDataReservation(true));
        const closestDate = await getClosestDate();
        await dispatch(setCalendarValue(moment(closestDate.date)));
        await dispatch(setChosenCalendarValue(moment(closestDate.date)));
        const availableGroups = await getAvaliableGroups(
            exManager.excursionData.id,
            closestDate.date,
            true,
            true
        );
        dispatch(setInputNumberValueAdult(1));
        dispatch(setInputNumberValueChildren(0));
        if (availableGroups) {
            const remainingQuota = await getRemainingQuota.refetch();
            const remaining = remainingQuota.data.data.result.remaining;

            let limit = 0;
            if (remaining < availableGroups[0].maxSize) {
                limit = remaining;
            } else {
                limit = availableGroups[0].maxSize;
            }
            dispatch(setLimitPeople(limit));
            if (limit >= 1) {
                dispatch(setDisabledBtnPlusAdult(false));
                dispatch(setDisabledBtnPlusChild(false));
            }
        }
        dispatch(toggleLoadingDataReservation(false));
    };

    useEffect(() => {
        //скрытие сообщения о квотах
        const onClick = (e) => {
            if (inputNumberRef.current) {
                if (
                    !inputNumberRef.current.contains(e.target) &&
                    quotasMessage
                ) {
                    dispatch(setQuotasMessage(false));
                }
            }
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [dispatch, quotasMessage]);

    /*input num*/
    const optionsNumAdult = {
        name: "adult",
        label: maxChild
            ? "Взрослых, от " + adultAge + " лет"
            : "Взрослых от 18 лет",
        min: 1,
        value: useSelector((state) => state.inputNumber.valueAdult),
        setValue: setInputNumberValueAdult,
        setValueTotal: setInputNumberValueTotal,
        disabledBtnMinus: useSelector(
            (state) => state.inputNumber.disabledBtnMinusAdult
        ),
        disabledBtnPlus: useSelector(
            (state) => state.inputNumber.disabledBtnPlusAdult
        ),
    };

    const optionsNumChild = {
        name: "children",
        label:
            minChild && !maxChild
                ? "Детей, от " + minChild + " до 17 лет"
                : !minChild && maxChild
                ? "Детей до " + maxChild + " лет"
                : minChild && maxChild
                ? "Детей, от " + minChild + " до " + maxChild + " лет"
                : "",
        min: 0,
        value: useSelector((state) => state.inputNumber.valueChildren),
        setValue: setInputNumberValueChildren,
        setValueTotal: setInputNumberValueTotal,
        disabledBtnMinus: useSelector(
            (state) => state.inputNumber.disabledBtnMinusChildren
        ),
        disabledBtnPlus: useSelector(
            (state) => state.inputNumber.disabledBtnPlusChildren
        ),
    };

    if (!minChild && !maxChild) {
        optionsNumChild.label = "Детей";
    }

    const handlerOnBlurInputEmail = () => validateEmail.goValidate(inputEmail);  

    /*input email*/
    const optionsInput = {
        name: "email",
        value: useSelector((state) => state.keyboard.inputEmail),
        placeholder: "Введите адрес электронной почты",
        label: "E-mail*",
        onClick: () => dispatch(setOpenKeyboardEmail()),
        onBlur: handlerOnBlurInputEmail,
        keyboard: {
            keyboardRef: keyboardRef,
            layout: useSelector((state) => state.keyboard.layoutEmail),
            input: useSelector((state) => state.keyboard.inputEmail),
            open: useSelector((state) => state.keyboard.openKeyboardEmail),
            closeHandler: setCloseKeyboardEmail,
            setInputValue: setInputKeyboardEmail,
            setLayout: setLayoutKeyboardEmail,
        },
        isShowError: isShow,
        message,
    };

    /*input phone*/
    const optionsNumber = {
        name: "phone",
        value: useSelector((state) => state.keyboard.inputTel),
        placeholder: "+7 (___) __ __ ___",
        label: "Номер телефона*",
        onClick: () => dispatch(setOpenKeyboardTel()),
        keyboard: {
            input: useSelector((state) => state.keyboard.inputTel),
            open: useSelector((state) => state.keyboard.openKeyboardTel),
            closeHandler: setCloseKeyboardTel,
            setInputValue: handlerInputPhone,
        },
    };

    const disableDates = (day) => {
        let dateInFormat = moment(day._d).format("YYYY-MM-DD");
        let date = new Date(day);
        const closestDateUnix = new Date(closestDate);

        if (
            (daysOfWeek.length > 0 && !daysOfWeek.includes(getWeekDay(date))) ||
            (periodsArray.length > 0 && !periodsArray.includes(dateInFormat))
        ) {
            return day;
        }
        if (date < closestDateUnix) {
            return day;
        }
    };

    useEffect(() => {
        const amount = adultPrice * adultNum + childrenPrice * childrenNum;
        dispatch(
            setPaymentSum(String(amount * 100))
        );
    }, [adultPrice, adultNum, childrenPrice, childrenNum, dispatch]);

    return (
        <>
            {!isLoadingDataForReservation ? (
                <>
                    <form>
                        <Box mb={10}>
                            <Stack
                                spacing={4}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                mb={7.5}
                            >
                                <InputDate
                                    options={optionsDate}
                                    disableDates={disableDates}
                                />
                                <Stack
                                    spacing={4}
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    sx={{ position: "relative" }}
                                    ref={inputNumberRef}
                                >
                                    <InputNum options={optionsNumAdult} />
                                    {exManager.childPrice ? (
                                        <InputNum options={optionsNumChild} />
                                    ) : (
                                        ""
                                    )}
                                    <InputMessage
                                        props={{
                                            message: `Осталось: ${limitPeopleQuota} ${numWord(
                                                limitPeopleQuota,
                                                ["место", "места", "мест"]
                                            )}`,
                                            isShow: quotasMessage,
                                            styles: {
                                                color: "#999999 !important",
                                                marginLeft: "0px !important",
                                            },
                                        }}
                                    />
                                </Stack>
                            </Stack>
                            <Grid
                                container
                                justifyContent="space-between"
                                spacing={5}
                                mb={7.5}
                            >
                                <Grid item xs={5}>
                                    <SelectCustom data={selectGroup} />
                                </Grid>
                                <Grid item xs={7}>
                                    <SelectCustom data={selectPlaces} />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                justifyContent="space-between"
                                spacing={5}
                                mb={7.5}
                            >
                                <Grid item xs={5}>
                                    <InputPhone
                                        options={optionsNumber}
                                        activeUserCallback={activeUserCallback}
                                    />
                                </Grid>
                                <Grid item xs={7}>
                                    <InputCustom
                                        options={optionsInput}
                                        activeUserCallback={activeUserCallback}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box mb={10}>
                            <Typography
                                variant="h6"
                                style={{ marginBottom: 30 }}
                            >
                                Cтоимость экскурсии
                            </Typography>

                            <Grid
                                container
                                mb={1.5}
                                justifyContent="space-between"
                            >
                                <Grid item xs={4}>
                                    <Typography variant="body1">
                                        Взрослый, от{" "}
                                        {maxChild ? parseInt(maxChild) + 1 : 18}{" "}
                                        лет
                                    </Typography>
                                </Grid>
                                {exManager.adultPrice > 0 && (
                                    <Grid item xs={8}>
                                        <Typography variant="h6">
                                            {numberRuFormat(
                                                exManager.adultPrice
                                            )}{" "}
                                            &#8381;
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>

                            <Grid container justifyContent="space-between">
                                {exManager.childPrice > 0 && (
                                    <>
                                        <Grid item xs={4}>
                                            <Typography
                                                variant="body1"
                                            >
                                                {!minChild &&
                                                    !maxChild &&
                                                    "Детский"}
                                                {minChild && !maxChild
                                                    ? "Детский, от " +
                                                      minChild +
                                                      " до 17 лет "
                                                    : !minChild && maxChild
                                                    ? "Детский до " +
                                                      maxChild +
                                                      " лет "
                                                    : minChild && maxChild
                                                    ? "Детский, от " +
                                                      minChild +
                                                      " до " +
                                                      maxChild +
                                                      " лет "
                                                    : ""}
                                            </Typography>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={8}
                                        >
                                            <Typography variant="h6">
                                                {numberRuFormat(
                                                    exManager.childPrice
                                                )}{" "}
                                                ₽
                                            </Typography>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Box>
                        {adultPrice > 0 && childrenPrice > 0 && (
                            <Box mb={7.5}>
                                <Grid
                                    container
                                    mb={1.5}
                                    justifyContent="space-between"
                                >
                                    <Grid item xs={6}>
                                        <Typography variant="h4">
                                            Итого к оплате:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h4">
                                            {numberRuFormat(
                                                adultPrice * adultNum +
                                                    childrenPrice * childrenNum
                                            )}{" "}
                                            ₽
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            включая налоги и сборы
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {adultNum > 0 && childrenNum > 0 && (
                                            <Typography variant="body1">
                                                за {adultNum}{" "}
                                                {numWord(adultNum, [
                                                    "взрослого",
                                                    "взрослых",
                                                    "взрослых",
                                                ])}{" "}
                                                и {childrenNum}{" "}
                                                {numWord(childrenNum, [
                                                    "ребёнка",
                                                    "детей",
                                                    "детей",
                                                ])}
                                            </Typography>
                                        )}

                                        {childrenNum <= 0 && (
                                            <Typography variant="body1">
                                                за {adultNum}{" "}
                                                {numWord(adultNum, [
                                                    "взрослого",
                                                    "взрослых",
                                                    "взрослых",
                                                ])}{" "}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                        <CheckboxPolicy />
                    </form>
                    <PopupNoQuot
                        searchHandler={searchPopupHandler}
                        getGroupHandler={resetPopupHandler}
                        onClickModal={options.activateUser}
                    />
                </>
            ): (<Loading />)}
        </>
    );
}
