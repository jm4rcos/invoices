export const Tootilip = ({ title }: { title: string }) => {
  return (
    <div className="absolute text-nowrap z-10 -top-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 inline-block p-2 font-medium text-title text-xs bg-muted border border-muted rounded-lg shadow-sm">
      <p>{title}</p>
    </div>
  );
};
