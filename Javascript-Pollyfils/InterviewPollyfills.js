//  Create a pollyfill for map function  

const arr=[1,2,4,5,234,65];

Array.prototype.myMap1=function(callback){
    const arr=this;
    let result=[];

    for(let i=0;i<arr.length;i++){
        result.push(callback(arr[i],i,arr));
    }

    return result;
}


// Create a pollyfill  for filter method

Array.prototype.myFilter1=function(callback){
    const arr=this;
    const result=[];

    for(let i=0;i<arr.length;i++){
        if(callback(arr[i],i,arr)){
            result.push(arr[i]);
        }
    }
        return result;
}


//  Create a pollyfill for Reduce method

Array.prototype.myReduce1=function(callback,InitialVal){
    let arr=this;

    for(let i=0;i<arr.length;i++){
         InitialVal=InitialVal ? callback(InitialVal,arr[i],i,arr):arr[i] ;
    }

    return InitialVal;
}


// console.log(arr.myReduce1((acc,curr)=>{
//     return acc+curr;
// },0))


// Create a Pollyfill for Call method

const obj={
    name:'Ankit',
    age:26
}

function calling(city, country){
    console.log(`Hi ${this.name} this side , age ${this.age} live in ${city},${country}`);
}
Function.prototype.myCall1=function(context,...args){
    if(typeof this !== 'function') throw new Error (this+'is not a callable function');

    context.refFunc=this;
    const result=context.refFunc(...args);
    delete context.refFunc;

    return result;
}


// calling.myCall1(obj,'Pune','India')

//-------------------------------------------Create a Pollyfill for Apply Method

Function.prototype.myApply1=function(context={},args=[]){
    if(typeof this!=='function') throw new Error(this+'is not a callable function');

    if(!Array.isArray(args))throw new TypeError('CreateListFromArray called on non-object');

    context.refFunc=this;
    const result=context.refFunc(...args);
    delete context.refFunc;

    return result;
}

// calling.myApply1(obj,['Pune','India']);

// -------------------------------------- Create a Pollyfill for Bind Method

Function.prototype.myBind1=function(context={},...args){

    if(typeof this !== 'function')throw new Error(this+'is not Callable');

    context.refFunc=this;
    return function(...otherargs){
        context.refFunc(...args,...otherargs);
        
    }
}

calling.myBind1(obj,'Pune','India')();




// Create a pollyfill for ONCE funciotn (from lodash)  when any function is wrapped using once then only 1st output is printed

function once(callback,context){
    let ran;

    return ()=>{
        if(callback){
            ran=callback.apply(context||this,arguments);
            callback=null;
        }
        return ran;
    };
};

const hello=once((mars)=>console.log(`hello from ${mars}`));

hello('mars');
hello()





