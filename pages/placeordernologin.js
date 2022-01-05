import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  Button,
  Card,
  List,
  ListItem,
} from '@mui/material';
import classes from '../utils/classes';
import axios from 'axios';
import { useRouter } from 'next/router';
import PlaceRequestWizardNoLogin from '../components/PlaceRequestWizardNoLogin';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';

function PlaceOrderNoLogin() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddressNoLogin },
  } = state;

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const placeOrderNoLoginHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orderNoLogins', {
        orderNoLoginItems: cartItems,
        shippingAddressNoLogin,
      });
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      router.push(`/orderNoLogin/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Layout title="Place Order No Login">
      <PlaceRequestWizardNoLogin activeStep={3}></PlaceRequestWizardNoLogin>
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Project Information
                </Typography>
              </ListItem>
              <ListItem>Name: {shippingAddressNoLogin.fullName}, </ListItem>
              <ListItem>Email: {shippingAddressNoLogin.email}</ListItem>
              <ListItem>Phone: {shippingAddressNoLogin.phone}</ListItem>
              <ListItem>
                Project Address: {shippingAddressNoLogin.address},{' '}
                {shippingAddressNoLogin.city},{' '}
                {shippingAddressNoLogin.postalCode},{' '}
                {shippingAddressNoLogin.country}
              </ListItem>
            </List>
          </Card>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Project Information detail
                </Typography>
              </ListItem>
              <ListItem>{shippingAddressNoLogin.projectInformation}</ListItem>
            </List>
          </Card>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Requested Items To Get Quote
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Brand</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.category}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.brand}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Request Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography textAlign="center">
                      ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) in
                      your get quote list. Please send your request. We will
                      quote your project soon. Thank you.
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Button
                  onClick={placeOrderNoLoginHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Send request
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrderNoLogin), {
  ssr: false,
});
