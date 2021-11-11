// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
   return array.map(function(row) {
       return createEmployeeRecord(row)
   })
}
// array = [
//     [],
//     []
// ];

let createTimeInEvent = function(employeeObject, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
 
    employeeObject.timeInEvents.push({
        type: `TimeIn`,
        hour: parseInt(hour, 10),
        date
    })
    
    return employeeObject
}

let createTimeOutEvent = function (employeeObject, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
 
    employeeObject.timeOutEvents.push({
        type: `TimeOut`,
        hour: parseInt(hour, 10),
        date
    })
    
    return employeeObject
}

function hoursWorkedOnDate (employeeObject, date) {
    let timeIn = employeeObject.timeInEvents.find(function(e) {
        return e.date === date
    })
    let timeOut = employeeObject.timeOutEvents.find(function(e) {
        return e.date === date
    })
    return (timeOut.hour - timeIn.hour)/ 100
}

function wagesEarnedOnDate ( employeeObject, date) {
    let wages = hoursWorkedOnDate(employeeObject, date) * employeeObject.payPerHour
    return parseInt(wages.toString())
}

let allWagesFor = function(employeeObject) {
    let eligibleDates = employeeObject.timeInEvents.map(function(e) {
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employeeObject, d)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(array, firstName) {
    return array.find(function(rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(array) {
    return array.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}