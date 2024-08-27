import Clock from "@/components/clock";
import AlertBox from "@/components/elev-innsjekk/alert";
import CheckInBox from "@/components/elev-innsjekk/CheckInBox";
import { getGroup3Elev } from "@/src/select";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export default async function Page() {
  const data = await getGroup3Elev();

  return (
    <div className={`${roboto.className} h-screen w-screen`}>
      <div className="w-screen h-screen flex">
        {/* Time and Boxes Tab */}
        <div className="flex-1 w-3/4">
          <div className="h-1/6 w-all flex justify-center items-center">
            <Clock className="justify-center " classNameText="text-8xl" />
          </div>
          <div className="grid grid-cols-3 gap-4  p-4 m-4 h-5/6 w-4/6">
            {data.map((item) => (
              <CheckInBox
                key={item.id}
                id={item.id.toString()} // Convert id to string
                name={item.name}
                username={item.username}
                initialStatus={item.status ?? "not_checked_in"}
              />
            ))}
          </div>
        </div>
        {/* Alerts Tab */}
        <div className="fixed right-0 top-0 h-screen w-1/4 overflow-y-auto bg-zinc-100">
          <h1 className="text-3xl text-red-600 text-center bg-white">Varsel</h1>
          <AlertBox />
        </div>
      </div>
    </div>
  );
}
