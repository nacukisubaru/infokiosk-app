import RestApi from "./restApi";

export default class policyApi extends RestApi {
    constructor() {
        let method = "policy";
        super(method);
    }

    getAgreement = async (type) => {
       return this.sendRequest("getAgreement", {type});
    }
}