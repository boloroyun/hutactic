import React, { useContext } from 'react';
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
  Button,
  Card,
  List,
  ListItem,
  Box,
} from '@mui/material';
import { useRouter } from 'next/router';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const projectInfoHandler = () => {
    router.push('/projectInfo');
  };
  const projectInfoHandlerNoLogin = () => {
    router.push('/projectInfoNoLogin');
  };

  return (
    <Layout title="Get Quote">
      <Typography component="h1" variant="h1">
        Wish List to get quote
      </Typography>
      {cartItems.length === 0 ? (
        <Box>
          Cart is empty.{' '}
          <NextLink href="/" passHref>
            <Link>Go to products</Link>
          </NextLink>
        </Box>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Brand</TableCell>
                    <TableCell align="right">Action</TableCell>
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
                      <TableCell align="right">{item.brand}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={projectInfoHandler}
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    Continue with login
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={projectInfoHandlerNoLogin}
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    Continue without login
                  </Button>
                </ListItem>
                <ListItem>
                  <NextLink href="/" passHref>
                    <Button color="primary" variant="contained" fullWidth>
                      Go back to products
                    </Button>
                  </NextLink>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
