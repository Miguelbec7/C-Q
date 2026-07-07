"use client";

/**
 * Widget de chat — interface pronta para ligar a um motor de IA (ex.: API da Anthropic)
 * através do endpoint /api/chat. Por agora responde com mensagens estáticas de apoio.
 */
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Olá! 👋 Sou o assistente virtual da C&Q Finanças & Soluções. Posso ajudar a esclarecer dúvidas sobre crédito habitação, transferência de crédito, crédito pessoal, IMT, Imposto do Selo, IMI, mais-valias imobiliárias ou salário líquido. Em que posso ajudar?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Peço desculpa, não consegui responder agora. Pode contactar-nos diretamente pelo WhatsApp ou pelo formulário de contacto.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat"
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white shadow-premium transition-transform duration-200 hover:scale-110 sm:bottom-6 sm:left-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 left-5 z-40 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-premium sm:left-6">
          <div className="bg-navy-900 px-4 py-3">
            <p className="text-sm font-semibold text-white">Assistente C&Q</p>
            <p className="text-xs text-navy-300">Normalmente respondemos em poucos minutos</p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  message.role === "assistant"
                    ? "bg-navy-50 text-navy-800"
                    : "ml-auto bg-gold-400 text-navy-950"
                )}
              >
                {message.content}
              </div>
            ))}
            {loading && <div className="max-w-[85%] rounded-2xl bg-navy-50 px-3.5 py-2.5 text-sm text-navy-400">A escrever…</div>}
          </div>

          <div className="flex items-center gap-2 border-t border-navy-100 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escreva a sua pergunta…"
              className="flex-1 rounded-full border border-navy-200 px-4 py-2 text-sm outline-none focus:border-navy-400"
            />
            <button
              type="button"
              onClick={handleSend}
              aria-label="Enviar"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy-900 text-white"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
