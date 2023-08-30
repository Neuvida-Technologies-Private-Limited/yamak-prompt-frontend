import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from 'routes';
import { DashboardLayout } from 'pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<DashboardLayout />} path="/home">
            {routes.map(route => (
              <Route Component={route.element} path={route.path} />
            ))}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
