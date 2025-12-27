import { talkshow } from "../../public/videos/talkshow";
import { interview } from "../../public/videos/interviews";
import { rajpoth } from "../../public/videos/protests";
import { lecture } from "../../public/videos/lectures";
import { kobita } from "../../public/videos/poetry";
import { discussion } from "../../public/videos/discussion";
import { biography } from "../../public/videos/biography";
import { speeches } from "../../public/videos/speeches";
import { activities } from "../../public/videos/activities";
import { pressConference } from "../../public/videos/pressConference";
import { peoplesLove } from "../../public/videos/peoplesLove";
import { songs } from "../../public/videos/song";
import { electionCampaign } from "../../public/videos/electionCampaign";
import { justiceForHadi } from "../../public/videos/justice";

export const videoCategories = [
  {
    id: "All",
    label: "সবগুলো (All)",
    videos: [
      ...talkshow,
      ...interview,
      ...rajpoth,
      ...lecture,
      ...kobita,
      ...discussion,
      ...biography,
      ...speeches,
      ...pressConference,
      ...activities,
      ...peoplesLove,
      ...songs,
      ...electionCampaign,
      ...justiceForHadi,
    ],
  },
  { id: "Speeches", label: "ভাষণ (Speeches)", videos: speeches },
  { id: "Protests", label: "রাজপথের আন্দোলন (Protests)", videos: rajpoth },
  { id: "Interviews", label: "সাক্ষাৎকার (Interviews)", videos: interview },
  { id: "Poetry", label: "আবৃত্তি (Recitation)", videos: kobita },
  { id: "TalkShow", label: "টক শো (Talk Show)", videos: talkshow },
  { id: "Biography", label: "জীবনী (Biography)", videos: biography },
  { id: "Lecture", label: "শিক্ষা ও লেকচার (Lecture)", videos: lecture },
  {
    id: "Activities",
    label: "সাংস্কৃতিক কার্যক্রম (Activities)",
    videos: activities,
  },
  { id: "Discussion", label: "মুক্ত আলোচনা (Discussion)", videos: discussion },
  {
    id: "PressConference",
    label: "সংবাদ সম্মেলন (Press Conference)",
    videos: pressConference,
  },
  {
    id: "peoplesLove",
    label: "জনগণের ভালোবাসা (People's Love)",
    videos: peoplesLove,
  },
  {
    id: "song",
    label: "সঙ্গীত (Songs)",
    videos: songs,
  },
  {
    id: "procharona",
    label: "নির্বাচনী প্রচারণা (Campaign)",
    videos: electionCampaign,
  },
  {
    id: "justiceForHadi",
    label: "হাদির জন্য বিচার (Justice For Hadi)",
    videos: justiceForHadi,
  },
];
