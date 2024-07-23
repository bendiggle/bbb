import React, { useRef } from 'react';

import {
  BarChart as BarChartIcon,
  DarkMode as DarkModeIcon,
  Home as HomeIcon,
  LightMode as LightModeIcon,
  List as ListIcon,
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  {
    id: 'home',
    label: 'BB Betting',
    icon: <HomeIcon />,
    path: '/',
  },
  {
    id: 'list',
    label: 'The List',
    icon: <ListIcon />,
    path: '/list',
  },
  {
    id: 'stats',
    label: 'Stats',
    icon: <BarChartIcon />,
    path: '/stats',
  },
];

export default function FixedBottomNavigation({
  theme,
  setTheme,
  children,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Box sx={{ p: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h2" variantMapping={{ h2: 'h1' }}>
            {menuItems.find((item) => item.path === pathname)?.label}
          </Typography>
          <Box>
            <Button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
            >
              {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </Button>
          </Box>
        </Box>
        {children}
      </Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={pathname}>
          {menuItems.map((item) => (
            <BottomNavigationAction
              key={item.id}
              icon={item.icon}
              value={item.path}
              onClick={() => router.push(item.path)}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
