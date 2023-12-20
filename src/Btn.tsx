import React, {memo, useCallback} from 'react';
import Button from "@material-ui/core/Button";
import {ButtonProps} from "@material-ui/core/Button/Button";

interface BtnPropsType extends ButtonProps {
    name: string
    onClick: () => void
}

// type BtnPropsType = {
//     name: string
//     onClick: () => void
//     color: "inherit" | "primary" | "secondary" | "default" | undefined
//     variant: "text" | "outlined" | "contained" | undefined
// }

export const Btn: React.FC<BtnPropsType> = memo((props) => {

    const {name, variant, onClick, color} = props
    const onClickHandler = () => {
        onClick()
    }

    return (
        <Button
            variant={variant}
            onClick={onClickHandler}
            color={color}
        >{name}
        </Button>
    );
})

