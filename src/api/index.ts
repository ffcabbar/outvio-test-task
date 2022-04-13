import axios from 'axios';

const url = 'https://covid.ourworldindata.org/data/owid-covid-data.json';

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

export const fetchData = async (): Promise<IDataType[]> => {
  try {
    const { data } = await axios.get<IDataType>(url);
    return Object.values(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
