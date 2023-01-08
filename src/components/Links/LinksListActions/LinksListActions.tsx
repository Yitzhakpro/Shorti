import React from 'react';
import Add from '@mui/icons-material/Add';
import { Paper, Button } from '@mui/material';
import './linksListActions.css';

interface ILinksListActions {
  toggleAdd: () => void;
}

function LinksListActions(props: ILinksListActions): JSX.Element {
  const { toggleAdd } = props;

  return (
    <Paper className="links-list-actions">
      <Button variant="outlined" size="small" onClick={toggleAdd}>
        <Add />
      </Button>
    </Paper>
  );
}

export default LinksListActions;
