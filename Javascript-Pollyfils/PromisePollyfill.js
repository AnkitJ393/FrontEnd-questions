

const t1=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('t1 success')
        },3000)
    })
}

const t2=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('t2 reject')
        },5000)
    })
}

const t3=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('t3 success')
        },1000)
    })
}

// ----------------------------------------------- PROMISE ALL  -------------------------  returns all the Promise resolved if any of the promise is rejected then it is returned

// Promise.all([t1(),t2(),t3()])
// .then(res=>{
//     console.log('Promise.all Result:',res);
// }).catch(err=>{
//     console.log('Error:',err);
// })

Promise.myAll=function(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new Error('undefined is not an itereable'));
        }

        const n=promises.length;
        const result=[];
        if(n===0){
            resolve(result);
            return;
        }

        promises.forEach(async(promise,index)=>{
            try{
                const res=await promise;
                result[index]=res;

                if(index===n-1){
                    resolve(result);
                    return;
                }

            }catch(err){
                reject(err);
                return;
            }
        })


    })
}


// Promise.myAll([t1(),t2(),t3()])
// .then(res=>{
//     console.log('Promise.all Result',res);
// })
// .catch(err=>{
//     console.log('Error'+err)
// })



// ------------------------------ PROMISE ALLSETTLE----------------------------------- gives the array of objects containing the status of each promise

// Promise.allSettled([t1(),t2(),t3()])
// .then(res=>{
//      console.log('Promise all Settled:'+ JSON.stringify(res));
// }).catch(err=>{
//     console.log('Error', err);
// })


Promise.myPromiseAllSetteled=function(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new Error('undefined is not an iterable'));
        }

        const n=promises.length;
        const result=[];
        if(n===0){
            resolve(result);
            return
        }

        promises.forEach(async(promise,index)=>{
           try{
                const res=await promise;
                const obj={status:'fullfiled',value:res}
                result[index]=obj;
                if(index===n-1){
                    resolve(result);
                    return;
                }
            }
           catch(err){
                const obj={status:'rejected',reason:err}
                result[index]=obj;
           }
        })
    })
}

// Promise.myPromiseAllSetteled([t1(),t2(),t3()])
// .then(res=>{
//     console.log('promise resolve'+JSON.stringify(res));
// })
// .catch(err=>{
//     console.log('Error',err);
// })

// --------------------------------=---------------- PROMISE ANY   returns the first promise which is resolved or then return rejected promise if all the promises are rejected

// Promise.any([t1(),t2(),t3()])
// .then(res=>
//        console.log('Promise.any Result:',res)
//     )
// .catch(err=>
//         console.log('Error',err)
//     )


Promise.myAny=function(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new Error('undefined is not an iterable'));
        }

        const n=promises.length;
        const errors=[];
        if(n===0){
            reject({
                message:new Error('empty array passed')
            });
            return
        }

        promises.forEach(async(promise,index)=>{
            try{
                const res=await promise;
                resolve(res);
                return
            }
            catch(err){
                    errors[index]=err;
                    if(index===n-1){
                        resolve({
                            message:new Error('All Promises were rejected'),
                            errors
                        })

                    }
            }
        })
    })
}

// Promise.myAny([t1(),t2(),t3()])
//     .then(res=>console.log(`Promise.any Result  ${res}`))
//     .catch(err=>console.log('Error'+err))


// ------------------------------------------------ PROMISE RACE  gives the first promise that is either resovle or rejected  doesn't matter rejected or resolved it shoulbe be quickest

// Promise.race([t1(),t2(),t3()])
// .then(res=>
//        console.log('Promise.race Result:',res)
//     )
// .catch(err=>
//         console.log('Error',err)
//     )


Promise.myRace=function(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            throw new Error('empty array passed');
        }

        let n=promises.length;
        if(n===0){
            return undefined;
        }

        promises.forEach(async(promise,index)=>{
            try{
                let res=await promise;
                resolve(res);
                return;
            }
            catch(err){
                reject(err);
                return;
            }
        })

    })
}

// Promise.myRace([t1(),t2(),t3()]).
// then((res)=>console.log('Promise race resolved : '+ res))
// .catch((err)=>console.log(err));