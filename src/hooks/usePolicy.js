import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import policyApi from "../api/policyApi";
import { setAgreement, setAgreementEx, setPolicy } from "../redux/actions";

export const usePolicy = () => {
    const dispatch = useDispatch();
    
    const getAgreement = async (type) => {
       const policy = new policyApi();
       const result = await policy.getAgreement(type);

       if (result) {
            if(result.data && result.data.result && !result.data.result.error) {
                const agreement = result.data.result;
                const agreementObj = {name: agreement.NAME, text: agreement.AGREEMENT_TEXT};
                if(type === "publicOffer") {
                    dispatch(setAgreementEx(agreementObj));
                } else {
                    dispatch(setAgreement(agreementObj));
                }
            }    
       }       
    }
    
    useEffect(()=>{
        axios.get('https://visit-sochi.com/policy/include_ru.php').then((res) => {
            dispatch(setPolicy(res.data));
        });
       
       getAgreement();
       getAgreement("publicOffer"); 
    }, []);
}