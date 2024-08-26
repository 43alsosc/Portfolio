import { columns } from "@/components/elev-innsjekk/columns";
import { DataTable } from "@/components/elev-innsjekk/data-table";
import { getGroup3Elev } from "@/src/select";

export default async function Page() {
  const data = await getGroup3Elev();

  return (
    <div className="flex justify-center align-middle h-screen w-screen">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
