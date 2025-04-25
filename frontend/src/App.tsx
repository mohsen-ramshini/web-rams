
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './features/dashboard/Dashboard';
import CreateDisplay from './features/createDisplay/CreateDisplay';
import Display from './features/display/Display';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-display" element={<CreateDisplay />} />
        <Route path="/display-overview" element={<Display />} />
      </Routes>
    </Router>
  );
}

export default App;
