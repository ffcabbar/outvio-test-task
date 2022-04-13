import { Autocomplete, TextField } from '@mui/material';
import { IDataType } from '../../api';

type Props = {
  handleCountryChange: (value: string) => void;
  data: IDataType[];
};

export const CountryPicker = ({ handleCountryChange, data }: Props) => {
  return (
    <Autocomplete
      defaultValue={data.find((f) => f.location === 'International')}
      options={data}
      sx={{ width: '100%' }}
      disableClearable
      disablePortal
      renderInput={(params) => <TextField {...params} label="Country" />}
      onInputChange={(event, newInputValue) => {
        handleCountryChange(newInputValue);
      }}
      getOptionLabel={(data) => data.location}
    />
  );
};
