// ex 01 :- Write a function to make string reverse
const reverseStr = (str) => {
  let reverseString = str.split("").reverse().join("");
  return reverseString;
};

// ex 02 :- write a JS function to check for palindrome
const isPalindrome = (str) => {
  return str === reverseStr(str);
};

// ex03: write a function that converts the date from number to string
const convertDateToStr = (date) => {
  let dateToString = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateToString.day = "0" + date.day;
  } else {
    dateToString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateToString.month = "0" + date.month;
  } else {
    dateToString.month = date.month.toString();
  }

  dateToString.year = date.year.toString();

  return dateToString;
};

// // ex-04: Write a JS function that takes a date and returns all variations of it

const getAllDateFormats = (date) => {
  let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

// // ex-05: write a function that checks palindrome for all the date formats
const checkPalindromeforAllDateFormats = (date) => {
  let listOfAlldateFormat = getAllDateFormats(date);
  let flag = false;

  for (let i = 0; i < listOfAlldateFormat.length; i++) {
    if (isPalindrome(listOfAlldateFormat[i])) {
      flag = true;
      break;
    }
  }
  return flag;
};

// // ex-06: find the next palindrome date, also how many days are in between

// check Leap Year

const isLeapYear = (year) => {
  if (year % 400 === 0 || year % 4 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  return false;
};

//  Find Next Date
const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let dayInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > dayInMonths[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return { day: day, month: month, year: year };
};

// After checking Leap Year and Next date we have to find Next Plaindrome Date

const getNextPalindromeDate = (startingDate) => {
  var ctr = 0;
  let nextDate = getNextDate(startingDate);

  while (true) {
    ctr++;
    let isPalindrome = checkPalindromeforAllDateFormats(nextDate);

    // If a palindrome is found, break the loop
    if (isPalindrome) {
      console.log("Palindrome found");
      break;
    }

    // Update nextDate using getNextDate for the next iteration
    nextDate = getNextDate(nextDate);
  }

  return [ctr, nextDate];
};

// step 2: Show Functionality on UI
let dateInputRef = document.querySelector("#bdy-input");
let showBtnRef = document.querySelector("#show-btn");
let showOutput = document.querySelector("#show-output");

const clickHandle = (e) => {
  let bdyStr = dateInputRef.value;
  if (bdyStr !== "") {
    let listOfDate = bdyStr.split("-");

    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    let isPalindrome = checkPalindromeforAllDateFormats(date);

    if (isPalindrome) {
      showOutput.innerText = "🥳🤩Yay! Your BirthDaY is Palindrome 🥳🤩";
    } else {
      let [ctr, nextDate] = getNextPalindromeDate(date);

      showOutput.innerText = `The next Palindrome Date is 
      ${nextDate.day}-${nextDate.month}-${nextDate.year} , You missed it by ${ctr} days😔😔`;
    }
  }
};

showBtnRef.addEventListener("click", clickHandle);
