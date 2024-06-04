import { SET_GATHERING_PLACES } from "../reducers/mapReducer"

export const setMapGatheingPlaces = (list) => dispath => {
    dispath({
        type: SET_GATHERING_PLACES,
        payload: list
    });
}