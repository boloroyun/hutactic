import Social from '../components/Social';
import Layout from '../components/Layout';
import { Container, Grid, Typography, Avatar } from '@mui/material';
import classes from '../utils/classes';

const About = () => {
  // use your picture
  const avatar =
    'https://images.ctfassets.net/atxm25972ze9/7y6t7fqxDPqJ21ZECdUV9D/0ace08faabfb401be8e89d689b04ae98/adult-1868750__340.jpg?h=250';
  return (
    <Layout title="About Us">
      <Container maxWidth="md">
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <Typography variant="h1" align="center" gutterBottom>
              About
            </Typography>
            <Typography variant="h2" align="center">
              This is a Template using Next.js and Material-UI with Header and
              Footer.
            </Typography>
          </Grid>
          <Grid item container spacing={2} alignItems="center">
            <Grid
              item
              container
              md={4}
              direction="column"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                {/* use your picture */}
                <Avatar alt="avatar" src={avatar} sx={classes.avator} />
              </Grid>
              <Grid item>
                <Typography variant="h3">John Doe</Typography>
              </Grid>
              <Social />
            </Grid>
            <Grid item container md={8}>
              <Typography variant="body1">
                <br />
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of &quot; de
                Finibus Bonorum et Malorum &quot; (The Extremes of Good and
                Evil) by Cicero, written in 45 BC. This book is a treatise on
                the theory of ethics, very popular during the Renaissance. The
                first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit
                amet..&quot;, comes from a line in section 1.10.32.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default About;
