import axios from 'axios';

export const getAdminDetail = async () => {
  const admin_Id = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const adminDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/user/${admin_Id.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return adminDetails;
};

export const getLeadDetail = async () => {
  const token = localStorage.getItem('token');
  const LeadSettingsDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/adminSettings`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return LeadSettingsDetails;
};

export const updateAdminDetail = async (adminData) => {
  const admin_Id = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const updateAdminDetails = await axios({
    method: 'PATCH',
    url: `${process.env.REACT_APP_API_KEY}/user/${admin_Id.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: adminData,
  });
  return updateAdminDetails;
};

export const userLeadsSettingSave = async (userData) => {
  const token = localStorage.getItem('token');
  const updateLeadsettings = await axios({
    method: 'PATCH',
    url: `${process.env.REACT_APP_API_KEY}/adminSettings`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: userData,
  });
  return updateLeadsettings;
};

export const getUsers = async (
  queryPageIndex,
  queryPageSize,
  queryPageFilter,
  sortingFilter,
  archiveType
) => {

  const token = localStorage.getItem('token');
  let searchStr = '';
  if (queryPageFilter?.trim().length > 1) {
    searchStr = `&search=${queryPageFilter}`;
  }

  let sortingStr = '';
  if (sortingFilter === 'Newest to oldest') {
    sortingStr = `&sortingOrder=asc`;
  } else if (sortingFilter === 'Oldest to new') {
    sortingStr = `&sortingOrder=desc`;
  }

  const userListData = await axios.get(
    `${process.env.REACT_APP_API_KEY}/user?page=${
      queryPageIndex + 1
    }&perPage=${queryPageSize}&isArchived=${archiveType}${sortingStr}${searchStr}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return userListData;
};

export const getUser = async (userId) => {
  const token = localStorage.getItem('token');
  const userDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/user/${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return userDetails;
};

export const getLeads = async (
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
  const leadDetails = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/allLeads?page=${
      queryPageIndex + 1
    }&perPage=${queryPageSize}${searchStr}&${statusStr}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return leadDetails;
};

// export const getUserLeads = async (queryPageIndex, queryPageSize, queryPageFilter, archive) => {
//     const token = localStorage.getItem("token")
//     let archiveStr = ''
//     if (archive) {
//         archiveStr = `&archive=${archive}`
//     }

//     let searchStr = ''
//     if (queryPageFilter?.trim().length > 1) {
//         searchStr = `&search=${queryPageFilter}`
//     }
//     const userLeadsData = await axios.get(`${process.env.REACT_APP_API_KEY}/leads?page=${queryPageIndex + 1}&perPage=${queryPageSize}${searchStr}&${archiveStr}`, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return userLeadsData;
// };

export const getUserForAdmin = async () => {
  const token = localStorage.getItem('token');
  const userList = await axios.get(
    `${process.env.REACT_APP_API_KEY}/user/show`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return userList;
};

// http://localhost:3000/api/v1/user/show

export const getUserLeadsById = async (
  queryPageIndex,
  queryPageSize,
  queryPageFilter,
  user
) => {
  const token = localStorage.getItem('token');
  let searchStr = '';
  if (queryPageFilter?.trim().length > 1) {
    searchStr = `&search=${queryPageFilter}`;
  }
  const userLeadsById = await axios.get(
    `${process.env.REACT_APP_API_KEY}/leads/allLeads/${user}?page=${
      queryPageIndex + 1
    }&perPage=${queryPageSize}${searchStr}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return userLeadsById;
};
export const updateUser = async (data) => {
  const userId = data.id;
  const userData = data.data;
  const token = localStorage.getItem('token');

  const updateUserDetails = await axios({
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${process.env.REACT_APP_API_KEY}/user/${userId}`,
    data: userData,
  });
  return updateUserDetails;
};

export const updateIsActiveForUser = async (user) => {
  const token = localStorage.getItem('token');
  const isActiveState = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_KEY}/auth/activeUser/${user.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: user.data,
  });
  return isActiveState;
};

export const updateUserRowByDrag = async (userData) => {
  const token = localStorage.getItem('token');
  const updateUserRowIndex = await axios({
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${process.env.REACT_APP_API_KEY}/user/reorder`,
    data: userData,
  });
  return updateUserRowIndex;
};

export const updateTermsAndConditions = async (data) => {
  const token = localStorage.getItem('token');
  const updateTerms = await axios({
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${process.env.REACT_APP_API_KEY}/termsAndConditions`,
    data: data,
  });
  return updateTerms;
};

export const updateFaqContent = async (data) => {
  const token = localStorage.getItem('token');
  const updateFaq = await axios({
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${process.env.REACT_APP_API_KEY}/adminSettings/FAQs`,
    data: data,
  });
  return updateFaq;
};

export const generateFreeLink = async (freecredit) => {
  const token = localStorage.getItem('token');
  const freeLinks = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_KEY}/freeCredits`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: freecredit,
  });
  return freeLinks;
};

export const getFreeLinks = async (
  queryPageIndex,
  queryPageSize,
  queryPageFilter,
  user
) => {
  const token = localStorage.getItem('token');
  let searchStr = '';
  if (queryPageFilter?.trim().length > 1) {
    searchStr = `&search=${queryPageFilter}`;
  }
  const getLinks = await axios.get(
    `${process.env.REACT_APP_API_KEY}/freeCredits?page=${
      queryPageIndex + 1
    }&perPage=${queryPageSize}${searchStr}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return getLinks;
};

export const deleteFreeLink = async (linkId) => {
  const token = localStorage.getItem('token');

  const deleteLink = await axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_API_KEY}/freeCredits/${linkId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return deleteLink;
};


export const getUserPreference = async () => {
  const token = localStorage.getItem('token');
  const clientColumnPreference = await axios.get(
    `${process.env.REACT_APP_API_KEY}/adminSettings/clientColumnsPreference`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return clientColumnPreference;
};

export const changeAdminColumnVisibility = async (userData) => {
  console.log("userData",userData)

  const token = localStorage.getItem('token');

  const changeColumnsVisibility = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_KEY}/adminSettings/clientColumnsPreference`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: userData,
  });

  return changeColumnsVisibility;
};
