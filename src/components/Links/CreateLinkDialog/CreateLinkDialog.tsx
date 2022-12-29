import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import './createLinkDialog.css';

interface ICreateLinkDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  createLink: (_fullUrl: string) => Promise<void>;
}

function CreateLinkDialog(props: ICreateLinkDialogProps): JSX.Element {
  const { isOpen, handleClose, createLink } = props;

  const [fullUrl, setFullUrl] = useState('');

  const handleFullUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullUrl(event.target.value);
  };

  const handleCreateShorti = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    await createLink(fullUrl);
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
