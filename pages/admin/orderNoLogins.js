import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import classes from '../../utils/classes';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        orderNoLogins: action.payload,
        error: '',
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminOrderNoLogins() {
  const { state } = useContext(Store);
  const router = useRouter();

  const { userInfo } = state;

  const [{ loading, error, orderNoLogins }, dispatch] = useReducer(reducer, {
    loading: true,
    orderNoLogins: [],
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orderNoLogins`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [router, userInfo]);
  return (
    <Layout title="Orders Without Login">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card sx={classes.section}>
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orderNoLogins" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Orders Without Login"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Orders without Login
                </Typography>
              </ListItem>

              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography sx={classes.error}>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>USER</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>QUOTED</TableCell>
                          <TableCell>ACTION</TableCell>
                          <TableCell>RESPOND</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderNoLogins.map((orderNoLogin) => (
                          <TableRow key={orderNoLogin._id}>
                            <TableCell>
                              {orderNoLogin._id.substring(20, 24)}
                            </TableCell>
                            <TableCell>
                              {orderNoLogin.user
                                ? orderNoLogin.user.name
                                : 'NO USER'}
                            </TableCell>
                            <TableCell>{orderNoLogin.createdAt}</TableCell>
                            <TableCell>
                              {orderNoLogin.isDelivered
                                ? `quoted at ${orderNoLogin.deliveredAt}`
                                : 'not quoted'}
                            </TableCell>
                            <TableCell>
                              <NextLink
                                href={`/orderNoLogin/${orderNoLogin._id}`}
                                passHref
                              >
                                <Button variant="contained">Details</Button>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <Button variant="contained">Send Email</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminOrderNoLogins), {
  ssr: false,
});
