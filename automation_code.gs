var adminEmail = "210010017@iitdh.ac.in";

var deployedBackendUrl = "https://script.google.com/macros/s/AKfycbyqTSbIBt8fciodsaEPbGCLtx3Wtfq9CjhG-Kf-JHgP1W_lHfMBIsT61z3mpBG5U2Nf/exec"; // Replace with webapp url obtained by deploying Backend appscript.

var deployedUpdatesUrl = "https://script.google.com/macros/s/AKfycbzNz8cqhRrY0ddWQHCNuaoDyUmedDFjOyR3C9SArCZ0g3PyjHEbbeX4VeOFV1CyBes/exec"; // Replace with webapp url obtained by deploying Updates appscript.

var deployedgetSheetsUrl="https://script.google.com/macros/s/AKfycbynHY4SIhdJGA8XBx0f5zuVstyi3JIG9lgoY6ax6tINsmRKGJsNd_5r62gAyg-8snW8/exec";


/* ==================== DO NOT EDIT BELOW THIS LINE ==================== */

var userEmail = Session.getActiveUser().getEmail();

function doGet(e){
  
  if(userEmail === adminEmail){
    return HtmlService.createTemplateFromFile("masterpage").evaluate().setTitle("MASTER PAGE");
  }
  else{
    return HtmlService.createTemplateFromFile("userpage").evaluate().setTitle("USER PAGE");
  }
  
}


function getData(sheetName,emailColumn){

  var stringColumnNum = emailColumn.toString();
  var response = UrlFetchApp.fetch(deployedBackendUrl+"?uac="+userEmail+"&fortable="+sheetName+"&scn="+stringColumnNum);
  var data = JSON.parse(response.getContentText()).reqData;
  
  return data;
  
}

function getSheetNames(){

  var response = UrlFetchApp.fetch(deployedgetSheetsUrl);
  var allS = JSON.parse(response.getContentText()).allS;
  Logger.log(allS);
  return allS;


}


function throwback(val,fb){
  UrlFetchApp.fetch(deployedUpdatesUrl+"?uac="+userEmail+"&val="+val+"&fbval="+fb);
}

