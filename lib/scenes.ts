export type Line = { time: number; speaker: string; text: string };

export type Scene = {
  slug: string;
  title: string;
  genre: string;
  duration: number;
  image: string;
  positioning: string;
  summary: string;
  performanceFocus: string;
  lines: Line[];
};

export const scenes: Scene[] = [
  {
    slug: "last-train-home",
    title: "Last Train Home",
    genre: "Late-night drama",
    duration: 22,
    image: "/scenes/last-train-home.png",
    positioning: "center 58%",
    summary: "A quiet goodbye at an empty platform, with two people trying to make a final decision before the train arrives.",
    performanceFocus: "Use restraint, pauses, and a little urgency as the departure gets closer.",
    lines: [
      { time: 1, speaker: "MAYA", text: "You came all this way just to say goodbye?" },
      { time: 7, speaker: "LEO", text: "No. I came to see if you'd stay." },
      { time: 14, speaker: "MAYA", text: "The train leaves in eight minutes." },
      { time: 18, speaker: "LEO", text: "Then let's make those eight count." },
    ],
  },
  {
    slug: "rainy-confession",
    title: "Rainy Confession",
    genre: "Romantic drama",
    duration: 23,
    image: "/scenes/rainy-confession.png",
    positioning: "center 52%",
    summary: "Two people meet in the rain after a long silence, each waiting for the other to say what brought them there.",
    performanceFocus: "Keep the delivery intimate and let the weather sit underneath the words.",
    lines: [
      { time: 1, speaker: "ELLIS", text: "I thought the rain might change your mind." },
      { time: 7, speaker: "MARA", text: "It only made the walk here longer." },
      { time: 13, speaker: "ELLIS", text: "Then tell me I came too late." },
      { time: 18, speaker: "MARA", text: "You came before I stopped waiting." },
    ],
  },
  {
    slug: "the-big-pitch",
    title: "The Big Pitch",
    genre: "Office comedy",
    duration: 19,
    image: "/scenes/the-big-pitch.png",
    positioning: "center",
    summary: "A last-minute presentation gets one more chance when a questionable prototype meets a very prepared backup.",
    performanceFocus: "Play the contrast between professional confidence and barely contained panic.",
    lines: [
      { time: 1, speaker: "JUNE", text: "This is either brilliant or career-ending." },
      { time: 6, speaker: "SAM", text: "Those are the only two kinds of Tuesdays." },
      { time: 11, speaker: "JUNE", text: "You brought the prototype, right?" },
      { time: 15, speaker: "SAM", text: "I brought something better. A backup prototype." },
    ],
  },
  {
    slug: "planet-nine",
    title: "Planet Nine",
    genre: "Cosmic adventure",
    duration: 20,
    image: "/scenes/planet-nine.png",
    positioning: "center",
    summary: "A small crew locks onto a distant signal and prepares for one impossible chance among the stars.",
    performanceFocus: "Give the command lines a clear rhythm, then let the wonder come through in the replies.",
    lines: [
      { time: 1, speaker: "CAPTAIN", text: "Signal lock. We have one chance." },
      { time: 6, speaker: "NOVA", text: "One chance is more than we had yesterday." },
      { time: 12, speaker: "CAPTAIN", text: "On my mark, wake the stars." },
      { time: 17, speaker: "NOVA", text: "Already ahead of you." },
    ],
  },
  {
    slug: "between-floors",
    title: "Between Floors",
    genre: "Contained mystery",
    duration: 21,
    image: "/scenes/between-floors.png",
    positioning: "center",
    summary: "An elevator stalls between floors, and an ordinary building starts answering back in an unfamiliar voice.",
    performanceFocus: "Build tension through careful listening rather than volume.",
    lines: [
      { time: 1, speaker: "NORA", text: "Did the elevator just sigh?" },
      { time: 6, speaker: "ELI", text: "Old buildings make old noises." },
      { time: 11, speaker: "NORA", text: "That one said my name." },
      { time: 16, speaker: "ELI", text: "Then maybe we should answer." },
    ],
  },
  {
    slug: "the-last-signal",
    title: "The Last Signal",
    genre: "Coastal mystery",
    duration: 24,
    image: "/scenes/the-last-signal.png",
    positioning: "center",
    summary: "A lighthouse team hears a familiar distress call from a frequency where no ship should be listening.",
    performanceFocus: "Keep the voices grounded and let the unanswered question carry the suspense.",
    lines: [
      { time: 1, speaker: "ROWAN", text: "The signal is back, same time as before." },
      { time: 7, speaker: "INEZ", text: "There is no ship on that frequency." },
      { time: 13, speaker: "ROWAN", text: "Then who keeps asking for the lighthouse?" },
      { time: 19, speaker: "INEZ", text: "Someone who never saw it go dark." },
    ],
  },
  {
    slug: "magic-mistake",
    title: "Magic Mistake",
    genre: "Fantasy comedy",
    duration: 21,
    image: "/scenes/magic-mistake.png",
    positioning: "center",
    summary: "A spell succeeds in exactly the wrong way, leaving two magicians to repair a room that has forgotten gravity.",
    performanceFocus: "Keep the comic timing brisk while the impossible details stay completely matter-of-fact.",
    lines: [
      { time: 1, speaker: "PIP", text: "Good news: the spell definitely worked." },
      { time: 6, speaker: "ADA", text: "The ceiling is wearing my bookshelf." },
      { time: 11, speaker: "PIP", text: "That sounds more like medium news." },
      { time: 16, speaker: "ADA", text: "Put gravity back before the tea notices." },
    ],
  },
  {
    slug: "rooftop-after-hours",
    title: "Rooftop After Hours",
    genre: "Quiet drama",
    duration: 22,
    image: "/scenes/rooftop-after-hours.png",
    positioning: "center 55%",
    summary: "Two coworkers look over a sleeping city and revisit the version of their friendship they left behind.",
    performanceFocus: "Aim for a natural late-night conversation with warmth beneath the distance.",
    lines: [
      { time: 1, speaker: "DEV", text: "Everyone looks honest from this far away." },
      { time: 7, speaker: "REN", text: "Distance is generous like that." },
      { time: 13, speaker: "DEV", text: "Do you ever miss who we were?" },
      { time: 18, speaker: "REN", text: "Only when I forget who we became." },
    ],
  },
];

export const getScene = (slug: string) => scenes.find((scene) => scene.slug === slug);
