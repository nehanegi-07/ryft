import React from "react";
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from "components/MDButton";
import { deleteCreditCard } from 'services/User.Services';
import { useQueryClient, useMutation } from 'react-query';

function DeleteModal({ handleDeleteModalClose, cardId, onClick, deleteCardHandler }) {

    return (
        <>
            <MDBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <MDTypography variant="h6" fontWeight="medium">
                    Are You Sure You want to Delete?
                </MDTypography>

                <MDBox mt={4} mb={1} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <MDButton color="info" onClick={() => onClick()} >
                        Yes
                    </MDButton>
                    <MDButton color="info" type="reset" onClick={handleDeleteModalClose} >
                        No
                    </MDButton>
                </MDBox>
            </MDBox>
        </>
    )
}

export default DeleteModal
