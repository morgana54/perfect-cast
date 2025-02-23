export interface Character {
  age: string;
  description: string;
  background: string;
  personality: string;
}

export interface Listing {
  id: number;
  agent_id: string;
  title: string;
  genre: string;
  userRole: string;
  agentRole: string;
  originalScene: string;
  screenplay: string;
  displayed_screenplay: string;
  context_setting: string;
  context_sceneContext: string;
  context_characters: Record<string, Character>;
  pay: number;
  duration?: number;
}

export interface Submission {
  id: number;
  user_name: string;
  bucket_video_url: string;
  eleven_conversation_id: string;
  listing_id: number;
}

export interface UserProfile {
  id: number;
  user_name: string;
  bucket_video_url: string;
  eleven_conversation_id: string;
  imentive_video_id: string;
}
