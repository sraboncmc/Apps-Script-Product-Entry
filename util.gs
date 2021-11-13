  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }

  function render(file,argsObject){
    var tmp = HtmlService.createTemplateFromFile(file);
    if (argsObject){
      var keys = Object.keys(argsObject);
      keys.forEach(function(key){
        tmp[key] = argsObject[key];
      });
    }
    return tmp.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
//saving data on a Sheet name "status"
//Row A for staff name, Row B for product name
//Row C for purchase time, Row D for sale/return status
  function appendRow(d1,d2,d3,d4){
    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("status");
    var getLastRow = ws.getLastRow();
    ws.appendRow([d1,d2,d3,d4]);
    return 'ok';
  }

  //get product name for auto complete
  //using two list for get proper data related my work
  function getList(){
    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
    var list = ws.getRange(4,2,ws.getLastRow()-3,1).getValues();
    var list1 = ws.getRange(4,3,ws.getLastRow()-3,1).getValues();
    var list2 = [];
    var values = {};
    for (var i = 0; i<list.length;i++){
      list2.push(list[i]+"("+list1[i]+")");
    }
    return JSON.stringify(list2);
  }

  function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[arr[i]] = null;
    return rv;
  }

  //get money receipt number
  function getSerial(){
    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
    var getLastRow = ws.getLastRow();
    var serial = ws.getRange("A"+getLastRow).getValue();
    Logger.log((serial+1).toString());
    return (serial+1).toString();
  }

  function addOne(value){
    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
    var vl = value + 4;
    var serial = ws.getRange("I"+vl).getValue();
    //Logger.log((serial+1).toString());
    ws.getRange("I"+vl).setValue(serial+1);
  }

  function lessOne(value){
    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
    var vl = value + 4;
    var serial = ws.getRange("I"+vl).getValue();
    //Logger.log((serial-1).toString());
    ws.getRange("I"+vl).setValue(serial-1);
  }

//check product stock count by using product name
  function checkList(value){
    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
    var vl = value + 4;
    var serial = ws.getRange("J"+vl).getValue();
    return (serial).toString();
  }

  function test(){
    Logger.log(getData());
  }
