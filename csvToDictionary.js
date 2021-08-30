var htmlPages;
//convert CSV file to dictionary row={colHeading:colCellValue}
function csvToDictionary(csvdata) {
  var allRows = csvdata.split(/\r\n|\n/);
  if(allRows.length===0){
    return {};
  }
  var data = [];
  var headers= allRows[0].split(",");
  for (var singleRow = 1; singleRow < allRows.length; singleRow++) {

    console.log(allRows[singleRow]);

    data.push({});//create new row
    var rowCellsStr = allRows[singleRow].toString();
    let charStr="";
    let strFound=false;
    let cellCount=0;
    for (var rowCell = 0; rowCell < rowCellsStr.length; rowCell++) {
        let charValue=rowCellsStr[rowCell];
        if(charValue=='"'){ //if cell is string value
            if(strFound){
                strFound=false;
            }else{
                strFound=true;
            }
            
        }else if(charValue=="," && strFound==false){  //store value value when read to the end of the cell value
             const key=headers[cellCount];
             const value=charStr;
             data[singleRow-1][key]=value;
             charStr="";
             ++cellCount;
        }else{
            charStr=charStr.toString()+ charValue.toString();
           
        }
    }
  } 
  return data;
}
