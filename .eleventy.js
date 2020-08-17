module.exports = function(eleventyConfig) {

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


    return {
        dir: {
            "data": "data",
            "includes": "assets",
            "layouts": "layouts"
        },
    };
};