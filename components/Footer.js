import { Grid, Box, Link, Typography } from '@mui/material';
import React from 'react';
import NextLink from 'next/link';
import Social from '../components/Social';
import classes from '../utils/classes';

export default function Footer() {
  return (
    <Box sx={classes.footer}>
      <Grid container item spacing={5} justifyContent="center" marginBottom={2}>
        <Grid item>
          <NextLink href="/about" passHref>
            <Typography sx={classes.link}>About Us</Typography>
          </NextLink>
        </Grid>
        <Grid item>
          <NextLink href="/" passHref>
            <Link>
              <Typography sx={classes.link}>Home</Typography>
            </Link>
          </NextLink>
        </Grid>
        <Grid item>
          <NextLink href="/contactUs" passHref>
            <Link>
              <Typography sx={classes.link}>Contact Us</Typography>
            </Link>
          </NextLink>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center" marginBottom={2}>
        <Social />
      </Grid>
      <Grid container item spacing={5}>
        <Grid
          item
          container
          component={'a'}
          target="_blank"
          rel="noreferrer noopener"
          href=""
          justifyContent="center"
          style={{
            textDecoration: 'none',
          }}
        >
          <Typography sx={classes.copylight}>
            &copy;Kingstone {new Date().getFullYear()}{' '}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
