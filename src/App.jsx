import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SelectiveTestPage from './pages/SelectiveTestPage';
import SelectiveGamePage from './pages/SelectiveGamePage';
import SelectiveGameResultPage from './pages/SelectiveGameResultPage';
import EzberKartlariPage from './pages/EzberKartlariPage';
import SiraliTestPage from './pages/SiraliTestPage';
import SiraliGamePage from './pages/SiraliGamePage';
import MeydanGamePage from './pages/MeydanGamePage';
import MeydanPage from './pages/MeydanPage';
import MeydanResultPage from './pages/MeydanResultPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Gelecek sayfalar buraya eklenecek, şimdilik boş component */}
          <Route path="/ezber" element={<EzberKartlariPage />} />
          <Route path="/sirali" element={<SiraliTestPage />} />
          <Route path="/sirali-oyun" element={<SiraliGamePage />} />
          <Route path="/meydan-oyun" element={<MeydanGamePage/>} />
          <Route path="/meydan" element={<MeydanPage/>} />
          <Route path="/meydan-sonuc" element={<MeydanResultPage/>} />
          <Route path="/secimli" element={<SelectiveTestPage />} />
          <Route path="/oyun" element={<SelectiveGamePage />} />
          <Route path="/secimli-sonuc" element={<SelectiveGameResultPage />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;