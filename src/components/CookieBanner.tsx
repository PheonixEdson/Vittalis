import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom">
      <Card className="max-w-4xl mx-auto p-6 border-primary/20 shadow-lg bg-card/95 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Cookies e Privacidade</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Utilizamos cookies essenciais para o funcionamento do sistema (autenticação e segurança) e cookies de desempenho 
              para melhorar sua experiência. Seus dados de saúde são protegidos conforme a LGPD. 
              <button 
                onClick={() => navigate('/politica-privacidade')}
                className="text-primary hover:underline ml-1"
              >
                Saiba mais
              </button>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAccept} size="sm">
                Aceitar
              </Button>
              <Button onClick={handleReject} variant="outline" size="sm">
                Apenas Essenciais
              </Button>
              <Button 
                onClick={() => navigate('/politica-privacidade')}
                variant="ghost" 
                size="sm"
              >
                Política de Privacidade
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReject}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
