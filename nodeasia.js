var fs=require('fs');
var readline=require('readline');
var rd= readline.createInterface({
  input:fs.createReadStream('./Indicators.csv')
});
var isheader=true;
var header=[];
var jsonData={};
var count=0;
var country=["Arab World","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China","Cyprus","Egypt Arab Rep.","India","Indonesia","Iran Islamic Rep.","Iraq","Israel","Japan","Jordan","Kazakhstan","Korea Dem. Rep.","Korea Rep.","Kuwait","Kyrgyz Republic","Lao PDR","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","Oman","Pakistan","Philippines","Qatar","Saudi Arabia","Singapore","Sri Lanka","Syrian Arab Republic","Tajikistan","Thailand","Timor-Leste","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen Rep."];
var check=[];


rd.on('line',function(line){
var temp={};
var arr=[];

if(isheader)
{
  isheader=false;
  header=line.trim().split(",");
}
else {

var linewithout= line.replace(/"[^"]+"/g, function (match) {return match.replace(/,/g, '');});

  arr=linewithout.trim().split(",");
arr[0]=arr[0].replace(/["']/g,'');
 if(country.indexOf(arr[0].trim())!=(-1)&&(arr[3]=='SP.RUR.TOTL'||arr[3]=='SP.URB.TOTL'))
 {
   if(jsonData[arr[4]]==undefined)
   {
     jsonData[arr[4]]={};

   }

     if(jsonData[arr[4]][arr[0]]==undefined)
     {
       jsonData[arr[4]][arr[0]]={};

     }

        jsonData[arr[4]][arr[0]][arr[3].split(".")[1]]=arr[5];
   }

   }

 });

rd.on('close',function(){
  console.log(jsonData);
 fs.writeFileSync('dataasia.json',JSON.stringify(jsonData),'utf-8');

});
