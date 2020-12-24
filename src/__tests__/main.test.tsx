import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app';

it('app renders without crashing', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root') || document.createElement('div'), // For testing purposes
  );
});
