// https://imsdb.com/scripts/Star-Wars-A-New-Hope.html

export interface Character {
  age: string;
  description: string;
  background: string;
  personality: string;
}

export interface SceneContext {
  setting: string;
  characters: Record<string, Character>;
  sceneContext: string;
}

export interface Screenplay {
  title: string;
  genre: string;
  originalScene: string;
  context: SceneContext;
  scene: string;
}

export const SCREENPLAYS: Screenplay[] = [
  {
    title: "Star Wars",
    genre: "Sci-Fi",
    originalScene: `INT. LARS HOMESTEAD - GARAGE AREA - LATE AFTERNOON

               The hot winds of the desert blow through the garage while Luke and 
               Ben continue their discussion. The old Jedi's eyes have a distant 
               look in them as he speaks of the past, each word carefully chosen.`,
    context: {
      setting: "A remote moisture farm on the desert planet of Tatooine",
      characters: {
        "Ben (Obi-Wan) Kenobi": {
          age: "57",
          description:
            "A weathered hermit with white hair and beard, wearing simple desert robes. Former Jedi Master living in exile.",
          background:
            "Once a revered Jedi Knight, now living as a hermit, protecting Luke and holding the secret of his heritage.",
          personality:
            "Wise, gentle yet authoritative, carrying deep wisdom and hidden pain from the past.",
        },
        "Luke Skywalker": {
          age: "19",
          description:
            "Young, eager farm boy with sandy blonde hair and bright eyes, wearing simple farming clothes.",
          background:
            "Raised by his aunt and uncle on their moisture farm, unaware of his true heritage.",
          personality:
            "Idealistic, adventurous, naive but determined to learn about his father and the wider galaxy.",
        },
      },
      sceneContext:
        "This pivotal scene occurs after Ben has saved Luke from the Sand People. Ben begins to reveal the truth about Luke's father, carefully navigating between honesty and protecting Luke from the full, devastating truth.",
    },
    scene: `BEN: Your father... was seduced by the Dark Side of the Force. He ceased to be Anakin Skywalker and "became" Darth Vader. When that happened, the good man who was your father was destroyed. So what I told you was true... from a certain point of view.
LUKE: (turning away, anger rising) A certain point of view!
BEN: Luke, you're going to find that many of the truths we cling to depend greatly on our own point of view.
LUKE: What does that even mean?
BEN: When I first knew your father, he was already a great pilot. But I was amazed how strongly the Force was with him. I took it upon myself to train him as a Jedi.
LUKE: I wish I'd known him.
BEN: He was the best star pilot in the galaxy, and a cunning warrior. And he was a good friend.
LUKE: How did my father die?
BEN: A young Jedi named Darth Vader, who was a pupil of mine until he turned to evil, helped the Empire hunt down and destroy the Jedi Knights.`,
  },
  {
    title: "A Scanner Darkly",
    genre: "Sci-Fi Thriller",
    originalScene: `INT. JERRY'S HOUSE - DAY

               The suburban house is dimly lit, with newspapers covering all the 
               windows. The furniture is sparse, and what remains is covered in 
               sticky bug strips. Jerry paces frantically, scratching at his skin 
               while Charles watches with growing concern.`,
    context: {
      setting:
        "Near future Southern California, in a society ravaged by the effects of Substance D drug",
      characters: {
        "Jerry Fabin": {
          age: "Late 30s",
          description:
            "Disheveled, paranoid drug user suffering from severe delusions",
          background:
            "Former successful mechanic, now deep in the throes of Substance D addiction",
          personality:
            "Paranoid, delusional, trapped in a deteriorating mental state",
        },
        "Charles Freck": {
          age: "Mid 30s",
          description: "A more composed but equally troubled drug user",
          background:
            "Friend and fellow drug user, still maintaining some grip on reality",
          personality:
            "Concerned but enabler, struggling with his own addiction while witnessing his friend's breakdown",
        },
      },
      sceneContext:
        "This scene demonstrates the devastating mental effects of Substance D, showing Jerry's complete disconnect from reality through his aphid delusions. It serves as a warning of what awaits other characters in the story.",
    },
    scene: `JERRY FABIN: I got to get the aphids. They're everywhere!
CHARLES FRECK: I don't see any aphids. What's an aphid?
JERRY FABIN: It eventually kills you. That's what an aphid is. They're in my hair and my skin and my lungs. The goddamn pain is unbearable.
CHARLES FRECK: How come I can't see them?
JERRY FABIN: You're looking right at them! Right there on the wall!
CHARLES FRECK: Maybe we should get you to a doctor.
JERRY FABIN: They won't help. The doctors are in on it. They're the ones who put them there.
CHARLES FRECK: Jerry, you're not making any sense.
JERRY FABIN: I need to take another shower. They're all over me again.
CHARLES FRECK: That's your fifth shower today!
JERRY FABIN: The only way to get them off is to shower. Keep showering. Never stop showering.`,
  },
  {
    title: "Aladdin",
    genre: "Animation",
    originalScene: `INT. MARKETPLACE - AGRABAH - DAY

               The bustling marketplace of Agrabah is filled with vendors and 
               customers. The Peddler's small stall stands out with its 
               collection of exotic merchandise. His eyes twinkle with 
               mischief as he spots a potential customer approaching.`,
    context: {
      setting:
        "The magical Arabian city of Agrabah, a land of mystery and enchantment",
      characters: {
        Peddler: {
          age: "Middle-aged",
          description:
            "Small, energetic merchant with a charismatic personality and theatrical flair",
          background:
            "Street merchant who knows all the stories of Agrabah, narrator of Aladdin's tale",
          personality:
            "Enthusiastic, dramatic, clever salesman with a storyteller's gift",
        },
        Customer: {
          age: "Unknown",
          description: "Curious marketplace browser",
          background:
            "Representative of the audience, drawn into the larger story",
          personality:
            "Skeptical at first, but increasingly intrigued by the Peddler's tale",
        },
      },
      sceneContext:
        "This opening scene sets up the framing device for the entire movie, where the Peddler introduces the magical tale of Aladdin. His theatrical sales pitch transforms into the narrative vehicle for the story.",
    },
    scene: `PEDDLER: Ah, Salaam and good evening to you, worthy friend! Please, please, come closer.
CUSTOMER: (steps forward)
PEDDLER: Too close! A little too close. There. Welcome to Agrabah, city of mystery, of enchantment, and the finest merchandise this side of the river Jordan!
CUSTOMER: (looks interested)
PEDDLER: Look at this! Yes! Combination hookah and coffee maker--also makes Julienne fries. Will not break! (taps it on table) Will not... (it breaks) It broke.
CUSTOMER: (turns to leave)
PEDDLER: Wait, don't go! I can see you're only interested in the exceptionally rare. I think you would be most rewarded to consider... this.
CUSTOMER: What's that?
PEDDLER: This is no ordinary lamp! It once changed the course of a young man's life. A young man who, like this lamp, was more than what he seemed: a diamond in the rough.
CUSTOMER: Tell me more.
PEDDLER: Listen carefully, my friend, as I tell you a tale that will make you believe in magic...`,
  },
  {
    title: "17 Again",
    genre: "Comedy",
    originalScene: `INT. NED'S HOUSE - LIVING ROOM - NIGHT

               The room is filled with memorabilia from high school glory days. 
               Mike stands before Ned, his best friend, finally coming to terms 
               with the choices he's made in life. The moment is unexpectedly 
               sincere between the two friends.`,
    context: {
      setting:
        "Modern day suburban home, during a pivotal moment of self-realization",
      characters: {
        "Mike O'Donnell": {
          age: "37 (magically transformed to 17)",
          description:
            "Former high school basketball star who got a magical second chance at youth",
          background:
            "Gave up a basketball scholarship to marry his pregnant girlfriend, now struggling with regret and a failing marriage",
          personality:
            "Initially regretful about his past choices, but growing to appreciate the life he built",
        },
        "Ned Gold": {
          age: "37",
          description:
            "Wealthy software developer and Mike's best friend since high school",
          background:
            "Former high school nerd who became successful but still maintains his geeky interests",
          personality: "Quirky, loyal, socially awkward but genuine friend",
        },
      },
      sceneContext:
        "After experiencing his youth again through magical means, Mike finally realizes that his original life choices were the right ones. This scene marks his emotional growth and acceptance of his past decisions.",
    },
    scene: `MIKE: You were right. I peaked in high school. I did. And you know what? I don't care. Because I had you, and Maggie, and Alex and Nicole. And if I had to do it all over again, I wouldn't change a thing.
NED: You're not going to kiss me, are you?
MIKE: No, but I am going to hug you.
NED: Oh, no. No, no, no.
MIKE: Come here, buddy. You've always been there for me.
NED: (trying to escape) This is really unnecessary...
MIKE: Just let it happen. This is happening.
NED: (resigned) Fine. But this better not awaken anything in me.
MIKE: You're my best friend, Ned. You know that?
NED: Yeah, yeah. Just don't tell anyone about this hug.
MIKE: Too late. I'm totally telling everyone.`,
  },
  {
    title: "A Few Good Men",
    genre: "Legal Drama",
    originalScene: `INT. COURTROOM - DAY

               The tension in the courtroom is palpable. Col. Jessep sits in the 
               witness stand, his military bearing evident even under pressure. 
               Lt. Kaffee stands at the podium, young but determined, knowing 
               he's about to risk everything on this line of questioning.`,
    context: {
      setting:
        "Military courtroom in Washington D.C., during a court-martial proceeding",
      characters: {
        "Lt. Daniel Kaffee": {
          age: "Late 20s",
          description:
            "Young JAG lawyer in Navy uniform, initially casual but now intensely focused",
          background:
            "Navy lawyer living in the shadow of his famous father, chosen to handle what was supposed to be a simple plea bargain",
          personality:
            "Initially lazy and plea-bargain happy, now showing his true brilliant legal mind and determination",
        },
        "Col. Nathan Jessep": {
          age: "Mid 50s",
          description:
            "Commanding officer of Guantanamo Bay Naval Base, imposing in his full dress uniform",
          background:
            "Decorated Marine officer who values order and chain of command above all",
          personality:
            "Arrogant, powerful, absolutely convinced of his own righteousness",
        },
      },
      sceneContext:
        "The climactic courtroom scene where Kaffee confronts Jessep about ordering the 'Code Red' that led to the death of PFC Santiago. This is the culmination of Kaffee's transformation from a plea-bargain lawyer to a determined seeker of truth.",
    },
    scene: `JESSEP
                         You can't handle the truth!

               And nobody moves.

                                     JESSEP
                              (continuing)
                         Son, we live in a world that has 
                         walls. And those walls have to be 
                         guarded by men with guns. Who's gonna 
                         do it? You? You, Lt. Weinberg? I 
                         have a greater responsibility than 
                         you can possibly fathom. You weep 
                         for Santiago and you curse the 
                         marines. You have that luxury. You 
                         have the luxury of not knowing what 
                         I know: That Santiago's death, while 
                         tragic, probably saved lives. And my 
                         existence, while grotesque and 
                         incomprehensible to you, saves lives.
                              (beat)
                         You don't want the truth. Because 
                         deep down, in places you don't talk 
                         about at parties, you want me on 
                         that wall. You need me there.
                              (boasting)
                         We use words like honor, code, 
                         loyalty... we use these words as the 
                         backbone to a life spent defending 
                         something. You use 'em as a punchline.
                              (beat)
                         I have neither the time nor the 
                         inclination to explain myself to a 
                         man who rises and sleeps under the 
                         blanket of the very freedom I provide, 
                         then questions the manner in which I 
                         provide it. I'd prefer you just said 
                         thank you and went on your way. 
                         Otherwise, I suggest you pick up a 
                         weapon and stand a post. Either way, 
                         I don't give a damn what you think 
                         you're entitled to.

                                     KAFFEE
                              (quietly)
                         Did you order the code red?

                                     JESSEP
                              (beat)
                         I did the job you sent me to do.

                                     KAFFEE
                         Did you order the code red?

                                     JESSEP
                              (pause)
                         You're goddamn right I did.

               Silence. From everyone.`,
  },
];
