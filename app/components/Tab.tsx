type TabProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function Tab({
  label,
  active = false,
  onClick,
}: TabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-lg border px-4 py-3 text-sm transition ${
        active
          ? "border-blue-500 bg-blue-600 text-white"
          : "border-slate-700 text-slate-300 hover:bg-slate-800"
      }`}
    >
      {label}
    </button>
  );
}