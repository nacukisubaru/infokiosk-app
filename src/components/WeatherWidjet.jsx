/*REACT*/
import React, { useEffect, useState } from 'react';

/*MUI*/
import { Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*ICONS*/
import imgCloudy from '../assets/images/cloudy.svg';
import imgCloud from '../assets/images/cloud.svg';
import imgRain from '../assets/images/rain.svg';
import imgSun from '../assets/images/sun.svg';
import imgSnow from '../assets/images/snow.svg';
import imgStorm from '../assets/images/storm.svg';
import imgClearN from '../assets/images/clear-n.svg';
import imgSnowRain from '../assets/images/snow-rain.svg';
import imgFog from '../assets/images/fog.svg';
import imgIce from '../assets/images/ice.svg';

export const useStyles = makeStyles((theme) => ({
    temp: {
        marginLeft: 6,
        fontSize: 24,
    }
}));

export default function WeatherWidjet() {
    const [temp, setTemp] = useState('');
    const [weather, setWeather] = useState('');
    const classes = useStyles();

    useEffect(() => {
        const weatherURL =
        "https://api.weatherapi.com/v1/current.json?key=0dd4a202276341ad86b31519220306&q=Sochi&lang=ru&aqi=yes"; 
        // const weatherURL =
        // "https://api.openweathermap.org/data/2.5/weather?lat=43.6&lon=39.7303&lang=ru&units=metric&appid=c65663d6fe2ed86afbda81a43193c201";

        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                setTemp(data.current.temp_c);
                setWeather(data.current.condition.text);
                // setTemp(data.main.temp);
                // setWeather(data.weather[0].description);
            })

        let myInterval = setInterval(() => {
            fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                setTemp(data.current.temp_c);
                setWeather(data.current.condition.text);
                // setTemp(data.main.temp);
                // setWeather(data.weather[0].description);
            })
        }, 3600000);
        return ()=> {
            clearInterval(myInterval);
        };        
    }, []);

    const setWeatherImg = () => {
        switch (weather) {
            case 'Облачно':
            case 'Переменная облачность':
                return <img src={imgCloudy} alt="" width="40" height="40" />
            case 'Пасмурно':
                return <img src={imgCloud} alt="" width="40" height="40" />
            case 'Солнечно':
                return <img src={imgSun} alt="" width="40" height="40" />
            case 'Ясно':
                return <img src={imgClearN} alt="" width="40" height="40" />
            case 'Местами дождь':
            case 'Местами замерзающая морось':
            case 'Местами слабая морось':
            case 'Слабая морось':
            case 'Замерзающая морось':
            case 'Сильная замерзающая морось':
            case 'Местами небольшой дождь':
            case 'Небольшой дождь':
            case 'Временами умеренный дождь':
            case 'Умеренный дождь':
            case 'Временами сильный дождь':
            case 'Сильный дождь':
            case 'Слабый переохлажденный дождь':
            case 'Умеренный или сильный переохлажденный дождь':
            case 'Небольшой ливневый дождь':
            case 'Умеренный или сильный ливневый дождь':
            case 'Сильные ливни':
                return <img src={imgRain} alt="" width="40" height="40" />
            case 'Местами грозы':
            case 'В отдельных районах местами небольшой дождь с грозой':
            case 'В отдельных районах умеренный или сильный дождь с грозой':
            case 'В отдельных районах местами небольшой снег с грозой':
            case 'В отдельных районах умеренный или сильный снег с грозой':
                return <img src={imgStorm} alt="" width="40" height="40" />
            case 'Поземок':
            case 'Местами снег':
            case 'Метель':
            case 'Местами небольшой снег':
            case 'Небольшой снег':
            case 'Местами умеренный снег':
            case 'Умеренный снег':
            case 'Местами сильный снег':
            case 'Сильный снег':
            case 'Умеренный или сильный снег':
                return <img src={imgSnow} alt="" width="40" height="40" />
            case 'Местами дождь со снегом':
            case 'Небольшой дождь со снегом':
            case 'Умеренный или сильный дождь со снегом':
            case 'Небольшой ливневый дождь со снегом':
            case 'Умеренные или сильные ливневые дожди со снегом':
                return <img src={imgSnowRain} alt="" width="40" height="40" />
            case 'Дымка':
            case 'Туман':
            case 'Переохлажденный туман':
                return <img src={imgFog} alt="" width="40" height="40" />
            case 'Ледяной дождь':
            case 'Небольшой ледяной дождь':
            case 'Умеренный или сильный ледяной дождь':
                return <img src={imgIce} alt="" width="40" height="40" />
            // case 'облачно с прояснениями':
            // case 'небольшая облачность':
            // case 'переменная облачность':
            //     return <img src={imgCloudy} alt="" width="40" height="40" />
            // case 'пасмурно':
            //     return <img src={imgCloud} alt="" width="40" height="40" />
            // case 'ясно':
            //     return <img src={imgSun} alt="" width="40" height="40" />
            // case 'небольшой дождь':
            // case 'дождь':
            //     return <img src={imgRain} alt="" width="40" height="40" />
            // case 'гроза':
            //     return <img src={imgStorm} alt="" width="40" height="40" />
            // case 'снег':
            //     return <img src={imgSnow} alt="" width="40" height="40" />
            default:
                return <img src={imgCloudy} alt="" width="40" height="40" />
        }
    };

    return (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            { setWeatherImg() }
            <Typography variant="body1" className={ classes.temp }>{ Math.round(temp) }&deg;</Typography>
        </Stack>
      </>
    );
} 