
export interface Role {
  id: string;
  title: string;
  description: string;
  screenplay: string;
}

export interface Submission {
  id: string;
  roleId: string;
  actorName: string;
  age: number;
  image: string;
  video: string;
  skills: string[];
  performanceSummary: string;
}

export const roles: Role[] = [
  {
    id: "1",
    title: "Cowboy",
    description: "A rugged western character with a heart of gold",
    screenplay: `INT. SALOON - DAY

The swing doors CREAK open. Dust swirls in the afternoon light.

JAKE (our cowboy) steps in, his boots leaving muddy prints on the wooden floor. The room falls silent.

JAKE
(tipping his hat)
"Mighty fine day for some truth-tellin'."

He moves to the bar, each step deliberate, measured. The bartender's hand inches toward the shotgun under the counter.`,
  },
  {
    id: "2",
    title: "Witch",
    description: "A mysterious and powerful enchantress",
    screenplay: "Scene details for Witch role...",
  },
  {
    id: "3",
    title: "Policeman",
    description: "An honest cop in a corrupt city",
    screenplay: "Scene details for Policeman role...",
  },
];

export const submissions: Submission[] = [
  {
    id: "1",
    roleId: "1",
    actorName: "John Anderson",
    age: 35,
    image: "/placeholder.svg",
    video: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    skills: ["Horseback Riding", "Stage Combat", "Southern Accent"],
    performanceSummary: "John brings an authentic rugged charm to the Cowboy role. His natural drawl and commanding presence perfectly embody the character's strong moral compass. His expertise in horseback riding and stage combat adds genuine credibility to the physical aspects of the role. The subtle vulnerability he shows in emotional scenes creates a beautifully layered performance.",
  },
  {
    id: "2",
    roleId: "1",
    actorName: "Michael Stevens",
    age: 42,
    image: "/placeholder.svg",
    video: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    skills: ["Method Acting", "Stunt Work", "Voice Acting"],
    performanceSummary: "Michael's interpretation brings a fresh perspective to the Cowboy character. His method acting approach adds depth to the role, while his stunt work experience ensures authentic action sequences. His voice work particularly stands out, capturing the grit and wisdom of a seasoned western character.",
  },
];
