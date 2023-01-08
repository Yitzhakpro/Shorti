import React from 'react';
import { Popper, Typography, Button, Paper } from '@mui/material';
import type { VirtualElement } from '@popperjs/core';
import './deleteLinkPopper.css';

interface IDeleteLinkPopperProps {
  open: boolean;
  anchorEl: VirtualElement | (() => VirtualElement) | null;
  handleClose: () => void;
  handleDelete: () => Promise<void>;
}

function DeleteLinkPopper(props: IDeleteLinkPopperProps): JSX.Element {
  const { open, anchorEl, handleClose, handleDelete } = props;

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom">
      <Paper className="delete-confirmation-container" elevation={5}>
        <Typography>Are you sure?</Typography>
        <div className="delete-confirmation-actions">
          <Button onClick={handleClose}>No</Button>
          <Button variant="contained" onClick={handleDelete}>
            Yes
          </Button>
        </div>
      </Paper>
    </Popper>
  );
}

export default DeleteLinkPopper;
