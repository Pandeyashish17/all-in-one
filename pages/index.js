import Link from "next/link";
import { data } from "../data";
export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-10 mb-10">
        {data.map((item,i) => {
          return (
            <Link href={item.path} key={i}>
              <div className="mockup-code w-[80vw] h-[30vh] cursor-pointer mb-10  flex items-center justify-center flex-col gap-2">
                <code className="text-3xl">{item.name}</code>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
