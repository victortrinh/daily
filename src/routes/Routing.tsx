import { Route, Routes } from 'react-router-dom';
import { Home, Daily, Celebration } from '@/pages';

export function Routing() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/:project" element={<Home />} />
      <Route path="/start" element={<Daily />} />
      <Route path="/celebration" element={<Celebration />} />
    </Routes>
  );
}
