//Displaying and formatting dates and times
const m = moment();

console.log(m.toString());
console.log(m.format("hh"));

//Display the current day
$("#currentDay").text("Today's date: " + m.format("dddd MMMM Mo, YYYY"));

//Dynamic creation of hour blocks using jQuery with data-time for time
const workHours = 9;

for (let i = 0; i < workHours; i++){
    $(`<div id="append-time-block" data-time="${i+workHours}" class="container d-flex flex-column justify-content-center align-items-center">
    <div class="time-block row d-flex">
    <div class="hour d-flex align-items-center">
    <h3>${convertToTime(i+workHours)}</h3>
    </div>
    <textarea class="description"></textarea>
    <img class="saveBtn button" src="./images/save.png" width="80">
    </div>
    </div>`).appendTo($("#planner"));
    determineDivColor();
}
//Logic that colors blocked based on time TODO
function determineDivColor(){
    if($("#append-time-block").data("time").text <  m.format("hh")){

        $(".time-block").addClass("past");
    }
    // $(".time-block").addClass("current");
    // $(".time-block").addClass("future");
}
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
//Button listener that saves content to local storage