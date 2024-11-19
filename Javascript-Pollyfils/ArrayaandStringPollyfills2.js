// ---------------------- FLAT 

//nested array
const a=[1,2,[3,4,5,6,[7,8,[1,5,[2,8]]]],3 ,[5,6],67,85,2];
const q=[1,2,3,[4,2]];

// function flatten(arr,depth=Infinity){

//     let results=[];

//     for(let i=0;i<arr.length;i++){
//         if(Array.isArray(arr[i]) && depth>0 ){
//            results= results.concat(flatten(arr[i],depth-1));
//         }else{
//             results.push(arr[i]);
//         }
//     }

//     return results;
// }
// console.log(flatten(q));
// console.log(a.flat(Infinity));



// Recursion way
Array.prototype.myFlat=function(depth=1){

    let results=[];
    let arr=this;
    function flatts(arr,currentDepth){
        for(let i =0;i<arr.length;i++){
            if(Array.isArray(arr[i]) && currentDepth<depth ){
               flatts(arr[i],currentDepth+1);
            }else{
                results.push(arr[i]);
            }
        }
    }

    flatts(arr,0); 

    return results;
}


//iterative way
Array.prototype.myFlatIterative=function(){
    const stack=[...this];
    const result=[];
    

    while(stack.length){
        const poppedElem=stack.pop();
        if(Array.isArray(poppedElem)){
            stack.push(...poppedElem);
        }
        else{
            result.unshift(poppedElem);
        }
    }

    return result;
}

// const startRecursive=performance.now();
// console.log(a.myFlatIterative())
// const endRecursive=performance.now();

// console.log(`Recursive approach :  ${endRecursive-startRecursive}`)


// const startIterative=performance.now();
// console.log(a.myFlat(Infinity))
// const endIterative=performance.now();

// console.log(`Iterative approach ${endIterative-startIterative}`)


// ------------------------------------------------ CONCAT  


const arr1=[1,2,3,4];
const arr2=['ankit','jangid',3,5];
const arr3=345;

Array.prototype.myConcat=function(){
    
    // let baseArr=[...this];
    let baseArr=this.slice();
    const args=arguments;

    for(let i=0;i<args.length;i++){
        if(Array.isArray(args[i])){
            for(let j=0;j<args[i].length;j++){
                baseArr.push(args[i][j]);
            }
            // baseArr=[...baseArr,...args[i]];
        }else{
            baseArr.push(args[i]);
        }
    }

    return baseArr;

}

// console.log(arr1.myConcat(arr3,arr2));


// -------------------------------------------------------CHARAT

String.prototype.myCharAt=function(index){
    const str=this;
    const correctIndex=index?index:0;

    if(correctIndex <0 || correctIndex > str.length){
        return '';
    }

    return str[correctIndex];
}

// console.log('yoWhatsUp'.myCharAt(4))

