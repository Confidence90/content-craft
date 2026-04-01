import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

const ImageUpload = ({ value, onChange, folder = "general", label = "Image" }: ImageUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Seules les images sont autorisées", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "L'image ne doit pas dépasser 5 Mo", variant: "destructive" });
      return;
    }

    setUploading(true);

    // Mock: create a local object URL for preview
    // When backend is connected, replace with: api.post("/upload", formData)
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onChange(objectUrl);
    setUploading(false);
    toast({ title: "Image chargée (mode local)" });
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border border-border bg-muted">
          <img src={preview} alt="Aperçu" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
              <Upload className="h-4 w-4" /> Remplacer
            </Button>
            <Button size="sm" variant="destructive" onClick={handleRemove}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <ImageIcon className="h-6 w-6" />
              <span className="text-sm">Cliquez pour uploader</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      <Input
        placeholder="Ou collez une URL d'image..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setPreview(e.target.value);
        }}
        className="text-xs"
      />
    </div>
  );
};

export default ImageUpload;
