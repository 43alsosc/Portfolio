import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export default async function Page() {
  return (
    <div className="flex justify-center align-middle h-screen w-screen">
      <div className={roboto.className}>
        <h1>Elev Innsjekk</h1>
        <p>Velkommen til elev innsjekk!</p>
        <p className="text-xl">Vennligst velg skole</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-[#f08920] p-4 rounded-md text-2xl leading-tight tracking-tight">
            Akademiet Realfagskolen Drammen
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuLabel>Velg klasse</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex">
              <Link
                className="hover:text-[#f08920] px-4 py-2"
                href={"/elev-innsjekk/gruppe1"}
              >
                1. Klasse til 3. Klasse
              </Link>
              <br />
              <Link
                className="hover:text-[#f08920] px-4 py-2"
                href={"/elev-innsjekk/gruppe2"}
              >
                4. Klasse til 6. Klasse
              </Link>
              <br />

              <Link
                className="hover:text-[#f08920] px-4 py-2"
                href={"/elev-innsjekk/gruppe3"}
              >
                7. Klasse til 10. Klasse
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
