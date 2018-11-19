//
// utility file to test time formatting using-moment lib.
//
const moment = require('moment');

/*
// Regular date time !! 
var date = new Date();

// returns from a 0-based array so will always be 1 less than actual month.
console.log(date.getMonth()); 
*/

// Using moment - the widely used lib.
var date = moment();
// Prints: Nov-2018-19
console.log(date.format('MMM-YYYY-Do'));
// Prints : Nov-2018-19th
console.log(date.format('MMM-YYYY-Do'));

//date.add(1,'year').subtract(11, 'months');
//date.subtract(11, 'months').add(2,'years');
console.log(date.format('MMM-YYYY-Do'));
/*
var date2 = moment();
console.log(date2.format('h:mm:ss a'));
*/

var createAt = 1234;
var date2 = moment(createAt);
console.log(date2.format('h:mm:ss a'));


var sometimeStamp = moment().valueOf();
console.log(sometimeStamp);
