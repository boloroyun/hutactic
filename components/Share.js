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
      <FacebookShareButton url={'https://art-granite.vercel.app/'}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <PinterestShareButton url={'https://art-granite.vercel.app/'}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <RedditShareButton url={'https://art-granite.vercel.app/'}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton url={'https://art-granite.vercel.app/'}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={'https://art-granite.vercel.app/'}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </>
  );
}
