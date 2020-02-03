function formatDate(date) {
  const newDate = new Date(date)
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = newDate.getDate();
  var monthIndex = newDate.getMonth();
  var year = newDate.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

module.exports = formatDate;

