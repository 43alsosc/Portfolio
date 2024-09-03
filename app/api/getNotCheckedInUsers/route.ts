import { elevTable } from "@/src/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/src/db";
import moment from "moment-timezone";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get("groupId");

    if (!groupId) {
      return NextResponse.json(
        { error: "groupId is required" },
        {
          status: 400,
        }
      );
    }

    console.log(
      `Fetching users not checked in for 30 minutes for group ${groupId}...`
    );

    const osloTimezone = "Europe/Oslo";
    const now = moment().tz(osloTimezone);
    const thirtyMinutesAgo = now.clone().subtract(30, "minutes");

    console.log("Current time in Oslo:", now.format());
    console.log("Thirty minutes ago:", thirtyMinutesAgo.format());

    const result = await db
      .select({
        name: elevTable.name,
        checked_in_at: elevTable.checked_in_at,
        status: elevTable.status,
      })
      .from(elevTable)
      .where(
        and(
          eq(elevTable.status, "not_checked_in"),
          eq(elevTable.group_id, groupId),
          sql`${
            elevTable.checked_in_at
          } <= ${thirtyMinutesAgo.toISOString()} AND ${
            elevTable.checked_in_at
          } >= ${thirtyMinutesAgo.clone().startOf("day").toISOString()}`
        )
      );

    console.log("Query result:", result);

    if (result.length > 0) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({
        message: `No users found in group ${groupId} who haven't checked in for 30 minutes`,
      });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        message: "Error fetching data",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
