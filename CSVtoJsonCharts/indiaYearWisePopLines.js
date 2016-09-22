var fs=require('fs');
var readline=require('readline');
var rd= readline.createInterface({
  input:fs.createReadStream('./Indicators.csv')
});
  var isheader=true;
  var header=[];
  var jsonData=[];
rd.on('line',function(line){
var temp={};
var arr=[];
//todo change the json structure to get the appropriate json
  if(isheader)
  {
    //getting header values
    isheader=false;
    header=line.trim().split(",");
  }
  else {
    //getting each line and appending each lines data to json
    arr=line.trim().split(",");
    if(arr[1]=='IND')
    {

        if(arr[3]=='SP.RUR.TOTL.ZS')
        {
          temp[header[4]]=arr[4];
          temp["Rural"]=arr[5];
          jsonData.push(temp);
        }
        if(arr[3]=='SP.URB.TOTL.IN.ZS')
        {
          var x=jsonData.pop();
          x["Urban"]=arr[5];
          jsonData.push(x);

        }





    }
  }



});
//writing data to file
rd.on('close',function(){
  fs.writeFileSync('dataIndia.json',JSON.stringify(jsonData),'utf-8');
});
