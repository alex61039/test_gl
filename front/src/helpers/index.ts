
export const countDay = (dayBD: string, coundDay:number) => {
    var currentDay = Date.now();
    var tableDate = Date.parse(dayBD);
    let temp = currentDay/(1000*60*60*24) + coundDay;

    const diff = (tableDate)/(1000 * 60 *60 *24) - temp;

    return diff;

}
