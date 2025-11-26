import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoLockScreenProps {
  title?: string;
  description?: string;
}

export const DemoLockScreen = ({ 
  title = "Funcionalidade em Demonstração",
  description = "Esta seção não está disponível na versão de demonstração."
}: DemoLockScreenProps) => {
  const handleContact = () => {
    window.open("https://w.app/vittalis", "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <Card className="max-w-md w-full border-warning/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-16 w-16 text-warning" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base mt-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Pedimos desculpas pela inconveniência. Para acessar todas as funcionalidades 
            do sistema Vittalis, incluindo esta seção, entre em contato conosco para 
            agendar uma demonstração completa.
          </p>
          <Button 
            className="w-full" 
            onClick={handleContact}
          >
            <Mail className="h-4 w-4 mr-2" />
            Agendar Demonstração Completa
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
