export const BET_TYPES: Record<string, string> = {
  W: 'Win',
  BTTS: 'BTTS',
  FM: 'Full Monty',
  C: 'Cards',
  SOT: 'Shots on Target',
  CSFM: 'Cards & Shots on Target Full Monty',
};

const BET_TYPE_COLORS: Record<string, string> = {
  W: '#FE7F2D',
  BTTS: '#2667FF',
  FM: '#A882DD',
  C: '#42D9C8',
  SOT: '#D05353',
  CSFM: '#DDD92A',
};

export const BET_TYPE_COST: Record<string, number> = {
  W: 45,
  BTTS: 300,
  FM: 200,
  C: 1500,
  SOT: 25,
  CSFM: 3000,
};

export const getBetType = (type: string) => BET_TYPES[type];

export const getBetTypeColor = (type: string) => BET_TYPE_COLORS[type];

export const calculateBetTypeLossTotal = (list: string[], type: string) => {
  const count = list.filter((item) => item === type).length;
  return BET_TYPE_COST[type] * count;
};
