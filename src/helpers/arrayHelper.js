import imageForExcursion from "../assets/images/screen-main.jpg";
import RestApi from "../api/restApi";
import moment from "moment";

const host = new RestApi().host;

export const arrayPhotoMap = (arPhoto, defaultImg = imageForExcursion) => {
    let arrayPhotos = [];
    if(arPhoto && Array.isArray(arPhoto) && arPhoto.length > 0) {
        for(let inc in arPhoto) {
            arrayPhotos.push(host + arPhoto[inc]);
        }
    } else {
        if(arPhoto && arPhoto.length > 0) {
            arrayPhotos.push(host + arPhoto);
        } else {
            arrayPhotos.push(defaultImg);
        }
    }
    return arrayPhotos;
}

export const listMap = (list, promo = false, where = false) => {
    return list.map(element => {
        let img = '';
        if (where) {
            img = element.photo ? host + element.photo[0] : host + element.images[0] ? host + element.images[0] : host + element.previewPicture ? host + element.previewPicture : host + element.PREVIEW_PICTURE;
        } else {
            img = element.PREVIEW_PICTURE ? host + element.PREVIEW_PICTURE: element.previewPicture ? host + element.previewPicture : element.images.length > 0 ? host + element.images[0]: imageForExcursion;
        }

        let dateEventStr = "";
        const {id, title, name, detailText, text, sectionName, districtName, dateEvent, date1, date2, dateEndEvent, timeEvent, eventTypeName, excursionsQuan} = element;
        if(promo) {
            if(date1 && date2) {
                dateEventStr = moment(date1).format("DD.MM.YYYY") + "-" + moment(date2).format("DD.MM.YYYY");
            } else if(date1) {
                dateEventStr = moment(date1).format("DD.MM.YYYY");
            }
        } else {
            if(dateEndEvent && dateEvent) {
                dateEventStr = dateEvent + "-" + dateEndEvent;
            } else if(dateEvent) {
                dateEventStr = dateEvent;
            }
        }

        return {
            id,
            title: name ? name : title,
            description: detailText ? detailText : text,
            img: img,
            imgText: eventTypeName ? eventTypeName : sectionName ? sectionName : "",
            district: districtName ? districtName : "",
            promo: false,
            dateEvent: dateEventStr,
            timeEvent,
            excursionsQuan
        }
    });
}

export const arrayUniqueByKey = (array, key = 'id') => {    
    const arrayUniqueByKey = [...new Map(array.map(item =>
    [item[key], item])).values()];

    return  arrayUniqueByKey
}

export const arrayUnique = (array) => {
    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }
    
    return array.filter(onlyUnique);
}

export const sortArray = (array) => {
    const key = 'SORT';
    return array.sort((item1, item2) => {
        if (!Number(item1[key]) && Number(item2[key])) return 1;
        if (!Number(item2[key]) && Number(item1[key])) return -1;
        if (!Number(item2[key]) && !Number(item1[key])) return 0;
        return Number(item1[key]) - Number(item2[key]);        
    });
}