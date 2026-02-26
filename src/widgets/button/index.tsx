import { Button } from "@mui/material";
import React, { useState } from "react";
function Buttons(props: any) {
    const [value] = useState(props.data ? props.data.name : "");
    const [icon] = useState(props.data ? props.data.icon : "");
    const [cls] = useState(props.data ? props.data.class : "");
    const [variant] = useState(props.data ? props.data.variant : "contained");

    return (
       
        <Button className={cls} onClick={props.onClick} disabled={props.data ? props.data.disabled : ""}  variant={variant}>{icon} {value} </Button>

    )
}
export default Buttons;