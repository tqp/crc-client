import { INavDataTqp } from './INavDataTqp';

export const navItemsWithRoles: INavDataTqp[] = [
  {
    name: 'About This App',
    url: '/account/about',
    icon: 'icon-info',
    allow: 'ROLE_USER'
  },

  {
    title: true,
    name: 'CRC Members',
    allow: 'ROLE_USER'
  },
  {
    name: 'Students',
    url: '/students/student-list',
    icon: 'fa fa-graduation-cap',
    allow: 'ROLE_USER'
  },
  {
    name: 'Case Managers',
    url: '/case-managers/case-manager-list',
    icon: 'fa fa-folder-o',
    allow: 'ROLE_USER'
  },
  {
    name: 'Caregivers',
    url: '/caregivers/caregiver-list',
    icon: 'fa fa-heartbeat',
    allow: 'ROLE_USER'
  },
  {
    name: 'Sponsors',
    url: '/sponsors/sponsor-list',
    icon: 'fa fa-handshake-o',
    allow: 'ROLE_USER'
  },

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
    allow: 'ROLE_USER'
  },
  {
    name: 'Post-Grad Events',
    url: '/post-grad-events/post-grad-event-list',
    icon: 'fa fa-calendar-check-o',
    allow: 'ROLE_USER'
  },

  {
    title: true,
    name: 'CRC Microfinance',
    allow: 'ROLE_USER'
  },
  {
    name: 'Loans',
    url: '/loans/loan-list',
    icon: 'fa fa-bank',
    allow: 'ROLE_USER'
  },
  {
    name: 'Payments',
    url: '/payments/payment-list',
    icon: 'fa fa-money',
    allow: 'ROLE_USER'
  },
  {
    name: 'Summary',
    url: '/crud-app',
    icon: 'fa fa-list-alt',
    allow: 'ROLE_USER',
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
    allow: 'ROLE_USER'
  },
  {
    name: 'Payments',
    url: '/test-components/placeholder',
    icon: 'fa fa-money',
    allow: 'ROLE_USER'
  },
  {
    name: 'Summary',
    url: '/test-components/placeholder',
    icon: 'fa fa-list-alt',
    allow: 'ROLE_USER'
  },

  {
    title: true,
    name: 'Manager Functions',
    allow: 'ROLE_MANAGER,ROLE_DEVELOPER'
  },
  {
    name: 'Summary Report',
    url: '/reports/summary-report',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_MANAGER'
  },
  {
    name: 'CSI Scores Report',
    url: '/reports/csi-scores-report',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_MANAGER'
  },
  {
    name: 'Reference Tables',
    url: '/crud-app',
    icon: 'fa fa-table',
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
    allow: 'ROLE_USER'
  },
  {
    name: 'My Profile',
    url: '/account/my-profile',
    icon: 'fa fa-address-card',
    allow: 'ROLE_USER'
  },
  {
    name: 'User List',
    url: '/users/user-list',
    icon: 'fa fa-users',
    allow: 'ROLE_MANAGER'
  },
  {
    name: 'Logout',
    url: '/account/logout',
    icon: 'fa fa-sign-out',
    allow: 'ROLE_USER'
  }

];
