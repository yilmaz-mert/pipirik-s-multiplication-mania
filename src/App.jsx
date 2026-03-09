import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SelectiveTestPage from './pages/SelectiveTestPage';
import SelectiveGamePage from './pages/SelectiveGamePage';
import SelectiveGameResultPage from './pages/SelectiveGameResultPage';
import EzberKartlariPage from './pages/EzberKartlariPage';
import SiraliTestPage from './pages/SiraliTestPage';
import SiraliGamePage from './pages/SiraliGamePage';

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
          <Route path="/meydan" element={<div className="text-white text-center mt-20">Meydan Okuma Sayfası</div>} />
          <Route path="/secimli" element={<SelectiveTestPage />} />
          <Route path="/oyun" element={<SelectiveGamePage />} />
          <Route path="/secimli-sonuc" element={<SelectiveGameResultPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;