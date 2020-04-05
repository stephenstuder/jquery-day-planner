// Used to initialize moment.js
const m = moment();

//Display the current day
$("#currentDay").text("Today's date: " + m.format("dddd MMMM DD, YYYY"));

//Dynamic creation of hour blocks using jQuery with data-time for time
const workHours = 9;
const startHour = 9;

//Time Block Creater
for (let i = 0; i < workHours; i++){
    $(`<div data-time="${i+startHour}" class="append-time-block container d-flex flex-column justify-content-center align-items-center">
    <div class="time-block row d-flex">
    <div class="hour d-flex align-items-center">
    <h3>${convertToTime(i+startHour)}</h3>
    </div>
    <textarea class="description"></textarea>
    <img class="saveBtn button" src="./images/save.png" width="80">
    </div>
    </div>`).appendTo($("#planner"));
}

//Loop over divs and color backgrounds
$(".append-time-block").each(function(){
    var testdata = $(this).attr('data-time');
          if (testdata - Number(m.format("H")) === 0) {
            $(this).children("div:first").removeClass("past");
            $(this).children("div:first").removeClass("future");
            $(this).children("div:first").addClass("present");
        } else if (testdata - Number(m.format("H")) < 0){
            $(this).children("div:first").removeClass("future");
            $(this).children("div:first").removeClass("present");
            $(this).children("div:first").addClass("past");
        } else {
            $(this).children("div:first").removeClass("past");
            $(this).children("div:first").removeClass("present");
            $(this).children("div:first").addClass("future");
                
      }
});

//time conversion for displaying hour of the day
function convertToTime(number){
    if (number < 12){
        number = `${number}AM`;
    } else if (number == 12) {
        number = `${number}PM`;
    } else {
        number = `${number-12}PM`;
    } return number;
}
let plannerText = [];
plannerText.length = workHours + startHour;

//init will get localstorage only if it exists
init();
fillFromLocal();

$(".saveBtn").on("click", function(){
    let textBox = $(this).prev("textarea");
    let textValue = textBox[0].value;  
    let timeValue = textBox.parent("div").parent("div").attr("data-time");
   
    plannerText[timeValue] = textValue;
    saveToLocal();
})

function saveToLocal(){
    localStorage.setItem("plannerStorage", JSON.stringify(plannerText));
}

function fillFromLocal(){
    $(".saveBtn").each(function(){
         let textBox = $(this).prev("textarea");
         let textValue = textBox[0].value;
         let timeValue = textBox.parent("div").parent("div").attr("data-time");
         for (var i = 0; i < plannerText.length; i++) {
             if (timeValue == i){
                 textBox.val(plannerText[i]);
             }
            }
         });
}

function init(){
    if (localStorage.getItem("plannerStorage") !== null){
        plannerText = JSON.parse(localStorage.getItem("plannerStorage"));
    }
}

//Button listener that saves content to local storage
//Add value pair to local storage
//Retrieve on each page load and place where appropriate 
//Clear planner button with an are you sure popup. 