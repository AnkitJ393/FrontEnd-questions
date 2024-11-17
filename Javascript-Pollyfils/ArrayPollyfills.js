// ------------------------------------------- FOREACH

const arr=[1,2,3,4,55,6];

// arr.forEach((item,index,self)=>{
//     console.log(item,index,self);  //output 1 0 Array(4)0: 11: 22: 33: 4length: 4[[Prototype]]: Array(0)6 2 1 Array(4)6 4 3 Array(4)6 3 2 Array(4)
// })

Array.prototype.myforEach=function(callback){
    if(!callback){
        throw new Error('myforEach : undefined is not a function');
    }
    // this will have the array it is called for
    const arr=this;
    for(let i=0;i<arr.length;i++){
        callback(arr[i],i,arr);
    }
}

// arr.myforEach((item,index,self)=>{
//     console.log(item,index,self);
// })

// -------------------------------------------------- MAP 

// const newarr=arr.map((_,index,self)=>{
//    console.log(_)
// })


Array.prototype.myMap=function(callback){
    if(!callback)throw new Error('myMap:undefined not function');

    const arr=this;

    const newarr=[];
    for(let i=0;i<arr.length;i++){
        const result=callback(arr[i],i,arr);
        newarr.push(result);
    }
    return newarr;
}

// console.log(arr.myMap((i)=>{
//     return i*2;
// }))


// ------------------------------------------------ FILTER

// const newarr=arr.filter((item,index,self)=>{
//         console.log(item,index,self)
//     return item> 14;
// })

Array.prototype.myFilter=function(callback){
    if(!callback) throw new Error('myFilter: undefined is not function');

    const arr=this;
    const newarr=[];

    for(let i=0;i<arr.length;i++){
        const result=callback(arr[i],i,arr);
        if(result) newarr.push(arr[i]);
    }
    return newarr;
}


// console.log(arr.myFilter((i)=>{
//     return i>4;
// }))

// --------------------------------------------------  FIND returns  Element

// console.log(arr.find((item,index,self)=>item===55));

Array.prototype.myFind=function(callback){
    if(!callback) throw new Error('myFind: undefined is not function');

    const arr=this;
    for(let i=0;i<arr.length;i++){
        if(callback(arr[i],i,arr)){
            return arr[i];
        }
    }
    return undefined;
}

// console.log(arr.myFind((i)=>i===1))


// ---------------------------------------------------- SOME  return boolean

// const result=arr.some((item,index,self)=>{
//     return item >10;
// })
// console.log(result)

Array.prototype.mySome=function(callback){
    if(typeof callback !=='function')throw new Error('mySome: undefined is not a function');
    
    const arr=this;
    for(let i=0;i<arr.length;i++){
        if (callback(arr[i],i,arr)===true){
            return true;
        }
       
    }
    return false;
}

// console.log(arr.mySome((i)=>{
//     return i>50
//  }))

// ------------------------------------------------------ EVERY return boolean

// console.log(arr.every((item,index,self)=>{  // should satisfy each element  in the array
//     item >10  // output false
// }))


Array.prototype.myEvery=function(callback){
    if(typeof callback !== 'function') throw new Error('myEvery : undefined is not a function');

    const arr=this;
    for(let i=0;i<arr.length;i++){
        if(!callback(arr[i],i,arr)){
            return false;
        }
    }
    return true;
}

// console.log(arr.myEvery((i)=>(i>0 )))


// -------------------------------------------------------- REDUCER  return a single accumulated value

const result=arr.reduce((acculmulator,currentVal,index,self)=>{return acculmulator+currentVal },0);

// console.log(result)

Array.prototype.myReducer=function(callback,initialVal){
    if(typeof callback !=='function')throw new Error('myReducer :undefined is not a function');

    const arr=this;
    for(let i=0;i<arr.length;i++){
        const ans=callback(initialVal,arr[i],i,arr);
        initialVal=ans;
    }
    return initialVal;
}

// console.log(arr.myReducer((acc,curr)=>{return acc+curr},0));




// ------------------------------ Slice  
const r=arr.slice(1,3)
console.log(r)
