import img from "../../assets/images/map-item.jpg";

export const SET_SELECTED_POINT = "MAP/SET_SELECTED_POINT";
export const SET_FILTER_PLACES = "MAP/SET_FILTER_PLACES";
export const UNSET_FILTER_PLACES = "MAP/UNSET_FILTER_PLACES";
export const SET_FILTER_OBJECTS = "MAP/SET_FILTER_OBJECTS";
export const UNSET_FILTER_OBJECTS = "MAP/UNSET_FILTER_OBJECTS";
export const MAP_BALOON = "MAP/MAP_BALOON";
export const MAP_BALOON_CLOSE = "MAP/MAP_BALOON_CLOSE";
export const SET_FILTER_OBJECTS_DATA = "MAP/SET_FILTER_OBJECTS_DATA";
export const SET_FILTER_PLACES_DATA = "MAP/SET_FILTER_PLACES_DATA";
export const NEW_CENTER = "MAP/NEW_CENTER";
export const SET_PAGE_MAP_ACTIVE = "SET_PAGE_MAP_ACTIVE";
export const SET_YMAPS = "MAP/SET_YMAPS";
export const SET_GATHERING_PLACES = "SET_GATHERING_PLACES";

const initialState = {
    ymaps: null,
    mapCenter: [43.6, 39.7303],
    points: {
        places: [
            {
                id: 1,
                name: "Точка 1",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.592746, 39.774082],
                time: "14:09",
                img: img,
            },
            {
                id: 2,
                name: "Точка 2",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.591407, 39.78917],
                time: "14:09",
                img: img,
            },
            {
                id: 3,
                name: "Точка 3",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.587595, 39.761868],
                time: "14:09",
                img: img,
            },
            {
                id: 4,
                name: "Точка 4",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.584893, 39.757296],
                time: "14:09",
                img: img,
            },
            {
                id: 5,
                name: "Точка 5",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.58318, 39.767169],
                time: "14:09",
                img: img,
            },
        ],
        objects: [
            {
                id: 11,
                name: "Место 1",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.664794, 39.658879],
                time: "14:09",
                img: img,
            },
            {
                id: 22,
                name: "Место 2",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.643307, 39.788415],
                time: "14:09",
                img: img,
            },
            {
                id: 33,
                name: "Место 3",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.631293, 39.738779],
                time: "14:09",
                img: img,
            },
            {
                id: 44,
                name: "Место 4",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.560509, 39.782557],
                time: "14:09",
                img: img,
            },
            {
                id: 55,
                name: "Место 5",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.558694, 39.826774],
                time: "14:09",
                img: img,
            },
        ],
        gatheringPlaces: [
            {
                id: 1,
                name: "Точка 1",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.592746, 39.774082],
                time: "14:09",
                img: img,
            },
            {
                id: 2,
                name: "Точка 2",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.591407, 39.78917],
                time: "14:09",
                img: img,
            },
            {
                id: 3,
                name: "Точка 3",
                address:
                    "Россия, Краснодарский край, Сочи, А-147, 186-й километр",
                coord: [43.587595, 39.761868],
                time: "14:09",
                img: img,
            },
        ],
    },
    selectedPoint: null,
    filterPlaces: true,
    filterObjects: true,
    balloon: false,
    newCenter: { center: [43.6, 39.7303], zoom: 12 },
    pageMapActive: false,
};

export const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_POINT:
            return { ...state, selectedPoint: action.payload };
        case SET_FILTER_PLACES:
            return { ...state, filterPlaces: true };
        case UNSET_FILTER_PLACES:
            return { ...state, filterPlaces: false };
        case SET_FILTER_OBJECTS:
            return { ...state, filterObjects: true };
        case UNSET_FILTER_OBJECTS:
            return { ...state, filterObjects: false };
        case MAP_BALOON:
            return { ...state, balloon: !state.balloon };
        case MAP_BALOON_CLOSE:
            return {...state, balloon: false};
        case SET_FILTER_OBJECTS_DATA:
            return {
                ...state,
                points: {
                    objects: action.payload,
                    places: state.points.places,
                },
            };
        case SET_FILTER_PLACES_DATA:
            return {
                ...state,
                points: {
                    places: action.payload,
                    objects: state.points.objects,
                },
            };
        case NEW_CENTER:
            return {
                ...state,
                newCenter: {
                    center: action.payload.center,
                    zoom: action.payload.zoom,
                },
            };
        case SET_PAGE_MAP_ACTIVE:
            return { ...state, pageMapActive: action.payload };
        case SET_YMAPS:
            return { ...state, ymaps: action.payload };
        case SET_GATHERING_PLACES:
            return {...state, gatheringPlaces: action.payload}
        default:
            return state;
    }
};
