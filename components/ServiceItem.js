import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import NextLink from 'next/link';

export default function ServiceItem({ service }) {
  return (
    <Card>
      <NextLink href={`/service/${service.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={service.image}
            title={service.name}
          ></CardMedia>
          <CardContent>
            <Typography align="center">{service.serviceCategory}</Typography>
            <Typography>{service.name}</Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <NextLink href="/contactUs">
          <Button>Contact Us</Button>
        </NextLink>
      </CardActions>
    </Card>
  );
}
