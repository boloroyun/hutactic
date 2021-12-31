import React, { useState } from 'react';

import Layout from '../components/Layout';
import {
  List,
  ListItem,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function ContactForm() {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleOnSubmit(e) {
    closeSnackbar();
    e.preventDefault();
    const formData = {};
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });
    try {
      setLoading(true);
      fetch('/api/mail', {
        method: 'post',
        body: JSON.stringify(formData),
      });
      setLoading(false);
      router.push('/');
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }

  return (
    <Layout title="Contact Page">
      <form method="post" onSubmit={handleOnSubmit}>
        <Typography component="h1" variant="h1">
          Contact Form
        </Typography>
        <List>
          <ListItem>
            <TextField
              id="fullName"
              name="fullName"
              label="Full Name"
              fullWidth
              autoComplete="none"
            />
          </ListItem>
          <ListItem>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="none"
            />
          </ListItem>
          <ListItem>
            <TextField
              id="subject"
              name="subject"
              label="Subject"
              fullWidth
              multiline
              rows={1}
              autoComplete="none"
            />
          </ListItem>
          <ListItem>
            <TextField
              id="message"
              name="message"
              label="Message"
              fullWidth
              multiline
              rows={5}
              autoComplete="none"
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Send Email
            </Button>
          </ListItem>
          {loading && (
            <ListItem>
              <CircularProgress />
            </ListItem>
          )}
        </List>
      </form>
    </Layout>
  );
}
