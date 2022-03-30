const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//convert date to dayNames
export const dateToDay = date => dayNames[date.getDay()];

//convert date to monthnames 
export const dateToMonth = date => monthNames[date.getMonth()];

//format full date
export const dateToString = date => `${dateToDay(date)}, ${date.getDate()} ${dateToMonth(date)} ${date.getFullYear()}`;

//convert unix time to dayNames
export const unixToDay = unix => dateToDay(new Date(unix * 1000));

//get time from time value
export const getDateTimeFromTimezone = (value) => new Date(new Date().getTime() + (((new Date().getTimezoneOffset()*60) + parseInt(value))*1000));

//convert country code to country name
export const countryCodeToCountryName = (code) =>
    new Intl.DisplayNames(
        ['en'], { type: 'region' }
    ).of(code);
