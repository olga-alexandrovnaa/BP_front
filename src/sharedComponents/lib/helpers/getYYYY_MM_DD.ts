import { format } from "date-fns";

export const getYYYY_MM_DD = (date: Date = new Date()): string => {
    return  `${format(date, 'yyyy-MM-dd')}`
}
