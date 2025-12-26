/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://osman-hadi.vercel.app",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // অন্য নিয়ম যোগ করতে পারেন এখানে
    ],
  },
};
