interface SmpData {
  smpList: Smp[];
  statistics: MarketStatistic[];
}

interface Smp {
  date: string;
  price: number;
  smpDirection: string;
  smpDirectionId: number;
  nextHour: string;
}
