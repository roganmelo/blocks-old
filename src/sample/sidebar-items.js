const items = [
  {
    icon: 'fa fa-home',
    path: '/',
    label: 'Home'
  },
  {
    icon: 'fa fa-bell',
    path: '/alert',
    label: 'Alerts'
  },
  {
    icon: 'fa fa-address-card',
    path: '/card',
    label: 'Cards'
  },
  {
    icon: 'fa fa-circle',
    path: '/badge',
    label: 'Badges'
  },
  {
    id: 'datagrid',
    icon: 'fa fa-table',
    label: 'Datagrid',
    innerItems: [
      {
        path: '/datagrid',
        label: 'Base'
      },
      {
        path: '/datagrid/toolbar',
        label: 'With Toolbar'
      }
    ]
  },
  {
    icon: 'fa fa-times-circle',
    path: '/error',
    label: 'Error'
  },
  {
    icon: 'fa fa-align-justify',
    path: '/form',
    label: 'Form'
  },
  {
    icon: 'fa fa-th',
    path: '/grid',
    label: 'Grid'
  },
  {
    icon: 'fa fa-tag',
    path: '/label',
    label: 'Labels'
  },
  {
    icon: 'fa fa-spinner',
    path: `/loader/${true}`,
    label: 'Loader'
  },
  {
    icon: 'fa fa-bars',
    path: '/sidebar',
    label: 'Sidebar'
  },
  {
    icon: 'fa fa-cog',
    path: '/toolbar',
    label: 'Toolbar'
  },
  // {
  //   id: 'roles',
  //   icon: 'fa fa-sliders',
  //   label: 'Funções',
  //   innerItems: [
  //     {
  //       path: '/datagrid',
  //       label: 'Listagem'
  //     }
  //   ]
  // }
]

export default items;
