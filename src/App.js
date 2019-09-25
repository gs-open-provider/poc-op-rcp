import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './views/Landing';
import Appbar from './components/Appbar/Appbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={Appbar} />
          <Route path="/in" component={Landing} exact />
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
