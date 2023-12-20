const SitemapGenerator = require("sitemap-generator");
const fs = require("fs");

const targetUrl = "https://deltaromeo.tv/"; // Replace with your website's URL
const outputPath = "./public/sitemap.xml"; // Output path for the sitemap

const generator = SitemapGenerator(targetUrl);

generator.on("done", () => {
  console.log("Sitemap generated successfully!");
  // Save the sitemap to a file
  fs.writeFileSync(outputPath, generator.getFile());
});

generator.on("error", (error) => {
  console.error(`Error generating sitemap: ${error}`);
});

generator.start();
