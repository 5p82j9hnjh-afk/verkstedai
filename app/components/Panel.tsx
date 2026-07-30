type PanelProps = {
  title: string;
  children: React.ReactNode;
};

export default function Panel({
  title,
  children,
}: PanelProps) {
  return (
    <section className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4 shadow-lg shadow-black/10">
      <h3 className="mb-4 font-semibold">{title}</h3>
      {children}
    </section>
  );
}