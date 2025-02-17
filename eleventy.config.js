export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  return {
    dir : {
      input     : "src/main/11ty",
      output    : "docs",
      layouts   : "layouts",
      data      : "_global"
    }
  }  
};


