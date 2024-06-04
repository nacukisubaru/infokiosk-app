export const hasActiveElementFiltersNested = (array, excludeArray) => {
    let isHaveActive = false;
    const filterIds = excludeArray.map(item => {
        return item.ID
    });

    array.map((item) => {
        if(!item.isAll && item.active && !filterIds.includes(item.ID)) {
            isHaveActive = true;
            return;
        }

        if(item.PARAMS && item.PARAMS.length > 0) {
            item.PARAMS.map((param) => {
                if(!param.isAll && param.active && !filterIds.includes(param.ID)) {
                    isHaveActive = true;
                    return;
                }
            })
        }
    });

    return isHaveActive;
}

export const hasActiveElementFilters = (array, excludeArray) => {
    let isHaveActive = false;
    const filterIds = excludeArray.map(item => {
        return item.ID
    });

    array.map((item) => {
        if(!filterIds.includes(item.ID) && item.active) {
            isHaveActive = true;
            return;
        }
    });

    return isHaveActive;
}

export const filterActiveCount = (array, excludeArray) => {
    let count = 0;
    const filterIds = excludeArray.map(item => {
        return item.ID
    });

    array.map((item) => {
        if(!item.isAll && item.active && !filterIds.includes(item.ID)) {
            count++;
        }
        if(item.PARAMS && item.PARAMS.length > 0) {
            item.PARAMS.map((param) => {
                if(!param.isAll && param.active && !filterIds.includes(param.ID)) {
                    count++;
                }
            });
        } 
    });

    return count;
}

export const getHtmlElementsWithFilter = (filterData, htmlCollection) => {
    let elements = htmlCollection.children && htmlCollection.children;
    let newElements = [];

    filterData.forEach(filter => {
        [...elements].forEach(element => {            
            if (element.innerText === filter.NAME) {
                newElements.push(element);
            }
        });        
    });

    return newElements;
}