export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      estoque_movimentacoes: {
        Row: {
          criado_em: string
          data_movimentacao: string
          descricao: string | null
          id: string
          produto_id: string
          quantidade: number
          tipo: Database["public"]["Enums"]["tipo_movimentacao"]
        }
        Insert: {
          criado_em?: string
          data_movimentacao?: string
          descricao?: string | null
          id?: string
          produto_id: string
          quantidade: number
          tipo: Database["public"]["Enums"]["tipo_movimentacao"]
        }
        Update: {
          criado_em?: string
          data_movimentacao?: string
          descricao?: string | null
          id?: string
          produto_id?: string
          quantidade?: number
          tipo?: Database["public"]["Enums"]["tipo_movimentacao"]
        }
        Relationships: [
          {
            foreignKeyName: "estoque_movimentacoes_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "estoque_produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      estoque_produtos: {
        Row: {
          codigo_barras: string | null
          created_at: string | null
          id: string
          lote: string
          nome: string
          quantidade: number
          registro_anvisa: string | null
          unidade: string | null
          updated_at: string | null
          validade: string | null
        }
        Insert: {
          codigo_barras?: string | null
          created_at?: string | null
          id?: string
          lote: string
          nome: string
          quantidade: number
          registro_anvisa?: string | null
          unidade?: string | null
          updated_at?: string | null
          validade?: string | null
        }
        Update: {
          codigo_barras?: string | null
          created_at?: string | null
          id?: string
          lote?: string
          nome?: string
          quantidade?: number
          registro_anvisa?: string | null
          unidade?: string | null
          updated_at?: string | null
          validade?: string | null
        }
        Relationships: []
      }
      fracionamento_medicamentos: {
        Row: {
          codigo_barras_fracionado: string | null
          codigo_barras_original: string | null
          codigo_produto: string | null
          created_at: string | null
          data_importacao: string | null
          data_processo: string
          fabricacao: string | null
          id: string
          id_maquina: string | null
          informacoes_maquina: string | null
          lote: string
          nome_medicamento: string
          numero_serie: string | null
          quantidade_fracionada: number
          quantidade_total: number
          registro_anvisa: string | null
          responsavel_tecnico: string | null
          unidade: string | null
          updated_at: string | null
          validade: string | null
          xml_original: string | null
        }
        Insert: {
          codigo_barras_fracionado?: string | null
          codigo_barras_original?: string | null
          codigo_produto?: string | null
          created_at?: string | null
          data_importacao?: string | null
          data_processo: string
          fabricacao?: string | null
          id?: string
          id_maquina?: string | null
          informacoes_maquina?: string | null
          lote: string
          nome_medicamento: string
          numero_serie?: string | null
          quantidade_fracionada: number
          quantidade_total: number
          registro_anvisa?: string | null
          responsavel_tecnico?: string | null
          unidade?: string | null
          updated_at?: string | null
          validade?: string | null
          xml_original?: string | null
        }
        Update: {
          codigo_barras_fracionado?: string | null
          codigo_barras_original?: string | null
          codigo_produto?: string | null
          created_at?: string | null
          data_importacao?: string | null
          data_processo?: string
          fabricacao?: string | null
          id?: string
          id_maquina?: string | null
          informacoes_maquina?: string | null
          lote?: string
          nome_medicamento?: string
          numero_serie?: string | null
          quantidade_fracionada?: number
          quantidade_total?: number
          registro_anvisa?: string | null
          responsavel_tecnico?: string | null
          unidade?: string | null
          updated_at?: string | null
          validade?: string | null
          xml_original?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          nome_completo: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          nome_completo?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome_completo?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      registrar_movimentacao: {
        Args: {
          p_descricao?: string
          p_produto_id: string
          p_quantidade: number
          p_tipo: Database["public"]["Enums"]["tipo_movimentacao"]
        }
        Returns: string
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "farmaceutico"
        | "estoquista"
        | "medico"
        | "enfermeiro"
        | "paciente"
      tipo_movimentacao:
        | "entrada"
        | "saida"
        | "fracionamento"
        | "ajuste"
        | "descarte"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "farmaceutico",
        "estoquista",
        "medico",
        "enfermeiro",
        "paciente",
      ],
      tipo_movimentacao: [
        "entrada",
        "saida",
        "fracionamento",
        "ajuste",
        "descarte",
      ],
    },
  },
} as const
