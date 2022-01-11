import React, { useState } from 'react';

import Layout from '../components/Layout';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function ContactUs() {
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
    <Layout title="Contact Page">
      <Typography component="h1" variant="h1">
        Contact Form
      </Typography>
      <Card style={{ maxWidth: 500, margin: '0 auto', padding: '20px 5px' }}>
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
            Fill up the form and our team will get back to you within 24 hours.
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
                  rows={4}
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
    </Layout>
  );
}
