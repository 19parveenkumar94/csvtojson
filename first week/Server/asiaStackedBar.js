
var fs=require('fs');
var readline=require('readline');
var rd= readline.createInterface({
  input:fs.createReadStream('./Indicators.csv')
});
var isheader=true;
var header=[];
var jsonData={};
var country=["Arab World","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China","Cyprus","Egypt Arab Rep.","India","Indonesia","Iran Islamic Rep.","Iraq","Israel","Japan","Jordan","Kazakhstan","Korea Dem. Rep.","Korea Rep.","Kuwait","Kyrgyz Republic","Lao PDR","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","Oman","Pakistan","Philippines","Qatar","Saudi Arabia","Singapore","Sri Lanka","Syrian Arab Republic","Tajikistan","Thailand","Timor-Leste","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen Rep."];
var check=[];
var urbancheck=true;
var ruralcheck=true;
rd.on('line',function(line){

var arr=[];

if(isheader)
{
  isheader=false;
  header=line.trim().split(",");
}
else {
//todo making static to dymnaic indexing
var linewithout= line.replace(/"[^"]+"/g, function (match) {return match.replace(/,/g, '');});

  arr=linewithout.trim().split(",");
arr[0]=arr[0].replace(/["']/g,'');

  var index=country.indexOf(arr[0]);

   var code=header.indexOf('IndicatorCode');

  if(index!=(-1))
  {
    if(arr[code]=='SP.RUR.TOTL')
    {
      if(ruralcheck==true)
      {
        ruralcheck=false;
        jsonData[arr[code].split(".")[1]]={};
      }
      var ins=jsonData[arr[code].split(".")[1]][country[index]];
      //console.log(ins);
      if(ins!=(undefined))
      {
        jsonData[arr[code].split(".")[1]][country[index]]=parseFloat(ins)+parseFloat(arr[5]);

      }
      else {

          jsonData[arr[code].split(".")[1]][country[index]]=parseFloat(arr[5]);

      }
    }
    if(arr[code]=='SP.URB.TOTL')
    {
      if(urbancheck==true)
      {
        urbancheck=false;
        jsonData[arr[code].split(".")[1]]={};
      }
      var ins=jsonData[arr[code].split(".")[1]][country[index]];
      //console.log(ins);
      if(ins!=(undefined))
      {
        jsonData[arr[code].split(".")[1]][country[index]]=parseFloat(ins)+parseFloat(arr[5]);

      }
      else {

          jsonData[arr[code].split(".")[1]][country[index]]=parseFloat(arr[5]);

      }
    }
  }

   }

 });

rd.on('close',function(){

  //console.log(jsonData);
 fs.writeFileSync('dataasiasum.json',JSON.stringify(jsonData),'utf-8');

});
