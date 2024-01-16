import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import ProductCard from "../catalog/ProductCard";
import Loading from "../../app/layouts/Loading";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import useProducts from "../../app/hooks/useProducts";
import SliderArrowWrapper from "../../app/components/SliderArrowWrapper";

export default function Home() {
  const { products, productsLoaded } = useProducts();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
    <>
      <Typography textAlign={"center"} variant="h2" sx={{ mb: "20px" }}>
        Our products:
      </Typography>
      <Box sx={{ m: "auto", width: "500px" }}>
        <Slider {...settings}>
          {products.map((product) => {
            return (
              <Box p={"20px"} key={product.id}>
                <ProductCard product={product} />
              </Box>
            );
          })}
        </Slider>
      </Box>
    </>
  );
}
