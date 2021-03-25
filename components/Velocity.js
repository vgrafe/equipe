import Card from "./Card";
// import isWeekend from "date-fns/isWeekend";

const getDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const Velocity = ({ closedIssues }) => {
  const dates = closedIssues.map((issue) => getDate(issue.closed_at));
  const daysToDisplay = [...new Set(dates)].sort();
  // const totalWeekDays = daysToDisplay.filter(
  //   (date) => !isWeekend(new Date(date))
  // );

  return (
    <Card>
      <h2 className="text-xl">Daily activity</h2>
      <div className="flex h-40 py-4">
        {daysToDisplay.map((day) => (
          <div
            key={day}
            className="flex-grow h-full justify-end flex flex-col items-center"
          >
            <div
              className="bg-green-600 w-6 rounded cursor-pointer hover:bg-green-700"
              style={{
                height: `${
                  (closedIssues.filter((c) => getDate(c.closed_at) === day)
                    .length /
                    30) *
                  100
                }%`,
              }}
            />
            <div>{day.substr(5)}</div>
          </div>
        ))}
      </div>
      <h2>
        Average {closedIssues.length % daysToDisplay.length} issues closed per
        day over the last {daysToDisplay.length} days
      </h2>
    </Card>
  );
};

export default Velocity;
