import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { IDataType } from '../../common/types';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

type Props = {
  children?: React.ReactNode;
  selectedCountry?: IDataType | null;
  allData: IDataType[];
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export const TabComponent = ({ children, selectedCountry, allData }: Props) => {
  const [value, setValue] = useState(0);
  const [countryCount, setCountryCount] = useState(10);
  const [beginningIndex, setBeginningIndex] = useState(0);
  const [dateCount, setDateCount] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const data = [...allData];
    const beginningIndex = data.findIndex((f) => f.location === selectedCountry?.location);
    setBeginningIndex(beginningIndex);
  }, [selectedCountry, allData]);

  // line chart
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: 'Line Chart'
      }
    }
  };

  const lineChartData = {
    labels: selectedCountry?.data?.map((s) => s.date).splice(-dateCount),
    datasets: [
      {
        data: selectedCountry?.data?.map((s) => s.new_cases),
        label: 'Confirmed Cases',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        fill: true
      },
      {
        data: selectedCountry?.data?.map((s) => s.new_deaths),
        label: 'Deaths',
        backgroundColor: 'rgba(116,39,116, 0.2)',
        borderColor: 'rgba(116,39,116, 1)',
        fill: true
      }
    ]
  };

  // bar chart
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: 'Bar Chart'
      }
    }
  };

  const barChartData = {
    labels: allData.slice(beginningIndex, countryCount + beginningIndex).map((a) => a.location),
    datasets: [
      {
        label: 'Total Cases',
        data: allData
          .slice(beginningIndex, countryCount + beginningIndex)
          .map((a) => a.data?.map((b) => b.total_cases))
          .map((c) => c?.slice(-1))
          .flat(),
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        fill: true
      },
      {
        label: 'Total Deaths',
        data: allData
          .slice(beginningIndex, countryCount + beginningIndex)
          .map((a) => a.data?.map((b) => b.total_deaths))
          .map((c) => c?.slice(-1))
          .flat(),
        backgroundColor: 'rgba(116,39,116,1)',
        borderColor: 'rgba(116,39,116,1)',
        fill: true
      }
    ]
  };

  const handleSelectChange = (e: any) => {
    setCountryCount(e.target.value);
  };

  const handleDateCount = (val: number) => {
    setDateCount(val);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Reported cases" {...a11yProps(0)} />
          <Tab label="Ranked charts" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Line data={lineChartData} options={lineChartOptions} />
        <Button onClick={() => handleDateCount(10)}>Last 10 Days</Button>
        <Button onClick={() => handleDateCount(60)}>Last 2 Months</Button>
        <Button onClick={() => handleDateCount(365)}>Last Year</Button>
        <Button onClick={() => handleDateCount(0)}>All</Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Bar data={barChartData} options={barChartOptions} />
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={countryCount}
            label="Age"
            onChange={handleSelectChange}
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </TabPanel>
    </>
  );
};
