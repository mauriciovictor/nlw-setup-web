import { useEffect, useState } from "react";
import { generateRangeBetweenDates } from "../utils/generateRangeBetweenDates";
import { HabitDay } from "./HabitDay";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateRangeBetweenDates();

const minimumSummaryDateSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length;

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<SummaryProps>([]);
  useEffect(() => {
    api.get("/summary").then((reponse) => {
      setSummary(reponse.data);
    });
  }, []);

  return (
    <div className="w-full flex mt-10">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekday, index) => (
          <div
            key={index}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {weekday}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const daysInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });

          return (
            <HabitDay
              date={date}
              completed={daysInSummary?.completed}
              amount={daysInSummary?.amount}
              key={date.toString()}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              ></div>
            );
          })}
      </div>
    </div>
  );
}
