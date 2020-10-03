export default (timePostedUnix: number): string => {
  const now = new Date().getTime() / 1000;
  const then = new Date(timePostedUnix).getTime();

  const timeElapsed = now - then;

  const yearsElapsed = timeElapsed / 3.154e7;
  const monthsElapsed = timeElapsed / 2.628e6;
  const daysElapsed = timeElapsed / 86400;
  const hoursElapsed = timeElapsed / 3600;
  const minutesElapsed = timeElapsed / 60;

  if (yearsElapsed >= 1)
    return formatTimeElapsed(yearsElapsed, "year");
  if (monthsElapsed >= 1)
    return formatTimeElapsed(monthsElapsed, "month");
  // prettier-ignore
  if (daysElapsed >= 1) 
    return formatTimeElapsed(daysElapsed, "day")
  if (hoursElapsed >= 1)
    return formatTimeElapsed(hoursElapsed, "hour");
  if (minutesElapsed >= 1)
    return formatTimeElapsed(minutesElapsed, "minute");

  return "0 minutes ago";
};

function formatTimeElapsed(time: number, increment: string): string {
  let flooredTime = String(Math.floor(time));
  let formattedIncrement =
    flooredTime === "1" ? ` ${increment} ago` : ` ${increment}s ago`;

  return flooredTime + formattedIncrement;
}
