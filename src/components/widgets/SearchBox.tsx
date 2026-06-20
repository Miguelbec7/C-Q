"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBox({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Pesquisar"
        className={cn(
          "inline-flex items-center justify-center rounded-full p-2 text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900",
          className
        )}
      >
        <Search className="h-5 w-5" />
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex items-center", className)}>
      <Search className="pointer-events-none absolute left-3 h-4 w-4 text-navy-400" />
      <input
        autoFocus
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar no site…"
        className="w-48 rounded-full border border-navy-200 py-2 pl-9 pr-8 text-sm outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 sm:w-64"
      />
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Fechar pesquisa"
        className="absolute right-2 text-navy-400 hover:text-navy-700"
      >
        <X className="h-4 w-4" />
      </button>
    </form>
  );
}
