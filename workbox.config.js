module.exports = {
  globDirectory: "build/",
  globPatterns: [
    "**/style.css",
    "index.html",
    "js/*.js",
    "pages/fallback.html",
    "images/home/*.jpg",
    "images/icon/*.svg",
  ],
  swSrc: "sw.js",
  swDest: "build/sw.js",
  globIgnores: ["./workbox-config.js"],
};
