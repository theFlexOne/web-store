import { Outlet } from 'react-router-dom';
import RootHeader from '../components/RootHeader';
import RootFooter from '../components/RootFooter';

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <RootHeader toggleCart={() => {}} />
      <main className="grow basis-0">
        <Outlet />
      </main>
      <RootFooter />
    </div>
  );
}

export default RootLayout;
