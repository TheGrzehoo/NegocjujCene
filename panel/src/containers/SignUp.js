import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const data = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  }
  const nameHandler = (event) => {
    data.firstName = event.target.value;
  }
  const lastNameHandler = (event) => {
    data.lastName = event.target.value;
  }
  const emailHandler = (event) => {
    data.email = event.target.value;
  }
  const passwordHandler = (event) => {
    data.password = event.target.value;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);
    axios.post('http://localhost:3001/api/register', data)
      .catch(function (err) {
        console.log(err)
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Rejestracja
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Imię"
                autoFocus
                onChange={nameHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nazwisko"
                name="lastName"
                autoComplete="lname"
                onChange={lastNameHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Adres email"
                name="email"
                autoComplete="email"
                onChange={emailHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passwordHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="acceptTerms" color="primary" />}
                label="Zapoznałem się i akceptuję warunki regulaminu usługi NegocjujCene.pl"
              />
              <Link to="/terms">
                Regulamin
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Zarejestruj się
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                Posiadasz już konto? Zaloguj się.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}