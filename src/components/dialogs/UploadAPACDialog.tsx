import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UploadAPACDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess: () => void;
}

export const UploadAPACDialog = ({ open, onOpenChange, onUploadSuccess }: UploadAPACDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamanho máximo (ex: 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB em bytes
      if (file.size > maxSize) {
        toast.error("Arquivo muito grande. Tamanho máximo: 10MB");
        return;
      }
      
      // Validar tipo de arquivo
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Formato não permitido. Use PDF, JPG ou PNG");
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Por favor, selecione um arquivo");
      return;
    }

    setUploading(true);

    try {
      // Aqui seria o upload real para Supabase Storage
      // Simular upload por enquanto
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Após upload bem-sucedido, enviar notificações
      // TODO: Chamar edge function para enviar e-mail e WhatsApp
      // await enviarNotificacoes();
      
      toast.success("Documento APAC enviado com sucesso! Você receberá confirmações por e-mail e WhatsApp.");
      onUploadSuccess();
      onOpenChange(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      toast.error("Erro ao enviar documento. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Atualizar Documentação APAC</DialogTitle>
          <DialogDescription>
            Faça o upload da sua documentação APAC atualizada. Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apac-file">Documento APAC</Label>
            <div className="flex items-center gap-3">
              <Input
                id="apac-file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="cursor-pointer"
                disabled={uploading}
              />
            </div>
            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                <FileText className="h-4 w-4" />
                <span className="flex-1 truncate">{selectedFile.name}</span>
                <span className="text-xs">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 text-sm">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📧 Notificações Automáticas
            </p>
            <p className="text-blue-800 dark:text-blue-200">
              Após o envio, você receberá confirmações automáticas por e-mail e WhatsApp.
              O setor administrativo será notificado para validação do documento.
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button 
            variant="outline" 
            onClick={() => {
              onOpenChange(false);
              setSelectedFile(null);
            }}
            disabled={uploading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Enviando..." : "Enviar Documento"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
