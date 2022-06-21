interface IntradayWapData {
  idmAofList: IdmWap[];
  statistics: MarketStatistic[];
}

interface IdmWap {
  date: string;
  price: number;
}
