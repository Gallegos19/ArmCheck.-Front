// assets
import { IconBrandChrome, IconHelp, IconCirclePlus, IconRouter, IconBrandMyOppo } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconCirclePlus, IconRouter, IconBrandMyOppo};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'other',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Add-patient',
      type: 'item',
      url: '/other/add-patient',
      icon: icons.IconCirclePlus,
      breadcrumbs: false
    },
   
      // {
      //     id: 'historial',
      //     title: 'historial',
      //     type: 'item',
      //     url: '/other/historial',
      //     target: true
      // },

  
    // {
    //   id: 'Sp32',
    //   title: 'Dispositivo',
    //   type: 'item',
    //   url: '/other/conectar-dispositivo',
    //   icon: icons.IconRouter,
    //   breadcrumbs: false
    // },
    {
        id: 'suscription',
        title: 'Membresia',
        type: 'item',
        url: '/other/suscription',
        icon: icons.IconBrandMyOppo,
        breadcrumbs: false
      }
  ]
};

export default other;
