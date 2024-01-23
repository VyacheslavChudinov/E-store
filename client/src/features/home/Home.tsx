import { Box } from "@mui/material";
import Slider from "react-slick";
import ProductCard from "../catalog/ProductCard";
import Loading from "../../app/layouts/Loading";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import useProducts from "../../app/hooks/useProducts";
import SliderArrowWrapper from "../../app/components/SliderArrowWrapper";

export default function Home() {
  const { products, productsLoaded } = useProducts();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: (
      <SliderArrowWrapper>
        <ArrowCircleLeft
          color="info"
          fontSize="large"
          sx={{ ":hover": { color: "sienna" } }}
        />
      </SliderArrowWrapper>
    ),
    nextArrow: (
      <SliderArrowWrapper>
        <ArrowCircleRight
          color="info"
          fontSize="large"
          sx={{ ":hover": { color: "sienna" } }}
        />
      </SliderArrowWrapper>
    ),
  };

  if (!productsLoaded) {
    return <Loading message="Loading products..."></Loading>;
  }

  return (
    <Box
      position={"relative"}
      top={"50%"}
      sx={{ transform: "translate(0, -50%)" }}
    >
      <Slider {...sliderSettings}>
        {products.map((product) => {
          return (
            <Box key={product.id} sx={{ p: "0 25px" }}>
              <ProductCard product={product} />
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}
