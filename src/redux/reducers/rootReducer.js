import { combineReducers } from "@reduxjs/toolkit";
import { filterReducer } from "./filterReducer";
import { inputNumberReducer } from "./inputNumberReducer";
import { calendarReducer } from "./calendarReducer";
import { recommendReducer } from "./recommendReducer";
import { selectReducer } from "./selectReducer";
import { authReducer } from "./authReducer";
import { excursionReducer } from "./excursionReducer";
import { keyboardReducer } from "./keyboardReducer";
import { mapReducer } from "./mapReducer";
import { appReducer } from "./appReducer";
import { paymentReducer } from "./paymentReducer";
import { reservationReducer } from "./reservationReducer";
import { smsVerifyReducer } from "./smsVerifyReducer";
import { timerReducer } from "./timerReducer";
import { catalogReducer } from "./catalogReducer";
import { mainPageReducer } from "./mainPageReducer";

export const rootReducer = combineReducers({
    filter: filterReducer,
    calendar: calendarReducer,
    inputNumber: inputNumberReducer,
    select: selectReducer,
    authManager: authReducer,
    excursionManager: excursionReducer,
    recommend: recommendReducer,
    keyboard: keyboardReducer,
    map: mapReducer,
    app: appReducer,
    payment: paymentReducer,
    reservation: reservationReducer,
    smsVerify: smsVerifyReducer,
    timer: timerReducer,
    catalog: catalogReducer,
    mainPage: mainPageReducer
});