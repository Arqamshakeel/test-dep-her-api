import React, { Fragment } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import RecipeReviewCard from "../CustomCard";
import { useMediaQuery } from "react-responsive";
import CustomCarousel from "../Carousel/Carousel";
import productService from "../../services/ProductServices";
const ShowWithTags = (props) => {
  const [imgBuffer, setImgBuffer] = React.useState("");
  const [products, setProducts] = React.useState([]);
  console.log(props);
  const apiGETproducts = () => {
    productService
      .getAllProducts()
      .then(function (data) {
        //   console.log(data[0].image.data);
        setProducts(data);
        //console.log(data[2].category);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(apiGETproducts, []);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}></Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Typography
              variant="h3"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              {props.match.params.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
      </Grid>
      <Grid container spacing={1} align="center" justify="center">
        {products.map((product, index) => {
          return (
            <Fragment key={index}>
              {product.category.map((cat, i) => {
                {
                  return cat == props.match.params.name ? (
                    <RecipeReviewCard
                      badge={props.badge}
                      setbadge={props.setbadge}
                      key={i}
                      image={product.image.data}
                      stock={product.stock}
                      product={product}
                    ></RecipeReviewCard>
                  ) : (
                    <Fragment key={i}></Fragment>
                  );
                }
              })}
            </Fragment>
          );
        })}
      </Grid>
    </div>
  );
};
export default ShowWithTags;
