import React from "react";
import { LoginForm } from "@/components/form/LoginForm";
import Image from "next/image";
import { Redressed } from "next/font/google";

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});

const page = () => {
  return (
    <div className="w-full sm:2/4 md:w-2/4 lg:w-2/5 xl:w-1/4 m-4 md:m-0 rounded-md 
    bg-slate-100 dark:bg-slate-900 flex gap-6 flex-col items-center justify-center login p-5 ">
      <div className="flex items-center justify-center">
        <span className={`${redressed.className} text-2xl font-bold`}>
          Login to Urban Unbox
        </span>
        
      </div>
      <LoginForm />
    </div>
  );
};

export default page;
