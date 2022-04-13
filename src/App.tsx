import { useEffect } from 'react';
import { fetchData } from './api';
import './App.css';

const App = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const fetchedData = await fetchData();
    console.log(fetchedData);
  };
  return <div className="App">init</div>;
};

export default App;
