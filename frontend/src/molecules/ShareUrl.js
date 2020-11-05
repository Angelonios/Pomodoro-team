import React, { useRef, useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputAdornment,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export function ShareUrl({ shareUrl }) {
  const inputRef = useRef();
  const [copySuccess, setCopySuccess] = useState('Copy');

  const copyToClipboard = () => {
    inputRef.current.childNodes[1].children[0].select();
    document.execCommand('copy');
    setCopySuccess('Copied!');
  };
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
        value={shareUrl || ''}
        ref={inputRef}
      />
    </FormControl>
  );
}
