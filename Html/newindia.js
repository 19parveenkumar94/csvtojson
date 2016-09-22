var fs=require('fs');
var readline=require('readline');
var rd= readline.createInterface({
  input:fs.createReadStream('./Indicators.csv')
});
  var isheader=true;
  var header=[];
  var jsonData={};
  var ruralcheck=true;
  var urbancheck=true;
  var urban=[];
  var rural=[];
rd.on('line',function(line){
var temp={};
var arr=[];
//todo change the json structure to get the appropriate json
  if(isheader)
  {
    //getting header values
    isheader=false;
    header=line.trim().split(",");

    //console.log(header);
  }
  else {
    //getting each line and appending each lines data to json
    var linewithout= line.replace(/"[^"]+"/g, function (match) {return match.replace(/,/g, '');});

      arr=linewithout.trim().split(",");
    arr[0]=arr[0].replace(/["']/g,'');
    temp={};
    if(arr[0]=="India"){
      var index=header.indexOf("IndicatorCode");
      if(ruralcheck&&arr[index]=='SP.RUR.TOTL.ZS')
      {
        ruralcheck=false;
        jsonData[arr[index].split(".")[1]]=[];
        //console.log(Array.isArray(jsonData[arr[index].split(".")[1]]));
        //console.log(arr[index]);
      }
      if(urbancheck&&arr[index]=='SP.URB.TOTL.IN.ZS')
      {
        //console.log(arr[index]);
        urbancheck=false;
        jsonData[arr[index].split(".")[1]]=[];
          //console.log(typeof jsonData[arr[index].split(".")[1]]);
      }

      if(arr[index]=='SP.RUR.TOTL.ZS'||arr[index]=='SP.URB.TOTL.IN.ZS')
      {
        var start=header.indexOf("IndicatorCode");

      for(var i=start+1;i<header.length;i++)
      {
        var index=header.indexOf(header[i]);
        temp[header[i]]=arr[index];

      }
      if(arr[index]=='SP.RUR.TOTL.ZS')
      rural.push(temp);
      else if(arr[index]=='SP.URB.TOTL.IN.ZS')
      rural.push(temp);
      }


    }
  }




});
//writing data to file
rd.on('close',function(){

  console.log(rural)
  //fs.writeFileSync('dataNewIndia.json',JSON.stringify(jsonData),'utf-8');
});
