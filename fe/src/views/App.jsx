import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import PageWrapper from './components/PageWrapper/PageWrapper';

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
