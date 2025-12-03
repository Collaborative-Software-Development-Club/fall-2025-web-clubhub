import { InferSelectModel } from "drizzle-orm";
import { meetings } from "@/db/attendance/schema";

export type Meeting = InferSelectModel<typeof meetings>;