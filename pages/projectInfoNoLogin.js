import { List, ListItem, Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import PlaceRequestWizardNoLogin from '../components/PlaceRequestWizardNoLogin';
import Form from '../components/Form';

export default function ProjectInfoNoLogin() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
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
      })
    );
    router.push('/placeordernologin');
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}
