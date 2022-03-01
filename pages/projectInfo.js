import { List, ListItem, Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import PlaceRequestWizard from '../components/PlaceRequestWizard';
import Form from '../components/Form';

export default function ProjectInfo() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const { location } = shippingAddress;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/projectInfo');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('email', shippingAddress.email);
    setValue('phone', shippingAddress.phone);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
    setValue('projectInformation', shippingAddress.projectInformation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = ({
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
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        location,
        projectInformation,
      },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        location,
        projectInformation,
      })
    );
    router.push('/placeorder');
  };

  const chooseLocationHandler = () => {
    const fullName = getValues('fullName');
    const email = getValues('email');
    const phone = getValues('phone');

    const address = getValues('address');
    const city = getValues('city');
    const postalCode = getValues('postalCode');
    const country = getValues('country');
    const projectInformation = getValues('projectInformation');
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
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
      'shippingAddress',
      JSON.stringify({
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        location,
        projectInformation,
      })
    );
    router.push('/map');
  };
  return (
    <Layout title="Shipping Address">
      <PlaceRequestWizard activeStep={1} />
      <Form onSubmit={handleSubmit(submitHandler)}>
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
                  label="Full Name"
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
                      ? errors.phone.type === 'minLength'
                        ? 'Please provide valid email.'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 10,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phone"
                  label="phone"
                  error={Boolean(errors.phone)}
                  helperText={
                    errors.phone
                      ? errors.phone.type === 'minLength'
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
              name="city"
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
                  id="city"
                  label="City"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City length is more than 1'
                        : 'City is required'
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
                  label="Postal Code"
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
              name="country"
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
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Country length is more than 1'
                        : 'Country is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              type="button"
              color="secondary"
              onClick={chooseLocationHandler}
            >
              Choose on map
            </Button>
            <Typography>
              {location.lat && `${location.lat}, ${location.lat}`}
            </Typography>
          </ListItem>
          <ListItem>
            <Controller
              name="projectInformation"
              control={control}
              defaultValue="Please provide your project information here"
              rules={{
                maxLength: 100,
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
