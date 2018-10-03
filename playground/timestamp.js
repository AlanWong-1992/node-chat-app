// January 1st 1970 00:00:00 AM

var moment = require('moment');

var date = moment();

console.log(date.format('MMM YYYY'));

var someTimeStamp = moment();
console.log(`someTimeStamp: ${someTimeStamp}`);
console.log(`someTimeStamp: ${someTimeStamp.format('h:mm:ss a')}`)
