interface FooterConfig {
  label: string;
  items: FooterItem[];
}

interface FooterItem {
  label: string;
  url: string | null;
  icon: React.ReactNode | null;
}
export const footerConfig: FooterConfig[] = [
  {
    label: "Categories",
    items: [
      {
        label: "phones",
        url: "#",
        icon: null,
      },
      {
        label: "laptops",
        url: "#",
        icon: null,
      },
      {
        label: "Pants",
        url: "#",
        icon: null,
      },
      {
        label: "Accessories",
        url: "#",
        icon: null,
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About",
        url: "/about",
        icon: null,
      },
      {
        label: "Careers",
        url: "/careers",
        icon: null,
      },
      {
        label: "Press",
        url: "/press",
        icon: null,
      },
      {
        label: "Blog",
        url: "/blog",
        icon: null,
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        label: "Contact Us",
        url: "/contact",
        icon: null,
      },
      {
        label: "FAQs",
        url: "/faqs",
        icon: null,
      },
      {
        label: "Shipping",
        url: "/shipping",
        icon: null,
      },
      {
        label: "Returns",
        url: "/returns",
        icon: null,
      },
    ],
  },

  {
    label: "Follow Us",
    items: [
      {
        label: "Github",
        url: "https://github.com",
        icon: "GitHubLogoIcon",
      },
      {
        label: "LinkedIn",
        url: "https://linkedin.com",
        icon: "LinkedInLogoIcon",
      },
      {
        label: "Twitter",
        url: "https://twitter.com",
        icon: "TwitterLogoIcon",
      },
    ],
  },
];
