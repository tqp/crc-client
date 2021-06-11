import { INavDataTqp } from './INavDataTqp';

export const navItemsWithRoles: INavDataTqp[] = [
  {
    name: 'About This App',
    url: '/account/about',
    icon: 'icon-info',
    allow: 'ROLE_ADMIN, ROLE_VIEW_ALL_STUDENTS'
  },

  {
    title: true,
    name: 'CRC Members',
    allow: 'ROLE_ADMIN, ROLE_VIEW_ALL_STUDENTS'
  },
  {
    name: 'My Students',
    url: '/students/student-list-by-case-manager',
    icon: 'fa fa-graduation-cap',
    allow: 'ROLE_EDIT_MY_STUDENTS'
  },
  {
    name: 'Students',
    url: '/students/student-list',
    icon: 'fa fa-graduation-cap',
    allow: 'ROLE_ADMIN, ROLE_VIEW_ALL_STUDENTS'
  },
  {
    name: 'All Students',
    url: '/students/student-list',
    icon: 'fa fa-graduation-cap',
    allow: 'ROLE_EDIT_MY_STUDENTS'
  },
  {
    name: 'Case Managers',
    url: '/case-managers/case-manager-list',
    icon: 'fa fa-folder-o',
    allow: 'ROLE_ADMIN, ROLE_VIEW_ALL_CASE_MANAGERS'
  },
  {
    name: 'Caregivers',
    url: '/caregivers/caregiver-list',
    icon: 'fa fa-heartbeat',
    allow: 'ROLE_ADMIN, ROLE_VIEW_ALL_CAREGIVERS'
  },
  {
    name: 'Sponsors',
    url: '/sponsors/sponsor-list',
    icon: 'fa fa-handshake-o',
    allow: 'ROLE_ADMIN, ROLE_VIEW_ALL_STUDENTS'
  },

  {
    title: true,
    name: 'Case Manager Actions',
    allow: 'ROLE_ADMIN, ROLE_CASE_MANAGER'
  },
  {
    name: 'Student Visits',
    url: '/visits/visit-list',
    icon: 'fa fa-calendar-check-o',
    allow: 'ROLE_ADMIN, ROLE_CASE_MANAGER'
  },
  {
    name: 'CSI Records',
    url: '/csi-records/csi-record-list',
    icon: 'fa fa-pencil-square-o',
    allow: 'ROLE_ADMIN, ROLE_CASE_MANAGER'
  },

  {
    title: true,
    name: 'Events',
    allow: 'ROLE_ADMIN, ROLE_VIEW_ALL_STUDENTS'
  },
  {
    name: 'Post-Grad Events',
    url: '/post-grad-events/post-grad-event-list',
    icon: 'fa fa-calendar-check-o',
    allow: 'ROLE_ADMIN, ROLE_VIEW_ALL_STUDENTS'
  },

  {
    title: true,
    name: 'CRC Microfinance',
    allow: 'ROLE_ADMIN, ROLE_VIEW_AND_EDIT_FINANCE'
  },
  {
    name: 'Loans',
    url: '/loans/loan-list',
    icon: 'fa fa-bank',
    allow: 'ROLE_ADMIN, ROLE_VIEW_AND_EDIT_FINANCE'
  },
  {
    name: 'Payments',
    url: '/payments/payment-list',
    icon: 'fa fa-money',
    allow: 'ROLE_ADMIN, ROLE_VIEW_AND_EDIT_FINANCE'
  },
  {
    name: 'Summary',
    url: '/crud-app',
    icon: 'fa fa-list-alt',
    allow: 'ROLE_ADMIN, ROLE_VIEW_AND_EDIT_FINANCE',
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
    allow: 'ROLE_ADMIN, ROLE_VIEW_AND_EDIT_FINANCE'
  },
  {
    name: 'Payments',
    url: '/test-components/placeholder',
    icon: 'fa fa-money',
    allow: 'ROLE_ADMIN, ROLE_VIEW_AND_EDIT_FINANCE'
  },
  {
    name: 'Summary',
    url: '/test-components/placeholder',
    icon: 'fa fa-list-alt',
    allow: 'ROLE_ADMIN, ROLE_VIEW_AND_EDIT_FINANCE'
  },

  {
    title: true,
    name: 'REPORTS',
    allow: 'ROLE_ADMIN, ROLE_VIEW_REPORTS'
  },
  {
    name: 'Summary Report',
    url: '/reports/summary-report',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_ADMIN, ROLE_VIEW_REPORTS'
  },
  {
    name: 'CSI Scores Report',
    url: '/reports/csi-scores-report',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_ADMIN, ROLE_VIEW_REPORTS'
  },
  {
    name: 'Coverage Reports',
    url: '/crud-app',
    icon: 'fa fa-file-text-o',
    allow: 'ROLE_ADMIN, ROLE_VIEW_REPORTS',
    children: [
      {
        name: 'No Case Manager',
        url: '/reports/case-manager-coverage',
        icon: 'fa fa-folder-o',
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
    allow: 'ROLE_ADMIN',
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
    allow: 'ROLE_ADMIN, ROLE_EDIT_MY_PROFILE'
  },
  {
    name: 'My Profile',
    url: '/account/my-profile',
    icon: 'fa fa-address-card',
    allow: 'ROLE_ADMIN, ROLE_EDIT_MY_PROFILE'
  },
  {
    name: 'UserModel List',
    url: '/users/user-list',
    icon: 'fa fa-users',
    allow: 'ROLE_ADMIN, ROLE_MANAGE_USERS'
  },
  {
    name: 'Logout',
    url: '/logout',
    icon: 'fa fa-sign-out',
    allow: 'ROLE_ADMIN, ROLE_EDIT_MY_PROFILE'
  }

];
