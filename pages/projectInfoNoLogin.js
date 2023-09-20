import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import PlaceRequestWizardNoLogin from '../components/PlaceRequestWizardNoLogin';
import Form from '../components/Form';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { getError } from '../utils/error';

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

export default function ProjectInfoNoLogin() {
  const { enqueueSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);

  const [{ loadingUpload }] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const {
    userInfo,
    cart: { shippingAddressNoLogin },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/projectInfoNoLogin');
    }
    setValue('fullName', shippingAddressNoLogin.fullName);
    setValue('email', shippingAddressNoLogin.email);
    setValue('phone', shippingAddressNoLogin.phone);
    setValue('address', shippingAddressNoLogin.address);
    setValue('city', shippingAddressNoLogin.city);
    setValue('postalCode', shippingAddressNoLogin.postalCode);
    setValue('country', shippingAddressNoLogin.country);
    setValue('projectInformation', shippingAddressNoLogin.projectInformation);
    setValue('image', shippingAddressNoLogin.image);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandlerNoLogin = ({
    fullName,
    email,
    phone,
    address,
    city,
    postalCode,
    country,
    projectInformation,
    image,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS_NL',
      payload: {
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        projectInformation,
        image,
      },
    });
    Cookies.set(
      'shippingAddressNoLogin',
      JSON.stringify({
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        projectInformation,
        image,
      })
    );
    router.push('/placeordernologin');
  };

  const uploadHandler = async (e, imageField = 'image') => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post(
        '/api/orderNoLogins/upload',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      enqueueSnackbar('File uploaded successfully', { variant: 'success' });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <Layout title="Project Information No Login">
      <PlaceRequestWizardNoLogin activeStep={1} />
      <Form onSubmit={handleSubmit(submitHandlerNoLogin)}>
        <Typography component="h1" variant="h1">
          Project Information Detail
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Name"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name length is more than 1'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'minLength'
                        ? 'Email length is more than 1'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>{' '}
          <ListItem>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
                minLength: 10,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phone"
                  label="Phone"
                  error={Boolean(errors.phone)}
                  helperText={
                    errors.phone
                      ? errors.phone.type === 'match'
                        ? 'Please provide valid phone number.'
                        : 'Phone Number is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code Of Your Project"
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Postal Code length is more than 1'
                        : 'Postal Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="projectInformation"
              control={control}
              defaultValue="Please provide your project information here."
              rules={{
                maxLength: 1000,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  id="projectInformation"
                  label="Project Information Detail"
                  error={Boolean(errors.projectInformation)}
                  helperText={
                    errors.projectInformation
                      ? errors.projectInformation.type === 'maxLength'
                        ? 'Not more than 1000 characters'
                        : 'Project information is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="image"
              control={control}
              defaultValue="Upload your photos."
              rules={{
                required: false,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="image"
                  label="Image. It is optional."
                  error={Boolean(errors.image)}
                  helperText={errors.image ? 'Image is required' : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" onChange={uploadHandler} hidden />
            </Button>
            {loadingUpload && <CircularProgress />}
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}
