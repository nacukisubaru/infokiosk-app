import RestApi from "./restApi";

export default class settingsApi extends RestApi {
    constructor() {
        let method = "settings";
        super(method);
    }

    validatePhoneNumber = async (phone) => {
        return await this.sendRequest("validatePhoneNumber", {phone});
    }

    getSettingHelloScreenByType = async (type) => {
        return await this.sendRequest("getSettingHelloScreenByType", {type});
    }

    getSettingBannerTerminal = async (type) => {
        return await this.sendRequest("getSettingBannerTerminal", {type});
    }
}