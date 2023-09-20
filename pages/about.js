import Social from '../components/Social';
import Layout from '../components/Layout';
import { Container, Grid, Typography, Avatar } from '@mui/material';
import classes from '../utils/classes';

const About = () => {
  // use your picture
  const avatar1 = '/images/Chandmani.jpg';
  const avatar2 = '/images/Boss.jpg';

  return (
    <Layout title="About Us">
      <Container maxWidth="md">
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <Typography variant="h1" align="center" gutterBottom>
              About HUTACTIC LLC
            </Typography>
            <Typography variant="h2" align="center">
              Welcome to HUTACTIC LLC - Your Premier Destination for Exquisite
              Countertops!
            </Typography>
            <Typography variant="body1">
              <br />
              At HUTACTIC LLC, we are passionate about transforming spaces into
              stunning and functional areas that our customers can truly
              cherish. With years of experience in the industry, we have become
              a trusted name for premium countertops that elevate the aesthetics
              and functionality of your home or business.
              <Typography variant="h2" align="center">
                Our Story
              </Typography>
              Started in 2015, we was born out of a vision to provide
              top-quality countertops to homeowners, architects, designers, and
              builders. Our journey began with a simple commitment – to offer
              the widest selection of countertops crafted from the finest
              materials and delivered with exceptional service.
              <Typography variant="h2" align="center">
                What Sets Us Apart
              </Typography>
              <br /> Quality Craftsmanship: We take immense pride in our
              workmanship. Each countertop that leaves our facility is a
              testament to our commitment to quality and excellence.
              <br /> Wide Selection: Whether you desire the timeless elegance of
              granite, the modern allure of quartz, or the warmth of natural
              wood, we offer an extensive range of countertop materials to suit
              your style and preferences.
              <br /> Personalized Service: At HUTACTIC LLC, we understand that
              every project is unique. Our team of experts works closely with
              you to understand your needs, offering personalized solutions that
              meet and exceed your expectations.
              <br /> Timely Delivery: We know that time is of the essence. We
              work diligently to ensure that your countertops are delivered and
              installed promptly, allowing you to enjoy your beautiful space
              without delay.
              <br /> Customer Satisfaction: Our success is measured by the
              satisfaction of our customers. We are dedicated to ensuring that
              you are delighted with the end result, and we go the extra mile to
              achieve this.
              <Typography variant="h2" align="center">
                Our commitment
              </Typography>
              As a countertop company driven by a commitment to excellence, we
              stand by the quality of our products and services. Our dedication
              to environmental responsibility is reflected in our sustainable
              sourcing practices and eco-friendly processes.
              <Typography variant="h2" align="center">
                Contact Us
              </Typography>
              We invite you to explore our website hutactic.com or ask-quote.com
              and discover the endless possibilities that HUTACTIC LLC
              countertops can bring to your space. Whether it&apos;s a kitchen
              renovation, a bathroom upgrade, or a commercial project, we have
              the perfect countertop solution for you.
              <br />
              Thank you for considering HUTACTIC LLC as your countertop partner.
              We look forward to serving you and making your design dreams a
              reality. For inquiries, consultations, or to schedule a visit,
              please contact us at hutactic.com, ask-quote.com and
              info@hutactic.com.
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
                <Avatar alt="avatar" src={avatar2} sx={classes.avator} />
              </Grid>
              <Grid item>
                <Typography variant="h6">Operation Manager </Typography>
                <Typography variant="h8">Baatarkhuu Chandmani </Typography>
              </Grid>

              <Social />
              <Grid item>
                {/* use your picture */}
                <Avatar alt="avatar" src={avatar1} sx={classes.avator} />
              </Grid>
              <Grid item>
                <Typography variant="h6">Installer</Typography>
                <Typography variant="h8">Chandmani Oyodoo</Typography>
              </Grid>

              <Social />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default About;
