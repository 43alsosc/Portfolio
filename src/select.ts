import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { elevTable } from "./db/schema";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function getGroup1Elev() {
    Array<{
        id: string;
        name: string;
        username: string;
        statusenum: string;
        checked_in_at: Date;
        group_id: string;
    }>;
    {
        return db.select().from(elevTable).where(eq(elevTable.group_id, "A"));
    }
}

export async function getGroup2Elev() {
    Array<{
        id: string;
        name: string;
        username: string;
        statusenum: string;
        checked_in_at: Date;
        group_id: string;
    }>;
    {
        return db.select().from(elevTable).where(eq(elevTable.group_id, "B"));
    }
}

export async function getGroup3Elev() {
    Array<{
        id: string;
        name: string;
        username: string;
        statusenum: string;
        checked_in_at: Date;
        group_id: string;
    }>;
    {
        return db.select().from(elevTable).where(eq(elevTable.group_id, "C"));
    }
}
