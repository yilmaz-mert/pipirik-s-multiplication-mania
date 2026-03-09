import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SelectiveTestPage from './pages/SelectiveTestPage';
import SelectiveGamePage from './pages/SelectiveGamePage';
import SelectiveGameResultPage from './pages/SelectiveGameResultPage';
import EzberKartlariPage from './pages/EzberKartlariPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Gelecek sayfalar buraya eklenecek, şimdilik boş component */}
          <Route path="/ezber" element={<EzberKartlariPage />} />
          <Route path="/sirali" element={<div className="text-white text-center mt-20">Sıralı Test Sayfası</div>} />
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