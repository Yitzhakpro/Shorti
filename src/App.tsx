import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { AuthProvider } from './providers';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<h1>homepage</h1>} />
            <Route path="/u/login" element={<h1>login</h1>} />
            <Route path="/u/register" element={<h1>register</h1>} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
