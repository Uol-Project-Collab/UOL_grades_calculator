import React from 'react';
import Login from "./User → Authentication/Login.tsx";

export default function Index() {
  const root = document.getElementById('root');

  root.render (
      <React.StrictMode>
        <Login />
      </React.StrictMode>
  );
}
