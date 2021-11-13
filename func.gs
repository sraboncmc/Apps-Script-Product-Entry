  function checkHash(hash){
    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    var getLastRow = ws.getLastRow();
    var found_record = '';
    for(var i = 1; i < getLastRow; i++){
      if (ws.getRange(i, 3).getValue().toString() == hash.toString()){
            found_record = 'OK';
          }
    }
    if (found_record == ''){
      found_record = 'FALSE';
    }
    return found_record;
  }

  function createHash(data){
    var hs = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5,data);
    return MD5(hs,true);
  }

  function toBinString (arr) {
      var uarr = new Uint8Array(arr.map(function(x){return parseInt(x,2)}));
      var strings = [], chunksize = 0xffff;
      // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
      for (var i=0; i*chunksize < uarr.length; i++){
          strings.push(String.fromCharCode.apply(null, uarr.subarray(i*chunksize, (i+1)*chunksize)));
      }
      return strings.join('');
  }

  function convertArrToString(rArr){
   //Step 1: Convert each element to character
   let tmpArr = new Array();
   rArr.forEach(function(element,index){
      tmpArr.push(String.fromCharCode(element));
  });
  //Step 2: Return the string by joining the elements
  return(tmpArr.join(""));
  }

  function convertArrToHexNumber(rArr){
    return(parseInt(convertArrToString(rArr),16));
  }
