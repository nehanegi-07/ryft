import React, { useState, useEffect } from "react"
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MasterCard from "./components/MasterCard";
import PaymentMethod from "./components/PaymentMethod";
import { getUserCardsDetail } from "services/User.Services"
import Transactions from "layouts/user/transactions";
import { useQuery, useMutation } from "react-query";
import Loader from "components/Loader";
import Invoices from "layouts/user/billing/components/Invoices";
import { getUserDetail, updateUserDetail, downloadInvoicePdf, getUserTransactionsDetail } from "services/User.Services"
import { useUser } from "context"
import PaymentMethodCard from "./components/PaymentMethodCard";
import { notifySuccess } from "components/Messages";
import { notifyError } from "components/Messages";

function Billing() {
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [autoChargeAmount, setAutoChargeAmount] = useState(null)
  const [id, setId] = useState(null)
  const [invoicePdf, setInvoicePdf] = useState(null);
  const [creditValue,setCreditValue] =useState(null)

  // const creditValue = user.credits || 0
  const { data: userDetail } = useQuery(['usersDetailonBilling'],
    () => getUserDetail(),
    {
      keepPreviousData: true,
      // staleTime: Infinity,
    }
  );

  useEffect(() => {
    // const callbackFn = async () => {
    //   const result = await getUserDetail();
    //   const { data } = result.data
    //   setPaymentMethod(data?.paymentMethod);
    //   setAutoChargeAmount(data?.autoChargeAmount)
    // }
    // callbackFn()
    setPaymentMethod(userDetail?.data?.data?.paymentMethod);
    setAutoChargeAmount(userDetail?.data?.data?.autoChargeAmount)
    setCreditValue(userDetail?.data?.data?.credits)
  }, [userDetail])


  useEffect(() => {
    if (id === null) return
    const callbackFn = async () => {
      const result = await downloadInvoicePdf(id);
      const { data } = result
      setInvoicePdf(data.path);
    }
    callbackFn()
  }, [id])

  useEffect(() => {
    if (invoicePdf) {
      setTimeout(() => {
        const fileURL = `${process.env.REACT_APP_IMAGE_URL}${invoicePdf}`
        let alink = document.createElement('a');
        const pdfWindow = window.open();
        pdfWindow.location.href = fileURL;
        alink.setAttribute('download', 'file.pdf');
        alink.click();
      }, 1000);
    }
  }, [invoicePdf])

  const { isLoading, data } = useQuery(['cardsDetailForBilling'],
    getUserCardsDetail, {
    staleTime: Infinity
  }
  )

  const { isLoading: userInvoiceAndTransactionsIsLoading, data: userInvoiceAndTransactionsData } = useQuery(['transactionInvoiceData'],
    getUserTransactionsDetail, {
    // staleTime: Infinity
  }
  )

  const { mutate } = useMutation(updateUserDetail, {
    onSuccess: (res) => {
      notifySuccess("Payment Method Changed Successfully")
    },
    onError: (error) => {
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`)
    },
  });

  const changePaymentMethod = (value) => {
    setPaymentMethod(value)
    mutate({ paymentMethod: value })
  }

  const onButtonClick = (id) => {
    setId(id)
  }


  return (
    <MDBox mt={4}>
      <MDBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} xl={6}>
                {isLoading === false ?
                  // eslint-disable-next-line array-callback-return
                  data?.data?.data.map((card) => {
                    if (card.isDefault === true) {
                      return (
                        <MasterCard card={card} number={4562112245947852} holder={card.cardHolderName} expires={`${card.expiryMonth}/${card.expiryYear}`} />
                      )
                    }
                  }) :
                  <Card sx={{ minHeight: 250, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Loader size={20} color="info" />
                  </Card>
                }
              </Grid>
              <Grid item xs={12} xl={6}>
                <PaymentMethodCard
                  icon="wallet"
                  title={`£${creditValue}`}
                  description="amount"
                  value={`£${creditValue}`}
                  paymentMethod={paymentMethod}
                  autoChargeAmount={`£${autoChargeAmount}`}
                  changePaymentMethod={changePaymentMethod}
                  RadioTitle="Payment Method"
                />
              </Grid>
              <Grid item xs={12}>
                <PaymentMethod creditCardData={data?.data?.data} isLoading={isLoading} />
              </Grid>

              <Grid item xs={12}>
                <Transactions
                  transactionsData={userInvoiceAndTransactionsData?.data?.data?.transactions}
                  isLoading={userInvoiceAndTransactionsIsLoading}
                  title="leads Transactions"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Invoices
              title="Invoices"
              invoicesData={userInvoiceAndTransactionsData?.data?.data?.invoices}
              onButtonClick={onButtonClick}
              isLoading={userInvoiceAndTransactionsIsLoading}
            />
          </Grid>

        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Billing;
