import { INavData } from '@coreui/angular';

export const navItemsUser: INavData[] = [
  {
    name: 'About This App',
    url: '/account/about',
    icon: 'icon-info'
  },

  {
    title: true,
    name: 'CRC Members'
  },
  {
    name: 'Students',
    url: '/students/student-list',
    icon: 'fa fa-group'
  },
  {
    name: 'Case Managers',
    url: '/case-managers/case-manager-list',
    icon: 'fa fa-folder'
  },
  {
    name: 'Caregivers',
    url: '/caregivers/caregiver-list',
    icon: 'fa fa-heartbeat'
  },

  {
    title: true,
    name: 'Reports'
  },
  {
    name: 'Student Home Map',
    url: '/reports/student-home-map',
    icon: 'fa fa-home'
  },
  {
    name: 'Student School Map',
    url: '/reports/student-school-map',
    icon: 'fa fa-graduation-cap'
  },
  {
    name: 'CRC Metrics',
    url: '/reports/crc-metrics',
    icon: 'fa fa-area-chart'
  },
  {
    name: 'Export',
    url: '/reports/export',
    icon: 'fa fa-download'
  },

  {
    title: true,
    name: 'Manager Functions'
  },
  {
    name: 'Reference Tables',
    url: '/crud-app',
    icon: 'fa fa-table',
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
    name: 'Account'
  },
  {
    name: 'My Profile',
    url: '/account/my-profile',
    icon: 'fa fa-address-card'
  },
  {
    name: 'Logout',
    url: '/account/logout',
    icon: 'fa fa-sign-out'
  }

];
