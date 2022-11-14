$(document).ready(function () {
  AOS.init({
    once: true,
    disable: 'mobile',
    anchorPlacement: 'top-bottom',
    delay: 200,
  });

  var startDate = new Date('1/5/2023');

  var month = startDate.toLocaleString('default', { month: 'long' });
  var day = startDate.getDay() + 1;
  var year = startDate.getFullYear();
  var timeString = `${month} ${day} ${year}`;
  $('#start-date').text(timeString);

  function getRemain() {
    var now = Date.now();
    var startTime = startDate.getTime();
    var oneSec = 1000;
    var oneMin = oneSec * 60;
    var oneHour = oneMin * 60;
    var oneDay = oneHour * 24;
    var days = Math.floor(Math.abs((startTime - now) / oneDay));
    var hours = Math.floor(Math.abs(startTime - (now + days * oneDay)) / oneHour);
    var mins = Math.floor(Math.abs(startTime - (now + days * oneDay + hours * oneHour)) / oneMin);
    var secs = Math.ceil(Math.abs(startTime - (now + days * oneDay + hours * oneHour + mins * oneMin)) / oneSec);

    return { days, hours, mins, secs };
  }

  function updateCounter() {
    var remain = getRemain();
    $('#remain-days').text(remain.days);
    $('#remain-hours').text(remain.hours);
    $('#remain-mins').text(remain.mins);
    $('#remain-secs').text(remain.secs);
  }
  
  updateCounter();

  setInterval(function () {
    updateCounter();
  }, 1000);
});
