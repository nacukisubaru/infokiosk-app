const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export const getWeekDay = (date) => {
    return days[date.getDay()];
}

export const daysWeekStringToArray = (week) => {
    if(week === "Ежедневно") {
        return days;
    } else {
        return week.toUpperCase().replace(/\s/g, '').split(',');
    }
}