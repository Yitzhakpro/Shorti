import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import { Button, Typography } from '@mui/material';
import './linksFetchingError.css';

interface ILinksFetchingError {
  refetchLinks: () => void;
}

function LinksFetchingError(props: ILinksFetchingError): JSX.Element {
  const { refetchLinks } = props;

  const handleRetry = (): void => {
    refetchLinks();
  };

  return (
    <div className="links-fetch-error-page">
      <div className="links-fetch-error-page-content">
        <Typography variant="h4" color="error">
          Failed To Load Links
        </Typography>
        <Typography variant="h5">Try to again later or reload links</Typography>
        <Button startIcon={<ReplayIcon />} variant="contained" onClick={handleRetry}>
          Retry
        </Button>
      </div>
    </div>
  );
}

export default LinksFetchingError;
