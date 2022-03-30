// const getTimeFromTimeValue = (value) => {
//     let utc = new Date();
//     console.log(utc.getTimezoneOffset());
//     utc = utc.getTime() + (((utc.getTimezoneOffset()*60) + parseInt(value))*1000);
//     return new Date(utc).toLocaleTimeString();
// }

const getTimeFromTimeValue = (value) => new Date(new Date().getTime() + (((new Date().getTimezoneOffset()*60) + parseInt(value))*1000));

console.log(getTimeFromTimeValue(3600));



