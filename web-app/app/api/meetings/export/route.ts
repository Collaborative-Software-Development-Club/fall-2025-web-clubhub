import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { createEvents } from "ics";

function toDateParts(date: string, time: string) {
  // "9/22/25" + "4:00 PM" -> [YYYY, M, D, H, m]
  const [m, d, y] = date.split("/").map((s) => parseInt(s, 10));
  const [t, ampm] = time.split(" ");
  let [hh, mm] = t.split(":").map((s) => parseInt(s, 10));
  if (ampm.toUpperCase() === "PM" && hh !== 12) hh += 12;
  if (ampm.toUpperCase() === "AM" && hh === 12) hh = 0;
  const year = y < 100 ? 2000 + y : y;
  return [year, m, d, hh, mm] as [number, number, number, number, number];
}

export async function GET() {
  const { all } = await getDb();
  const rows = await all<{ date: string; time: string; club: string; conflict: number }>(
    `SELECT date, time, club, conflict FROM meetings ORDER BY date, time`
  );

  const events = rows.map((r) => ({
    title: `${r.club} Meeting`,
    start: toDateParts(r.date, r.time),
    duration: { minutes: 60 },
    description: r.conflict ? "Conflict flagged in ClubHub" : "",
    productId: "clubhub",
  }));

  const { error, value } = createEvents(events);
  if (error || !value) {
    return NextResponse.json({ error: error?.message ?? "Failed to generate ICS" }, { status: 500 });
  }

  return new NextResponse(value, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="clubhub.ics"',
      "Cache-Control": "no-cache",
    },
  });
}