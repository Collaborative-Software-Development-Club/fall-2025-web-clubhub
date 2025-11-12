import { pgSchema, pgTable } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";

const withPrefix = (name: string) => "discovery_" + name;

export const discoveryTest = pgTable(withPrefix("test"), {
    id: serial("id").primaryKey(),
});
