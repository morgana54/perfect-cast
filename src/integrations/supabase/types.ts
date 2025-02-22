export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audio_emotions: {
        Row: {
          angry: number | null
          boredom: number | null
          disgust: number | null
          end_time: number | null
          fear: number | null
          happy: number | null
          id: number
          Index: number | null
          neutral: number | null
          sad: number | null
          speaker: string | null
          start_time: number | null
          surprise: number | null
          video_id: string | null
        }
        Insert: {
          angry?: number | null
          boredom?: number | null
          disgust?: number | null
          end_time?: number | null
          fear?: number | null
          happy?: number | null
          id?: never
          Index?: number | null
          neutral?: number | null
          sad?: number | null
          speaker?: string | null
          start_time?: number | null
          surprise?: number | null
          video_id?: string | null
        }
        Update: {
          angry?: number | null
          boredom?: number | null
          disgust?: number | null
          end_time?: number | null
          fear?: number | null
          happy?: number | null
          id?: never
          Index?: number | null
          neutral?: number | null
          sad?: number | null
          speaker?: string | null
          start_time?: number | null
          surprise?: number | null
          video_id?: string | null
        }
        Relationships: []
      }
      personality: {
        Row: {
          agreeableness: number | null
          conscientiousness: number | null
          extraversion: number | null
          id: number
          neuroticism: number | null
          openness: number | null
          video_id: string | null
        }
        Insert: {
          agreeableness?: number | null
          conscientiousness?: number | null
          extraversion?: number | null
          id?: never
          neuroticism?: number | null
          openness?: number | null
          video_id?: string | null
        }
        Update: {
          agreeableness?: number | null
          conscientiousness?: number | null
          extraversion?: number | null
          id?: never
          neuroticism?: number | null
          openness?: number | null
          video_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          city: string | null
          country: string | null
          experience: string | null
          height: number | null
          id: number
          interested: string | null
          name: string | null
          nationality: string | null
          surname: string | null
          user_shared_info: string | null
        }
        Insert: {
          age?: number | null
          city?: string | null
          country?: string | null
          experience?: string | null
          height?: number | null
          id?: never
          interested?: string | null
          name?: string | null
          nationality?: string | null
          surname?: string | null
          user_shared_info?: string | null
        }
        Update: {
          age?: number | null
          city?: string | null
          country?: string | null
          experience?: string | null
          height?: number | null
          id?: never
          interested?: string | null
          name?: string | null
          nationality?: string | null
          surname?: string | null
          user_shared_info?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          age: number | null
          id: number
          performance_summary: string | null
          skills_and_expertise: string[] | null
          user_image: string | null
          user_name: string | null
          user_surname: string | null
          video_id: string | null
          video_url: string | null
        }
        Insert: {
          age?: number | null
          id?: never
          performance_summary?: string | null
          skills_and_expertise?: string[] | null
          user_image?: string | null
          user_name?: string | null
          user_surname?: string | null
          video_id?: string | null
          video_url?: string | null
        }
        Update: {
          age?: number | null
          id?: never
          performance_summary?: string | null
          skills_and_expertise?: string[] | null
          user_image?: string | null
          user_name?: string | null
          user_surname?: string | null
          video_id?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      video_emotions: {
        Row: {
          angry: number | null
          arousal: number | null
          contempt: number | null
          disgust: number | null
          dominant_emotion: string | null
          face_id: number | null
          face_name: string | null
          fear: number | null
          frame_index: string | null
          happy: number | null
          id: number
          intensity: number | null
          neutral: number | null
          sad: number | null
          surprise: number | null
          valence: number | null
          video_id: string | null
          video_time: string | null
        }
        Insert: {
          angry?: number | null
          arousal?: number | null
          contempt?: number | null
          disgust?: number | null
          dominant_emotion?: string | null
          face_id?: number | null
          face_name?: string | null
          fear?: number | null
          frame_index?: string | null
          happy?: number | null
          id?: never
          intensity?: number | null
          neutral?: number | null
          sad?: number | null
          surprise?: number | null
          valence?: number | null
          video_id?: string | null
          video_time?: string | null
        }
        Update: {
          angry?: number | null
          arousal?: number | null
          contempt?: number | null
          disgust?: number | null
          dominant_emotion?: string | null
          face_id?: number | null
          face_name?: string | null
          fear?: number | null
          frame_index?: string | null
          happy?: number | null
          id?: never
          intensity?: number | null
          neutral?: number | null
          sad?: number | null
          surprise?: number | null
          valence?: number | null
          video_id?: string | null
          video_time?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
