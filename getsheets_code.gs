function doGet(e){ 

  var spreadSheeetID = "13zSkWEwU76c1EbppGtkkc_l4AxsccuKgrET1F2g97QU"; // Replace with ID of above spreadsheet which you can obtain in the URL of the spreadsheet   

 /* ========== DO NOT EDIT BELOW THIS LINE ========== */

  var doc = SpreadsheetApp.openById(spreadSheeetID); 

  var sheets = doc.getSheets();
  var allSheets = [];

  Logger.log(sheets.length);
  
  for(var i =0; i < sheets.length; i++){
    allSheets.push(sheets[i].getName());
  }
  
  Logger.log(allSheets);
  allSheets = allSheets.sort().reverse();

  return ContentService.createTextOutput(JSON.stringify({"allS":allSheets})).setMimeType(ContentService.MimeType.JSON); 
  
}

