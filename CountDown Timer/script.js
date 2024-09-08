(function(){
    let hour=document.querySelector('.hour');
    let minutes=document.querySelector('.minutes');
    let seconds=document.querySelector('.seconds');

    let startbtn=document.querySelector('.start');
    let stopbtn=document.querySelector('.stop');
    let reset=document.querySelector('.reset');

    let countDownTimer=null;

    function stopInterval(state){
        startbtn.innerHTML=state==='pause'?'Continue':'Start';

        startbtn.style.display='initial';
        stopbtn.style.display='none';

        clearInterval(countDownTimer);

    }

    function timer(){
        if(seconds.value>60){
            minutes.value++;
            seconds.value=parseInt(seconds.value)-59;
        }
        if(minutes.value>60){
            hour.value++;
            minutes.value=parseInt(minutes.value)-60;
        }


        if(hour.value==0 && minutes.value==0 && seconds.value==0){
            hour.value="";
            minutes.value=="";
            seconds.value="";
            stopInterval();
        }
        else if(seconds.value!=0){
            seconds.value=`${seconds.value<=10?"0":""}${seconds.value-1}`; 
        }
        else if(minutes.value!=0 && seconds.value !=0){
            seconds.value=59;
            minutes.value=`${minutes.value<=10?"0":""}${minutes.value-1}`;
        }
        else if(hour.value!=0 && minutes.value!=0){
            minutes.value=60;
            hour.value=`${hour.value<=10?"0":""}${hour.value-1}`;
        }
    }
    
   


    startbtn.addEventListener('click',()=>{
        if(hour.value==0 && minutes.value==0 && seconds.value ==0)return ;

        function startInterval(){
            startbtn.style.display='none';
            stopbtn.style.display='initial';

            countDownTimer=setInterval(() => {
                timer();
            }, 1000);
        }

        startInterval();
    });

        stopbtn.addEventListener('click',()=>{
            stopInterval('pause');
        })

        reset.addEventListener('click',()=>{
            hour.value='';
            minutes.value='';
            seconds.value='';
            stopInterval();
        })

   
})()