import {domain} from "../helpers/httpHelper";

const axios = require("axios");
export default class RestApi {
    constructor(method = "", path = "", host = "") {
        this.method = method;
        
        this.host = domain;
        this.path = "/rest/505/y7o79zyngbdk5qlp/uniqtrip_channelmanager.";

        if(host !== "") {
            this.host = host;
        }

        if(path !== "") {
            this.path = path;
        }
        
        this.url = this.host + this.path + this.method;

        this.headers =  {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
    }

    sendRequest = async (
        action,
        data = null,
        method = "post",
    ) => {
        let result = {};
        const axiosObj = {
            method: method,
            url: this.url + "?action="+ action,
            params: data
        };

        await axios(axiosObj)
            .then(function (response) {
                result = response;
            })
            .catch(function (error) {
                result = error.response;
            });
        return result;
    };
}