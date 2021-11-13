  var Route = {};
  Route.path = function(route,callback){
    Route[route] = callback;
  }

  var user = '';

  function doPost(e){
    if (typeof e != 'undefined' && e.parameters.email != 'undefined'){
        var uname = e.parameters.email;var pswrd = e.parameters.password;
      let names = checkLogin(uname,pswrd);
      if (names[0] == 'TRUE'){
        user=uname;
        return render('dash',{name:uname.toString().toUpperCase(),hash:names[1]});
      }else{
        return render('index',{error:'Wrong ID or Password,please refresh this page for next try.'});
      }
    }else{
      return render('index',{error:''});
    }
  }


function doGet(e) {
  Logger.log('link:'+JSON.stringify(e));
  Logger.log('value:'+e.parameters.v+'='+ScriptApp.getService().getUrl());
  
  if (e.parameters.v == "form"){
    
  }else if (e.parameters.v == "out"){
    Logger.log('value: out');
    return render('index',{error:''});
  }else{
    Logger.log('value: else index');
    return render('index',{error:''});
  }
}
//using a sheet name "login" where username and password is loaded. 
//Row A for username and Row B for password
//Row C will save a login hash and Row D for saving last login time
function checkLogin(username, password){
  Logger.log('val:'+username+password);
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("login");
  var getLastRow = ws.getLastRow();
  var found_record = '';var hash='';
  for(var i = 1; i < getLastRow; i++){
    if (ws.getRange(i, 1).getValue().toString().toUpperCase() == username.toString().toUpperCase() && ws.getRange(i,2).getValue().toString().toUpperCase() == password.toString().toUpperCase()){
          found_record = 'TRUE';var d = new Date();
          var formattedDate = Utilities.formatDate(new Date(), "BST", "dd-MM-yy HH:mm:ss a");
          hash= createHash(ws.getRange(i, 1).getValue().toString()+d.toLocaleTimeString()+d.toDateString());
          ws.getRange(i,3).setValue(hash);
          ws.getRange(i,4).setValue(formattedDate);
        }
  }
  Logger.log('val:'+found_record+'='+getLastRow);
  if (found_record == ''){
    found_record = 'FALSE';
  }
  return [found_record,hash];
}


