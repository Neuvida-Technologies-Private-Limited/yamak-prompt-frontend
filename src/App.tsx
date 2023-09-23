import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { routes } from 'routes/routes';
import { DashboardLayout, Login } from 'pages';
import ProtectedRoutes from 'routes/protectedRoute';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Router>
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<ProtectedRoutes />}>
              <Route element={<DashboardLayout />} path="/home">
                {routes.map((route, index) => (
                  <Route
                    key={`route-item-${index}`}
                    Component={route.element}
                    path={route.path}
                  />
                ))}
              </Route>
            </Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
