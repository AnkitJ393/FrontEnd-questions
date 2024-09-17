
const normal=document.querySelector('.n_count')
const throttle=document.querySelector('.t_count');
const debounce=document.querySelector('.d_count');

let normalCount=0;
let throttleCount=0;
let debounceCount=0;
let isScrolling=true;
console.log('ih');
//Normal

const normalCountfunc=()=>{
    normalCount++;
    normal.innerHTML=`Normal Count: ${normalCount}`;
}

//Debounce is useful when you want to ensure that a function is only executed once after a series of rapid inputs.
// This is particularly helpfull when deailing with user events taht may triggers mulitple times in a  short peroid, such as search bar or a button click.
//Debouce can help prevent unnecessary or redundant processing of these events.
let interval;
const debounceCountfunc=()=>{
    clearTimeout(interval);

    interval=setTimeout(()=>{
        debounceCount++;
        debounce.innerHTML=`Debounce Count: ${debounceCount}`;
    },1000)
}

// function debounce(func, delay) {
//     let timeout; // This variable will store the ID of the setTimeout function.
//     return function () {
//       const args = arguments; // Capture the arguments passed to the debounced function.
//       const context = this; // Capture the context (the value of `this`) when the function is called.
//       clearTimeout(timeout); // Clear the previous timeout every time the event is triggered, so the function does not execute.
//       timeout = setTimeout(() => func.apply(context, args), delay); // Set a new timeout. The function will execute only after `delay` has passed without any further event triggers.
//     };
//   }
  
//   // Function to handle resize events
//   const handleResize = () => {
//     console.log("Resize event handler called"); // This will log every time the resize event is handled (after the user stops resizing).
//   };
  
//   // Apply debouncing to the resize event
//   window.addEventListener("resize", debounce(handleResize, 1000)); // The resize event will now be debounced.
  



// Throttling is usefull when you want to ensure that function is called at a limited rate or frequency , without missing any important inputs or events
//Imagine a realtime data processing application that receives a high volume of incoming data streams, if the data is precessedd too quickly , it may cause the applciation to become overwhelemed and 
// unresponsive. in this case, throttling the processing function to a specific frequency can help manage the load and maintain the 
// performance of application.

const throttleCountfunc=()=>{
    if(isScrolling){
        throttleCount++;
        throttle.innerHTML=`Throttle Count: ${throttleCount}`;
        isScrolling=false;
        setTimeout(()=>{
            isScrolling=true;
        },1000)
    }


}

// function throttle(func, limit) {
//     let inThrottle; // This variable will keep track if the function is in the "throttling" period.
//     return function () {
//       const args = arguments; // Capture the arguments passed to the throttled function.
//       const context = this; // Capture the context (the value of `this`) when the function is called.
//       if (!inThrottle) { // Check if the function is in the throttling period.
//         func.apply(context, args); // Call the function immediately the first time if not throttling.
//         inThrottle = true; // Now, set `inThrottle` to true, indicating we're in the throttling period.
//         setTimeout(() => (inThrottle = false), limit); // After the specified `limit` time, set `inThrottle` to false, allowing the function to run again.
//       }
//     };
//   }
  
//   // Function to handle scroll events
//   const handleScroll = () => {
//     console.log("Scroll event handler called"); // This will log every time the scroll event is handled.
//   };
  
//   // Apply throttling to the scroll event
//   window.addEventListener("scroll", throttle(handleScroll, 1000)); // The scroll event will now be throttled.
  

window.addEventListener('scroll', function() {
    console.log("Body is scrolling");
    // Your code here to handle the scroll event
    normalCountfunc();
    throttleCountfunc();
    debounceCountfunc();
  });

