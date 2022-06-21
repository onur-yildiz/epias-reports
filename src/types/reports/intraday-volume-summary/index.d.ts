interface IntradayVolumeSummaryData {
  volumes: IdmVolume[];
  statistics: MarketStatistic[];
}

interface IdmVolume {
  date: string;
  period: number;
  volume: number;
  periodType: string;
}
