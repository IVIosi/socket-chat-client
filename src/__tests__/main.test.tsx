import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import '@testing-library/jest-dom/extend-expect';

test('App renders without crashing', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root') || document.createElement('div'), // For testing purposes
  );
});
