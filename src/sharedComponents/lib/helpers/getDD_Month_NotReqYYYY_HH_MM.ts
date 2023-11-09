import { format } from "date-fns";

const Months = {
    '1': 'янв.',
    '2': 'фев.',
    '3': 'мар.',
    '4': 'апр.',
    '5': 'мая',
    '6': 'июня',
    '7': 'июля',
    '8': 'авг.',
    '9': 'сен.',
    '10': 'окт.',
    '11': 'ноя.',
    '12': 'дек.',
}

export const getDD_ShortMonth_NotReqYYYY_HH_MM = (date: Date = new Date(), withYear?: boolean): string => {

    const m = format(date, 'L');

    let monthStr = ''; 

    for (const [key, value] of Object.entries(Months)) {
        if(key === m) 
            monthStr = value;
    }

    if(withYear){
        return  `${format(date, 'dd')} ${monthStr} ${format(date, 'yyyy')} ${format(date, 'HH:mm')}`
    }
    return  `${format(date, 'dd')} ${monthStr} ${format(date, 'HH:mm')}`
}
