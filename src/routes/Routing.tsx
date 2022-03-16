import { Route, Routes } from 'react-router-dom';
import { Home, Daily, Celebration } from '@/pages';

export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Daily />} />
      <Route path="/celebration" element={<Celebration />} />
    </Routes>
  );
}
