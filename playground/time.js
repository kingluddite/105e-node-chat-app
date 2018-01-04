const moment = require('moment');
// Jan 1st 1970 00:00:00 am

// const date = new Date();
// console.log(date);
// console.log(date.getMonth());

const createdAt = moment().valueOf();
const date = moment(createdAt);
console.log(date.format('h:mm a')); // Jan 2018
