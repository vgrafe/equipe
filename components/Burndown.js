import { addDays, differenceInDays } from "date-fns";
import { useMemo } from "react";
import Card from "./Card";

const getDayQuarter = (date) => date.split("T")[1].split(":")[0] % 6;

const Burndown = ({ startDate, endDate, issues }) => {
  const burnDown = useMemo(() => {
    const firstWeekDay = startDate;

    const duration = differenceInDays(endDate, startDate) + 1;

    const closedIssues = issues.filter((a) => a.state === "closed");

    let burnDownData = [];
    let isFuture = false;
    let pointsLeft = issues.length;
    for (let dayInc = 0; dayInc < duration; dayInc++) {
      const day = addDays(firstWeekDay, dayInc);
      const date = `${day.getFullYear()}-${
        day.getMonth() + 1
      }-${day.getDate()}`;

      const closures = closedIssues.filter((i) => i.closed_at.includes(date));

      for (let quarter = 0; quarter < 4; quarter++) {
        const quarterClosures = closures.filter(
          (i) => getDayQuarter(i.closed_at) === quarter
        );

        pointsLeft -= quarterClosures.length;

        const isNow =
          new Date().getDate() === day.getDate() &&
          (new Date().toTimeString().split(":")[0] % 6) + 1 === quarter;

        if (isNow) isFuture = true;

        burnDownData.push({
          date,
          quarter,
          quarterClosures,
          pointsLeft,
          isNow,
          isFuture,
        });
      }
    }

    return burnDownData;
  }, [startDate, endDate, issues.length]);

  const days = [
    ...new Set(burnDown.map((bd) => bd.date.substr(5).replace("-", "/"))),
  ];

  return (
    <Card>
      <h2 className="text-xl">Burndown</h2>
      <div className="flex h-32 items-end">
        {burnDown.map((day) => (
          <div
            className={
              "flex-grow hover:opacity-100 flex flex-col items-center justify-between " +
              (day.isNow ? "bg-blue-600 text-white" : "bg-blue-400") +
              (!day.isNow && day.isFuture ? " opacity-25" : " opacity-75")
            }
            style={{ height: `${(day.pointsLeft / issues.length) * 100}%` }}
          ></div>
        ))}
      </div>
      <div className="flex justify-around">
        {days.map((day) => (
          <div key={day} className="flex-grow text-center">
            {day}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Burndown;
