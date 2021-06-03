import { INavDataTqp } from './INavDataTqp';

export const navItemsWithRoles: INavDataTqp[] = [
  {
    name: 'About This App',
    url: '/account/about',
    icon: 'icon-info',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },

  {
    title: true,
    name: 'CRC Members',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },
  {
    name: 'My Students',
    url: '/students/student-list-by-case-manager',
    icon: 'fa fa-graduation-cap',
    allow: 'ROLE_CASE_MANAGER'
  },
  {
    name: 'Students',
    url: '/students/student-list',
    icon: 'fa fa-graduation-cap',
    allow: 'ROLE_USER'
  },
  {
    name: 'All Students',
    url: '/students/student-list',
    icon: 'fa fa-graduation-cap',
    allow: 'ROLE_CASE_MANAGER'
  },
  {
    name: 'Case Managers',
    url: '/case-managers/case-manager-list',
    icon: 'fa fa-folder-o',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },
  // {
  //   name: 'Case Managers SSP',
  //   url: '/case-managers/case-manager-list-ssp',
  //   icon: 'fa fa-folder-o',
  //   allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  // },
  {
    name: 'Caregivers',
    url: '/caregivers/caregiver-list',
    icon: 'fa fa-heartbeat',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },
  // {
  //   name: 'Caregivers SSP',
  //   url: '/caregivers/caregiver-list-ssp',
  //   icon: 'fa fa-heartbeat',
  //   allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  // },
  {
    name: 'Sponsors',
    url: '/sponsors/sponsor-list',
    icon: 'fa fa-handshake-o',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },
  // {
  //   name: 'Sponsors SSP',
  //   url: '/sponsors/sponsor-list-ssp',
  //   icon: 'fa fa-handshake-o',
  //   allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  // },

  {
    title: true,
    name: 'Case Manager Actions',
    allow: 'ROLE_CASE_MANAGER'
  },
  {
    name: 'Student Visits',
    url: '/visits/visit-list',
    icon: 'fa fa-calendar-check-o',
    allow: 'ROLE_CASE_MANAGER'
  },
  {
    name: 'CSI Records',
    url: '/csi/csi-list',
    icon: 'fa fa-pencil-square-o',
    allow: 'ROLE_CASE_MANAGER'
  },

  {
    title: true,
    name: 'Events',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },
  {
    name: 'Post-Grad Events',
    url: '/post-grad-events/post-grad-event-list',
    icon: 'fa fa-calendar-check-o',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },

  {
    title: true,
    name: 'CRC Microfinance',
    allow: 'ROLE_FINANCE'
  },
  {
    name: 'Loans',
    url: '/loans/loan-list',
    icon: 'fa fa-bank',
    allow: 'ROLE_FINANCE'
  },
  {
    name: 'Payments',
    url: '/payments/payment-list',
    icon: 'fa fa-money',
    allow: 'ROLE_FINANCE'
  },
  {
    name: 'Summary',
    url: '/crud-app',
    icon: 'fa fa-list-alt',
    allow: 'ROLE_FINANCE',
    children: [
      {
        name: 'By Participant',
        url: '/finance/summary-by-participant',
        icon: 'fa fa-male',
      },
      {
        name: 'By Payment Period',
        url: '/finance/summary-by-payment-period',
        icon: 'fa fa-calendar'
      }
    ]
  },

  {
    title: true,
    name: 'CRC Family Support',
    allow: 'ROLE_FINANCE'
  },
  {
    name: 'Payments',
    url: '/test-components/placeholder',
    icon: 'fa fa-money',
    allow: 'ROLE_FINANCE'
  },
  {
    name: 'Summary',
    url: '/test-components/placeholder',
    icon: 'fa fa-list-alt',
    allow: 'ROLE_FINANCE'
  },

  {
    title: true,
    name: 'REPORTS',
    allow: 'ROLE_REPORTS'
  },
  {
    name: 'Summary Report',
    url: '/reports/summary-report',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_REPORTS'
  },
  {
    name: 'CSI Scores Report',
    url: '/reports/csi-scores-report',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_REPORTS'
  },
  {
    name: 'Coverage Reports',
    url: '/crud-app',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_DEVELOPER',
    children: [
      {
        name: 'No Case Manager',
        url: '/reports/case-manager-coverage',
        icon: 'fa fa-folder-o'
      },
      {
        name: 'No Caregiver',
        url: '/reports/caregiver-coverage',
        icon: 'fa fa-heartbeat'
      }
    ]
  },
  {
    name: 'Reference Tables',
    url: '/crud-app',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_DEVELOPER',
    children: [
      {
        name: 'Person Type',
        url: '/person-type/person-type-list',
        icon: 'fa fa-male'
      },
      {
        name: 'Relationship Type',
        url: '/relationship-type/relationship-type-list',
        icon: 'fa fa-sitemap'
      },
      {
        name: 'Tier Type',
        url: '/tier-type/tier-type-list',
        icon: 'fa fa-cubes'
      }
    ]
  },

  {
    title: true,
    name: 'Account',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },
  {
    name: 'My Profile',
    url: '/account/my-profile',
    icon: 'fa fa-address-card',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  },
  {
    name: 'User List',
    url: '/users/user-list',
    icon: 'fa fa-users',
    allow: 'ROLE_MANAGER'
  },
  {
    name: 'Logout',
    url: '/logout',
    icon: 'fa fa-sign-out',
    allow: 'ROLE_USER, ROLE_CASE_MANAGER'
  }

];
