
var fs=require('fs');
var readline=require('readline');
var rd= readline.createInterface({
  input:fs.createReadStream('./Indicators.csv')
});
var isheader=true;
var header=[];
var jsonData=[];
var country=["Arab World","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China","Cyprus","Egypt Arab Rep.","India","Indonesia","Iran Islamic Rep.","Iraq","Israel","Japan","Jordan","Kazakhstan","Korea Dem. Rep.","Korea Rep.","Kuwait","Kyrgyz Republic","Lao PDR","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","Oman","Pakistan","Philippines","Qatar","Saudi Arabia","Singapore","Sri Lanka","Syrian Arab Republic","Tajikistan","Thailand","Timor-Leste","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen Rep."];
var check=[];
var rural=[];
var urban=[];

for(var i=0;i<country.length;i++)
{
  rural[i]=0;
  urban[i]=0;
}

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
  if(index!=(-1))
  {
    if(arr[3]=='SP.RUR.TOTL')
    {
      rural[index]+=parseFloat(arr[5]);
    }
    if(arr[3]=='SP.URB.TOTL')
    {
      urban[index]+=parseFloat(arr[5]);
    }

  }

   }

 });

rd.on('close',function(){
  for(var i=0;i<country.length;i++)
  {
  var temp={};
  temp["country"]=country[i];
  temp["rural"]=rural[i]/55;
  temp["urban"]=urban[i]/55;
  temp["total"]=(urban[i]+rural[i])/55;
  jsonData.push(temp);

  }
  jsonData.sort(function(a,b){
    return b["total"]-a["total"];
  })
  // console.log(country);
  // console.log(urban);
  // console.log(rural);

 fs.writeFileSync('dataasiasumall.json',JSON.stringify(jsonData),'utf-8');

});
