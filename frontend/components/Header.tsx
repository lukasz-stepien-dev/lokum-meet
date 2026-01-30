import { Climate_Crisis } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { auth } from "@/auth";

const climate: NextFont = Climate_Crisis({
  subsets: ["latin"],
});

export default async function Header() {
  const session = await auth();
  const idToken = session?.idToken;
  return (
    <header
      className={
        "flex w-full flex-col font-sans sticky top-0 backdrop-blur-2xl"
      }
    >
      <div className={"flex flex-row items-center"}>
        <h1 className={`${climate.className} text-primary text-3xl p-4 w-full`}>
          Lokum Meet
        </h1>
        <Input className={"mr-4 w-1/3"} />
        <Avatar className={"ml-auto mr-4"}>
          <AvatarImage />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Button className={"mr-4"}>
          <Plus /> Stwórz
        </Button>
      </div>
      <Separator />
    </header>
  );
};