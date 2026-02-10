import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        // Updated colors: border-white/20 and bg-transparent for a cleaner look
        "group relative w-auto cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-transparent p-2 px-6 text-center font-semibold transition-all",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {/* The dot now scales into a vibrant blue background */}
        <div className="bg-blue-600 h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block text-white transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100 text-white">
        <span>{children}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  )
}