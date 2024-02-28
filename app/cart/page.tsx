import Container from "@/components/Container";

import CartItems from "@/components/cart/CartItems";
import { Options } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Cart = async () => {
  const session = await getServerSession();

  console.log("session from cart", session);
  if (!session) {
    redirect("/login");
  }
  return (
    <Container>
      <CartItems />
    </Container>
  );
};

export default Cart;
