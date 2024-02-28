import Container from "@/components/Container";
import { Slider } from "../components/Slider";
import { products } from "@/utils/products";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductList from "@/components/ProductList";

export default async function Home() {
  return (
    <>
      <Slider />
      <Container>
        <ProductList />
      </Container>
    </>
  );
}
