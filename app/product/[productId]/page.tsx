"use client";
import Container from "@/components/Container";
import { products } from "@/utils/products";
import React, { useState } from "react";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { MinusIcon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/Avatar";

import { toast } from "sonner";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const page = ({ params }: { params: { productId?: string } }) => {
  const product: any = products.find((prod) => prod.id === params.productId);
  const {
    name,
    images,
    color,
    description,
    inStock,
    reviews,
    price,
    category,
    brand,
  } = product;

  const {
    handleAddToCart,
    cartItems,
    handleDecreaseQuanity,
    handleRemoveFromCart,
    handleIncreaseQuanity,
  } = useCart();
  const [heroImage, setHeroImage] = useState<string>(images[0].image);
  const [selectedColor, setSelectedColor] = useState<string>(images[0].color);
  const [quantity, setQuantity] = useState<number>(1);

  const generateRandomValues = (count: number) => {
    return Array(count)
      .fill(0)
      .map(() => Math.floor(Math.random() * 3) + 4);
  };

  const randomValues = generateRandomValues(5);
  return (
    <Container>
      <div className="mt-10">
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="images grid grid-cols-1 sm:grid-cols-2">
              <div className="all-images mt-10 md:mt-0 justify- items-center flex md:flex-col pt-10 gap-4 order-2 md:order-1">
                {images.map(({ image }: { image: string }, i: number) => (
                  <Image
                    key={i}
                    src={image}
                    onClick={() => setHeroImage(image)}
                    alt={name}
                    width={100}
                    height={100}
                    className={`cursor-pointer border-2 hover:opacity-100 ${
                      heroImage === image
                        ? `border-slate-400 dark:border-slate-500`
                        : `shadow-md dark:shadow-none border-transparent`
                    } p-2 rounded-md`}
                  />
                ))}
              </div>
              <div className="hero-image flex items-start pt-10 order-1 md:order-2">
                <Image
                  src={heroImage}
                  alt={name}
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="details flex flex-col gap-2">
              <div
                className={`title opacity-80 font-medium ${
                  name?.length > 40 ? "text-xl" : "text-3xl capitalize"
                }`}
              >
                {name}
              </div>
              {/* _______ Price ______  */}
              <div className="font-bold opacity-80 text-2xl">
                {price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>

              {/* _______ Ratings ______  */}
              <div className="flex gap-4  items-center">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <StarFilledIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i <= 3 ? "text-yellow-400" : "text-neutral-300"
                        } `}
                      />
                    ))}
                </div>
                <span className="opacity-65">{reviews?.length} reviews</span>
              </div>

              {/* _______ Description ______  */}
              <div className="opacity-80 text-md border-b py-2">
                {description}
              </div>

              {/* _______ Extras ______  */}
              <div className="extras flex flex-col opacity-75 text-md gap-2">
                <div className="capitalize flex gap-3">
                  <span className="font-medium">Category:</span>
                  {category}
                </div>
                <div className="capitalize flex gap-3">
                  <span className="font-medium">Brand:</span>
                  {brand}
                </div>
                {!inStock ? (
                  <div className="text-md my-1 font-medium text-red-600">
                    Out of Stock
                  </div>
                ) : (
                  <div className="text-md my-1 font-medium text-green-600">
                    In stock
                  </div>
                )}
                <div className="colors flex gap-4">
                  {images?.map(
                    ({ color, colorCode, image }: any, i: number) => (
                      <div
                        key={i}
                        onClick={() => {
                          setHeroImage(image);
                          setSelectedColor(color);
                        }}
                        className={`border-2 w-8 h-8 flex items-center 
                      justify-center rounded-full   ${
                        heroImage === image
                          ? `border-slate-500 dark:border-slate-500`
                          : `border-transparent shadow-slate-400 shadow-sm`
                      }`}
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <div
                              key={i}
                              className="color  flex items-center gap-2 w-6 h-6    rounded-full cursor-pointer"
                              style={{ backgroundColor: colorCode }}
                            ></div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )
                  )}
                </div>
              </div>

              {cartItems.some((item) => item.id == product.id) ? (
                //  _______ Quantity ______
                <div className="quantity my-2">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Quantity:</span>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (
                          cartItems?.find((item) => item?.id == product?.id)
                            ?.quantity === 1
                        ) {
                          handleRemoveFromCart(product);
                        } else {
                          handleDecreaseQuanity(product);
                        }
                      }}
                      disabled={
                        cartItems?.find((item) => item?.id == product?.id)
                          ?.quantity === 0
                      }
                      className="rounded-l-md  cursor-pointer"
                    >
                      <MinusIcon fontWeight={600} />
                    </Button>

                    <span className="select-none">
                      {
                        cartItems.find((item) => item.id == product.id)
                          ?.quantity
                      }
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (
                          cartItems?.find((item) => item?.id == product?.id)
                            ?.quantity === 10
                        ) {
                          toast.error("Quantity cannot be more than 10");
                          return;
                        }

                        handleIncreaseQuanity(product);
                      }}
                      className="rounded-l-md cursor-pointer"
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </div>
              ) : (
                // _______ Add to Cart ______
                <div className="add-to-cart my-3">
                  <Button
                    variant="default"
                    className="text-md px-4 py-5 select-none w-2/5"
                    disabled={!inStock}
                    onClick={() => {
                      handleAddToCart(
                        product,
                        quantity,
                        heroImage,
                        selectedColor
                      );
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              )}
              {cartItems?.some((item) => item.id == product.id) && (
                <Link href="/cart">
                  <Button
                    variant="secondary"
                    className="text-md px-4 py-5 select-none w-2/5"
                  >
                    Go to Cart
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="reviews flex flex-col gap-4">
            <h4 className="font-bold capitalize text-2xl opacity-70">
              Product Reviews
            </h4>
            {reviews?.map((review: any, i: number) => (
              <div
                key={review?.id}
                className="flex flex-col gap-3 shadow-sm p-3 border-slate-100 dark:border-slate-800 dark:border rounded-md"
              >
                {/* _______ User ______  */}
                <div className="user flex gap-1 items-center">
                  <Avatar src={review?.user?.image} />
                  <div className="flex flex-col ml-2 gap-1">
                    <div className="name flex items-center gap-2 text-sm font-medium capitalize">
                      {review?.user?.name}
                      <div className="date text-xs opacity-75">
                        {new Date(review?.createdDate).toDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                {/* _______ Ratings ______  */}
                <div className="flex gap-4  items-center">
                  <div className="flex">
                    {Array(review?.rating)
                      .fill(0)
                      .map((_, i) => (
                        <StarFilledIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i <= 3 ? "text-yellow-400" : "text-neutral-300"
                          } `}
                        />
                      ))}
                  </div>
                </div>
                {/* _______ Reviews ______  */}
                <div>{review?.comment}</div>
              </div>
            ))}
          </div>
        </>
      </div>
    </Container>
  );
};

export default page;
