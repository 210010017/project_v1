var sheetName = "logdata"; // Replace "logdata" with the name of the sheet in which you want to log all the data user submitted
var sheetId = "161JFJiKLk5HDWLaT5DgvQIRtc0IpRvtPltOtLN5HSgE"; // Replace with ID of above sheet which you can obtain in the URL of the spreadsheet 
  
 /* ========== DO NOT EDIT THIS BELOW THIS LINE ========== */

function doGet(e){ 

  var doc = SpreadsheetApp.openById(sheetId);
  var sheet = doc.getSheetByName(sheetName); 
  var userEmail = e?.parameter?.uac;
  var val = e?.parameter?.val;
  var fbval = e?.parameter?.fbval;

  var timeZone = Session.getScriptTimeZone();
  var formattedDate = Utilities.formatDate(new Date(), timeZone, "dd-MM-yyyy HH:mm:ss");
  sheet.appendRow([userEmail,val,fbval,formattedDate]);
  
  if(val=="No"){
    sendEmailsFunction();
  }
  
}


function sendEmailsFunction(){

  var ws = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var templateFormat=SpreadsheetApp.openById(sheetId).getSheetByName("emailTemplate").getRange(1,1).getValue();

  var emailSubject = "Query submitted";
  var lr = ws.getLastRow(); 

  if(lr>1){
  
    var currentEmail = ws.getRange(lr,1).getValue();
    var currentCondition = ws.getRange(lr,2).getValue();
    var currentQuery = ws.getRange(lr,3).getValue();
    
    var emailBody = templateFormat.replace("{content}",currentQuery);
    
    if(currentCondition === "No"){
      MailApp.sendEmail(currentEmail, emailSubject, emailBody);
    }
                                                                                        
  }
  
}

