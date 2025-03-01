import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "../bundle.css": "bundle.css" });
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  // pathPrefix
  return {
    dir : {
      input     : "../src/main/11ty",
      output    : "../docs",
      layouts   : "layouts",
      data      : "_global"
    },
    pathPrefix : "/"
  };
} 


