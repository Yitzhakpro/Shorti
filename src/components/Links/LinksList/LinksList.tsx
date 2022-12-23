import React from 'react';
import Add from '@mui/icons-material/Add';
import { Container, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useLinks } from '../../../hooks';
import { SkeletonList } from '../../../utilComponents';
import LinkItem from '../LinkItem';
import './linksList.css';

function LinksList(): JSX.Element {
  const { isLoading, linksList, isError, deleteLink } = useLinks();

  return (
    <>
      <Container className="links-list" maxWidth="md">
        {isLoading && <SkeletonList variant="rectangular" height={80} rows={4} />}
        {isError && <p>error fetching</p>}
        {linksList &&
          linksList.map((urlInfo) => {
            return <LinkItem key={urlInfo.id} linkInfo={urlInfo} handleDelete={deleteLink} />;
          })}
      </Container>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction icon={<Add />} tooltipTitle="Add Shorti" />
      </SpeedDial>
    </>
  );
}

export default LinksList;
