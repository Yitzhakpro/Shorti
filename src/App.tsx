import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import {
  Layout,
  ProtectedLayout,
  Homepage,
  Login,
  Register,
  AllLinks,
  CreateLink,
  NotFound,
} from './components';
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
            <Route path="/" element={<Homepage />} />
            <Route path="/u/login" element={<Login />} />
            <Route path="/u/register" element={<Register />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/u/allLinks" element={<AllLinks />} />
              <Route path="/u/createLinks" element={<CreateLink />} />
            </Route>
            <Route path="/u/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
