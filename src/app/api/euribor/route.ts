import { NextResponse } from "next/server";

// Spread médio aplicado pela C&Q sobre a Euribor nos cenários de taxa variável/mista.
const SPREAD = 0.75;

type Maturity = 3 | 6 | 12;

// Séries e páginas de referência do euribor-rates.eu por prazo de indexação.
const MATURITY_CONFIG: Record<Maturity, { series: string; referer: string; fallback: number }> = {
  3: {
    series: "2",
    referer: "https://www.euribor-rates.eu/en/current-euribor-rates/2/euribor-rate-3-months/",
    fallback: 2.55,
  },
  6: {
    series: "3",
    referer: "https://www.euribor-rates.eu/en/current-euribor-rates/3/euribor-rate-6-months/",
    fallback: 2.5,
  },
  12: {
    series: "4",
    referer: "https://www.euribor-rates.eu/en/current-euribor-rates/4/euribor-rate-12-months/",
    fallback: 2.45,
  },
};

interface EuriborReading {
  value: number;
  date: string;
}

const cache = new Map<Maturity, { reading: EuriborReading; fetchedAt: number }>();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

async function fetchEuribor(maturity: Maturity): Promise<EuriborReading | null> {
  const config = MATURITY_CONFIG[maturity];
  const now = Date.now();
  const start = now - 10 * 24 * 60 * 60 * 1000;
  const url = new URL("https://www.euribor-rates.eu/umbraco/api/euriborpageapi/highchartsdata");
  url.searchParams.set("series[0]", config.series);
  url.searchParams.set("minticks", String(start));
  url.searchParams.set("maxticks", String(now));

  const res = await fetch(url.toString(), {
    headers: {
      Referer: config.referer,
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

function parseMaturity(raw: string | null): Maturity {
  const num = Number(raw);
  return num === 6 || num === 12 ? num : 3;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const maturity = parseMaturity(searchParams.get("maturity"));
  const config = MATURITY_CONFIG[maturity];

  const cached = cache.get(maturity);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({
      maturity,
      euribor: cached.reading.value,
      date: cached.reading.date,
      spread: SPREAD,
      source: "cache",
    });
  }

  try {
    const reading = await fetchEuribor(maturity);
    if (reading) {
      cache.set(maturity, { reading, fetchedAt: Date.now() });
      return NextResponse.json({ maturity, euribor: reading.value, date: reading.date, spread: SPREAD, source: "live" });
    }
  } catch (error) {
    console.error(`Falha ao obter Euribor ${maturity}M`, error);
  }

  return NextResponse.json({ maturity, euribor: config.fallback, date: null, spread: SPREAD, source: "fallback" });
}
