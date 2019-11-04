/* eslint-disable no-script-url */

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Options from './Options';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [productData, setProductData] = useState({
    data: []
  });

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getOrders', {
      crossdomain: true
    })
      .then(function (response) {
        const newData = {
          loaded: true,
          data: response.data
        }
        setProductData(newData);
      });
  }, [productData]);

  return (
    <React.Fragment>
      <Title>Ostatnie propozycje</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Kod produktu</TableCell>
            <TableCell>Cena</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {productData.data.map(row => (
            <TableRow key={row.ID}>
              <TableCell>{row.id_test}</TableCell>
              <TableCell>{row.test_string}</TableCell>
              <TableCell>{row.test_decim}</TableCell>
              <TableCell><Options data={row} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Button variant="contained" color="primary">
          Zatwierdź oferty
        </Button>
      </div>
    </React.Fragment>
  );
}
