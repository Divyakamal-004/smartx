import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="flex flex-col gap-5 m-10  justify-center items-center">
        <div>
          <h1 className="font-bold text-5xl">SMARTX</h1>
        </div>
        <div>
          <p>Smart education for the future.</p>
        </div>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center m-center h-[70vh] ">
        <Button variant={"outline"}>
          <Link href="/student/login"> Login as Student</Link>
        </Button>
        <Button variant={"outline"}>
          <Link href="/teacher/login"> Login as Teacher</Link>
        </Button>
        <Button variant={"outline"}>
          <Link href="/management/login"> Login as Management</Link>
        </Button>
      </div>
    </div>
  );
}
