const axios = require("axios");
export default class PaymentApi {
    constructor(host = "") {
        this.host = "http://localhost:8000";

        if(host !== "") {
            this.host = host;
        }

        this.headers =  {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8000",            
        };
    }

    getPaymentCard = async (amount, command  = 4, count = 1, orderId) => {
        let result = {};

        const axiosObj = {
            method: 'get',
            url: this.host,
            params: {amount, command, count, orderId},
            headers: this.headers
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