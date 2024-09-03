import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { elevTable } from "@/src/db/schema";
import moment from "moment-timezone";

export async function POST(request: Request) {
    try {
        // Request
        const { id, status } = await request.json();

        // Hvis det ikke kommer data i requesten, returner feilmelding
        if (!id || !status) {
            return NextResponse.json({ error: "Missing id or status" }, {
                status: 400,
            });
        }

        // Lager dato variablel som er 2 timer frem i tid pga tidssone problemer
        const date = new Date(moment().add(2, "hours").toISOString());

        // Oppdaterer status i database
        await db.update(elevTable)
            .set({ status, checked_in_at: date })
            .where(eq(elevTable.id, id));

        // Returnerer respons hvis alt gikk bra
        return NextResponse.json({ message: "Status updated successfully" });
    } catch (error) {
        // Hvis det skjer en feil, returner feilmelding
        console.error("Error updating status:", error);
        return NextResponse.json({ error: "Internal server error" }, {
            status: 500,
        });
    }
}
