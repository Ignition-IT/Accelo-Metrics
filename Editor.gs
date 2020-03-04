//orchestration function to write data to the sheet
function getTicketVolume(startDate, endDate, type) {
  //set the active spreadsheet and sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Ticket Volume');
  //get the last filled row and column
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  //clear the selected range
  try {
    var range = sheet.getRange(2, 1, lastRow - 1, lastCol);
    range.clear()
  }
  //continue on error, e.g. there's no data currently in the range
  catch(err) {
  };
  
  var startTimestamp = startDate.getTime() / 1000;
  var endTimestamp = endDate.getTime() / 1000;
  var tempStartDate = startDate;
  
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //set offset to X days based on daily or weekly ticket count
  var offset = {
    "daily": 1,
    "weekly": 7
  };
  
  //set fist data row to 2 to preseve column headers
  var startRow = 2
  
  //loop through the given date range in daily or weekly incrments
  while (tempStartDate < endDate) {
    //create a Unix Timestamp from start date for the current timeframe (1 day or 1 week)
    var tempStartTimestamp = tempStartDate.getTime() / 1000;
    //create an end date either 1 day or 1 week later
    var tempEndDate = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate() + offset[type]);
    var tempEndTimestamp = tempEndDate.getTime() / 1000;

    //get opened and closed ticket counts for the given timeframe
    var openedTickets = countTickets("opened", tempStartTimestamp, tempEndTimestamp);
    var closedTickets = countTickets("closed", tempStartTimestamp, tempEndTimestamp);

    var dayName = days[tempStartDate.getDay()];
    var month = tempStartDate.getMonth() + 1;
    var day = tempStartDate.getDate();
    var year = tempStartDate.getFullYear();

    //create an object with the data to be pushed to the sheet
    var row = [[dayName, month + "/" + day + "/" + year, openedTickets, closedTickets]];
    //set a cell range the size of the row data
    var insertRange = sheet.getRange(startRow, 1, 1, row[0].length)
    //push the data to the new row
    insertRange.setValues(row);

    //set the new temp start date to the previous end date
    tempStartDate = tempEndDate;
    //add 1 to the row to which the next set of data will be pushed
    startRow ++;
  };
};
