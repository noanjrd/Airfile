"use client";

import { useEffect, useRef } from 'react';


// cette page a ete faite avec chatgpt

// Importez la bibliothèque QR Code (assurez-vous que le fichier est accessible)
declare global {
  interface Window {
    QRCode: any;
  }
}

interface QRCodeComponentProps {
  text: string;
  width?: number;
  height?: number;
  colorDark?: string;
  colorLight?: string;
}

export default function QRCodeComponent({ 
  text, 
  width = 256, 
  height = 256, 
  colorDark = "#000000", 
  colorLight = "#ffffff" 
}: QRCodeComponentProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);

  useEffect(() => {
    // Charger le script QR Code s'il n'est pas déjà chargé
    const loadQRCode = () => {
      if (typeof window !== 'undefined' && !window.QRCode) {
        const script = document.createElement('script');
        script.src = '/qrcode.js'; // Copiez qrcode.js dans le dossier public
        script.onload = () => {
          createQRCode();
        };
        document.head.appendChild(script);
      } else {
        createQRCode();
      }
    };

    const createQRCode = () => {
      if (qrRef.current && window.QRCode) {
        // Nettoyer l'instance précédente
        if (qrCodeInstance.current) {
          qrCodeInstance.current.clear();
        }
        
        // Vider le conteneur
        qrRef.current.innerHTML = '';
        
        // Créer une nouvelle instance
        qrCodeInstance.current = new window.QRCode(qrRef.current, {
          text,
          width,
          height,
          colorDark,
          colorLight,
          correctLevel: window.QRCode.CorrectLevel.H
        });
      }
    };

    if (text) {
      loadQRCode();
    }

    return () => {
      if (qrCodeInstance.current) {
        qrCodeInstance.current.clear();
      }
    };
  }, [text, width, height, colorDark, colorLight]);

  return <div ref={qrRef} className="flex justify-center items-center"></div>;
}