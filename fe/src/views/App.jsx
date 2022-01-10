import './App.css';
import PageWrapper from './components/PageWrapper/';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
        <PageWrapper />
      </Router>
    </div>
  );
};

export default App;
