import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

import Axios from 'axios';
import ImageUploader from "react-images-upload";

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  estado: '',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  input: {
    display: 'none'
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  

  const [error, setError] = useState(null);
  const [account, setAccount] = useState(user);

  useEffect(() => {

    Axios.post('http://localhost:3001/api/account/select').then(response => {
      const accountTemp ={
        avatar: '/static/images/avatars/avatar_6.png',
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        email: response.data.email,
        phone: response.data.phone,
        country: response.data.country,
        estado: response.data.estado,
        city: response.data.email,
        jobTitle: 'Senior Developer',
        name: 'Katarina Smithdkdkd'+'jkjkj',
        timezone: 'GTM-7'
      };
      setAccount(accountTemp);
    }).catch(error => {
      if (error.response.status === 401) 
        setError(error.response.data.message);
      else setError("no se por que se produjo el error");
    });
  });

        //<Button
          //variant="contained"
          //color="primary"
          //fullWidth
        //>
          //Upload picture
        //</Button>
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex" flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {`${account.firstName} ${account.lastName}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {account.email}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {account.phone}
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h3"
          >
            {`${account.estado} ${account.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
