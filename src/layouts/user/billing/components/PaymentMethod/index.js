import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import masterCardLogo from 'assets/images/logos/mastercard.png';
import { Switch } from '@mui/material';
import { useMaterialUIController } from 'context';
import BasicModal from 'components/Modal';
import CreditCardForm from '../CreditCardForm';
import Loader from 'components/Loader';
import { updateDefaultCard, deleteCreditCard } from 'services/User.Services';
import { useQueryClient, useMutation } from 'react-query';
import DeleteModal from '../DeleteModal';
import { notifySuccess } from 'components/Messages';
import { notifyError } from 'components/Messages';
import CreditForm from '../CreditForm';

function PaymentMethod({ creditCardData, isLoading }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const [openCreditForm, setOpenCreditForm] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [cardId, setCardId] = React.useState(null);
  const { mutate } = useMutation(updateDefaultCard, {
    onSettled: () => queryClient.invalidateQueries('cardsDetailForBilling'),
  });

  const { mutate: deleteCardMutate } = useMutation(deleteCreditCard, {

    onSettled: () => queryClient.invalidateQueries('cardsDetailForBilling'),
    onSuccess: () => {
      notifySuccess("Deleted Successfully")
    }, onError: () => {
      notifyError("Something Went Wrong")
    }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenCreditModal = () => setOpenCreditForm(true);
  const handleCloseCreditModal = () => setOpenCreditForm(false);

  const handleDeleteModalOpen = (cardId) => {
    setOpenDeleteModal(true)
    setCardId(cardId)
  };
  const handleDeleteModalClose = () => setOpenDeleteModal(false);

  const updateCardHandler = async (cardId) => {
    try {
      mutate(cardId);
    } catch (err) {
      console.log('err', err);
    }
  };



  const deleteCardHandler = async (card) => {
    try {
      deleteCardMutate(card);
      handleDeleteModalClose()
    } catch (err) {
      console.log('err', err);
    }

  };
  const AddButton = () => {
    return (
      <MDButton variant="gradient" color="dark" onClick={handleOpen}>
        <Icon sx={{ fontWeight: 'bold' }}>add</Icon>
        &nbsp;add new card
      </MDButton>
    );
  };

  const AddCreditButton = () => {
    return (
      <MDButton variant="gradient" color="dark" onClick={handleOpenCreditModal}>
        <Icon sx={{ fontWeight: 'bold' }}>add</Icon>
        &nbsp;add Credit
      </MDButton>
    );
  };


  return (
    <Card id="delete-account" sx={{maxHeight:"20vh",minHeight:"180px"}}>
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{position:"sticky",top:0,background:"white"}}
      >
        <MDTypography variant="h6" fontWeight="medium">
          Payment Method
        </MDTypography>
        <MDBox display="flex" gap={1}>
          <BasicModal button={AddButton()} open={open} handleClose={handleClose}>
            <CreditCardForm handleCloseModal={handleClose} />
          </BasicModal>

          <BasicModal button={AddCreditButton()} open={openCreditForm} handleClose={handleCloseCreditModal}>
            <CreditForm handleCloseModal={handleCloseCreditModal} />
          </BasicModal>
        </MDBox>

      </MDBox>
      {isLoading === false ? (
        <MDBox p={2} sx={{overflowY:"scroll"}}>
          <Grid container spacing={3}>
            {creditCardData?.map((card) => {

              return (
                <>
                  <Grid item xs={12} md={6} key={card._id} >
                    <MDBox
                      borderRadius="lg"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={3}
                      key={card._id}
                      sx={{
                        border: ({ borders: { borderWidth, borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      }}
                    >
                      <MDBox
                        component="img"
                        src={masterCardLogo}
                        alt="master card"
                        width="10%"
                        mr={1}
                      />
                      <MDTypography variant="h6" fontWeight="medium">
                        ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;
                        {card.cardNumber?.substr(-4)}
                      </MDTypography>
                      <MDBox
                        ml="auto"
                        lineHeight={0}
                        color={darkMode ? 'white' : 'dark'}
                        display="flex"
                        alignItems="center"
                        key={card._id}
                      >
                        <Tooltip title={card.isDefault ? "Default Card" : "Set Default"} placement="top">
                          <Switch
                            checked={card.isDefault}
                            onChange={() => updateCardHandler(card._id)}
                          />
                        </Tooltip>

                        {card.isDefault ? <Tooltip title="Default Card Can't be deleted" placement="top">
                          <Icon >delete</Icon>
                        </Tooltip> : <Icon onClick={() => handleDeleteModalOpen(card._id)} >delete</Icon>}
                      </MDBox>
                    </MDBox>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </MDBox>
      ) : (
        <Grid
          container
          spacing={3}
          mt={3}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Loader size={20} color="info" />
        </Grid>
      )}
      <BasicModal open={openDeleteModal} handleClose={handleDeleteModalClose}>
        <DeleteModal handleDeleteModalClose={handleDeleteModalClose} onClick={() => deleteCardHandler(cardId)} />
      </BasicModal>


    </Card>
  );
}

export default PaymentMethod;
