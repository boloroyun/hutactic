import { Grid } from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import classes from '../utils/classes';

import { socialMedia } from '../data/socialMedia';

const Social = () => {
  const { instagram, facebook, github, homepage } = socialMedia;

  return (
    <Grid item container spacing={1} justifyContent="center">
      <Grid
        item
        component={'a'}
        target="_blank"
        rel="noreferrer noopener"
        href={homepage}
      >
        <HomeIcon sx={classes.snsIcon} />
      </Grid>
      <Grid
        item
        component={'a'}
        target="_blank"
        rel="noreferrer noopener"
        href={facebook}
      >
        <FacebookIcon sx={classes.snsIcon} />
      </Grid>
      <Grid
        item
        component={'a'}
        target="_blank"
        rel="noreferrer noopener"
        href={instagram}
      >
        <InstagramIcon sx={classes.snsIcon} />
      </Grid>
      <Grid
        item
        component={'a'}
        target="_blank"
        rel="noreferrer noopener"
        href={github}
      >
        <GitHubIcon sx={classes.snsIcon} />
      </Grid>
    </Grid>
  );
};

export default Social;
