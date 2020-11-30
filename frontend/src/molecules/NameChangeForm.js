import React from 'react';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NameField, CreateTeamDialog } from 'src/molecules';
import { useAuth } from 'src/utils/auth';
import { FormButton } from '../atoms';

const NAME_CHANGE = gql`
  mutation NameChange($name: String!, $user_id: Int!) {
    NameChange(name: $name, user_id: $user_id)
  }
`;

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
  var name;
  const [nameError, setNameError] = useState(false);

  const [changeName] = useMutation(NAME_CHANGE, {
    onCompleted: ({ NameChange: { name, user_id } }) => {},
    onError: () => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.name.trim());
    if (formData.name.trim() === '') {
      name = false;
      setNameError(true);
      setNameErrorText('Please enter a name for your display name.');
    } else {
      name = true;
      setNameError(false);
      setNameErrorText('');
    }
    if (name) {
      setOpen(true);
      changeName({
        variables: { name: formData.name.trim(), user_id: user.user_id },
      });
    }
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
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
