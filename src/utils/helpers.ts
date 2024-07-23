import { ListDataModel } from '@/types/data.types';
import { BET_TYPES, calculateBetTypeLossTotal } from '@/utils/betType';

import data2019 from '../data/2019-2020.json';
import data2020 from '../data/2020-2021.json';
import data2021 from '../data/2021-2022.json';
import data2022 from '../data/2022-2023.json';
import data2023 from '../data/2023-2024.json';
import data2024 from '../data/2024-2025.json';

const listCounts = [
  data2019.count,
  data2020.count,
  data2021.count,
  data2022.count,
  data2023.count,
  data2024.count,
];

const getAllData = () => [
  ...data2019.results,
  ...data2020.results,
  ...data2021.results,
  ...data2022.results,
  ...data2023.results,
  ...data2024.results,
];

const getBetTypeMap = () => [
  ...data2019.results.flatMap((r: ListDataModel) => r.type),
  ...data2020.results.flatMap((r: ListDataModel) => r.type),
  ...data2021.results.flatMap((r: ListDataModel) => r.type),
  ...data2022.results.flatMap((r: ListDataModel) => r.type),
  ...data2023.results.flatMap((r: ListDataModel) => r.type),
  ...data2024.results.flatMap((r: ListDataModel) => r.type),
];

const getTeamMap = () => [
  ...data2019.results.flatMap((r: ListDataModel) => r.team),
  ...data2020.results.flatMap((r: ListDataModel) => r.team),
  ...data2021.results.flatMap((r: ListDataModel) => r.team),
  ...data2022.results.flatMap((r: ListDataModel) => r.team),
  ...data2023.results.flatMap((r: ListDataModel) => r.team),
  ...data2024.results.flatMap((r: ListDataModel) => r.team),
];

const getNameMap = () => [
  ...data2019.results.flatMap((r: ListDataModel) => r.name),
  ...data2020.results.flatMap((r: ListDataModel) => r.name),
  ...data2021.results.flatMap((r: ListDataModel) => r.name),
  ...data2022.results.flatMap((r: ListDataModel) => r.name),
  ...data2023.results.flatMap((r: ListDataModel) => r.name),
  ...data2024.results.flatMap((r: ListDataModel) => r.name),
];

export const getLostBySeasonData = () => [
  {
    total: data2019.count,
    season: '2019/2020',
  },
  {
    total: data2020.count,
    season: '2020/2021',
  },
  {
    total: data2021.count,
    season: '2021/2022',
  },
  {
    total: data2022.count,
    season: '2022/2023',
  },
  {
    total: data2023.count,
    season: '2023/2024',
  },
  {
    total: data2024.count,
    season: '2024/2025',
  },
];

export const getLostByPersonData = () => {
  const resultsByName = getNameMap();
  const counts: Record<string, number> = {};
  resultsByName.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });
  return Object.keys(counts).map((key) => ({
    id: key,
    value: counts[key],
    label: key,
  }));
};

export const getTotalListEntriesCount = () =>
  listCounts.reduce((partialSum, a) => partialSum + a, 0);

export const getWorstSeason = () => {
  const index = listCounts.indexOf(Math.max(...listCounts));
  return getLostBySeasonData()[index].season;
};

export const getEstimatedLoss = () => {
  const allBetTypes = getBetTypeMap();
  const costArray = Object.keys(BET_TYPES).map((key) =>
    calculateBetTypeLossTotal(allBetTypes, key),
  );
  return costArray.reduce((partialSum, a) => partialSum + a, 0);
};

export const getEstimatedLossBySeason = () => {
  const calculateLoss = (results: ListDataModel[]) => {
    const costArray = Object.keys(BET_TYPES).map((key) =>
      calculateBetTypeLossTotal(
        results.flatMap((r: ListDataModel) => r.type),
        key,
      ),
    );
    return costArray.reduce((partialSum, a) => partialSum + a, 0);
  };
  return [
    {
      season: '19/20',
      loss: calculateLoss(data2019.results),
    },
    {
      season: '20/21',
      loss: calculateLoss(data2020.results),
    },
    {
      season: '21/22',
      loss: calculateLoss(data2021.results),
    },
    {
      season: '22/23',
      loss: calculateLoss(data2022.results),
    },
    {
      season: '23/24',
      loss: calculateLoss(data2023.results),
    },
    {
      season: '24/25',
      loss: calculateLoss(data2024.results),
    },
  ];
};

export const getEstimatedLossByPerson = () => {
  const allData = getAllData();
  const formattedDate = allData.flatMap((r: ListDataModel) => ({
    type: r.type,
    name: r.name,
  }));
  const calculateLoss = (name: string) => {
    const costArray = Object.keys(BET_TYPES).map((key) =>
      calculateBetTypeLossTotal(
        formattedDate
          .filter((d) => d.name === name)
          .map((d) => d.type) as string[],
        key,
      ),
    );
    return costArray.reduce((partialSum, a) => partialSum + a, 0);
  };
  return [
    {
      id: 'Jamie',
      value: calculateLoss('Jamie'),
      label: 'Jamie',
    },
    {
      id: 'Sam',
      value: calculateLoss('Sam'),
      label: 'Sam',
    },
    {
      id: 'Lewis',
      value: calculateLoss('Lewis'),
      label: 'Lewis',
    },
    {
      id: 'Ben',
      value: calculateLoss('Ben'),
      label: 'Ben',
    },
  ];
};

export const getBogeyTeam = () => {
  const allTeams = getTeamMap().filter((t) => t);
  return allTeams
    .sort(
      (a, b) =>
        allTeams.filter((v) => v === a).length -
        allTeams.filter((v) => v === b).length,
    )
    .pop();
};

export const getMostRecentListAddition = () =>
  data2023.results[data2023.results.length - 1];

export const getMostRecentByName = (name: string) => {
  const allData = getAllData();
  const resultsByName = allData.filter((d) => d.name === name);
  return resultsByName[resultsByName.length - 1];
};

export const getListByName = (name: string) => {
  const allNames = getNameMap();
  return allNames.filter((n) => n === name);
};
export const getListCountByName = (name: string) => getListByName(name).length;

const getLeaderboardDataForName = (name: string) => {
  const mostRecent = getMostRecentByName(name);
  return {
    name,
    total: getListCountByName(name),
    mostRecent: mostRecent.date,
    type: mostRecent.type,
  };
};

export const getLeaderboard = () => {
  const list = [
    getLeaderboardDataForName('Ben'),
    getLeaderboardDataForName('Jamie'),
    getLeaderboardDataForName('Lewis'),
    getLeaderboardDataForName('Sam'),
  ];
  return list.sort((a, b) => a.total - b.total);
};
