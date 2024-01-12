const TEXT_TIME = document.getElementById("time");
const TEXT_MERIDIAN = document.getElementById("meridian");
const PLAY_ICON = document.getElementById("play");
const STOP_ICON = document.getElementById("stop");

let clock_type = true;
let meridian = true;
let timeout;

let stopwatch = [0, 0, 0, 0];
let toggle_stopwatch = false;

function changeClock(icon){
    icon.classList.toggle("bx-time-five");
    icon.classList.toggle("bx-stopwatch");
    
    PLAY_ICON.classList.toggle("clickable");
    STOP_ICON.classList.toggle("clickable");

    clearTimeout(timeout);
    clock_type = !clock_type;

    if(clock_type){
        mainStart();

        if(toggle_stopwatch){
            PLAY_ICON.classList.toggle("bx-play-circle");
            PLAY_ICON.classList.toggle("bx-pause-circle");
        
            toggle_stopwatch = !toggle_stopwatch;
        }
    }
    else{
        updateWatch();
    }
}

function changeMeridian(){
    if(clock_type){
        meridian = !meridian;
        clearTimeout(timeout);
        mainStart();
    }
}

function addColor(){
    if(clock_type){
        TEXT_TIME.style.color = "aquamarine";
    }
}

function removeColor(){
    if(clock_type){
        TEXT_TIME.style.color = "white";
    }
}

function toggleWatch(icon){
    if(!clock_type){
        icon.classList.toggle("bx-play-circle");
        icon.classList.toggle("bx-pause-circle");

        toggle_stopwatch = !toggle_stopwatch;
        toggle_stopwatch ? mainStart() : clearTimeout(timeout);
    }
}

function resetWatch(){
    if(!clock_type){
        clearTimeout(timeout);
        stopwatch = [0, 0, 0, 0];
        updateWatch();

        if(toggle_stopwatch){
            PLAY_ICON.classList.toggle("bx-play-circle");
            PLAY_ICON.classList.toggle("bx-pause-circle");
        
            toggle_stopwatch = !toggle_stopwatch;
        }
    }
}

function updateWatch(){
    let components = [...stopwatch];
    components.forEach((element, index, array) => array[index] = element.toString().padStart(2, 0));
    components[3] = components[3].toString().padStart(3, 0);

    TEXT_TIME.textContent = `${components[0]}:${components[1]}:${components[2]}`;
    TEXT_MERIDIAN.textContent = `.${components[3]}`;
}

function mainStart(){
    if(clock_type){
        let date = new Date;
        let meridian_value = ``;

        let components = [date.getHours(), date.getMinutes(), date.getSeconds()];
        components.forEach((element, index, array) => array[index] = element.toString().padStart(2, 0));

        if(meridian){
            meridian_value = Number(components[0]) >= 12 ? ` PM` : ` AM`;
            components[0] = (Number(components[0]) % 12 || 12).toString().padStart(2, 0);
        }

        TEXT_TIME.textContent = `${components[0]}:${components[1]}:${components[2]}`;
        TEXT_MERIDIAN.textContent = meridian_value;

        timeout = setTimeout(mainStart, 1000);
    }
    else{
        let components = [...stopwatch];

        components[3] += 10;
        if(components[3] >= 1000){
            components[2]++;
            components[3] = 0;
        }
        if(components[2] >= 60){
            components[1]++;
            components[2] = 0;
        }
        if(components[1] >= 60){
            components[0]++;
            components[1] = 0;
        }

        stopwatch = [...components];

        updateWatch();
        timeout = setTimeout(mainStart, 10);
    }
}

mainStart();