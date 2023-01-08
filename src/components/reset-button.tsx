import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { FC } from "react"

interface ResetButtonProps {
  onClick: () => void;
}

export const ResetButton: FC<ResetButtonProps> = (props) => {
  const { onClick } = props;

  return (
    <Button
      sx={{
        m: 1,
      }}
      onClick={onClick}
      variant={"contained"}
      color={'error'}
    >
      <Typography variant="body1">
        ゲーム数、カウンターをリセット
      </Typography>
    </Button>
  )
}