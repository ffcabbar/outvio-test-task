export interface IDataType {
  location: string;
  population?: number;
  data?: IDailyData[];
}

export interface IDailyData {
  date?: string;
  total_cases?: number;
  new_cases?: number;
  total_deaths?: number;
  new_deaths?: number;
}
