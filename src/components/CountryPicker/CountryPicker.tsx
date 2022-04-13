import { Autocomplete, TextField } from '@mui/material';
import { IDataType } from '../../common/types';

type Props = {
  handleCountryChange: (value: string) => void;
  data: IDataType[];
  defaultCountry: IDataType;
};

export const CountryPicker = ({ handleCountryChange, data, defaultCountry }: Props) => {
  return (
    <Autocomplete
      defaultValue={defaultCountry}
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
