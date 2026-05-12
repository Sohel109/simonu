import React from 'react';
import { Studio } from 'sanity';
import config from '../sanity/sanity.config';

const Admin: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Studio config={config} />
    </div>
  );
};

export default Admin;
