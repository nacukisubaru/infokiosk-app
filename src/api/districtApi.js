import RestApi from "./restApi";

export default class districtApi extends RestApi {
    constructor() {
        let method = "search";
        super(method);
    }

    getList = async (type = 'EXCURSIONS') => {
       return await this.sendRequest("getGeozoneList", {type});
    }
}