export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="h-8 w-8 rounded-lg bg-brand-500 shadow-lg shadow-brand-500/30" />
      <span className="text-xl font-semibold tracking-tight">Verdant Labs</span>
    </div>
  )
}