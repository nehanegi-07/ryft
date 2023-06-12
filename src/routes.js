import home from 'assets/images/basic-icons/home.png';
import leads from 'assets/images/basic-icons/leads.png';
import details from 'assets/images/basic-icons/details.png';
import Icon from '@mui/material/Icon';
import QuizIcon from '@mui/icons-material/Quiz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BusinessIcon from '@mui/icons-material/Business';
import GavelIcon from '@mui/icons-material/Gavel';
import ApprovalIcon from '@mui/icons-material/Approval';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export const userRoutes = [
  {
    type: 'collapse',
    name: 'Home',
    key: 'changelog',
    href: '/',
    icon: <img src={home} alt={'home'} loading="lazy" />,
  },
  {
    type: 'collapse',
    name: 'Leads',
    key: 'changelog',
    href: '/user/leads',
    icon: <ThumbUpIcon />,
  },
  {
    type: 'collapse',
    name: 'Billing',
    key: 'changelog',
    href: '/user/billing',
    icon: <img src={details} alt={'details'} loading="lazy" />,
  },
  {
    type: 'collapse',
    name: 'Profile',
    key: 'changelog',
    href: '/user/profile',
    icon: <Icon>account_circle</Icon>,
  },
  {
    type: 'collapse',
    name: 'Business Profile',
    key: 'changelog',
    href: '/user/businessprofile',
    icon: <BusinessIcon />,
  },
  {
    type: 'collapse',
    name: 'Notification Settings',
    key: 'changelog',
    href: '/user/notificationsetting',
    icon: <NotificationsActiveIcon />,
  },

  {
    type: 'collapse',
    name: 'FAQs',
    key: 'changelog',
    href: '/user/faqs',
    icon: <QuizIcon />,
  },
  {
    type: 'collapse',
    name: 'T&Cs',
    key: 'T&Cs',
    href: '/user/terms',
    icon: <GavelIcon />,
  },
];

export const invitedUser = [
  {
    type: 'collapse',
    name: 'Home',
    key: 'changelog',
    href: '/dashboard',
    icon: <img src={home} alt={'home'} loading="lazy" />,
  },
  {
    type: 'collapse',
    name: 'Leads',
    key: 'changelog',
    href: '/user/leads',
    icon: <ThumbUpIcon />,
  },
  {
    type: 'collapse',
    name: 'Profile',
    key: 'changelog',
    href: '/user/profile',
    icon: <Icon>account_circle</Icon>,
  },
  {
    type: 'collapse',
    name: 'FAQs',
    key: 'changelog',
    href: '/user/faqs',
    icon: <QuizIcon />,
  },
  {
    type: 'collapse',
    name: 'T&Cs',
    key: 'T&Cs',
    href: '/user/terms',
    icon: <GavelIcon />,
  },
];

export const adminRoutes = [
  {
    type: 'collapse',
    name: 'Home',
    key: 'changelog',
    href: '/',
    icon: <img src={home} alt={'home'} loading="lazy" />,
  },
  {
    type: 'collapse',
    name: 'Customers',
    key: 'userlist',
    href: '/admin/userlist',
    icon: <img src={details} alt={'userlist'} loading="lazy" />,
  },
  {
    type: 'collapse',
    name: 'Leads',
    key: 'changelog',
    href: '/admin/leads',
    icon: <ThumbUpIcon />,
  },
  {
    type: 'collapse',
    name: 'Reported Leads',
    key: 'changelog',
    href: '/admin/leadsstatus',
    icon: <ApprovalIcon />,
  },
  {
    type: 'collapse',
    name: 'Lead Settings',
    route: '/admin/settings',
    href: '/admin/settings',
    icon: <Icon>settings</Icon>,
  },
  {
    type: 'collapse',
    name: 'Profile',
    key: 'changelog',
    href: '/admin/profile',
    icon: <Icon>account_circle</Icon>,
  },
  {
    type: 'collapse',
    name: 'Promo Links',
    key: 'changelog',
    href: '/admin/freelinks',
    icon: <Icon>link</Icon>,
  },
  //  {
  //   type: "collapse",
  //   name: "FAQs Editor",
  //   key: "changelog",
  //   href: "/admin/faqs",
  //   icon: (
  //    <QuizIcon/>
  //   ),
  // },
  // {
  //   type: "collapse",
  //   name: "T&Cs Editor",
  //    route:"/admin/termsandcondition",
  //   href: "/admin/termsandcondition",
  //   icon: (
  //    <GavelIcon/>
  //   ),
  // },
];
