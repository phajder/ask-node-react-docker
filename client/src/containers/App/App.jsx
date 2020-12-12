import React from 'react';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Layout } from '../../components';

const options = {
  position: positions.TOP_LEFT,
  timeout: 5000,
  offset: '10px',
  transition: transitions.SCALE
}

export default function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Layout />
    </AlertProvider>
  );
};
