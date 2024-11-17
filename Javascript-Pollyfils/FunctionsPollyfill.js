// ------------- CALL


function foo(age,company){
    console.log(`Hello ${this.name} , your age is ${age} working in ${company}`);
}

let p1={name:'Ankit'}

let p2={
    name:'Vicky vicks'
}

// foo.call(p2);
// foo.call(p1);


Function.prototype.myCall=function(context,...args){
    if(typeof this !== 'function') throw new Error (this+'is not a callable function');

    context.refFunc=this;
    const result=context.refFunc(...args)
    delete context.refFunc;

    return result;
}


// foo.myCall(p1);
// foo.myCall(p2);

// ---------------------------------- APPLY 



// foo.apply(p1,[28,'microsft']);
// foo.apply(p2,['google']);

Function.prototype.myApply=function(context,args){
    if(typeof this!=='function') throw new Error (this+'is not a callable function');

    context.refFunc=this;
    const result=context.refFunc(...args);
    delete context.refFunc;
    return result;



}

// foo.myApply(p1,[28,'Microsft']);




// --------------------------------------- BIND


// const bind=foo.bind(p1,27);
// bind('microsoft');

Function.prototype.myBind=function(context,...args){
    if(typeof this!=='function')throw new Error(this+'is not a callable function');

    context.refFunc=this;
    return function(...otherArgs){
        context.refFunc(...args,...otherArgs);
    }
    
}

// const bind=foo.myBind(p1,27);
// bind('microsoft');
