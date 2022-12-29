import { FC } from "react";

interface TypographyProps {
  children: string | number;
}

export const Typography: FC<TypographyProps> = (props) => {
  const { children } = props;

  return (
    <p>
      {children}
    </p>
  )
}