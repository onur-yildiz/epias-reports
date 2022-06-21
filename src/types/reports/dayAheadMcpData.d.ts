interface DayAheadMcpData {
  dayAheadMCPList: DayAheadMcpWithExchangeData[];
  statistics: MarketStatistic[];
}

interface DayAheadMcpWithExchangeData {
  date: string;
  price: number;
  priceUsd: number;
  priceEur: number;
}
