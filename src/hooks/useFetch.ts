import { useEffect, useState } from 'react';
import { IDataType } from '../common/types';
import axios from 'axios';

export const useFetch = (url: string) => {
  const [data, setData] = useState<IDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState<IDataType | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        if (response.data) {
          const allData: IDataType[] = Object.values(response.data);
          setData(allData);
          const defaultCountry = allData.find((f) => f.location === 'International');
          if (defaultCountry) {
            setDefaultCountry(defaultCountry);
          }
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, defaultCountry };
};
