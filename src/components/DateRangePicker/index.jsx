import React from "react";
import { DateRangePicker } from "mui-daterange-picker";
import "./index.css"

const DatesRangePicker = props => {
    const [open, setOpen] = React.useState(true);
    const [dateRange, setDateRange] = React.useState({});

    const toggle = () => setOpen(!open);

    return (
        <div style={{ textAlign: "center" }}>
            <button onClick={toggle}>X</button>
            <DateRangePicker
                className="datepicker"
                open={open}
                toggle={toggle}
                onChange={(range) => setDateRange(range)}
            />
        </div>
    );
}

export default DatesRangePicker;
