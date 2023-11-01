import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import appRoutes from './appRoutes';

const router = createBrowserRouter(appRoutes);

const App = () => <RouterProvider router={router} />;

export default App;
