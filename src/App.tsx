import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { Layout, ProtectedLayout, Login, Register, AllLinks, CreateLink } from './components';
import { AuthProvider } from './providers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<h1>homepage</h1>} />
            <Route path="/u/login" element={<Login />} />
            <Route path="/u/register" element={<Register />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/u/allLinks" element={<AllLinks />} />
              <Route path="/u/createLinks" element={<CreateLink />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
