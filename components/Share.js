import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';
import { Typography } from '@mui/material';

export default function Share() {
  return (
    <>
      <Typography>Share on</Typography>
      <FacebookShareButton
        url={'http://localhost:3000/product/sample-slug-0.3545137337060207'}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <PinterestShareButton url={'http://localhost:3000'}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <RedditShareButton url={'http://localhost:3000'}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton url={'http://localhost:3000'}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={'http://localhost:3000'}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </>
  );
}
