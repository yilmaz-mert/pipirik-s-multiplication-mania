import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SelectiveTestPage from './pages/SelectiveTestPage';
import SelectiveGamePage from './pages/SelectiveGamePage';
import SelectiveGameResultPage from './pages/SelectiveGameResultPage';
import EzberKartlariPage from './pages/EzberKartlariPage';
import SiraliTestPage from './pages/SiraliTestPage';
import SiraliGamePage from './pages/SiraliGamePage';
import SiraliGameResultPage from './pages/SiraliGameResultPage';
import MeydanPage from './pages/MeydanPage';
import MeydanGamePage from './pages/MeydanGamePage';
import MeydanResultPage from './pages/MeydanResultPage';
import MeydanRekorPage from './pages/MeydanRekorPage';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
<Route path="/ezber" element={<EzberKartlariPage />} />
          <Route path="/sirali" element={<SiraliTestPage />} />
          <Route path="/sirali-oyun" element={<SiraliGamePage />} />
          <Route path="/sirali-sonuc" element={<SiraliGameResultPage />} />
          <Route path="/meydan" element={<MeydanPage/>} />
          <Route path="/meydan-oyun" element={<MeydanGamePage/>} />
          <Route path="/meydan-sonuc" element={<MeydanResultPage/>} />
          <Route path="/meydan-record" element={<MeydanRekorPage/>} />
          <Route path="/secimli" element={<SelectiveTestPage />} />
          <Route path="/secimli-oyun" element={<SelectiveGamePage />} />
          <Route path="/secimli-sonuc" element={<SelectiveGameResultPage />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;