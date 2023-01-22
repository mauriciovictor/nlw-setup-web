import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("/habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);

    alert("Hábito criado com sucesso ");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays((oldState) => oldState.filter((day) => day !== weekDay));
    } else {
      setWeekDays((oldState) => [...oldState, weekDay]);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col nt-6">
      <label htmlFor="title" className="font-semibold leading-tight mt-4">
        Qual seu comprometimento ?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex./Exercícios, dormir bem, etc..."
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        className="mt-2 p-4 rounded-lg bg-zinc-800 text-while placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-zinc-900"
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência ?{" "}
      </label>
      {availableWeekDays.map((weekDay, index) => (
        <div className="mt-6 flex-col gap-2 mt-3">
          <Checkbox.Root
            className="flex item-center gap-3 group focus:outline-none"
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className="transition-colors h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-2 border-zinc-700 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500  group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-800 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span
              className="text-white leading-tight text-base
                  "
            >
              {weekDay}
            </span>
          </Checkbox.Root>
        </div>
      ))}

      <button
        type="submit"
        className="mt-6 rounded-lg flex items-center justify-center p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors  focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-background"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
