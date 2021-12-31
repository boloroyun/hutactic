import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  Box,
} from '@mui/material';
import Layout from '../../components/Layout';
import classes from '../../utils/classes';
import Service from '../../models/Service';
import db from '../../utils/db';

export default function ServiceScreen(props) {
  const { service } = props;

  if (!service) {
    return <Box>Service Not Found</Box>;
  }

  return (
    <Layout title={service.name}>
      <Box sx={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back to Services</Typography>
          </Link>
        </NextLink>
      </Box>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={service.image}
            alt={service.name}
            width={1000}
            height={550}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {service.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {service.category}</Typography>
            </ListItem>

            <ListItem>
              <Typography> Description: {service.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem></ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {service.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained">
                  Contact Us
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const service = await Service.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      service: db.convertDocToObj(service),
    },
  };
}
