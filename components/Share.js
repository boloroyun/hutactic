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
      <FacebookShareButton url={'https://hutactic.com/'}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <PinterestShareButton url={'https://hutactic.com/'}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <RedditShareButton url={'https://hutactic.com/'}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton url={'https://hutactic.com/'}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={'https://hutactic.com/'}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </>
  );
}
