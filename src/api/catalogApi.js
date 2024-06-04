import RestApi from "./restApi";

export default class catalogApi extends RestApi {
    constructor() {
        let method = "catalog";
        super(method);
        this.CATEGORY_WHERE_TO_GO = 101;
        this.CATEGORY_EVENTS = 105;
    }

    getElementById = async (id) => {
        return await this.sendRequest("getElement", {id});
    }

    getList = async (page, categoryId = 101, categoryList = [], districts = [], dateEvent = '', dateEventEquals = '', q = '', orderByDate = false, isEvent = false) => {

        if(categoryList.length > 0 && !isEvent) {
            categoryId = categoryList;
        }

        const query = {page, category_id: categoryId, district: districts, dateEvent, dateEventEquals, q};

        if(isEvent) {
            query.eventType = categoryList;
        }

        if(orderByDate) {
            query.orderByDate = 'asc';
        }

        return await this.sendRequest("getSearchObjectList", query);
    }

    getListByPromo = async (page, category_id = 101) => {
        return await this.sendRequest("getInteractiveMapListByPromo", {page, category_id, listLimit: 4});
    }

    getCategoriesWhereToGo = async() => {
        return await this.sendRequest("getInteractiveMapHierarchySectionList", {category_id: 101, returnSections: true})
    }

    searchInCatalogByName = async(q, category_id = 101, page = 1, dateEvent = '') => {
        return await this.sendRequest("searchByNameInMap", {q, category_id, page, dateEvent});
    }
    
    getEventTypes = async () => {
        return await this.sendRequest("getEventTypes");
    }

    globalSearch = async (q, page = 1) => {
        return await this.sendRequest("globalSearch", {q, page, actual: true});
    }

    getKassirRuUrlByEventId = async (eventId) => {
        return await this.sendRequest("getKassirRuUrlByEventId", {eventId});
    }
}