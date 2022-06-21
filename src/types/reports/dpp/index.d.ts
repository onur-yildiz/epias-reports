interface DppData {
  dppList: Dpp[];
  statistics: DppStatistic;
}

interface Dpp {
  akarsu: number;
  barajli: number;
  biokutle: number;
  diger: number;
  dogalgaz: number;
  fuelOil: number;
  ithalKomur: number;
  jeotermal: number;
  linyit: number;
  nafta: number;
  ruzgar: number;
  saat: number;
  tarih: string;
  tasKomur: number;
  toplam: number;
}

interface DppStatistic {
  akarsuAvg: number;
  akarsuMax: number;
  akarsuMin: number;
  akarsuSum: number;
  barajliAvg: number;
  barajliMax: number;
  barajliMin: number;
  barajliSum: number;
  biokutleAvg: number;
  biokutleMax: number;
  biokutleMin: number;
  biokutleSum: number;
  digerAvg: number;
  digerMax: number;
  digerMin: number;
  digerSum: number;
  dogalgazAvg: number;
  dogalgazMax: number;
  dogalgazMin: number;
  dogalgazSum: number;
  fuelOilAvg: number;
  fuelOilMax: number;
  fuelOilMin: number;
  fuelOilSum: number;
  ithalKomurAvg: number;
  ithalKomurMax: number;
  ithalKomurMin: number;
  ithalKomurSum: number;
  jeotermalAvg: number;
  jeotermalMax: number;
  jeotermalMin: number;
  jeotermalSum: number;
  linyitAvg: number;
  linyitMax: number;
  linyitMin: number;
  linyitSum: number;
  naftaAvg: number;
  naftaMax: number;
  naftaMin: number;
  naftaSum: number;
  ruzgarAvg: number;
  ruzgarMax: number;
  ruzgarMin: number;
  ruzgarSum: number;
  tarih: string;
  tasKomurAvg: number;
  tasKomurMax: number;
  tasKomurMin: number;
  tasKomurSum: number;
  toplamAvg: number;
  toplamMax: number;
  toplamMin: number;
  toplamSum: number;
}
