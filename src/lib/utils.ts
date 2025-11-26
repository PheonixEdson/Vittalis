import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateSigtapCode(code: string): boolean {
  if (!code || code.trim() === '') return true; // Campo vazio é válido (pode ser opcional)
  
  // Formato: XX.XX.XX.XXX-X (onde X são dígitos)
  const sigtapRegex = /^\d{2}\.\d{2}\.\d{2}\.\d{3}-\d$/;
  return sigtapRegex.test(code.trim());
}

export function formatSigtapCodeMessage(): string {
  return "Formato inválido. Use: XX.XX.XX.XXX-X (exemplo: 03.04.05.006-7)";
}
