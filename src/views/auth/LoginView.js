import React, {useState} from 'react';
import {createBrowserHistory} from 'history';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Axios from 'axios';
import {setUserSession } from '../../utils/Common';

import Page from 'src/components/Page';


const history = createBrowserHistory({forceRefresh:true});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

const LoginView = (props) => {


  const classes = useStyles();

  const username = useFormInput('');
  const password = useFormInput('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleLogin = () => {
    setError(null);
    setLoading(true);
    Axios.post('http://localhost:3001/api/auth/signin', {username: username.value, password: password.value}).then(response => {
      setLoading(false);
      setUserSession(response.data.accessToken, response.data.username);
      history.push("/app/account");
      window.location.reload(true);
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) 
        setError(error.response.data.message);
      else setError("no se por que se produjo el error");
    });
  };


  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
          >
            {({
              errors,
              handleBlur,
              isSubmitting,
              touched
            }) => (
              <form noValidate>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    align="center"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                    align="center"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  type="email"
                  variant="outlined"
                  {...username}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  type="password"
                  variant="outlined"
                  {...password}
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    value={loading ? 'Loading...' : 'Login'}
                    onClick={handleLogin} disabled={loading}
                  >
                    Sign in now
                  </Button>
                  {error && <><small style={{ color: 'red'}}>{error}</small></>}<br />
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
