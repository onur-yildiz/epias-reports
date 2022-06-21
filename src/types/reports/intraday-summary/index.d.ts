interface IntradaySummaryData {
  intraDaySummaryList: IntradaySummary[];
  statistics: IntradaySummaryStatistic[];
}
interface IntradaySummary {
  contract: string;
  date: string;
  id: number;
  maxAskPrice: number;
  maxBidPrice: number;
  maxMatchPrice: number;
  minAskPrice: number;
  minBidPrice: number;
  minMatchPrice: number;
  quantityOfAsk: number;
  quantityOfBid: number;
  tradingVolume: number;
  volume: number;
}
interface IntradaySummaryStatistic {
  date: string;
  maxAskPriceMax: number;
  maxAskPriceMin: number;
  maxBidPriceMax: number;
  maxBidPriceMin: number;
  maxMatchPriceMax: number;
  maxMatchPriceMin: number;
  minAskPriceMax: number;
  minAskPriceMin: number;
  minBidPriceMax: number;
  minBidPriceMin: number;
  minMatchPriceMax: number;
  minMatchPriceMin: number;
  quantityOfAskAvg: number;
  quantityOfAskMax: number;
  quantityOfAskMin: number;
  quantityOfAskSum: number;
  quantityOfBidAvg: number;
  quantityOfBidMax: number;
  quantityOfBidMin: number;
  quantityOfBidSum: number;
  tradingVolumeAvg: number;
  tradingVolumeMax: number;
  tradingVolumeMin: number;
  tradingVolumeSum: number;
  volumeAvg: number;
  volumeMax: number;
  volumeMin: number;
  volumeSum: number;
}
