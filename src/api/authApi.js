import RestApi from "./restApi";

export default class authApi extends RestApi {
    constructor() {
        let path = "/rest_controller/mobile/";
        let method = "";
        super(method, path);
    }

    AuthUserByPhoneWithVerifyRequest = async (login, email, isRegister) => {
       return await this.sendRequest("AuthUserByPhoneWithVerifyRequest", {login, email, isRegister});
    }

    AuthUserByPhoneWithVerifyRequestStepTwo = async (phone, smscode) => {
        return await this.sendRequest("AuthUserByPhoneWithVerifyRequestStepTwo", {phone, smscode});
    }
}