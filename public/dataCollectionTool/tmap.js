const driveData = [
  {
    title:
      "গাইল খাবে পুলিশ⧸ আমলারা খাবে ইলিশ!পুলিশ প্রশাসনকে ইনকিলাব মঞ্চের পাঁচ দফা",
    url: "https://drive.google.com/file/d/1TX0YBIQTQg_UTT_2kvl5Xd4RSIKmIjOI/view?usp=drive_link",
  },
];

const activities = [
  {
    category: "Talk Show",
    yt_personal_url: "",
    fb_url: "",
    drive_url: "",
    source_title:
      "নির্বাচন বানচালের আশঙ্কা করেছিলেন ওসমান হাদি | Osman Hadi | 24 Ghonta Hadi on Election",
    yt_source_url: "https://www.youtube.com/watch?v=qofamWS7yK8",
  },
];

const newData = activities.map((item) => {
  // Get the first two words of the source_title
  const firstTwoWords = item.source_title.split(" ").slice(0, 3).join(" ");

  // Find a match where the driveData title starts with those two words
  const match = driveData.find((driveItem) =>
    driveItem.title.trim().startsWith(firstTwoWords)
  );

  if (!item.drive_url) {
    return {
      ...item, // Spread the individual item, not the whole array
      drive_url: match ? match.url : "",
    };
  } else {
    return {
      ...item,
    };
  }
});

console.log(newData);
