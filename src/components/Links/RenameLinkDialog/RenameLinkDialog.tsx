import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { isValidCustomEnding } from '../../../utils';
import type { UrlRenameInfo } from '../../../types';

interface IRenameLinkDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  linkInfo: UrlRenameInfo;
  renameLink: (_id: string, _linkName: string) => Promise<boolean>;
}

function RenameLinkDialog(props: IRenameLinkDialogProps): JSX.Element {
  const { isOpen, handleClose, linkInfo, renameLink } = props;

  const [customEnding, setCustomEnding] = useState(linkInfo.linkId);
  const [customEndingError, setCustomEndingError] = useState(false);

  const shouldBeFullscreen = window.innerWidth < 800;

  useEffect(() => {
    setCustomEnding(linkInfo.linkId);
  }, [linkInfo.linkId]);

  const handleCloseDialog = (): void => {
    setCustomEndingError(false);
    handleClose();
  };

  const handleCustomEndingChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCustomEnding(event.target.value);
  };

  const handleRename = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();
    if (!customEnding) return;

    setCustomEndingError(false);

    if (!isValidCustomEnding(customEnding)) {
      setCustomEndingError(true);
      return;
    }

    const success = await renameLink(linkInfo.id, customEnding);
    if (success) {
      setCustomEnding('');
      handleClose();
    }
  };

  return (
    <Dialog
      PaperProps={{ style: { borderRadius: '15px' } }}
      fullScreen={shouldBeFullscreen}
      open={isOpen}
      onClose={handleCloseDialog}
    >
      <DialogTitle align="center">Add Shorti</DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          label="Custom Ending"
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
          required
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
        <Button onClick={handleCloseDialog}>cancel</Button>
        <Button variant="contained" onClick={handleRename}>
          update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RenameLinkDialog;
