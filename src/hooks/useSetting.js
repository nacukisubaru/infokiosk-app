import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux"
import RestApi from "../api/restApi";
import settingsApi from "../api/settingsApi"
import { setEventBanner, setEventHeader, setEventSlogan, setWhereToGoBanner, setWhereToGoHeader, setWhereToGoSlogan } from "../redux/actions/catalogActions";
import { setHeader, setPageImage, setPageSlogan, setReservSuccessBanner, setReservSuccessHeader, setReservSuccessSlogan } from "../redux/actions/excursionActions";
import { setMainBanner, setMainSlogan } from "../redux/actions/mainPageActions";
import { useHandlerErrorsQuery } from "./appHooks";

const useInit = () => {
    const settings = new settingsApi();
    const dispatch = useDispatch();
    const handlerErrors = useHandlerErrorsQuery();

    return {settings, handlerErrors, dispatch};
}

export const useSettingHelloScreenByType = () => {
    const init = useInit();

    const get = async (type) => {
        return await init.settings.getSettingHelloScreenByType(type);
    }

    return {get};
}

export const useGetAllScreensForSlider = () => {
    const rest = new RestApi();
    const settingsScreen = useSettingHelloScreenByType();
    const [settings, setSettings] = useState({});

    useEffect(() => {

        const createSetting = (response) => {
            if (response) {
                if(response.data && response.data.result) {
                    if(response.data.result) {
                        const {photo, slogan, typeScreen} = response.data.result;
                        return {photo: rest.host + photo, slogan, typeScreen};
                    }
                }
            }            
        }

        const getSettings = async () => {
            const main = await settingsScreen.get('MAIN');
            const excursion = await settingsScreen.get('EXCURSION');
            const event = await settingsScreen.get('EVENTS');
            const whereToGo = await settingsScreen.get('WHERE_TO_GO');

            createSetting(main);
            createSetting(excursion);
            createSetting(event);
            createSetting(whereToGo);

            setSettings({
                main: createSetting(main),
                excursion: createSetting(excursion),
                event: createSetting(event),
                whereToGo: createSetting(whereToGo)
            });
        };
        
        getSettings();
    }, []);


    return settings;
}

export const useSettingBannerTerminal = () => {
    const init = useInit();
    useQuery(
        "setting main",
        () => init.settings.getSettingBannerTerminal('MAIN'),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    const res = data.result;
                    if(res.photo) {
                        init.dispatch(setMainBanner(res.photo));
                    }
                    if(res.slogan) {
                        init.dispatch(setMainSlogan(res.slogan));
                    }
                }
            },
        }
    );

    useQuery(
        "setting excursion",
        () => init.settings.getSettingBannerTerminal('EXCURSION'),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    const res = data.result;
                    if(res.photo) {
                        init.dispatch(setPageImage(res.photo));
                    }
                    if(res.slogan) {
                        init.dispatch(setPageSlogan(res.slogan));
                    }
                    if(res.header) {
                        init.dispatch(setHeader(res.header));
                    }
                }
            },
        }
    );

    useQuery(
        "settings events",
        () => init.settings.getSettingBannerTerminal('EVENTS'),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    
                    const res = data.result;
                    if(res.photo) {
                        init.dispatch(setEventBanner(res.photo));
                    }
                    if(res.slogan) {
                        init.dispatch(setEventSlogan(res.slogan));
                    }
                    if(res.header) {
                        init.dispatch(setEventHeader(res.header));
                    }
                }
            },
        }
    );

    useQuery(
        "settings where to go",
        () => init.settings.getSettingBannerTerminal('WHERE_TO_GO'),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    const res = data.result;
                    if(res.photo) {
                        init.dispatch(setWhereToGoBanner(res.photo));
                    }
                    if(res.slogan) {
                        init.dispatch(setWhereToGoSlogan(res.slogan));
                    }
                    if(res.header) {
                        init.dispatch(setWhereToGoHeader(res.header));
                    }
                }
            },
        }
    );

    useQuery(
        "setting succes ex reservation",
        () => init.settings.getSettingBannerTerminal('SUCCES_EX_RESERVATION'),
        {
            onSuccess: ({ data }) => {
                if (
                    !init.handlerErrors.error(data, false) &&
                    !init.handlerErrors.error(data.result, false)
                ) {
                    const res = data.result;

                    if(res.photo) {
                        init.dispatch(setReservSuccessBanner(res.photo));
                    }
                    if(res.slogan) {
                        init.dispatch(setReservSuccessSlogan(res.slogan));
                    }
                    if(res.header) {
                        init.dispatch(setReservSuccessHeader(res.header));
                    }
                }
            },
        }
    );
}