"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PgTimestamp } from "drizzle-orm/pg-core";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Elev = {
  id: number;
  name: string;
  username: string;
  statusenum: "checked_in" | "not_checked_in";
  checked_in_at: Date | null;
  group_id: string | null;
};

export const columns: ColumnDef<Elev>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Navn",
  },
  {
    accessorKey: "username",
    header: "Brukernavn",
  },
  {
    accessorKey: "statusenum",
    header: "Status",
  },
  {
    accessorKey: "checked_in_at",
    header: "Sjekket Inn Dato",
  },
  {
    accessorKey: "group_id",
    header: "Gruppe",
  },
];
