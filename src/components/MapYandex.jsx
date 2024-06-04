/*REACT*/
import React, { useEffect } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { 
    setFilterObjects, 
    setFilterPlaces, 
    setSelectedPoint, 
    unsetFilterObjects, 
    unsetFilterPlaces, 
    toggleMapBaloon, 
    setNewCenter,
    setYmaps,
    closeMapBaloon,
    openModalStay
} from '../redux/actions';

/*MUI*/
import { Box, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import MapBaloon from './MapBaloon';

/*ICONS*/
import pointBlue from '../assets/images/blue-point.svg';
import pointGreen from '../assets/images/green-point.svg';

export const useStyles = makeStyles((theme) => ({
    mapFilter: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 80,
        background: theme.palette.primary.grey,
        zIndex: 1
    },
    mapFilterItem: {
        '&:not(:last-of-type)': {
            marginRight: 60
        }        
    },
    hideBlock: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 300, 
        height: 30,
        zIndex: 1
    }
}));

const MapYandex = ({ data }) => {  
    const dispatch = useDispatch();
    const ymapsObj = useSelector(state => state.map.ymaps);
    const mapCenter = useSelector(state => state.map.mapCenter);
    const newCenter = useSelector(state => state.map.newCenter);
    const points = useSelector(state => state.map.points);
    const filterPlaces = useSelector(state => state.map.filterPlaces);
    const filterObjects = useSelector(state => state.map.filterObjects);
    const balloon = useSelector(state => state.map.balloon);
    const gatheringPlaces = useSelector(state => state.map.gatheringPlaces)
    let result;

    const pointsList = data.isPopupSelect && gatheringPlaces ? gatheringPlaces : points.places;

    const getBounds = (ymaps, points) => {   
        const bounds = ymaps.util.bounds.fromPoints(points);
        return bounds;
    };

    const getPointsFromObj = (object) => {
        let pointsArray = [];
        for (let key in object) {
            for (let i = 0; i < object[key].length; i++) {
                if(object[key][i].coord) {
                    pointsArray.push(object[key][i].coord);
                }
            }
        }
        
        return pointsArray; 
    }

    const getPointsFromArray = (array) => {
        let pointsArray = [];
        if(array) {
            pointsArray = array.map(item => item.coord);
        }
        return pointsArray; 
    }

    useEffect(()=>{
        if(data.setTimer) {
            let myInterval = setInterval(() => {
            dispatch(openModalStay());
            }, 300000);
            return ()=> {
                clearInterval(myInterval);
            };
        }
    });

    const onPlacemarkClick = async (point) => {
        await dispatch(setSelectedPoint(point));   
        if (ymapsObj) result = ymapsObj.ymaps.util.bounds.getCenterAndZoom(getBounds(ymapsObj.ymaps, [point.coord]), [1070, 700]);     
        dispatch(setNewCenter(result));
        dispatch(toggleMapBaloon());
    }  
    
    const setCenterOnClose = () => {
        let pointsArray, result;
        if (data.objectPoints && data.placesPoints) {
            pointsArray = getPointsFromObj(points); 
        } else if (!data.objectPoints && data.placesPoints) {
            pointsArray = getPointsFromArray(points.places); 
        } else if (data.objectPoints && !data.placesPoints) {
            pointsArray = getPointsFromArray(points.objects);
        }
        if (ymapsObj) result = ymapsObj.ymaps.util.bounds.getCenterAndZoom(getBounds(ymapsObj.ymaps, pointsArray), [1070, 600]);
        dispatch(setNewCenter(result));
    }
    
    const onFilterClick = (e) => { 
        if (e.target.value === 'places') {
            dispatch(closeMapBaloon());
            dispatch(setFilterPlaces());
            dispatch(unsetFilterObjects());
            const pointsArray = getPointsFromArray(points.places);
            if (ymapsObj) result = ymapsObj.ymaps.util.bounds.getCenterAndZoom(getBounds(ymapsObj.ymaps, pointsArray), [1070, 600]);
            dispatch(setNewCenter(result));
        } else if (e.target.value === 'objects') {
            dispatch(closeMapBaloon());
            dispatch(setFilterObjects());
            dispatch(unsetFilterPlaces());
            const pointsArray = getPointsFromArray(points.objects);
            if (ymapsObj) result = ymapsObj.ymaps.util.bounds.getCenterAndZoom(getBounds(ymapsObj.ymaps, pointsArray), [1070, 600]);
            dispatch(setNewCenter(result));
        } else {
            dispatch(closeMapBaloon());
            dispatch(setFilterPlaces());
            dispatch(setFilterObjects());
            const pointsArray = getPointsFromObj(points);
            if (ymapsObj) result = ymapsObj.ymaps.util.bounds.getCenterAndZoom(getBounds(ymapsObj.ymaps, pointsArray), [1070, 600]);
            dispatch(setNewCenter(result));
        }     
    }

    const classes = useStyles();  

    return (
        <>
            <YMaps query={{ lang: "ru_RU", load: "package.full" }} >
                <Map 
                    onLoad={ymaps => {
                        dispatch(setYmaps({ ymaps }));
                        if (points.places.length > 0 || points.objects.length > 0) {
                            let pointsArray, resultNew;
                            if (data.objectPoints && data.placesPoints) {
                                pointsArray = getPointsFromObj(points); 
                            } else if (!data.objectPoints && data.placesPoints) {
                                pointsArray = getPointsFromArray(points.places); 
                            } else if (data.objectPoints && !data.placesPoints) {
                                pointsArray = getPointsFromArray(points.objects);
                            }
                            if (ymaps) resultNew = ymaps.util.bounds.getCenterAndZoom(getBounds(ymaps, pointsArray), [1070, 600]);
                            dispatch(setNewCenter(resultNew));
                        }                        
                    }}
                    state={{ center: newCenter.center, zoom: data.zoom ? data.zoom : newCenter.zoom, controls: [] }}
                    defaultState={{ center: mapCenter, zoom: data.zoom ? data.zoom : 5, controls: [] }} 
                    width={ '100%' }
                    style={{ 
                        overflow: 'hidden', 
                        height: 740, 
                        position: 'relative'
                    }}
                    options={{
                        minZoom: 8,
                        maxZoom: 18,
                        suppressMapOpenBlock: true
                    }}
                >
                    <ZoomControl options={{ float: 'right' }} />
                    {(data.placesPoints && filterPlaces) &&
                        pointsList.map((point) => {
                            if(point !== {}) {
                                return (
                                    <Placemark 
                                        key={ point.id } 
                                        geometry={ point.coord } 
                                        properties={{
                                            iconContent: `<div style="width: 42px; height: 42px; color: #0085FF; font-weight: 700; font-size: 18px; line-height: 42px; font-family: 'Montserrat', Arial, sans-serif;">${point.id}</div>`
                                        }}
                                        options={{ 
                                            iconLayout: 'default#imageWithContent', 
                                            iconImageSize: [42, 60], 
                                            iconImageOffset: [-21, -30],
                                            iconImageHref: pointBlue,
                                        }}
                                        onClick={ () => onPlacemarkClick(point) }
                                    />
                                )
                            }
                            return null;
                    })}  
                    {(data.objectPoints && filterObjects) &&
                        points.objects.map((point) => {
                            if(point !== {}) {
                                return (
                                    <Placemark 
                                        key={ point.id } 
                                        geometry={ point.coord } 
                                        options={{ 
                                            iconLayout: 'default#image', 
                                            iconImageSize: [42, 60], 
                                            iconImageOffset: [-21, -30],
                                            iconImageHref: pointGreen,
                                        }}
                                        onClick={ () => onPlacemarkClick(point) }
                                    />
                                )
                            }
                            return null;
                    })}  

                    {(data.filter && points.places.length > 0 && points.objects.length > 0) &&
                        <Box className={ classes.mapFilter }>
                            <Stack 
                                spacing={5} 
                                direction="row" 
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Stack 
                                    spacing={5} 
                                    direction="row" 
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    className="radio-button"
                                >                                    
                                    <input id="all" type="radio" value="all" name="points" className="radio-button__input" defaultChecked onClick={ (e) => onFilterClick(e) } />
                                    <label htmlFor="all" className="radio-button__label">Все точки</label>                                    
                                </Stack>
                                <Stack
                                    spacing={5} 
                                    direction="row" 
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <input id="points" type="radio" value="places" name="points" className="radio-button__input" onClick={ (e) => onFilterClick(e) } />
                                    <label htmlFor="points" className="radio-button__label">Места сбора</label>
                                </Stack>
                                <Stack
                                    spacing={5} 
                                    direction="row" 
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <input id="objects" type="radio" value="objects" name="points" className="radio-button__input" onClick={ (e) => onFilterClick(e) } />
                                    <label htmlFor="objects" className="radio-button__label">Объекты посещения</label>
                                </Stack>
                            </Stack>
                            {/* <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue="all"                            
                            >
                                <FormControlLabel 
                                    value="all" 
                                    control={<Radio onClick={ (e) => onFilterClick(e) } />} 
                                    label="Все точки" 
                                    className={ classes.mapFilterItem } 
                                />
                                <FormControlLabel 
                                    value="places" 
                                    control={<Radio onClick={ (e) => onFilterClick(e) } />} 
                                    label="Места сбора" 
                                    className={ classes.mapFilterItem } 
                                />
                                <FormControlLabel 
                                    value="objects" 
                                    control={<Radio onClick={ (e) => onFilterClick(e) } />} 
                                    label="Объекты посещения" 
                                    className={ classes.mapFilterItem } 
                                />
                            </RadioGroup> */}
                        </Box>   
                    }

                    { balloon && <MapBaloon btn={data.balloonBtn} onCloseHandler={ setCenterOnClose } /> }   

                    <div className={ classes.hideBlock }></div>   
                </Map>
            </YMaps>
        </>
    )
}

export default MapYandex;