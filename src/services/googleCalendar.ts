export type CalendarShow = {
  id: string;
  title: string;
  city: string;
  place: string;
  date: Date;
  day: string;
  month: string;
  time: string;
};

type GoogleCalendarEvent = {
  id: string;
  summary?: string;
  location?: string;
  description?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
};

type GoogleCalendarListResponse = {
  items?: GoogleCalendarEvent[];
  error?: { message?: string };
};

const MONTH_FMT = new Intl.DateTimeFormat('pt-BR', { month: 'short' });
const TIME_FMT = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
});

function parseCityAndPlace(location?: string): { city: string; place: string } {
  if (!location?.trim()) {
    return { city: 'A confirmar', place: 'Local a definir' };
  }

  const parts = location
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 1) {
    return { city: parts[0], place: parts[0] };
  }

  // "Local, Cidade - UF" → place = first, city = rest joined
  return {
    place: parts[0],
    city: parts.slice(1).join(', '),
  };
}

function toShow(event: GoogleCalendarEvent): CalendarShow | null {
  const startRaw = event.start?.dateTime ?? event.start?.date;
  if (!startRaw) return null;

  const date = new Date(startRaw);
  if (Number.isNaN(date.getTime())) return null;

  const { city, place } = parseCityAndPlace(event.location);
  const hasTime = Boolean(event.start?.dateTime);

  return {
    id: event.id,
    title: event.summary?.trim() || 'Show Márcio Leite',
    city,
    place,
    date,
    day: String(date.getDate()).padStart(2, '0'),
    month: MONTH_FMT.format(date).replace('.', '').toUpperCase(),
    time: hasTime ? TIME_FMT.format(date) : 'Horário a confirmar',
  };
}

/**
 * Fetches upcoming events from a public Google Calendar.
 * Configure via Vite env:
 * - VITE_GOOGLE_CALENDAR_ID
 * - VITE_GOOGLE_CALENDAR_API_KEY
 */
export async function fetchUpcomingShows(): Promise<CalendarShow[]> {
  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined;
  const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string | undefined;

  if (!calendarId?.trim() || !apiKey?.trim()) {
    return [];
  }

  const params = new URLSearchParams({
    key: apiKey,
    singleEvents: 'true',
    orderBy: 'startTime',
    timeMin: new Date().toISOString(),
    maxResults: '20',
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google Calendar API error (${response.status})`);
  }

  const data = (await response.json()) as GoogleCalendarListResponse;

  if (data.error?.message) {
    throw new Error(data.error.message);
  }

  return (data.items ?? [])
    .map(toShow)
    .filter((show): show is CalendarShow => show !== null)
    .filter((show) => show.date.getTime() >= Date.now() - 60_000)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function isGoogleCalendarConfigured(): boolean {
  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined;
  const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string | undefined;
  return Boolean(calendarId?.trim() && apiKey?.trim());
}
