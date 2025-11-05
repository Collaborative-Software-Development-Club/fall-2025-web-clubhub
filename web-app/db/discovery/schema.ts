import { pgSchema } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";

export const discovery = pgSchema("discovery");

export const discoveryTest = discovery.table("test", {
    id: serial("id").primaryKey(),
});
