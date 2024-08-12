# SearchLite
A lightweight, client-side search and discovery tool for displaying Google Sheet data on GitHub pages. Based on the [LACLI](https://lacli.info/) project.

## Required Google Apps Script
````
function doGet(request) {
  var spreadsheetId = '1v6xA8q23YJjS8koBD8Bq-233uaDfIyETA4RXHReUZkk'; // Replace with Google Sheet ID
  var sheetName = 'Sheet1'; // Replace with the sheet you want to retrieve data from
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var dataRange = sheet.getDataRange();
  var dataValues = dataRange.getValues();
  
  // Change the index from 0 to 2 to use row 3 as column headings
  var headers = dataValues[2];
  
  var rows = [];
  for (var i = 3; i < dataValues.length; i++) { // Start from row 4, as row 3 is the column headings
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = dataValues[i][j];
    }
    rows.push(row);
  }
  
  var output = JSON.stringify(rows);
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}
````
