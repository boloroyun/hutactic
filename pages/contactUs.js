import React, { useState, useReducer, useContext } from 'react';
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
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

function reducer(state, action) {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

export default function ContactUs() {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');

  const { dispatch } = useContext(Store);
  const {
    control,
    formState: { errors },
  } = useForm();

  const [{ loadingUpload }] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const uploadHandler = async (e, imageField = 'image') => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/contactUs/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setImage(imageField, data.secure_url);
      enqueueSnackbar('File uploaded successfully', { variant: 'success' });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const submitHandler = (e) => {
    closeSnackbar();

    e.preventDefault();
    const data = {
      fullname,
      email,
      phone,
      subject,
      message,
      image,
    };
    try {
      setLoading(true);
      fetch('/api/contactUs', {
        method: 'post',
        body: JSON.stringify(data),
      });
      setLoading(false);
      enqueueSnackbar('Email sent successfully', {
        variant: 'success',
      });

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
          <form onSubmit={submitHandler} name="contact" method="POST">
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
                <Controller
                  name="image"
                  control={control}
                  defaultValue="Upload your project picture or room schema"
                  rules={{
                    required: false,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="image"
                      label="Image"
                      error={Boolean(errors.image)}
                      helperText={errors.image ? 'Image is required' : ''}
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </Grid>
              <Grid>
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" onChange={uploadHandler} hidden />
                </Button>
                {loadingUpload && <CircularProgress />}
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
