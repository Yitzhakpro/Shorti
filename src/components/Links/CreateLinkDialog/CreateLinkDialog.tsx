import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import { isUrl, isValidCustomEnding } from '../../../utils';

interface ICreateLinkDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  createLink: (_fullUrl: string, _customEnding: string) => Promise<void>;
}

function CreateLinkDialog(props: ICreateLinkDialogProps): JSX.Element {
  const { isOpen, handleClose, createLink } = props;

  const [fullUrl, setFullUrl] = useState('');
  const [fullUrlError, setFullUrlError] = useState(false);
  const [customEnding, setCustomEnding] = useState<string>('');
  const [customEndingError, setCustomEndingError] = useState(false);

  const shouldBeFullscreen = window.innerWidth < 800;

  const handleFullUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullUrl(event.target.value);
  };

  const handleCustomEndingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomEnding(event.target.value);
  };

  const handleCreateShorti = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setFullUrlError(false);
    setCustomEndingError(false);

    if (!isUrl(fullUrl)) {
      setFullUrlError(true);
      return;
    }

    if (customEnding && !isValidCustomEnding(customEnding)) {
      setCustomEndingError(true);
      return;
    }

    await createLink(fullUrl, customEnding);
    setFullUrl('');
    setCustomEnding('');
    handleClose();
  };

  return (
    <Dialog
      className="create-link-dialog"
      PaperProps={{ style: { borderRadius: '15px' } }}
      fullScreen={shouldBeFullscreen}
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

        <TextField
          type="text"
          label="Custom Ending (Optional)"
          margin="dense"
          fullWidth
          variant="standard"
          error={customEndingError}
          helperText={
            customEndingError &&
            'Custom ending should not contain whitespace and be below 30 characters'
          }
          value={customEnding}
          onChange={handleCustomEndingChange}
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
