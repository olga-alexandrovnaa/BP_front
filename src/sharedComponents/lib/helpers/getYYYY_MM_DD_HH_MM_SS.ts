import { format } from "date-fns";

export const getYYYY_MM_DD_HH_MM_SS = (date: Date = new Date()): string => {
    return  `${format(date, 'yyyy-MM-dd HH:mm:ss')}`
}
