export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string | null
                    full_name: string | null
                    avatar_url: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                }
            }
            water_logs: {
                Row: {
                    id: number
                    user_id: string
                    amount_ml: number
                    logged_at: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    user_id: string
                    amount_ml: number
                    logged_at?: string
                    created_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    amount_ml?: number
                    logged_at?: string
                    created_at?: string
                }
            }
            reports: {
                Row: {
                    id: number
                    user_id: string
                    content: string | null
                    period_type: 'DAILY' | 'WEEKLY' | null
                    start_date: string | null
                    end_date: string | null
                    created_at: string
                }
                Insert: {
                    id?: number
                    user_id: string
                    content?: string | null
                    period_type?: 'DAILY' | 'WEEKLY' | null
                    start_date?: string | null
                    end_date?: string | null
                    created_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    content?: string | null
                    period_type?: 'DAILY' | 'WEEKLY' | null
                    start_date?: string | null
                    end_date?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
