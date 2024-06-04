import RestApi from "./restApi";

export default class excursionsApi extends RestApi {
    constructor() {
        let method = "excursion";
        super(method);
        this.listLimit = 8;
    }

    getById = async (id) => {
        const result = await this.sendRequest("getById", {id}, "get");
        return result;
    }

    getList = async (page = 1, typeId = [], date = '', districtId = [], q = '') => {
        const result = await this.sendRequest("searchByName", {
            actual: true, 
            page, 
            listLimit: this.listLimit, 
            type: typeId, 
            date, 
            districtId,
            q
        });
        return result;
    }

    getListbyDate = async (page = 1, date) => {
        const result = await this.sendRequest("getList", {actual: true, page, listLimit: this.listLimit, date: date});
        return result;
    }

    getSearchList = async (page = 1, string) => {
        const result = await this.sendRequest("searchByName", {actual: true, q: string, page, listLimit: this.listLimit});
        return result;
    }

    getListByPromo = async (page = 1) => {
         return await this.sendRequest("getListByPromo", {isPromo: true, page,actual: true, listLimit: 4});
    }

    getFilterList = async (limit = 1000) => {
        const result = await this.sendRequest("getFilter", {pageSize: limit});
        return result;
    };

    getPrice = async (groupId, gatheringPlaceId, ticketsQuantity, date) => {
        return await this.sendRequest("getPrice", {groupId, gatheringPlaceId, ticketsQuantity, date});
    }

    getCancelRules = async (excursionId) => {
        return await this.sendRequest("getCancelRules", {excursionId});
    }

    reservation = async (fio = '', phone, email, group, gatheringId, adults, children, tickets, date) => {
        if(!fio) {fio = email}; 
        return await this.sendRequest("ExcursionReservation", {
            fio,
            phone,
            email,
            group,
            gatheringId,
            date,
            adults,
            children,
            source: 'KIOSK',
            comment: 'KIOSK',
            tickets
        });
    }

    checkBookingPayment = async (reservationId) => {
        return await this.sendRequest("checkBookingPayment", {reservationId});
    }

    getRemainingQuota = async (group, date) => {
        return await this.sendRequest("getRemainingQuota", {group, date});
    }

    cancelReservation = async (id) => {
        return await this.sendRequest("cancelReservation", {id});
    }

    getClosestQuota = async (excursionId) => {
        return await this.sendRequest("getClosestQuota", {excursionId});
    }

    getExcursionsByMapId = async (page, mapId) => {
        return await this.sendRequest("getExcursionListByMapIds", {mapId, page, actual:true});
    }

    getAvaliableGroupsByQuota = async(excursionId, date) => {
        return await this.sendRequest("getAvailableGroups", {excursionId, date});
    }

    isAvaliableBooking = async(excursionId, date, groupId) => {
        const result = await this.sendRequest("checkBookingAvailableNow", {excursionId, date, groupId});
        return result;
    }

    checkExcursionAvailableForReservation = async(excursionId, date, quantityMonth) => {
        const result = await this.sendRequest("checkExcursionAvailableForReservation", {excursionId, date, quantityMonth});
        return result;
    }
}