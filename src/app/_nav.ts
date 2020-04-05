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
    name: 'Primary Record(s)',
    url: '/record',
    icon: 'icon-layers',
    children: [
      {
        name: 'Agent(s)',
        url: "/record/table/agent",
        icon: 'icon-doc'
      },
      {
        name: 'Counterparties',
        url: '/record/table/counterparty',
        icon: 'icon-doc'
      },
      {
        name: 'Inventory Schedule',
        url: '/record/table/inventory_schedule',
        icon: 'icon-doc'
      },
      {
        name: 'Inventories',
        url: '/record/table/inventory',
        icon: 'icon-doc'

      },
      {
        name: 'Trucker(s)',
        url: '/record/table/trucker',
        icon: 'icon-doc'
      },
      {
        name: 'Payment Term(s)',
        url: '/record/table/payment_terms',
        icon: 'icon-doc'
      },
      {
        name: 'Bridge Financing',
        url: '/record/table/bridge_finance',
        icon: 'icon-doc'
      },
      {
        name: 'Letters of Credit',
        url: '/record/table/lc',
        icon: 'icon-doc'
      },
      {
        name: 'Link(s)',
        url: '/record/table/link',
        icon: 'icon-doc'
      },
      {
        name: 'Bill of Lading',
        url: '/record/table/bl',
        icon: 'icon-doc'
      },
      {
        name: 'Contract(s)',
        url: '/record/table/contract',
        icon: 'icon-doc'
      }
    ]
  },
  {
    name: 'Linked Record(s)',
    url: '/record/type/linked',
    icon: 'icon-layers',
    children: [
      {
        name: 'Trader(s)',
        url: '/record/link/trader',
        icon: 'icon-doc'
      },
      {
        name: 'Warehouse(s)',
        url: '/record/link/warehouse',
        icon: 'icon-doc'
      },
      {
        name: 'Product(s)',
        url: '/record/link/product',
        icon: 'icon-doc'
      },
      {
        name: 'Measurement(s)',
        url: '/record/link/unit_measurement',
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
