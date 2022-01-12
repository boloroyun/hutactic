import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import React, { useState } from 'react';
import classes from '../utils/classes';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function Footer1() {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    closeSnackbar();

    e.preventDefault();
    const data = {
      fullname,
      email,
      phone,
      subject,
      message,
    };
    try {
      setLoading(true);
      fetch('/api/contactUs', {
        method: 'post',
        body: JSON.stringify(data),
      });
      setLoading(false);
      router.push('/');
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <Box sx={classes.footer}>
      <Grid container spacing={1}>
        <Grid item md={6} sx={12}>
          <Typography component="h1">Contact Us</Typography>
          <Divider light />
          <Typography>Phone: 703-909-3897</Typography>
          <Typography marginBottom={5}>
            Email: boloroyun@artgranitedoes.com
          </Typography>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.239332386159!2d-77.45185368464969!3d38.89564197957093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64720d18f9f3b%3A0xfafd56156fada977!2sArt%20Granite%20Inc!5e0!3m2!1sen!2sus!4v1635782774750!5m2!1sen!2sus"
            width={400}
            height="454"
            margin="auto"
            style={{ border: '0' }}
            loading="lazy"
          ></iframe>
        </Grid>
        <Grid item md={6} sx={12}>
          <Card
            style={{
              maxWidth: 400,
              margin: '0 auto',
              padding: '20px 5px',
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                Contact Us
              </Typography>
              <Typography
                gutterBottom
                color="textSecondary"
                variant="body2"
                component="p"
              >
                Fill up the form and our team will get back to you within 24
                hours.
              </Typography>
              <form onSubmit={handleSubmit} name="contact" method="POST">
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      name="fullname"
                      label="Full Name"
                      placeholder="Enter Full Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={fullname}
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid xs={12} item>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Enter Email"
                      variant="outlined"
                      fullWidth
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      name="phone"
                      type="number"
                      label="Phone"
                      placeholder="Enter Phone Number"
                      variant="outlined"
                      fullWidth
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      name="subject"
                      label="Subject"
                      placeholder="Subject"
                      variant="outlined"
                      fullWidth
                      required
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      name="message"
                      label="Message"
                      placeholder="Type your message here"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                  {loading && (
                    <Grid>
                      <CircularProgress />
                    </Grid>
                  )}
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
