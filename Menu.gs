//create a custom menu in Sheets to manually trigger scripts
function createMenu() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu('🎫 Ticket Volume')
  .addSubMenu(ui.createMenu('Daily')
              .addItem('Previous Week', 'getPreviousWeek')
              .addItem('Previous Month', 'getPreviousMonth')
              .addItem('Month To Date', 'getMonthToDate')
              .addItem('Last 30 Days', 'getLast30Days'))
  .addSubMenu(ui.createMenu('Weekly')
              .addItem('3 Months', 'get3Months')
              .addItem('6 Months', 'get6Months')
              .addItem('This Year', 'getThisYear')
  .addItem('Custom Range', 'getCustomRange')
  .addToUi();
};
