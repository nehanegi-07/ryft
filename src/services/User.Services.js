import axios from 'axios';
import { notifySuccess } from 'components/Messages';
import formatDistance from 'date-fns/formatDistance';

export const cardDetailSaved = async (userData) => {
  const user_id = JSON.parse(localStorage.getItem('id'));
  Object.assign(userData, { userId: user_id.id });
  const cardDetailsState = await axios.post(
    `${process.env.REACT_APP_API_KEY}/cardDetails`,
    userData
  );
  return cardDetailsState;
};

export const getUserDetail = async () => {
  const user_id = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const userDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/user/${user_id.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return userDetails;
};

export const updateUserDetail = async (userData) => {
  const user_id = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const updateUserDetails = await axios({
    method: 'PATCH',
    url: `${process.env.REACT_APP_API_KEY}/user/${user_id.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: userData,
  });
  return updateUserDetails;
};

export const updateUserBusinessDetail = async (userData) => {
  let formData = new FormData();

  formData.append('businessAddress', userData?.data?.businessAddress);
  formData.append('businessCity', userData?.data?.businessCity);
  formData.append('businessCountry', userData?.data?.businessCountry);
  formData.append('businessIndustry', userData?.data?.businessIndustry);
  formData.append('businessLogo', userData?.data?.businessLogo);
  formData.append('businessName', userData?.data?.businessName);
  formData.append(
    'businessOpeningHours',
    JSON.stringify(userData?.data?.businessOpeningHours)
  );
  formData.append('businessPostCode', userData?.data?.businessPostCode);
  formData.append('businessSalesNumber', userData?.data?.businessSalesNumber);

  const token = localStorage.getItem('token');

  const updateUserBusinessDetails = await axios({
    method: 'PATCH',
    url: `${process.env.REACT_APP_API_KEY}/auth/business/${userData?.businessId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });
  return updateUserBusinessDetails;
};

export const inviteUser = async (userData) => {
  const token = localStorage.getItem('token');

  const inviteUserState = await axios.post(
    `${process.env.REACT_APP_API_KEY}/invitedUsers`,
    userData,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return inviteUserState;
};

export const addCardDetailSaved = async (userData) => {
  const token = localStorage.getItem('token');

  const cardDetailsState = await axios.post(
    `${process.env.REACT_APP_API_KEY}/cardDetails/addCard`,
    userData,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return cardDetailsState;
};

export const getUserCardsDetail = async () => {
  const user_id = JSON.parse(localStorage.getItem('user'));
  // const token = localStorage.getItem("token")
  const userCardsDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/cardDetails/${user_id.id}`,
    {
      method: 'GET',
    }
  );
  return userCardsDetails;
};

export const getUserTransactionsDetail = async () => {
  const token = localStorage.getItem('token');
  const userTransactionsDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/transactions`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return userTransactionsDetails;
};

export const updateDefaultCard = async (cardId) => {
  const token = localStorage.getItem('token');

  const updateDefaultCard = await axios({
    method: 'PATCH',
    url: `${process.env.REACT_APP_API_KEY}/cardDetails/toggleForCard/${cardId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return updateDefaultCard;
};

export const getUserLeads = async (
  queryPageIndex,
  queryPageSize,
  queryPageFilter,
  status
) => {
  const token = localStorage.getItem('token');
  let statusStr = '';
  if (status) {
    statusStr = `&status=${status}`;
  }

  let searchStr = '';
  if (queryPageFilter?.trim().length > 1) {
    searchStr = `&search=${queryPageFilter}`;
  }
  const userLeadsData = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads?page=${
      queryPageIndex + 1
    }&perPage=${queryPageSize}${searchStr}&${statusStr}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return userLeadsData;
};

export const getLeadsRevenue = async (
  queryPageIndex,
  queryPageSize,
  queryPageFilter
) => {
  const token = localStorage.getItem('token');
  let searchStr = '';
  if (queryPageFilter?.trim().length > 1) {
    searchStr = `&search=${queryPageFilter}`;
  }
  const userLeadsRevenueDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/revenue?page=${
      queryPageIndex + 1
    }&perPage=${queryPageSize}${searchStr}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return userLeadsRevenueDetails;
};

export const getRightLineChartData = async (startDate, endDate) => {
  const token = localStorage.getItem('token');
  const lineChartDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/rightDashboardChart?start=${startDate}&end=${endDate}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return lineChartDetails;
};

export const getLeftBarChartData = async (startDate, endDate) => {
  const token = localStorage.getItem('token');

  const barChartDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/leftDashboardChart?start=${startDate}&end=${endDate}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return barChartDetails;
};

export const getDashBoardTopCardsValues = async () => {
  const token = localStorage.getItem('token');

  const getDashBoardTopCards = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/dashboardTopCards`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return getDashBoardTopCards;
};

export const deleteCreditCard = async (cardId) => {
  const token = localStorage.getItem('token');

  const deleteCard = await axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_API_KEY}/cardDetails/${cardId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return deleteCard;
};

export const updateLeadsRowByDrag = async (userData) => {
  const token = localStorage.getItem('token');
  const updateLeadsRowIndex = await axios({
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${process.env.REACT_APP_API_KEY}/leads/re-order`,
    data: userData,
  });
  return updateLeadsRowIndex;
};

export const updateLeadsDetail = async (data) => {
  const token = localStorage.getItem('token');
  const updateLeadsDetails = await axios({
    method: 'PATCH',
    url: `${process.env.REACT_APP_API_KEY}/leads/${data?.leadId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data?.data,
  });
  return updateLeadsDetails;
};

export const getLeadsColumns = async () => {
  const token = localStorage.getItem('token');
  const getLeadsColumn = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/leads-Preference`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return getLeadsColumn;
};

export const changeColumnVisibility = async (userData) => {
  console.log("userData",userData)

  const token = localStorage.getItem('token');

  const changeColumnsVisibility = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_KEY}/leads/leads-Preference`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: userData.columns,
  });

  if (userData.key === 'AddColumn') {
    notifySuccess('Added Column');
  } else if(userData.key === 'DeleteColumn'){
    notifySuccess('Removed Column');
  }

  return changeColumnsVisibility;
};

export const getArchivedLead = async (value) => {
  const token = localStorage.getItem('token');
  const getArchivedLeads = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/isArchived/${value}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return getArchivedLeads;
};

export const addCreditAmount = async (userData) => {
  const token = localStorage.getItem('token');

  const addCredit = await axios.post(
    `${process.env.REACT_APP_API_KEY}/cardDetails/addCredits`,
    userData,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return addCredit;
};

export const downloadInvoicePdf = async (invoiceId) => {
  const token = localStorage.getItem('token');
  const generateInvoicePdf = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/generatepdf/${invoiceId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return generateInvoicePdf;
};

export const getTermsAndConditions = async () => {
  const token = localStorage.getItem('token');

  const getTermsandConditions = await axios.get(
    `${process.env.REACT_APP_API_KEY}/termsAndConditions`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return getTermsandConditions;
};

export const getFaqContent = async () => {
  const token = localStorage.getItem('token');

  const getFaq = await axios.get(
    `${process.env.REACT_APP_API_KEY}/adminSettings/FAQs`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return getFaq;
};

export const updateleadAlertFrequency = async (leadData) => {
  const token = localStorage.getItem('token');

  const updateLeadsDetails = await axios({
    method: 'PATCH',
    url: `${process.env.REACT_APP_API_KEY}/userLeadsDetails/${leadData.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: leadData.data,
  });
  return updateLeadsDetails;
};
