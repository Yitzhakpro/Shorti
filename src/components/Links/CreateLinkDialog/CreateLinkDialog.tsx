import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import { isUrl } from '../../../utils';

interface ICreateLinkDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  createLink: (_fullUrl: string) => Promise<void>;
}

function CreateLinkDialog(props: ICreateLinkDialogProps): JSX.Element {
  const { isOpen, handleClose, createLink } = props;

  const [fullUrl, setFullUrl] = useState('');
  const [fullUrlError, setFullUrlError] = useState(false);

  const handleFullUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullUrl(event.target.value);
  };

  const handleCreateShorti = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setFullUrlError(false);

    if (!isUrl(fullUrl)) {
      setFullUrlError(true);
      return;
    }

    await createLink(fullUrl);
    setFullUrl('');
    handleClose();
  };

  return (
    <Dialog
      className="create-link-dialog"
      PaperProps={{ style: { borderRadius: '15px' } }}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle align="center">Add Shorti</DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          label="Full Url"
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
          required
          error={fullUrlError}
          helperText={fullUrlError && 'Invalid url'}
          value={fullUrl}
          onChange={handleFullUrlChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button variant="contained" onClick={handleCreateShorti}>
          create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateLinkDialog;
