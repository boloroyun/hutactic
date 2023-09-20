import { Link } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from '../utils/classes';

export default function CarouselUi({ featuredProducts }) {
  return (
    <Carousel>
      {featuredProducts.map((product) => (
        <NextLink key={product._id} href={`/product/${product.slug}`} passHref>
          <Link sx={classes.flex}>
            <Image
              src={product.featuredImage}
              width={1000}
              height={300}
              objectFit="fill"
              alt={product.name}
            />
          </Link>
        </NextLink>
      ))}
    </Carousel>
  );
}
