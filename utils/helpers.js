const dayjs = require("dayjs");


//console.log (dayjs(date).format('dddd, MMMM D, YYYY'))

module.exports = {
  // Format date as DD/MM/YYsYY
  formatDate: (date) => {
    return `${dayjs(date).format('dddd, MMMM D, YYYY')}`;
  },
};
