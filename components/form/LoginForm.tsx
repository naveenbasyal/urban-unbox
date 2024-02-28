"use client";
import { useLayoutEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { toast } from "sonner";

import { signIn, useSession } from "next-auth/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string(),
});

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [goggleLoading, setGoogleLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  console.log("status", status);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  //   console.log(values);

  //   try {
  //     setLoading(true);
  //     const callback = await signIn("credentials", {
  //       email: values.email,
  //       password: values.password,
  //       redirect: false,
  //     });
  //     if (callback?.ok) {
  //       console.log(callback);
  //       router.push("/");
  //       toast.success("Logged In");
  //     } else if (callback?.error) {
  //       console.log(callback);
  //       toast.error(callback.error);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // toast.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useLayoutEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [status]);

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      signIn("github", {
        callbackUrl: "http://localhost:3000",
        redirect: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      signIn("google", {
        callbackUrl: "http://localhost:3000",
        redirect: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <Form {...form}>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`
        ${loading ? "bg-gray-400 dark:bg-slate-500" : ""} w-full
        `}
        >
          {loading ? <ReloadIcon className="animate-spin" /> : "Login"}
        </Button>
      </form>
      
      <div
        className="mx-auto my-4 flex w-full items-center
       justify-evenly before:mr-4 before:block before:h-px before:flex-grow 
       before:bg-slate-200 dark:before:bg-slate-800 after:ml-4 after:block after:h-px after:flex-grow after:bg-slate-200 dark:after:bg-slate-800"
      >
        or
      </div> */}
      <div className="flex w-full gap-x-3">
        <Button
          variant="outline"
          className={`w-full py-5 ${loading ? "bg-slate-200 dark:bg-slate-700" : ""}`}
          onClick={handleGithubLogin}
          disabled={loading}
        >
          <span className="gap-x-2 flex items-center">
            <FaGithub className="w-4 h-4" /> Github
          </span>
        </Button>
        <Button
          disabled={goggleLoading}
          variant="outline"
          onClick={handleGoogleLogin}
          className={`w-full py-5 ${
            goggleLoading ? "bg-slate-200 dark:bg-slate-700" : ""
          }`}
        >
          <span className="gap-x-2 flex items-center">
            <FcGoogle className="w-4 h-4" /> Google
          </span>
        </Button>
      </div>
      {/* <div className="text-center text-sm opacity-85">
        if you don't have an account, please{" "}
        <Link href="/register" className="underline text-blue-500">
          Sign up
        </Link>
      </div> */}
    </Form>
  );
}
