import React, { useMemo } from 'react';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

import StatCard from '@/components/Reports/StatCard';
import {
  getBogeyTeam,
  getEstimatedLoss,
  getEstimatedLossByPerson,
  getEstimatedLossBySeason,
  getLostByPersonData,
  getLostBySeasonData,
  getTotalListEntriesCount,
  getWorstSeason,
} from '@/utils/helpers';

const Stats = () => {
  const lostBySeason = useMemo(() => getLostBySeasonData(), []);
  const lostByPerson = useMemo(() => getLostByPersonData(), []);
  const totalListCount = useMemo(() => getTotalListEntriesCount(), []);
  const worstSeason = useMemo(() => getWorstSeason(), []);
  const estimatedLoss = useMemo(() => getEstimatedLoss(), []);
  const estimatedLossBySeason = useMemo(() => getEstimatedLossBySeason(), []);
  const estimatedLossByPerson = useMemo(() => getEstimatedLossByPerson(), []);
  const bogeyTeam = useMemo(() => getBogeyTeam(), []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      Meow
      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <Paper variant="outlined">
            <StatCard title="Total list entries" value={totalListCount} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined">
            <StatCard
              title="Estimated total lost"
              value={`£${estimatedLoss}`}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <StatCard title="Bogey team" value={bogeyTeam as string} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
              Total list entries by season
            </Typography>
            <LineChart
              dataset={lostBySeason}
              xAxis={[
                { scaleType: 'point', dataKey: 'season', label: 'Seasons' },
              ]}
              series={[{ dataKey: 'total', label: 'Total lost by one' }]}
              slotProps={{ legend: { hidden: true, padding: 100 } }}
              sx={{ '&&': { touchAction: 'auto' } }}
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined">
            <StatCard title="Worst Season" value={worstSeason} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined">
            <StatCard title="Worst Month" value="Jan 2024" />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
              Total list entries by person
            </Typography>
            <PieChart
              series={[
                {
                  data: lostByPerson,
                },
              ]}
              height={200}
              sx={{ '&&': { touchAction: 'auto' } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
              Estimated money lost by season
            </Typography>
            <BarChart
              series={[
                {
                  data: estimatedLossBySeason.map((d) => d.loss),
                  label: 'Money lost (£)',
                },
              ]}
              xAxis={[
                {
                  label: 'Money lost (£)',
                },
              ]}
              yAxis={[
                {
                  data: estimatedLossBySeason.map((d) => d.season),
                  scaleType: 'band',
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
              height={300}
              layout="horizontal"
              sx={{ '&&': { touchAction: 'auto' } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
              Estimated money lost by person
            </Typography>
            <PieChart
              series={[
                {
                  paddingAngle: 5,
                  innerRadius: 60,
                  outerRadius: 80,
                  data: estimatedLossByPerson,
                },
              ]}
              height={200}
              sx={{ '&&': { touchAction: 'auto' } }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;
