import React from 'react';

import Typography from '@mui/material/Typography';

type StatCardProps = {
  title: string;
  value: string | number;
};

const StatCard = ({ title, value }: StatCardProps) => (
  <>
    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Typography sx={{ fontSize: 36, textAlign: 'center' }} color="text.primary">
      {value}
    </Typography>
  </>
);

export default StatCard;
