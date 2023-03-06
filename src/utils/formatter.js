export function MoneyFormatZero(number) {
  try {
    number = parseFloat(number);
    //return number != null ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null;
    // // debugger;
    return number != undefined
      ? isNaN(number)
        ? "0"
        : number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0";
  } catch (e) {
    // // debugger
    return "0";
  }
}

export const inputMoney = (number) => {
  return new Intl.NumberFormat().format(number);
};

export function DateFormatMonthName(p_date) {
  if (p_date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let new_date = new Date(p_date);
    let dd = new_date.getDate();
    let mm = new_date.getMonth(); //January is 0!
    let yyyy = new_date.getFullYear();

    return dd + " " + monthNames[mm] + " " + yyyy;
  } else {
    return null;
  }
}

export function DateFormatMonthNameID(p_date) {
  if (p_date) {
    var monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    // let new_date = new Date(p_date);
    // let dd = new_date.getDate();
    // let mm = new_date.getMonth(); //January is 0!
    // let yyyy = new_date.getFullYear();

    let res = p_date.substring(0, 10).split("-");
    let res2 = p_date.substring(11, 16);
    // let new_date = new Date(p_date);
    let dd = res[2];
    let mm = res[1]; //January is 0!
    let yyyy = res[0];
    return dd + " " + monthNames[parseInt(mm) - 1] + " " + yyyy + " " + res2;
  } else {
    return null;
  }
}
