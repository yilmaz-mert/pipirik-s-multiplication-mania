import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WaveHeader from '../components/WaveHeader';

export default function SelectiveGameResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Eğer state ile gelinmediyse 0 kabul edelim
  const { correct = 0, wrong = 0 } = location.state || {};

  return (
    <div className="relative w-full h-full min-h-screen overflow-visible flex flex-col items-center select-none">
      {/* Background SVG katmanı */}
      <div className="absolute pointer-events-none z-10" style={{ top: '309px', left: '-24px' }}>
        <svg width="441" height="456" viewBox="0 0 375 456" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M415 146.881L375 352.881C361.5 386.381 310.4 453.881 214 455.881C93.5 458.381 156 391.881 59.5 330.381C-37 268.881 -33 196.381 -11.5 123.381C3.21467 73.4197 80.2274 18.0717 107.496 5.74437C130.192 -6.18937 164.445 -0.947524 220 34.9732C283.55 76.0639 321.323 102.142 345.5 118.668C361 128.072 395.1 137.081 407.5 97.8811C419.9 58.6811 417.667 114.214 415 146.881Z" fill="var(--color-tema-vector)"/>
        </svg>
      </div>

      <WaveHeader 
        title={
          <>
            SEÇİMLİ<br/>TEST
          </>
        } 
        waveHeight="222px" 
        titleTop="70px"
      />

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col items-center mt-70 mb-10">
        
        {/* Ana Turuncu Kutu */}
        <div 
          className="relative flex flex-col items-center bg-tema-kutu"
          style={{
            width: '297px',
            height: '322px',
            borderRadius: '9px',
            boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)'
          }}
        >
          {/* Sonuçlar Başlığı */}
          <h2 
            className="text-tema-yazi text-center mt-2.5"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: '32px',
              lineHeight: '100%'
            }}
          >
            SONUÇLAR
          </h2>

          {/* İç Kutu (Açık Krem/Sarımsı) */}
          <div 
            className="absolute bg-tema-enak overflow-hidden"
            style={{
              width: '263px',
              height: '250px',
              top: '54px', // (322 - 250)/2 civarı ama tasarıma uydurdum
              borderRadius: '20px'
            }}
          >
            {/* Çapraz Çizgi SVG */}
            <div className="absolute inset-0 pointer-events-none" style={{ top: '0', left: '-3px' }}> 
              <svg width="269" height="253" viewBox="0 0 269 253" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM92.5 103.5L91.0143 103.707V103.707L92.5 103.5ZM189 165.5L187.671 166.195L189 165.5ZM252.5 244.5C252.5 248.918 256.082 252.5 260.5 252.5C264.918 252.5 268.5 248.918 268.5 244.5C268.5 240.082 264.918 236.5 260.5 236.5C256.082 236.5 252.5 240.082 252.5 244.5ZM8 8L7.97857 9.49985C30.6118 9.82318 80.7217 29.6792 91.0143 103.707L92.5 103.5L93.9857 103.293C83.4783 27.7208 32.0549 6.84349 8.02143 6.50015L8 8ZM92.5 103.5L91.0143 103.707C94.2683 127.11 99.8237 139.132 107.331 144.567C114.917 150.058 124.011 148.473 133.043 146.27C142.304 144.01 151.684 141.059 160.95 142.597C170.008 144.101 179.197 149.984 187.671 166.195L189 165.5L190.329 164.805C181.553 148.016 171.68 141.337 161.441 139.637C151.409 137.972 141.258 141.177 132.332 143.355C123.176 145.589 115.427 146.724 109.091 142.137C102.676 137.493 97.2317 126.64 93.9857 103.293L92.5 103.5ZM189 165.5L187.671 166.195C215.381 219.206 247.197 241.416 260.003 245.915L260.5 244.5L260.997 243.085C249.137 238.918 217.819 217.394 190.329 164.805L189 165.5Z" fill="#130D3D"/>
              </svg>
            </div>

            {/* Yanlış (Sol Alt Alan) */}
            <div className="absolute pointer-events-none" style={{ top: '100px', left: '-58px', width: '200px' }}>
              <div 
                style={{
                  transform: 'rotate(90deg)',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '64px',
                  color: 'rgba(19, 13, 61, 0.1)', // #130D3D1A
                  lineHeight: '100%',
                  textAlign: 'center'
                }}
              >
                yanlış
              </div>
            </div>
            
            <div 
              className="absolute pointer-events-none text-tema-yazi" 
              style={{ top: '145px', left: '75px', width: '67px' }}
            >
              <div 
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 900,
                  fontSize: '90px',
                  lineHeight: '100%',
                  textAlign: 'center'
                }}
              >
                {wrong}
              </div>
            </div>

            {/* Doğru (Sağ Üst Alan) */}
            <div className="absolute pointer-events-none" style={{ top: '75px', right: '-60px', width: '200px' }}>
              <div 
                style={{
                  transform: 'rotate(-90deg)',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '64px',
                  color: 'rgba(19, 13, 61, 0.1)', // #130D3D1A
                  lineHeight: '100%',
                  textAlign: 'center'
                }}
              >
                doğru
              </div>
            </div>

            <div 
              className="absolute pointer-events-none text-tema-yazi" 
              style={{ top: '10px', left: '90px', width: '106px' }}
            >
              <div 
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 900,
                  fontSize: '90px',
                  lineHeight: '100%',
                  textAlign: 'center'
                }}
              >
                {correct}
              </div>
            </div>

          </div>
        </div>

        {/* Ana Menü Butonu */}
        <button
          onClick={() => navigate('/')}
          className="bg-tema-buton2 text-white flex justify-center items-center active:scale-95 transition-transform"
          style={{
            width: '150px',
            height: '44px',
            marginTop: '32px',
            borderRadius: '10px',
            boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: '18px',
            color: 'var(--color-tema-enak)'
          }}
        >
          ANA MENÜ
        </button>

      </div>
    </div>
  );
}
