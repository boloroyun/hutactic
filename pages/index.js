import NextLink from 'next/link';
import Head from 'next/head';
import {
  Button,
  Grid,
  Link,
  Typography,
  Box,
  CardActionArea,
  Card,
  CardMedia,
  List,
  ListItem,
} from '@mui/material';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import Service from '../models/Service';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import ProductItem from '../components/ProductItem';
import ServiceItem from '../components/ServiceItem';
import SendIcon from '@mui/icons-material/Send';

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

  return (
    <Layout>
      <Head>
        <title>Countertops</title>
        <meta
          name="description"
          content="Best countertops in the Virginia and Maryland"
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
              <Card sx={{ width: '100%', borderRadius: '50%' }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="388"
                    image={product.featuredImage}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: 38,
                      width: '100%',
                      bgcolor: 'rgba(0, 0, 0, 0.38)',
                      color: 'white',
                      padding: '10px',
                    }}
                  >
                    <Typography variant="h6">Our Projects</Typography>
                    <Typography variant="body1">
                      {product.category}: /{product.name}/
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Grid container spacing={1}>
        <Grid item md={12} sx={12}>
          <Typography variant="h1">Popular Products</Typography>
          <NextLink href="/search" passHref>
            <Button color="secondary">
              Watch all stones
              <SendIcon />
            </Button>
          </NextLink>

          <Card sx={classes.section}>
            <List>
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
      </Grid>
      <Typography variant="h6">Specials</Typography>

      <Carousel>
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link sx={classes.flex}>
              <Card sx={{ width: '100%', borderRadius: '88%' }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="388"
                    image={product.featuredImage}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: 38,
                      width: '100%',
                      bgcolor: 'rgba(0, 0, 0, 0.38)',
                      color: 'white',
                      padding: '10px',
                    }}
                  >
                    <Typography variant="h6">Specials</Typography>
                    <Typography variant="body1">
                      {product.category}: /{product.name}/
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Grid container spacing={1}>
        <Grid item md={12} sx={12}>
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
      </Grid>
      <ListItem>
        <Typography variant="h1" color="error">
          Specials
        </Typography>
      </ListItem>
      <ListItem>
        <Card>
          <CardActionArea>
            <CardMedia
              component="video"
              autoPlay
              controls
              margin="auto"
              src="images/stoneking.mp4"
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
    .limit(30);
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
