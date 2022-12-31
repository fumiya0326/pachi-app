import { AppBar, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

interface TitleHeaderProps {
  title: string;
}

export const TitleHeader: FC<TitleHeaderProps> = (props) => {
  const { title } = props;

  return (
    <>
      <title>
        {title}
      </title>
      <AppBar position="static" sx={{ mb: 1 }}>
        <Toolbar>
          <Typography variant="h6" fontWeight="bold" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}