import { ModeToggle } from "@/components/ui/mode-toggle";
import SpinningText from "@/components/3d/SpinningText";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select();

  return (
    <main className="">
      <header className="flex justify-between items-center px-4 py-2">
        <h1 className="text-4xl font-bold">Alsos Portefølje</h1>
        <ModeToggle />
      </header>
      <div className="flex">
        <SpinningText
          text="Calculator"
          textPosition={[0, 0, -0.51]}
          frontColor="#4a90e2"
          textColor="#ffffff"
          fontSize={0.3}
          width={200}
          height={200}
          boxSize={[3, 3]}
          link="/calculator"
        />
        <SpinningText
          text="Elev Innsjekk"
          textPosition={[0, 0, -0.51]}
          frontColor="#4a90e2"
          textColor="#ffffff"
          fontSize={0.3}
          width={200}
          height={200}
          boxSize={[3, 3]}
          link="/elev-innsjekk"
        />
        <SpinningText
          text="Music Player"
          textPosition={[0, 0, -0.51]}
          frontColor="#4a90e2"
          textColor="#ffffff"
          fontSize={0.3}
          width={200}
          height={200}
          boxSize={[3, 3]}
          link="/musicplayer"
        />
      </div>
      <p className="text-center mb-8">
        Velkommen til min portefølje! Her kan du finne en samling av mine
        prosjekter og lære mer om meg.
      </p>
    </main>
  );
}
