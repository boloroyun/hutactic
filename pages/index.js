import NextLink from 'next/link';
import Head from 'next/head';
import {
  Grid,
  Link,
  Typography,
  Box,
  CardActionArea,
  Card,
  CardMedia,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import Service from '../models/Service';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';
import ProductItem from '../components/ProductItem';
import ServiceItem from '../components/ServiceItem';

import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from '../utils/classes';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts, services } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  const [categories, setCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchServiceCategories = async () => {
    try {
      const { data } = await axios.get(`/api/services/serviceCategories`);
      setServiceCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  useEffect(() => {
    fetchServiceCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Head>
        <title>Countertops</title>
        <meta
          name="description"
          content="Best countertops in the Virginia"
        ></meta>
        <link></link>
      </Head>
      <Carousel>
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link sx={classes.flex}>
              <Card sx={{ width: '100%' }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={product.featuredImage}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      bgcolor: 'rgba(0, 0, 0, 0.54)',
                      color: 'white',
                      padding: '10px',
                    }}
                  >
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography align="right" variant="body2">
                      {product.description}
                    </Typography>
                    <Typography align="left" variant="body2">
                      {product.brand}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Grid container spacing={1}>
        <Grid item md={9} sx={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                {' '}
                <Typography component="h1" variant="h1">
                  Popular Products
                </Typography>
              </ListItem>
              <ListItem>
                {' '}
                <Grid container spacing={5}>
                  {topRatedProducts.map((product) => (
                    <Grid item md={4} key={product.name}>
                      <ProductItem
                        product={product}
                        addToCartHandler={addToCartHandler}
                      />
                    </Grid>
                  ))}
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} sx={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Product Categories</Typography>
                </Box>
              </ListItem>
              <Divider light />
              {categories.map((category) => (
                <NextLink
                  key={category}
                  href={`/search?category=${category}`}
                  passHref
                >
                  <ListItem selected button component="a">
                    <Typography>{category}</Typography>
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={9} sx={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                {' '}
                <Typography component="h1" variant="h1">
                  Our Services
                </Typography>
              </ListItem>
              <ListItem>
                {' '}
                <Grid container spacing={5}>
                  {services.map((service) => (
                    <Grid item md={4} key={service.name}>
                      <ServiceItem service={service} />
                    </Grid>
                  ))}
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} sx={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Service Categories</Typography>
                </Box>
              </ListItem>
              <Divider light />
              {serviceCategories.map((serviceCategory) => (
                <NextLink
                  key={serviceCategory}
                  href={`/searchService?serviceCategory=${serviceCategory}`}
                  passHref
                >
                  <ListItem selected button component="a">
                    <Typography>{serviceCategory}</Typography>
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
      <ListItem>
        <Typography>Watch the video</Typography>
      </ListItem>
      <ListItem>
        <Card>
          <CardActionArea>
            <CardMedia
              component="video"
              autoPlay
              controls
              margin="auto"
              src="images/Art-Granite.mp4"
            />
          </CardActionArea>
        </Card>
      </ListItem>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(10);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  const serviceDocs = await Service.find({}).lean().limit(6);
  await db.disconnect();
  const services = serviceDocs.map(db.convertDocToObj);

  return {
    props: {
      services,
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
