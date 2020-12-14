/**
 * Returns number of week.
 * This method respects ISO 8601 standard.
 * @param dt - given date of which the number of week will be extracted.
 * @returns {number} - number of week of given date.
 * @constructor
 */
export function GetWeekNumberFromDate(dt) {
  const tdt = new Date(dt.valueOf());
  const dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

/**
 * This method adds desired number of moths to date, while not doing any side
 * effects or generating invalid dates.
 * The number of months which are to be added to given date, can have a negative
 * value, thus it is possible to set n months into the past.
 * @param input - the date to which the given number of months will be added
 * @param months - the number of months which are to be added to given date
 * @returns {Date} - new date which has been added the desired number of months
 */
const addMonths = (input, months) => {
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const date = new Date(input);
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  date.setDate(
    Math.min(
      input.getDate(),
      getDaysInMonth(
        date.getFullYear(),
        date.getMonth() + 1)
    )
  );

  return date;
};

/**
 * Creates range between dates.
 * Start parameter is the first date, and End parameter is the last date.
 * If Start is bigger that End, then the dates added in range will be
 * decrementing from Start parameter value until they reach the same value as
 * End parameter.
 * If Start is smaller than End, then the dates added in range will be
 * incrementing from Start parameter value until they reach the same value as
 * End parameter.
 * @param start - starting date
 * @param end - ending date
 * @returns {[]} - range of dates
 * @constructor
 */
const CreateDateRange = (start, end) => {
  let dates = [];
  let currentDate = new Date(start);
  if(start > end){
    while (currentDate >= end) {
      dates = [...dates, new Date(currentDate)];
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return dates;
  }
  while (end >= currentDate) {
    dates = [...dates, new Date(currentDate)];
    currentDate.setDate(currentDate.getDate() + 1);
  }
  dates.sort((d1, d2) => (
    d1 < d2 ? 1 : -1
  ));
  return dates;
};


export const GetDatesForLastSixMonths = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = addMonths(start, -6);

  return CreateDateRange(start, end);
};

export const GroupDatesIntoWeeks = (dates) => {
  let weeks = [];
  let currentWeekNumber = GetWeekNumberFromDate(new Date(dates[0]));
  let currentWeek = [];
  dates.forEach(date => {
    if (GetWeekNumberFromDate(date) !== currentWeekNumber) {
      weeks.push(currentWeek);
      currentWeek = [];
      currentWeekNumber = GetWeekNumberFromDate(new Date(date));
    }
    currentWeek.push(date);
  });
  return weeks;
};

export const GetFirstDayOfWeekFromDate = (date) => {
  const weekDay = new Date(date);
  let day = weekDay.getDay();
  let diffToMonday = weekDay.getDate() - day + (day === 0 ? -6 : 1);
  let monday = new Date();
  const firstDayOfTheWeek = new Date(monday.setDate(diffToMonday));
  return firstDayOfTheWeek;
};

export const GetLastDayOfWeekFromDate = (date) => {
  const weekDay = new Date(date);
  let day = weekDay.getDay();
  let diffToSunday = weekDay.getDate() + (7 - day);
  let sunday = new Date();
  const lastDayOfTheWeek = new Date(sunday.setDate(diffToSunday));
  return lastDayOfTheWeek;
};

export const FillWeekWithMissingDates = (week) => {
  const monday = GetFirstDayOfWeekFromDate(week[0]);
  const sunday = GetLastDayOfWeekFromDate(week[0]);
  const weekWithDates = CreateDateRange(monday, sunday);
  return weekWithDates;
};

export const PrepareWeeks = () => {
  let dates = GetDatesForLastSixMonths();
  let weeks = GroupDatesIntoWeeks(dates);
  if(weeks[0].length < 7){
    weeks[0] = FillWeekWithMissingDates(weeks[0]);
  }
  return weeks;
}
