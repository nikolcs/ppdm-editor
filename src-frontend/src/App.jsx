import React from 'react';

import Header from './components/header';
import CPGrid from './components/cp-grid';

class App extends React.Component {

    render() {
        return (
            <div className="cs-app-wrapper">
                <Header />
                <CPGrid />
            </div>
        );
    }
}

export default App;
