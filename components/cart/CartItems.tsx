"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

import { toast } from "sonner";
import { CheckCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CartItems = () => {
  const {
    cartItems,
    handleIncreaseQuanity,
    handleRemoveFromCart,
    handleDecreaseQuanity,
    cartTotalPrice,
  } = useCart();
  return (
    <>
      {/* ______ If no cart Items are present  ________*/}
      {cartItems?.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-lg opacity-80">No Items in Cart</div>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-bold text-3xl my-10 text-center">
            Your Cart Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
            {/* _______ All Cart Items ________ */}
            <div className="all-cart-items col-span-1 md:col-span-3 ">
              {cartItems?.map((product) => (
                <div
                  key={product?.id}
                  className="ITEM flex justify-between min-h-[10rem] gap-10 px-4 py-8 border-t"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-14 flex-col ">
                    {/* ___ IMAGE ______ */}
                    <div className="image hover:opacity-80 cursor-pointer">
                      <Link href={`/product/${product?.id}`}>
                        <Image
                          src={product?.image}
                          alt={product?.name}
                          width={130}
                          height={130}
                          className="object-contain w-25 h-25 md:w-40 md:h-40 rounded-md"
                        />
                      </Link>
                    </div>
                    {/* _____ Details _____ */}
                    <div className="details flex flex-col justify-between">
                      <div className="flex flex-col gap-2">
                        {/* ____ NAME _____ */}
                        <div className="capitalize">
                          {product?.name?.length < 25
                            ? product?.name
                            : product?.name.substring(0, 25) + "..."}
                        </div>
                        {/* ____ COLOR _____ */}

                        <div className="opacity-65">{product?.color}</div>
                        {/* ____ Price _____ */}

                        <div>
                          {product?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                      </div>

                      {/* _____ Stock _____ */}
                      <div className="stock">
                        {product?.inStock ? (
                          <div className="text-green-500 flex items-center gap-2">
                            <CheckCircledIcon className="w-5 h-5 text-green-500" />
                            In Stock
                          </div>
                        ) : (
                          <div className="text-red-500">Out of Stock</div>
                        )}
                      </div>
                    </div>
                    {/* ______ Quanity _____ */}
                    <div className="flex items-center gap-3">
                      <Button
                        className="rounded-md"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleDecreaseQuanity(product);
                        }}
                        disabled={
                          cartItems?.find((item) => item?.id == product?.id)
                            ?.quantity === 1
                        }
                      >
                        -
                      </Button>
                      <div>{product?.quantity}</div>
                      <Button
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
                        className="rounded-md"
                        variant="outline"
                        size="sm"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          onClick={() => handleRemoveFromCart(product)}
                          className="remove  cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 h-fit rounded-full p-1"
                        >
                          <Cross2Icon className="w-4 h-fit" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove product</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
            {/* _______ Checkout ________ */}

            {cartItems?.length !== 0 && (
              <div className="checkout dark:bg-slate-900 bg-slate-50 h-fit flex flex-col gap-3 col-span-1 md:col-span-2 rounded-lg p-8">
                <h2 className="text-lg font-medium">Checkout</h2>
                <div className="flex border-b py-4 items-center opacity-80 justify-between">
                  <div>SubTotal</div>
                  <div>
                    {cartTotalPrice?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
                <div className="flex border-b py-4 items-center opacity-80 justify-between">
                  <div>Shipping Estimate</div>
                  <div>$10</div>
                </div>
                <div className="flex border-b py-4 items-center opacity-80 justify-between">
                  <div>Tax Estimate</div>
                  <div>$2.44</div>
                </div>
                <div className="flex text-lg items-center font-medium justify-between">
                  <div>Order Total</div>
                  <div>
                    {(cartTotalPrice + 10 + 2.44)?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>

                <Button className="mt-8 py-5 text-md" variant="default">
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CartItems;
