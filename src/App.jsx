import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Gelecek sayfalar buraya eklenecek, şimdilik boş component */}
          <Route path="/ezber" element={<div className="text-white text-center mt-20">Ezber Kartları Sayfası</div>} />
          <Route path="/sirali" element={<div className="text-white text-center mt-20">Sıralı Test Sayfası</div>} />
          <Route path="/meydan" element={<div className="text-white text-center mt-20">Meydan Okuma Sayfası</div>} />
          <Route path="/secimli" element={<div className="text-white text-center mt-20">Seçimli Test Sayfası</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;