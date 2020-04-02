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
    url: '/record',
    icon: 'icon-layers',
    children: [
      /*{
        name: 'Contract Details',
        url: '/record',
        icon: 'icon-doc'
      },*/
      {
        name: 'Agent(s)',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Counterparties',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Inventory Schedule',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Inventories',
        url: '/record',
        icon: 'icon-doc'

      },
      {
        name: 'Trucker(s)',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Payment Term(s)',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Bridge Financing',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Letters of Credit',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Link(s)',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'BL?',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Contract(s)',
        url: '/record',
        icon: 'icon-doc'
      }
    ]
  },
  {
    name: 'Associate Tables',
    url: '/record',
    icon: 'icon-layers',
    children: [
      {
        name: 'Trader(s)',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Warehouse(s)',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Product(s)',
        url: '/record',
        icon: 'icon-doc'
      },
      {
        name: 'Measurement(s)',
        url: '/record',
        icon: 'icon-doc'
      }
    ]
  },
  {
    name: 'Generate Report',
    url: '/report',
    icon: 'icon-chart',
  },
  {
    name: 'User(s)',
    url: '/users',
    icon: 'icon-people'
    /*,
    attributes: { disabled: true },*/
  },
];
