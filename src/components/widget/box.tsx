import { FC, ReactNode } from "react";

interface BoxProps {
    children: ReactNode;
    width?: number;
    height?: number;
    display?: string;
    alignItems?: 'right' | 'left' | 'center';
    justifyContent?: 'right' | 'left' | 'center';
}

export const Box: FC<BoxProps> = (props) => {
    const {
        width,
        height,
        display,
        alignItems,
        justifyContent,
        children
    } = props;

    return (
        <div style={{
            border: '1px solid #EEE',
            width,
            height,
            display,
            justifyContent,
            alignItems,
        }}>
            {children}
        </div>
    );
}