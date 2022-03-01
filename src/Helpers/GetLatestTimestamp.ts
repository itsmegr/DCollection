export default function getLatestTimestamp(date1: Date, date2: Date) {
  if (date1 > date2) return date1;
  else return date2;
}
