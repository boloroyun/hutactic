import { Grid, Box, Link, Typography } from '@mui/material';
import React from 'react';
import NextLink from 'next/link';
import Social from '../components/Social';
import classes from '../utils/classes';
import Share from './Share';

export default function Footer() {
  return (
    <Box sx={classes.footer}>
      <Grid container item spacing={5} justifyContent="center" marginBottom={2}>
        <Grid item>
          <NextLink href="/contactUs" passHref>
            <Link>
              <Typography sx={classes.link}>Contact us</Typography>
            </Link>
          </NextLink>
        </Grid>

        <Grid item>
          <NextLink href="/about" passHref>
            <Typography sx={classes.link}>About us</Typography>
          </NextLink>
        </Grid>
        <Grid item>
          <NextLink href="/termsCondition" passHref>
            <Link>
              <Typography sx={classes.link}>Terms and Conditions</Typography>
            </Link>
          </NextLink>
        </Grid>
        <Grid item>
          <NextLink href="/privacyPolicy" passHref>
            <Link>
              <Typography sx={classes.link}>Privacy Policy</Typography>
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
            &copy;HUTACTIC LLC {new Date().getFullYear()}{' '}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        justifyContent="center"
        marginBottom={2}
        marginTop={2}
      >
        <Share />
      </Grid>
    </Box>
  );
}
