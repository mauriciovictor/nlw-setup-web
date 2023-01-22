import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import dayjs from "dayjs";
interface HabitDayProps {
  date: Date;
  completed?: number;
  amount?: number;
}

export function HabitDay({ amount = 0, completed = 0, date }: HabitDayProps) {
  const progress = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div
          className={clsx(
            "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg",
            {
              "bg-zinc-900 border-zinc-800": progress === 0,
              "bg-violet-900 border-violet-700": progress > 0 && progress < 20,
              "bg-violet-800 border-violet-600":
                progress >= 20 && progress < 40,
              "bg-violet-700 border-violet-500":
                progress >= 40 && progress < 60,
              "bg-violet-600 border-violet-500":
                progress >= 60 && progress < 80,
              "bg-violet-500 border-violet-400": progress >= 80,
            }
          )}
        ></div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex  flex-col">
          <span className="font-semibold text-zinc-400"> {dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={progress} />

          <div className="mt-6 flex-col gap-3">
            <Checkbox.Root className="flex item-center gap-3 group">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-2 border-zinc-700 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span
                className="font-semibold text-xl text-whtite leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400
              "
              >
                Beber 2l de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
