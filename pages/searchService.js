import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import db from '../utils/db';
import Service from '../models/Service';
import classes from '../utils/classes';
import ServiceItem from '../components/ServiceItem';
import { Pagination } from '@mui/material';

const PAGE_SIZE = 3;

export default function SearchService(props) {
  const router = useRouter();

  const {
    query = 'all',
    serviceCategory = 'all',
    price = 'all',
  } = router.query;
  const { services, countServices, serviceCategories, pages } = props;

  const filterSearch = ({ page, serviceCategory, searchQuery, price }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (serviceCategory) query.serviceCategory = serviceCategory;
    if (price) query.price = price;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const serviceCategoryHandler = (e) => {
    filterSearch({ serviceCategory: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };

  return (
    <Layout title="search">
      <Grid sx={classes.section} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box sx={classes.fullWidth}>
                <Typography> Service Categories</Typography>
                <Select
                  fullWidth
                  value={serviceCategory}
                  onChange={serviceCategoryHandler}
                >
                  <MenuItem value="all">All</MenuItem>
                  {serviceCategories &&
                    serviceCategories.map((serviceCategory) => (
                      <MenuItem key={serviceCategory} value={serviceCategory}>
                        {serviceCategory}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {services.length === 0 ? 'No' : countServices} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {serviceCategory !== 'all' && ' : ' + serviceCategory}
              {price !== 'all' && ' : Price ' + price}
              {(query !== 'all' && query !== '') ||
              serviceCategory !== 'all' ||
              price !== 'all' ? (
                <Button onClick={() => router.push('/searchService')}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>
          </Grid>
          <Grid sx={classes.section} container spacing={3}>
            {services.map((service) => (
              <Grid item md={4} key={service.name}>
                <ServiceItem service={service} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            sx={classes.section}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const serviceCategory = query.serviceCategory || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const serviceCategoryFilter =
    serviceCategory && serviceCategory !== 'all' ? { serviceCategory } : {};

  const serviceCategories = await Service.find().distinct('serviceCategory');
  const serviceDocs = await Service.find({
    ...queryFilter,
    ...serviceCategoryFilter,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countServices = await Service.countDocuments({
    ...queryFilter,
    ...serviceCategoryFilter,
  });
  await db.disconnect();

  const services = serviceDocs.map(db.convertDocToObj);

  return {
    props: {
      services,
      countServices,
      page,
      pages: Math.ceil(countServices / pageSize),
      serviceCategories,
    },
  };
}
