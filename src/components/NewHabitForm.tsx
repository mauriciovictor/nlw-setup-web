import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    <form action="" className="w-full flex flex-col nt-6">
      <label htmlFor="title" className="font-semibold leading-tight mt-4">
        Qual seu comprometimento ?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex./Exercícios, dormir bem, etc..."
        autoFocus
        className="mt-2 p-4 rounded-lg bg-zinc-800 text-while placeholder:text-zinc-400"
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência ?{" "}
      </label>

      <button
        type="submit"
        className="mt-6 rounded-lg flex items-center justify-center p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
