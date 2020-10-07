module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets/fonts");
    eleventyConfig.addPassthroughCopy("assets/sprites");
    eleventyConfig.addPassthroughCopy("assets/content");
    eleventyConfig.addPassthroughCopy({ "assets/favicon.ico": "/favicon.ico" });


    let md = require("markdown-it")()
    eleventyConfig.addFilter("md", (content) => md.render(content));

    eleventyConfig.addFilter("prettyDate", (dateStr) => {
        return (new Date(dateStr)).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    })

    eleventyConfig.addCollection("feedback", (col) => {
        let { responses, divisions } = col.items[0].data

        let feedback = divisions.map(division => {
            let resp = responses.filter(r => r.division == division.name)

            return {
                division,
                responses: resp
            }
        })

        return feedback;
    });


    eleventyConfig.setBrowserSyncConfig({
        open: "local",
        startPath: "/thank-you.html",
        ui: false,
    });


    return {
        templateFormats: ["njk"],
        dir: {
            "data": "data",
            "includes": "assets",
            "layouts": "layouts"
        },
    };
};