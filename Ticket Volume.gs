//timeframe functions that are triggered from the menu items
//daily

function getPreviousWeek() {
  var today = new Date();
  //set start date to Sunday 7 days ago
  var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7);
  //set end date to last Sunday
  var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  //run the editor function with the given timeframe
  getTicketVolume(startDate, endDate, "daily");
}

function getPreviousMonth() {
  var today = new Date();
  //set start date to last month
  var startDate = new Date(today.getFullYear(), today.getMonth() - 1);
  var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDate());
  getTicketVolume(startDate, endDate, "daily");
}

function getMonthToDate() {
  var today = new Date();
  var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDate() + 1);
  getTicketVolume(startDate, today, "daily");
};

function getLast30Days() {
  var today = new Date();
  var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
  getTicketVolume(startDate, today, "daily");
}

//weekly

function get3Months() {
  var today = new Date();
  var startDate = new Date(today.getFullYear(), today.getMonth() - 3);
  startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - startDate.getDay());
  getTicketVolume(startDate, today, "weekly");
}

function get6Months() {
  var today = new Date();
  var startDate = new Date(today.getFullYear(), today.getMonth() - 6);
  startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - startDate.getDay());
  getTicketVolume(startDate, today, "weekly");
}

function getThisYear() {
  var today = new Date();
  var startDate = new Date(today.getFullYear(), today.getMonth() - today.getMonth());
  startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - startDate.getDay());
  getTicketVolume(startDate, today, "weekly");
}

//custom range

//creates a popup dialog to pick a custom daterange
function getCustomRange() {
  //create an HTML output from the diateDialog.html file
  var html = HtmlService.createHtmlOutputFromFile('dateDialog')
  .setWidth(500)
  .setHeight(400);
  SpreadsheetApp.getUi()
  //create a dialog with the HTML output
  .showModalDialog(html, 'Choose a date range');
}

//function to be triggered from HTML popup dialog
function submitDates(startDateSelect, endDateSelect, type) {
  var startDate = new Date(startDateSelect);
  var endDate = new Date(endDateSelect);
  endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);
  getTicketVolume(startDate, endDate, type);
}
