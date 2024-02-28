"use client";
import React, { useState } from "react";
import { products } from "@/utils/products";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import Link from "next/link";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-slate-900 dark:to-slate-800 to-neutral-100"></div>
);

const ProductList = () => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <>
      <BentoGrid className="mx-auto mt-10 ">
        {products?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={
              <h1 className="font-medium break-all capitalize text-slate-600 dark:text-slate-300 text-lg flex items-center justify-center w-full">
                {item.name.length < 25
                  ? item.name
                  : item.name.substring(0, 25) + "..."}
              </h1>
            }
            header={
              <Link
                href={`/product/${item.id}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <div className="relative w-full h-52 flex justify-center rounded-lg overflow-hidden">
                  {imageLoading && <Skeleton />}
                  <LazyLoadImage
                    src={item.images[0].image}
                    alt={item.name}
                    className={`h-48 object-contain rounded-lg ${
                      imageLoading ? "hidden" : ""
                    }`}
                    afterLoad={() => setImageLoading(false)}
                    effect="blur"
                    placeholder={<Skeleton />}
                  />
                </div>
              </Link>
            }
            className={`${
              i === 3 || i === 6 ? "md:col-span-2" : ""
            } border-slate-200`}
          />
        ))}
      </BentoGrid>
    </>
  );
};

export default ProductList;
