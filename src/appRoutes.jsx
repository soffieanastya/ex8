import ContactDetail from './pages/ContactPage/ContactDetail';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';

const appRoutes = [
  { path: '/', element: <HomePage /> },
  {
    path: 'contacts',
    element: <ContactPage />,
    children: [
      {
        path: ':id',
        element: <ContactDetail />
      }
    ]
  }
];

export default appRoutes;
