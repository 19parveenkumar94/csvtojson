var fs=require('fs');
var readline=require('readline');
var rd= readline.createInterface({
  input:fs.createReadStream('./Indicators.csv')
});
var isheader=true;
var header=[];
var jsonData=[];
var country=["Arab World","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China","Cyprus","Egypt Arab Rep.","India","Indonesia","Iran Islamic Rep.","Iraq","Israel","Japan","Jordan","Kazakhstan","Korea Dem. Rep.","Korea Rep.","Kuwait","Kyrgyz Republic","Lao PDR","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","Oman","Pakistan","Philippines","Qatar","Saudi Arabia","Singapore","Sri Lanka","Syrian Arab Republic","Tajikistan","Thailand","Timor-Leste","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen Rep."];




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
  if(country.indexOf(arr[0])!=-1&&arr[3]=='SP.POP.TOTL')
  {
    if(jsonData.length==0)
    {

      temp[arr[4]]=[];
      temp[arr[4]].push({'country':arr[0],'total':arr[5]});
      jsonData.push(temp);


    }

  }


   }

 });
function find( json,country)
{

}
rd.on('close',function(){



console.log(jsonData);
 //fs.writeFileSync('dataasiasumall.json',JSON.stringify(jsonData),'utf-8');

});
