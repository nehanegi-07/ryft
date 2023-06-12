export const ROUTES = [
    {
      name: 'Login',
      path: '/user/login',
    },
    {
      name: 'adminLogin',
      path: '/admin/login',
    },
    {
      name: 'businessDetails',
      path: '/businessdetails',
    },
    {
      name: 'leadDetails',
      path: '/leaddetails',
    },
    {
      name: 'creditCard',
      path: '/signup/creditcard',
    },
    {
      name: 'signUp',
      path: '/signup',
    },
    {
      name: 'userLeads',
      path: '/user/leads',
      role:  ['user','invited'],
    },
    {
      name: 'adminUsersList',
      path: '/admin/userlist',
      role: 'admin',
    },
    {
      name: 'adminLeadList',
      path: '/admin/leads',
      role: 'admin',
    },
    {
      name: 'adminLinksList',
      path: '/admin/freelinks',
      role: 'admin',
    },
    {
      name: 'userTransactions',
      path: '/user/transactions',
      role: 'user',
    },
    {
      name: 'adminSettings',
      path: '/admin/settings',
      role: 'admin',
    },
    {
      name: "LeadsStatus",
      path: "/admin/leadsstatus",
      role: 'admin',
    },
    {
      name: "T&Cs Editor",
      path: "/admin/termsandcondition",
      role: 'admin',
    },
    {
      name: "faqs Editor",
      path: "/admin/faqs",
      role: 'admin',
    },
    {
      name: 'User Reset Password',
      path: '/user/resetpassword',
      role:  ['user','invited'],
    },
    {
      name: 'Admin Reset Password',
      path: '/admin/resetpassword',
      role: 'admin',
    },
    {
      name: 'User Profile',
      path: '/user/profile',
      role: ['user','invited'],
    },
    {
      name: 'User Business Profile',
      path: "/user/businessprofile",
      role: 'user',
    },
    {
      name: 'User Business Profile',
      path: "/user/notificationsetting",
      role: 'user',
    },

    {
      name: 'Faqs',
      path: '/user/faqs',
      role: ['user','invited'],
    },
    {
      name: 'Terms & Conditions',
      path: "/user/terms",
      role: ['user','invited'],
    },
    {
      name: 'Admin Profile',
      path: '/admin/profile',
      role: 'admin',
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      role:  ['user','invited'],
    },
    {
      name: 'Admin Dashboard',
      path: '/admin/dashboard',
      role: 'admin',
    },
    {
      name: 'User Details Edit',
      path: '/userupdate/:id',
      role: 'admin',
    },
    {
      name: 'Add Credit Card',
      path: '/user/billing',
      role: 'user',
    },

  ];
