import path from "node:path";
import fs from "node:fs";
import sqlite3 from "sqlite3";
import { promisify } from "node:util";

sqlite3.verbose();

type DBWrap = {
  db: sqlite3.Database;
  run: (sql: string, params?: any[]) => Promise<void>;
  all: <T = any>(sql: string, params?: any[]) => Promise<T[]>;
};

const DB_FILE = path.join(process.cwd(), "data", "clubhub.sqlite");

const seedMeetings = [
  { date: "9/22/25", time: "4:00 PM", club: "CSD", conflict: 0 },
  { date: "9/22/25", time: "4:00 PM", club: "Robotics", conflict: 1 },
  { date: "9/23/25", time: "5:00 PM", club: "Chess", conflict: 0 }
];

async function wrap(db: sqlite3.Database): Promise<DBWrap> {
  const runCb = (sql: string, params: any[] = [], cb: (err: Error | null) => void) =>
    db.run(sql, params, cb);
  const allCb = (sql: string, params: any[] = [], cb: (err: Error | null, rows: any[]) => void) =>
    db.all(sql, params, cb);

  const run = (sql: string, params: any[] = []) =>
    new Promise<void>((resolve, reject) => runCb(sql, params, (err) => (err ? reject(err) : resolve())));
  const all = <T = any>(sql: string, params: any[] = []) =>
    new Promise<T[]>((resolve, reject) => allCb(sql, params, (err, rows) => (err ? reject(err) : resolve(rows))));

  return { db, run, all };
}

let singleton: Promise<DBWrap> | null = null;
declare global {
  // eslint-disable-next-line no-var
  var __db_inited: boolean | undefined;
}

export async function getDb(): Promise<DBWrap> {
  if (!singleton) {
    // Ensure data dir exists
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

    singleton = new Promise<DBWrap>((resolve, reject) => {
      const db = new sqlite3.Database(DB_FILE, async (err) => {
        if (err) return reject(err);
        const wrapped = await wrap(db);

        // Dev-only: drop and reseed on server start for a clean demo
        if (!global.__db_inited) {
          await initSchemaAndSeed(wrapped);
          global.__db_inited = true;
        }

        resolve(wrapped);
      });
    });
  }
  return singleton;
}

async function initSchemaAndSeed({ run }: DBWrap) {
  await run(`DROP TABLE IF EXISTS meetings`);
  await run(`
    CREATE TABLE IF NOT EXISTS meetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,        -- e.g. "9/22/25"
      time TEXT NOT NULL,        -- e.g. "4:00 PM"
      club TEXT NOT NULL,
      conflict INTEGER NOT NULL DEFAULT 0
    )
  `);

  for (const m of seedMeetings) {
    await run(
      `INSERT INTO meetings (date, time, club, conflict) VALUES (?, ?, ?, ?)`,
      [m.date, m.time, m.club, m.conflict]
    );
  }
}

export async function recalcConflicts() {
  const { run, all } = await getDb();
  // Reset all to 0
  await run(`UPDATE meetings SET conflict = 0`);
  // Mark conflicts where same date+time has more than one meeting
  const overlaps = await all<{ date: string; time: string }>(
    `SELECT date, time FROM meetings GROUP BY date, time HAVING COUNT(*) > 1`
  );
  for (const row of overlaps) {
    await run(`UPDATE meetings SET conflict = 1 WHERE date = ? AND time = ?`, [row.date, row.time]);
  }
}