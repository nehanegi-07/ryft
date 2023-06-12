import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";


function ArchiveStatus({ currentStatus, handleArchivedLead, loading }) {

    return (
        <MDBox
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <MDTypography variant="h6" fontWeight="medium">
                Are You Sure You want to {currentStatus === "Archived" ? "UnArchived" : "Archived"}?
            </MDTypography>

            <MDBox
                mt={4}
                mb={1}
                sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
            >
                <MDButton color="info" onClick={() => handleArchivedLead()} isLoading={loading} loaderColor="dark">
                    {loading === "pending" ? "qamwjmq" : "yes"}
                </MDButton>
                <MDButton
                    color="info"
                    type="reset"
                    // onClick={() => setArchiveModal(false)}
                >
                    No
                </MDButton>
            </MDBox>
        </MDBox>

    );
}

export default ArchiveStatus;
