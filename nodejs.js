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

  if(isheader)
  {
    isheader=false;
    header=line.trim().split(",");
  }
  else {
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

      // if(jsonData[arr[4]]==undefined)
      // jsonData[arr[4]]={};
      //
      //
      //
      // jsonData[arr[4]][arr[3].split(".")[1]]=arr[5];



    }
  }



});

rd.on('close',function(){
  fs.writeFileSync('dataIndia.json',JSON.stringify(jsonData),'utf-8');
});
