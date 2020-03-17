const now = new Date();
export const DateAndHour = convertToDate(now);
export const DefaultDuration = now.toISOString().slice(0,10); //Date Only

//For Line Chart
//startDate before 15 days of today date
export const fromDate = new Date(now.getTime() - 15*24*60*60*1000);

//Start day for month before 7 month of now
const today = new Date();
export const fromMonth = new Date (today.setMonth(today.getMonth() - 7));
export const dateStart = convertToDate(fromDate);
export const dateStartMonth = convertToDate(fromMonth);

export const fromYear = new Date (new Date().setFullYear(today.getFullYear() - 7));
export const dateStartYear = convertToDate(fromYear);


const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//return array of dates between start and end date
export function getDates(startDate,type, endDate = now) {
    const duration = endDate - startDate; //value in ms
    const dayInterval = 1000 * 60 * 60 * 24; // 1 day
    const steps = duration / dayInterval; //convert ms to days
    const dates = Array.from({length: steps}, (v,i) => new Date(startDate.valueOf() + (dayInterval * i)));

    if (type === 'day') {
    return dates.map(d=>(d.toISOString().slice(8,10)) +' '+ (monthNames[d.getMonth()]));
    }else if(type === 'month'){
        let months = dates.map(d=>(monthNames[d.getMonth()]));
        return months.filter((m,i)=>months.indexOf(m) === i);
    }else{
        let years = dates.map(d=> d.getFullYear());
        return years.filter((y,i)=>years.indexOf(y)===i);
    }
}


function convertToDate(date) {
    return date.toISOString().slice(0,19).replace("T", " ");
}