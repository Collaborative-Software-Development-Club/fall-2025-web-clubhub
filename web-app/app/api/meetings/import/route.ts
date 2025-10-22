import { NextResponse } from "next/server";
import { getDb, recalcConflicts } from "@/lib/db";
// ical.js works in Node for parsing
import * as ICAL from "ical.js";
import ical from "node-ical";

function toLocalStrings(dt: Date) {
  // Returns [dateStr "M/D/YY", timeStr "h:mm AM/PM"]
  const dateStr = dt.toLocaleDateString("en-US", { year: "2-digit", month: "numeric", day: "numeric" });
  const timeStr = dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return [dateStr, timeStr] as [string, string];
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart/form-data with 'file' field" }, { status: 400 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const text = await file.text();
  const components = await ical.async.parseICS(text);
  let inserted = 0;

  const { run } = await getDb();

  for (const k of Object.keys(components)) {
    const comp = components[k];
    if (comp.type !== "VEVENT") continue;

    const push = async (dt: Date, summary: string) => {
      const dateStr = dt.toLocaleDateString("en-US", { year: "2-digit", month: "numeric", day: "numeric" });
      const timeStr = dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
      await run(`INSERT INTO meetings (date, time, club, conflict) VALUES (?, ?, ?, 0)`, [
        dateStr,
        timeStr,
        summary || "Imported",
      ]);
      inserted++;
    };

    if (comp.rrule) {
      // Expand 6 months ahead
      const now = new Date();
      const end = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 180);
      const it = comp.rrule.between(now, end, true);
      for (const dt of it) {
        // Shift by event start time’s timezone offset if needed
        const start = comp.start instanceof Date ? comp.start : new Date(comp.start as any);
        const occurrence = new Date(
          dt.getFullYear(),
          dt.getMonth(),
          dt.getDate(),
          start.getHours(),
          start.getMinutes()
        );
        await push(occurrence, comp.summary);
      }
    } else if (comp.start) {
      await push(new Date(comp.start as any), comp.summary);
    }
  }

  await recalcConflicts();
  return NextResponse.json({ inserted });
}