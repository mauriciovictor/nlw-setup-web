interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const progressStyles = {
    width: `${progress}%`,
  };
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados no dia"
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-violet-600 w-3/4 transition-all "
        style={progressStyles}
      ></div>
    </div>
  );
}
