import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import angryTomato from 'src/assets/angryTomato.svg';

export function ForbiddenPage() {
  return (
    <>
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
                <Typography variant="h1">403</Typography>
                <Typography variant="h6" component="p">
                  It looks like you don't have permission to access this page.
                </Typography>
              </Grid>
              <Grid item xl={4} md={4} sm={6} xs={10}>
                <img src={angryTomato} alt="Angry tomato" width="90%" />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
