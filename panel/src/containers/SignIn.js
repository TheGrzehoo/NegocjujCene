import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionTypes from '../store/actions';

import axios from 'axios';

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
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    buttonProgress: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginTop: '-8px',
        marginLeft: '-8px'
    },
    buttonWrapper: {
        position: 'relative'
    }
}));

function SignIn(props) {

    let currentLogin, currentPassword;

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const loginUser = (event, login, password) => {
        event.preventDefault();
        setLoading(true);
        axios.post('http://localhost:3001/api/signin', {
            login: login,
            password: password
        }).then(response => {
            if (response.error === 'false') {
                props.onSuccess(login)
                setOpen(false);
                setLoading(false);
            } else {
                props.onError(response.data.errorMessage);
                setOpen(true);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
            props.onError('brak połączenia z serwerem');
            setOpen(true);
            setLoading(false);
        })
    }
    const classes = useStyles();
    if (props.isLogged) {
        return (
            <Redirect to="/" />
        )
    } else {
        return (
            <Container component="main" maxWidth="xs">
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <SnackbarContent
                        className={classes.error}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <ErrorIcon />
                                {props.errorMessage}
                            </span>
                        }
                        action={[
                            <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon className={classes.icon} />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Logowanie
                    </Typography>
                    <form className={classes.form} onSubmit={(event) => {
                        loginUser(event, currentLogin, currentPassword);
                    }
                    }>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="login"
                                    name="login"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Login"
                                    autoFocus
                                    onChange={
                                        (event) => {
                                            currentLogin = event.target.value;
                                            console.log(currentLogin);
                                        }
                                    }
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
                                    onChange={
                                        (event) => {
                                            currentPassword = event.target.value;
                                            console.log(currentPassword);
                                        }
                                    }
                                />
                            </Grid>
                        </Grid>
                        <div className={classes.buttonWrapper}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                            >
                                Zaloguj się
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/signup">
                                    Nie masz konta? Zarejestruj się!
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // isLogged: state.login.isLogged,
        // login: state.login.login,
        // error: state.login.error,
        // errorMessage: state.login.errorMessage
        ...state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSuccess: (login, password) => dispatch({
            type: actionTypes.LOGIN,
            login: login
        }),
        onError: (message) => dispatch({
            type: actionTypes.LOGIN_ERROR,
            errorMessage: message
        }),
        removeError: () => dispatch({
            type: actionTypes.REMOVE_ERROR
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);