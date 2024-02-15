import { Route, Routes } from 'react-router-dom';
import Quotes from './components/Quotes';
import Home from './components/Home';

const RouteList = () => (
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/quotes" element={<Quotes />} />
  </Routes>
);

export default RouteList;
