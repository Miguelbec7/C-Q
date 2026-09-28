import { NextResponse } from "next/server";

// Spread médio aplicado pela C&Q sobre a Euribor 3M nos cenários de taxa variável/mista.
const SPREAD = 0.75;

// Valor de referência usado apenas se a fonte externa falhar (atualizar manualmente de vez em quando).
const FALLBACK_EURIBOR_3M = 2.55;

interface EuriborReading {
  value: number;
  date: string;
}

let cache: { reading: EuriborReading; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

async function fetchEuribor3M(): Promise<EuriborReading | null> {
  const now = Date.now();
  const start = now - 10 * 24 * 60 * 60 * 1000;
  const url = new URL("https://www.euribor-rates.eu/umbraco/api/euriborpageapi/highchartsdata");
  url.searchParams.set("series[0]", "2"); // 2 = Euribor 3 meses
  url.searchParams.set("minticks", String(start));
  url.searchParams.set("maxticks", String(now));

  const res = await fetch(url.toString(), {
    headers: {
      Referer: "https://www.euribor-rates.eu/en/current-euribor-rates/2/euribor-rate-3-months/",
      "User-Agent": "Mozilla/5.0 (compatible; CQFinancasSimulador/1.0; +https://cqfinancassolucoes.com)",
    },
  });
  if (!res.ok) return null;

  const data = await res.json().catch(() => null);
  const points: [number, number][] | undefined = data?.[0]?.Data;
  if (!points || points.length === 0) return null;

  const [timestamp, value] = points[points.length - 1];
  if (typeof value !== "number") return null;

  return { value, date: new Date(timestamp).toISOString().slice(0, 10) };
}

export async function GET() {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({ euribor3m: cache.reading.value, date: cache.reading.date, spread: SPREAD, source: "cache" });
  }

  try {
    const reading = await fetchEuribor3M();
    if (reading) {
      cache = { reading, fetchedAt: Date.now() };
      return NextResponse.json({ euribor3m: reading.value, date: reading.date, spread: SPREAD, source: "live" });
    }
  } catch (error) {
    console.error("Falha ao obter Euribor 3M", error);
  }

  return NextResponse.json({ euribor3m: FALLBACK_EURIBOR_3M, date: null, spread: SPREAD, source: "fallback" });
}
