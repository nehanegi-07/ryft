import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import BasicModal from "components/Modal";
import AutoChargeAmountForm from "../AutoChargeAmounForm";

function PaymentMethodCard({ color, icon, title, description, value, paymentMethod, autoChargeAmount, changePaymentMethod, RadioTitle }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Card>
            <MDBox p={2} mx={3} display="flex" justifyContent="center">
                <MDBox
                    display="grid"
                    justifyContent="center"
                    alignItems="center"
                    bgColor={color}
                    color="white"
                    width="4rem"
                    height="4rem"
                    shadow="md"
                    borderRadius="lg"
                    variant="gradient"
                >
                    <Icon fontSize="default">{icon}</Icon>
                </MDBox>
            </MDBox>
            <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
                <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    {title}
                </MDTypography>
                {description && (
                    <MDTypography variant="caption" color="text" fontWeight="regular">
                        {description}
                    </MDTypography>
                )}
                {description && !value ? null : <Divider />}

                <MDBox mb={1} mt={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 15 }}>{RadioTitle}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => changePaymentMethod(e.target.value)}
                        id="paymentMethod"
                        autoComplete="paymentMethod"
                    >
                        <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <FormControlLabel value="auto charge" control={<Radio />} label={`Auto Charge`} />
                            {paymentMethod === "auto charge" ?
                                <MDBox sx={{ width: "80px", display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                                        {autoChargeAmount}
                                    </MDTypography>
                                    <Icon onClick={handleOpen}>edit</Icon>
                                </MDBox>
                                : ""
                            }
                        </MDBox>
                        <FormControlLabel value="weekly payment" control={<Radio />} label="Weekly Payment" />
                        <FormControlLabel value="add credits manually" control={<Radio />} label="Manual Top Up" />

                    </RadioGroup>
                </MDBox>
            </MDBox>
            <BasicModal open={open} handleClose={handleClose}>
                <AutoChargeAmountForm handleCloseModal={handleClose} autoChargeAmount={autoChargeAmount} />
            </BasicModal>
        </Card>
    );
}

// Setting default values for the props of DefaultInfoCard
PaymentMethodCard.defaultProps = {
    color: "info",
    value: "",
    description: "",
};

// Typechecking props for the DefaultInfoCard
PaymentMethodCard.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PaymentMethodCard;
