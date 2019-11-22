let today=new Date();
let time = today.getTime()
let sc=time/1000;
console.log(sc/60);
// console.log(today);


setTimeout(()=>{
    let time2=new Date().getTime()
 let sc2=time2/1000;
    console.log(sc2/60);
    console.log(Math.floor((sc2/60)-(sc/60)));
//   if(time-time2==3000){
//       console.log("done");
//   }
},60000)
