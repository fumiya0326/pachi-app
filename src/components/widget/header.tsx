import { FC } from "react";

interface HeaderProps {
    title: string,
}

export const Header: FC<HeaderProps> = (props) => {
    const { title } = props;

    return (
        <title>
            {title}
        </title>
    )
}