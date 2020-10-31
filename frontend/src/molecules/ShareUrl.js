import React from 'react';
import {
  TextField,
  InputLabel,
  Button,
  FormControl,
  InputAdornment,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { usePomodoroState } from 'src/utils/PomodoroContext';

export function ShareUrl() {
  const state = usePomodoroState();
  return (
    <FormControl>
      <TextField
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Button color="secondary" startIcon={<FileCopyIcon />}>
                Copy
              </Button>
            </InputAdornment>
          ),
        }}
        label="Share URL"
        value={state.shareUrl || ''}
      />
    </FormControl>
  );
}
