import React from "react";
import Container from "./Container";
import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import { footerConfig } from "@/config/footer-config";

const Footer = () => {
  return (
    <footer className="border-t dark:border-t-slate-700 border-t-slate-200 text-sm mt-20">
      <Container>
        <div
          className="pt-16 pb-8 w-full px-2 md:px-6
        grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10
        "
        >
          {footerConfig.map((config) => (
            <div key={config.label} className="flex flex-col gap-3">
              <h3 className="text-lg font-[500] ">{config.label}</h3>
              {config.items.map((item) => (
                <Link
                  key={item.label}
                  href={"#"}
                  className="flex capitalize gap-1 items-center hover:font-medium  hover:text-slate-700 
                  transition duration-200"
                >
                  {item.icon === "GitHubLogoIcon" && <GitHubLogoIcon />}
                  {item.icon === "LinkedInLogoIcon" && <LinkedInLogoIcon />}
                  {item.icon === "TwitterLogoIcon" && <TwitterLogoIcon />}
                  {item.icon === "InstagramLogoIcon" && <InstagramLogoIcon />}
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
