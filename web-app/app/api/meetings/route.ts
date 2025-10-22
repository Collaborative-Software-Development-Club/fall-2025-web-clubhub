import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const { all } = await getDb();
  const rows = await all(
    `SELECT id, date, time, club, conflict FROM meetings ORDER BY date, time`
  );
  return NextResponse.json(rows);
}