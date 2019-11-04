import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListIcon from '@material-ui/icons/List';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button to="/OffersList" component={Link}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Lista ofert" />
    </ListItem>
    <ListItem button to="/widget" component={Link}>
      <ListItemIcon>
        <WidgetsIcon />
      </ListItemIcon>
      <ListItemText primary="Widget" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Konto</ListSubheader>
    <ListItem button to="/signup" component={Link}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Rejestracja" />
    </ListItem>
    <ListItem button to="/signin" component={Link}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Logowanie" />
    </ListItem>
  </div>
);