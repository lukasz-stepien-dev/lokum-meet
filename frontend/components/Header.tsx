import { Climate_Crisis } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getUser, verifySession } from "@/src/data-access-layer";
import Link from "next/link";
import HeaderUserMenu from "@/components/HeaderUserMenu";

const climate: NextFont = Climate_Crisis({
  subsets: ["latin"],
});

export default async function Header() {
  const isAuth = await verifySession();
  const user = await getUser();

  return (
    <header className="flex w-full flex-col font-sans sticky top-0 backdrop-blur-2xl">
      <div className="flex flex-row items-center">
        <h1 className={`${climate.className} text-primary text-3xl p-4 w-full`}>
          Lokum Meet
        </h1>
        <Input className="mr-4 w-1/3" />
        {!isAuth && (
          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`}>
            <Button className={"mr-4"} variant="outline">Zaloguj się (Google)</Button>
          </Link>
        )}
        {isAuth && user && (
          <HeaderUserMenu
            avatarUrl={user.avatarUrl || ""}
            username={user.username || ""}
          />
        )}
        {isAuth &&
            <Button className="mr-4">
              <Plus /> Stwórz
            </Button>
        }
      </div>
      <Separator />
    </header>
  );
}