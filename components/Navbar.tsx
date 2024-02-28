"use client";
import React, { useEffect } from "react";
import Container from "./Container";
import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";
import { Redressed } from "next/font/google";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "@/hooks/useCart";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { toast } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});

const Navbar = () => {
  const { cartTotalItems } = useCart();
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 w-full z-50 bg-white dark:bg-slate-950">
      <div className="py-[.8rem] border-b">
        <Container>
          <div className="flex justify-between items-center gap-3">
            <div>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={"/"} className={`  flex gap-2 items-center`}>
                    <Image
                      src="/logo.png"
                      alt="Urban Unbox"
                      width={40}
                      height={40}
                      className="rounded-full w-8 h-8"
                    />
                    <span
                      className={`${redressed.className} text-2xl font-bold`}
                    >
                      Urban Unbox
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className={poppins.className}>Home</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className=" items-center w-2/5 hidden md:flex">
              <form action="" className="w-full">
                <input
                  type="text"
                  placeholder="Search here"
                  className="hidden md:block rounded-sm py-2 px-3 w-full text-sm
                          outline-none dark:bg-slate-900 bg-slate-100 border border-slate-200
                           dark:border-slate-800"
                />
              </form>
              <MagnifyingGlassIcon
                className="w-5 h-5 text-gray-600 dark:text-gray-400 -ml-8"
                aria-hidden="true"
              />
            </div>

            <div className="flex items-center gap-5 ">
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href="/cart"
                    className="cursor-pointer relative w-fit rounded-full p-[.35rem] 
                hover:bg-slate-200 dark:hover:bg-slate-800 flex justify-center items-center"
                  >
                    <CiShoppingCart className="text-2xl " />
                    <span
                      className="rounded-full top-0 right-0 text-xs p-1 items-center
                 flex justify-center h-4 w-4 absolute bg-black text-white dark:bg-white dark:text-black"
                    >
                      {cartTotalItems}
                    </span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Cart</p>
                </TooltipContent>
              </Tooltip>

              <ToggleTheme />
              {/* ______ USER ______ */}

              {/* <Tooltip>
                <TooltipTrigger>
                  <div>User </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>User profile</p>
                </TooltipContent>
              </Tooltip> */}
              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="outline-none  focus-visible:ring-0 "
                    >
                      <Avatar src={session?.user?.image} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Profile</DropdownMenuItem>

                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => {
                        signOut({
                          callbackUrl: "http://localhost:3000",
                          redirect: false,
                        });
                      }}
                      className="text-red-500 cursor-pointer"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
