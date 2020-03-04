//create a custom menu in Sheets to manually trigger scripts
//create a project trigger to run this function whenever the sheet is opened
function createMenu() {
  var ui = SpreadsheetApp.getUi();

  //create a custom menu name
  ui.createMenu('🎫 Ticket Volume')
  //add a submenu for daily increments
  .addSubMenu(ui.createMenu('Daily')
              .addItem('Previous Week', 'getPreviousWeek')
              .addItem('Previous Month', 'getPreviousMonth')
              .addItem('Month To Date', 'getMonthToDate')
              .addItem('Last 30 Days', 'getLast30Days'))
  //add a submenu for weekly increments
  .addSubMenu(ui.createMenu('Weekly')
              .addItem('3 Months', 'get3Months')
              .addItem('6 Months', 'get6Months')
              .addItem('This Year', 'getThisYear'))
  //add a menu item to trigger the custom range selector
  .addItem('Custom Range', 'getCustomRange')
  //push to the UI
  .addToUi();
}
