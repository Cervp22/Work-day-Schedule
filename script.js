$(function () {
  // Get the current hour of the day using the dayjs library.
  const currentHour = dayjs().format("H");
  const currentTime = dayjs().format("h");

  //changes color depending on time
  function hourlyColor() {
    $(".time-block").each(function () {
      const blockHour = parseInt(this.id);
      $(this).toggleClass("past", blockHour < currentHour);
    });
  }
  // The  function below will save the user's input in a textarea to localStorage - only when the corresponding save button has been clicked.
  function textEntry() {
    $(".saveBtn").on("click", function () {
      const key = $(this).parent().attr("id");
      const value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });
  }
  // The function below will refresh the color of each time 
  function refreshColor() {
    $(".time-block").each(function () {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      }
    });
  }
  // This will get the user input from the localStorage 
  $(".time-block").each(function () {
    const key = $(this).attr("id");
    const value = localStorage.getItem(key);
    $(this).children(".description").val(value);
  });

  // Please note: this is my favourtie part of the module - I absolutly love the display of current date and time especially
  // since the the time referesed every second - you can find this among the header of the page!
  function updateTime() {
    const dateElement = $("#date");
    const timeElement = $("#time");
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    const currentTime = dayjs().format("hh:mm:ss A");
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
  // Call the three main functions to set up the page.
  hourlyColor();
  textEntry();
  refreshColor();
  // This will update the time once per second for the current time once per second using setInterval()
  setInterval(updateTime, 1000);
});
