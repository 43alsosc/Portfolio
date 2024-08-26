import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { elevTable } from "@/src/db/schema";
import moment from "moment-timezone";

export async function POST(request: Request) {
    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({ error: "Missing id or status" }, {
                status: 400,
            });
        }

        const date = new Date(moment().add(2, "hours").toISOString());

        await db.update(elevTable)
            .set({ status, checked_in_at: date })
            .where(eq(elevTable.id, id));

        return NextResponse.json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ error: "Internal server error" }, {
            status: 500,
        });
    }
}
