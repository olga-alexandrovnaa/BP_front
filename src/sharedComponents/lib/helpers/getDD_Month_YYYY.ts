import { format } from "date-fns";

const Months = {
    '1': 'января',
    '2': 'февраля',
    '3': 'марта',
    '4': 'апреля',
    '5': 'мая',
    '6': 'июня',
    '7': 'июля',
    '8': 'августа',
    '9': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря',
}

export const getDD_Month_NotReqYYYY = (date: Date = new Date(), withYear?: boolean): string => {

    const m = format(date, 'L');

    let monthStr = ''; 

    for (const [key, value] of Object.entries(Months)) {
        if(key === m) 
            monthStr = value;
    }

    if(withYear){
        return  `${format(date, 'dd')} ${monthStr} ${format(date, 'yyyy')}`
    }

    return  `${format(date, 'dd')} ${monthStr}`
}
