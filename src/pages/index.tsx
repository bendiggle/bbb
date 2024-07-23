import React, { useMemo } from 'react';

import {
  Alert,
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';

import { getBetType } from '@/utils/betType';
import { getLeaderboard, getMostRecentListAddition } from '@/utils/helpers';

const leaderboardColors = ['#B9F2FF', '#d4af37', '#c0c0c0', '#cd7f32'];

export default function Home() {
  const mostRecentList = useMemo(() => getMostRecentListAddition(), []);
  const leaderboard = useMemo(() => getLeaderboard(), []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Welcome to the home of The List
            <Typography component="span" variant="caption">
              ®
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Alert variant="outlined" severity="info">
            {mostRecentList.name} was added to the list most recently, selecting{' '}
            {mostRecentList.team} on {mostRecentList.date}.
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {leaderboard.map((person, index) => (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: leaderboardColors[index] }}>
                      {index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${person.name} - ${person.total}`}
                    secondary={`Last list: ${person.mostRecent} - ${Array.isArray(person.type) ? person.type.map((t) => getBetType(t)).join(', ') : getBetType(person.type)} bet type`}
                  />
                </ListItem>
                {index !== leaderboard.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
