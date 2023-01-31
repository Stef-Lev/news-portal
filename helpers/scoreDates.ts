export const dateString = (date: Date, withDash: boolean = true) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dateString = "";
  if (withDash) {
    dateString = `${year}-${String(month).length > 1 ? month : `0${month}`}-${
      String(day).length > 1 ? day : `0${day}`
    }`;
  } else {
    dateString = `${year}${String(month).length > 1 ? month : `0${month}`}${
      String(day).length > 1 ? day : `0${day}`
    }`;
  }

  return dateString;
};

const scoreDates = () => {
  let datesArr = [];
  let dateToday = new Date();
  datesArr.push(dateString(dateToday));
  for (let i = 1; i < 5; i++) {
    const date = new Date(dateToday);
    date.setDate(date.getDate() - i);
    datesArr.push(dateString(date));
  }
  return datesArr;
};

export default scoreDates;
