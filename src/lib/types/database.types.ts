export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      event: {
        Row: {
          address: string | null;
          alerts: string | null;
          coordinates: number[];
          cover: string | null;
          created_at: string;
          created_by: string;
          date: string;
          description: string;
          event_id: string;
          faq: string[] | null;
          homepage: string | null;
          price: number;
          schedule: string | null;
          tag_id: string | null;
          thumbnail: string | null;
          tickets_link: string | null;
          time: string;
          title: string;
        };
        Insert: {
          address?: string | null;
          alerts?: string | null;
          coordinates?: number[];
          cover?: string | null;
          created_at?: string;
          created_by?: string;
          date: string;
          description: string;
          event_id?: string;
          faq?: string[] | null;
          homepage?: string | null;
          price: number;
          schedule?: string | null;
          tag_id?: string | null;
          thumbnail?: string | null;
          tickets_link?: string | null;
          time: string;
          title: string;
        };
        Update: {
          address?: string | null;
          alerts?: string | null;
          coordinates?: number[];
          cover?: string | null;
          created_at?: string;
          created_by?: string;
          date?: string;
          description?: string;
          event_id?: string;
          faq?: string[] | null;
          homepage?: string | null;
          price?: number;
          schedule?: string | null;
          tag_id?: string | null;
          thumbnail?: string | null;
          tickets_link?: string | null;
          time?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_event_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["tag_id"];
          },
        ];
      };
      favorite: {
        Row: {
          created_at: string;
          event_id: string;
          favorite_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          favorite_id?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          favorite_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_favorite_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event";
            referencedColumns: ["event_id"];
          },
        ];
      };
      joined: {
        Row: {
          created_at: string;
          event_id: string;
          joined_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          joined_id?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          joined_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_joined_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event";
            referencedColumns: ["event_id"];
          },
        ];
      };
      profile: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          user_id: string;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          user_id: string;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          user_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_profile_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          color: string;
          created_at: string;
          icon: string;
          tag_id: string;
          title: string;
        };
        Insert: {
          color: string;
          created_at?: string;
          icon: string;
          tag_id?: string;
          title: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          icon?: string;
          tag_id?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
