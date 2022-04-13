import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

type Props = {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ToogleColorMode = ({ isDarkTheme, setIsDarkTheme }: Props) => {
  const handleToogleMode = () => {
    localStorage.setItem("darkTheme", (!isDarkTheme).toString());
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <IconButton onClick={handleToogleMode} color="inherit">
      {isDarkTheme ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};
