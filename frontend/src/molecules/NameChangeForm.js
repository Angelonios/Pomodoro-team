import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { NameField, CreateTeamDialog } from 'src/molecules';
import { useAuth } from 'src/utils/auth';
import { FormButton } from 'src/atoms';
import { NAME_CHANGE } from 'src/utils/serverSyncUtils';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
}));

export function NameChangeForm({ name }) {
  const { user } = useAuth();
  const classes = useStyles();

  const initialFormData = Object.freeze({
    name: '',
  });

  const [open, setOpen] = useState(false);
  const [formData, updateFormData] = useState(initialFormData);
  const [nameErrorText, setNameErrorText] = useState('');
  let nameErr;
  const [nameError, setNameError] = useState(false);

  const [changeName] = useMutation(NAME_CHANGE, {
    onCompleted: ({ NameChange: { name, user_id } }) => {},
    onError: () => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === '') {
      nameErr = false;
      setNameError(true);
      setNameErrorText('Please enter a name for your display name.');
    } else {
      nameErr = true;
      setNameError(false);
      setNameErrorText('');
    }
    if (nameErr) {
      setOpen(true);
      changeName({
        variables: { name: formData.name.trim(), user_id: user.user_id },
      });
      let storage = JSON.parse(window.localStorage.getItem('app-auth'));
      storage.user.display_name = formData.name.trim();
      window.localStorage.setItem('app-auth', JSON.stringify(storage));
    }
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2} alignItems="center">
            <NameField
              formData={formData}
              handleChange={handleChange}
              formErrors={nameError}
              helperText={nameErrorText}
              data={name}
            />
          </Grid>
          <FormButton submit={handleSubmit}>Change name</FormButton>
          <CreateTeamDialog
            open={open}
            setOpen={setOpen}
            text={'You have successfully changed name'}
            path={'/profile'}
            id={user.user_id}
          />
        </form>
      </div>
    </>
  );
}
