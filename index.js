// Your code here
function createEmployeeRecord(arr){
    let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour:arr[3],
        timeInEvents:[],
        timeOutEvents:[]

    } 
    return obj;

}

function createEmployeeRecords(arrOfArr){
    let arrOfObj = arrOfArr.map(createEmployeeRecord)
return arrOfObj;
}

function createTimeInEvent(empObj, dateStamp){
   let hour=dateStamp.substring(11)
   let date=dateStamp.substring(0,10)
       
    let NewObj={
        type:'TimeIn',
        hour:parseInt(hour),
        date:date
    }
    empObj.timeInEvents.push(NewObj)
    return empObj;
}

function createTimeOutEvent(empObj, dateStamp){
    let hour=dateStamp.substring(11)
    let date=dateStamp.substring(0,10)
    
     
    let NewObj={
         type:'TimeOut',
         hour:parseInt(hour),
         date:date
    }
    empObj.timeOutEvents.push(NewObj)
    return empObj;
}

function hoursWorkedOnDate(empObj,date){

    let arrIn =empObj.timeInEvents
    let arrOut=empObj.timeOutEvents

    function findObjWithDate(arrInOrOut){
        return arrInOrOut.date===date;
    }

    let clockInHr=arrIn.find(findObjWithDate).hour
    let clockOutHr=arrOut.find(findObjWithDate).hour

    let totalHrs=(clockOutHr-clockInHr)/100
    return totalHrs
}

function wagesEarnedOnDate(empObj, date){
     let wage = empObj.payPerHour*hoursWorkedOnDate(empObj,date)
    return wage    
}

function allWagesFor(empObj){

    let objArr=empObj.timeInEvents
    let dateArr=[]
    objArr.forEach(element=>{
      dateArr.push(element.date)
    })

    let wages = dateArr.reduce(function(total, element){
        return wagesEarnedOnDate(empObj, element) + total
    },0)

    return wages
}

function findEmployeeByFirstName(srcArray, fName){
   
  function isName(srcArray){
    return srcArray.firstName===fName
  }

  return srcArray.find(isName)    
}

function calculatePayroll(arrEmpRec){
    let payroll = arrEmpRec.reduce(function (total, element){
        return allWagesFor(element)+total
    },0)
    return payroll
}
 