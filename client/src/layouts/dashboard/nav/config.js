// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Listings',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Leads',
    path: '/leads',
    icon: icon('ic_van'),
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: icon('ic_note'),
  },

  // {
  //   title: 'Leads',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
];

export default navConfig;
