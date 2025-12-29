import talkshow from "../../public/videos/talkshow.json";
import interview from "../../public/videos/interviews.json";
import rajpoth from "../../public/videos/protests.json";
import lecture from "../../public/videos/lectures.json";
import kobita from "../../public/videos/poetry.json";
import discussion from "../../public/videos/discussion.json";
import biography from "../../public/videos/biography.json";
import speeches from "../../public/videos/speeches.json";
import activities from "../../public/videos/activities.json";
import pressConference from "../../public/videos/pressConference.json";
import peoplesLove from "../../public/videos/peoplesLove.json";
import songs from "../../public/videos/song.json";
import electionCampaign from "../../public/videos/electionCampaign.json";
import justiceForHadi from "../../public/videos/justice.json";

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
