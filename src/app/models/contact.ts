export interface Contact {
  id?: number;
  name: string;
  email: string;
  celular: string;
  telefone?: string;
  favorito: string;
  activo: string;
  dataCadastro?: Date | string;
}
