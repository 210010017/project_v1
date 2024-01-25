function doGet(e){ 

  var adminEmail = "210010017@iitdh.ac.in"; // Replace with the eamil of owner of the above sheet
  var spreadSheeetID = "13zSkWEwU76c1EbppGtkkc_l4AxsccuKgrET1F2g97QU"; // Replace with ID of above spreadsheet which you can obtain in the URL of the spreadsheet   

 /* ========== DO NOT EDIT BELOW THIS LINE ========== */

  var userEmail = e?.parameter?.uac;
  var sheetName = e?.parameter?.fortable;
  var stringColumnNum = e?.parameter?.scn;

  var emailColumn = parseInt(stringColumnNum);

  var doc = SpreadsheetApp.openById(spreadSheeetID); 
  var sheet = doc.getSheetByName(sheetName); 
  var lastrow = sheet.getLastRow(); 
  var nofcols = sheet.getLastColumn();

  if(lastrow == 0 || nofcols == 0){
    return ContentService.createTextOutput(JSON.stringify({"reqData": []})).setMimeType(ContentService.MimeType.JSON);
  }

  var requestedData = [];

  var headings = sheet.getRange(1,1,1,nofcols).getValues();

  requestedData.push(...headings);
  Logger.log(requestedData);
  values = [];
  if(lastrow!=1){
    var range = sheet.getRange(2, 1, lastrow-1, nofcols); 
    values = range.getValues();
  }
  Logger.log(typeof values);

  
  if(userEmail === adminEmail){
    if(lastrow!=1){
      requestedData.push(...values);
    }
  } 
  else{
    if(values!=[]){
      var filteredValues = values.filter(function(r){

        if(r[emailColumn] == userEmail){
          return true;
        }
        else{
          return false;
        }

      });
      requestedData.push(...filteredValues);
    }
  }
  Logger.log(requestedData);


  return ContentService.createTextOutput(JSON.stringify({"reqData": requestedData})).setMimeType(ContentService.MimeType.JSON); 
  
}


