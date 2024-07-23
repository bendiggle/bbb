import React, { useMemo, useState } from 'react';

import {
  Avatar,
  Box,
  Chip,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { ListRow } from '@/types/data.types';
import { getBetType, getBetTypeColor } from '@/utils/betType';
import { stringAvatar } from '@/utils/stringToColor';

import data2019 from '../data/2019-2020.json';
import data2020 from '../data/2020-2021.json';
import data2021 from '../data/2021-2022.json';
import data2022 from '../data/2022-2023.json';
import data2023 from '../data/2023-2024.json';
import data2024 from '../data/2024-2025.json';

dayjs.extend(customParseFormat);

const headers = [
  {
    id: 'date',
    text: 'Date',
    sort: true,
  },
  {
    id: 'name',
    text: 'Offender',
  },
  {
    id: 'type',
    text: 'Bet type',
  },
];

const dataFiles: any = {
  '2019': data2019.results,
  '2020': data2020.results,
  '2021': data2021.results,
  '2022': data2022.results,
  '2023': data2023.results,
  '2024': data2024.results,
};

const sortByDateDesc = (a: ListRow, b: ListRow) => {
  const firstDate = dayjs(a.date, 'DD/MM/YYYY');
  const secondDate = dayjs(b.date, 'DD/MM/YYYY');
  if (secondDate.isBefore(firstDate)) return -1;
  if (firstDate.isBefore(secondDate)) return 1;
  return 0;
};

const sortByDateAsc = (a: ListRow, b: ListRow) => {
  const firstDate = dayjs(a.date, 'DD/MM/YYYY');
  const secondDate = dayjs(b.date, 'DD/MM/YYYY');
  if (firstDate.isBefore(secondDate)) return -1;
  if (secondDate.isBefore(firstDate)) return 1;
  return 0;
};

const createRows = (seasonFilter: string) => {
  const data: [] =
    seasonFilter === dropdownItems[0].value
      ? Object.values(dataFiles).flat()
      : dataFiles[seasonFilter];
  return data.map((d: any, index: number) => ({
    id: `row-${index}`,
    date: d.date,
    name: d.name,
    type: Array.isArray(d.type) ? d.type : [d.type],
  }));
};

const dropdownItems = [
  {
    id: 'all',
    value: 'all',
    text: 'All',
  },
  {
    id: '2019',
    value: '2019',
    text: '2019/2020',
  },
  {
    id: '2020',
    value: '2020',
    text: '2020/2021',
  },
  {
    id: '2021',
    value: '2021',
    text: '2021/2022',
  },
  {
    id: '2022',
    value: '2022',
    text: '2022/2023',
  },
  {
    id: '2023',
    value: '2023',
    text: '2023/2024',
  },
  {
    id: '2024',
    value: '2024',
    text: '2024/2025',
  },
];

export default function BasicTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc'>('desc');
  const [seasonFilter, setSeasonFilter] = useState(dropdownItems[0].value);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSeasonsFilter = (newValue: string) => {
    setSeasonFilter(newValue);
    setPage(0);
  };

  const rows = createRows(seasonFilter);

  const visibleRows = useMemo(() => {
    let sortedRows = [];
    if (sortByDate === 'desc') {
      sortedRows = rows.sort(sortByDateDesc);
    } else {
      sortedRows = rows.sort(sortByDateAsc);
    }
    return sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [page, rows, rowsPerPage, sortByDate]);

  return (
    <Paper elevation={0}>
      <Box sx={{ my: 2 }}>
        <InputLabel id="season-filter">Season</InputLabel>
        <Select
          labelId="season-filter"
          defaultValue={seasonFilter}
          sx={{ width: '50%' }}
          onChange={(event) => {
            handleChangeSeasonsFilter(event.target.value);
          }}
        >
          {dropdownItems.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ my: 2 }}>
        <Stack direction="row" justifyContent="space-evenly">
          <Chip
            avatar={<Avatar {...stringAvatar('Ben Diggle')} />}
            label={rows.filter((row: any) => row.name === 'Ben').length}
          />
          <Chip
            avatar={<Avatar {...stringAvatar('Jamie McDonald')} />}
            label={rows.filter((row: any) => row.name === 'Jamie').length}
          />
          <Chip
            avatar={<Avatar {...stringAvatar('Lewis Austin')} />}
            label={rows.filter((row: any) => row.name === 'Lewis').length}
          />
          <Chip
            avatar={<Avatar {...stringAvatar('Sam Finn')} />}
            label={rows.filter((row: any) => row.name === 'Sam').length}
          />
        </Stack>
      </Box>
      <TableContainer>
        <Table
          sx={{ maxWidth: '100vh' }}
          stickyHeader
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.id}>
                  {header.sort ? (
                    <TableSortLabel
                      active
                      direction={sortByDate}
                      onClick={() => {
                        setSortByDate(sortByDate === 'desc' ? 'asc' : 'desc');
                      }}
                    >
                      {header.text}
                    </TableSortLabel>
                  ) : (
                    <>{header.text}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Stack direction="row" gap="4px">
                    {row.type.map((type: string) => (
                      <Chip
                        key={`${row.date}-${row.name}-${type}`}
                        label={getBetType(type)}
                        size="small"
                        sx={{ bgcolor: getBetTypeColor(type) }}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
