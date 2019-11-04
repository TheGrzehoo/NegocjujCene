import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttonConfirm: {
        color: theme.palette.status.success[500],
    },
    buttonReject: {
        color: theme.palette.status.error[500],
    },
}));

export default function Option() {

    const classes = useStyles();

    const optionInit = {
        status: null,
        icon: "fa fa-chevron-circle-down",
        color: null
    }
    const [optionState, setOptionState] = React.useState(optionInit);

    function handleClick(event) {
        console.log(event);
        let newState = { ...optionState };
        newState.status = event.currentTarget;
        setOptionState(newState);
    }
    function handleAccept() {
        let newState = {
            status: null,
            icon: "fa fa-check-circle",
            color: classes.buttonConfirm,
        };
        setOptionState(newState);
    }
    function handleDecline() {
        let newState = {
            status: null,
            icon: "fa fa-times-circle",
            color: classes.buttonReject,
        };
        setOptionState(newState);
    }
    function handleClose() {
        let newState = { ...optionState };
        newState.status = null;
        setOptionState(newState)
    }

    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css')
        );
    }, []);

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <div className={optionState.color}><Icon className={optionState.icon} /></div>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={optionState.status}
                keepMounted
                open={Boolean(optionState.status)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleAccept}><div className={classes.buttonConfirm}><Icon className="fa fa-check-circle" /></div></MenuItem>
                <MenuItem onClick={handleDecline}><div className={classes.buttonReject}><Icon className="fa fa-times-circle" /></div></MenuItem>
            </Menu>
        </div>
    );
}