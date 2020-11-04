import React, { useRef, useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputAdornment,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { usePomodoroState } from 'src/utils/PomodoroContext';

export function ShareUrl() {
  const inputRef = useRef();
  const [copySuccess, setCopySuccess] = useState('Copy');

  const copyToClipboard = () => {
    inputRef.current.childNodes[1].children[0].select();
    document.execCommand('copy');
    setCopySuccess('Copied!');
  };
  const state = usePomodoroState();
  return (
    <FormControl fullWidth>
      <TextField
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Button
                color="secondary"
                startIcon={<FileCopyIcon />}
                onClick={copyToClipboard}
              >
                {copySuccess}
              </Button>
            </InputAdornment>
          ),
        }}
        label="Share URL"
        value={state.shareUrl || ''}
        ref={inputRef}
      />
    </FormControl>
  );
}
