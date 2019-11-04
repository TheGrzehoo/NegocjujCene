/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Margins() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Marża</Title>
      <Typography component="p" variant="h4">
        1.000 PLN
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        13.07.2019
      </Typography>
      <div>
        <Link color="primary" href="javascript:;">
          Przejdź do wyników rocznych.
        </Link>
      </div>
    </React.Fragment>
  );
}
