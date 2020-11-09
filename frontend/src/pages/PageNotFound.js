import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { TopNavigation } from 'src/organisms';
import sadTomato from 'src/assets/sadTomato.svg';

export function PageNotFound() {
  return (
    <>
      <TopNavigation />
      <Container component="main">
        <Paper elevation={3}>
          <Box p={6}>
            <Grid
              container
              spacing={10}
              direction="row"
              alignItems="center"
              justify="space-evenly"
            >
              <Grid item xl={4} md={4} sm={6} xs={10}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h6" component="p">
                  Oops! We couldn't find the page.
                </Typography>
              </Grid>
              <Grid item xl={4} md={4} sm={6} xs={10}>
                <img src={sadTomato} alt="Sad tomato" width="90%" />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
