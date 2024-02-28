import React from "react";
import { RegisterForm } from "@/components/form/RegisterForm";
import { Redressed } from "next/font/google";

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});
const page = () => {
  return (
    <div
      className="w-full sm:2/4 md:w-2/4 lg:w-2/5 xl:w-1/4 m-4 md:m-0 rounded-md 
    bg-slate-100 dark:bg-slate-900 flex gap-10 flex-col items-center justify-center login p-5 "
    >
      <div className="flex items-center justify-center">
        <span className={`${redressed.className} text-2xl font-bold`}>
          Create a new account
        </span>
      </div>
      <RegisterForm />
    </div>
  );
};

export default page;
