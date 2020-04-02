import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Option(s)'
  },
  {
    name: 'Main Tables',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Warehouse',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Navbars',
        url: '/base/navbars',
        icon: 'icon-puzzle'

      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Associate Tables',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Trader(s)',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Warehouse(s)',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Product(s)',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Measurement(s)',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Generate Report',
    url: '/charts',
    icon: 'icon-puzzle',
  },
  {
    name: 'User(s)',
    url: '/users',
    icon: 'icon-ban'
    /*,
    attributes: { disabled: true },*/
  },
];
