import React from 'react';
import { Divider, Skeleton, SkeletonProps } from '@mui/material';

interface ISkeletonListProps extends SkeletonProps {
  rows?: number;
}

function SkeletonList(props: ISkeletonListProps): JSX.Element {
  const { rows = 1, ...skeletonProps } = props;

  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <div key={index}>
          <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} {...skeletonProps} />
          <Divider variant="middle" />
        </div>
      ))}
    </>
  );
}

export default SkeletonList;
