const { promises: fs } = require("fs")
const { promisify } = require('util');
const path = require("path")
const sharp = require("sharp")
const nsg = require('node-sprite-generator');
const nsgAsync = promisify(nsg)

main()

async function main() {

    await resizeAlbum("../assets/profiles", "../_site/assets/profiles-min", 100, 100)
    await resizeAlbum("../assets/events", "../_site/assets/events-min", 674)

    await spritifyImages("../_site/assets/profiles-min/*.jpg", "../assets/sprites/profiles.jpg", "../assets/styles/profiles.css", "profiles-", "/assets/sprites/profiles.jpg")

}


async function spritifyImages(src, sprite, style, prefix, spriteUrl) {

    let srcPath = path.join(__dirname, src)
    let spritePath = path.join(__dirname, sprite)
    let stylePath = path.join(__dirname, style)

    try {

        await nsgAsync({
            src: [
                srcPath
            ],
            layout: "packed",
            layoutOptions: {
                padding: 5
            },
            spritePath: spritePath,
            stylesheetPath: stylePath,
            stylesheet: "css",
            compositor: "jimp",
            stylesheetOptions: {
                prefix: prefix,
                spritePath: spriteUrl
            }
        });

    } catch (error) {
        console.log(error)
    }

}


async function resizeAlbum(inputDir, outputDir, width, height) {
    let inputDirPath = path.join(__dirname, inputDir)
    let outputDirPath = path.join(__dirname, outputDir)

    // guarantee output path exists
    await fs.mkdir(outputDirPath, { recursive: true });

    // read paths in input dir
    let profilePaths = await fs.readdir(inputDirPath)

    // async loop through all paths
    await Promise.all(profilePaths.map(async(fileName) => {

        let filePath = path.join(inputDirPath, fileName)
        let outputPath = path.join(outputDirPath, fileName)
        let outputExt = outputPath.substr(0, outputPath.lastIndexOf(".")) + ".jpg";

        try {
            return sharp(filePath)
                .resize(width, height)
                .toFormat('jpeg')
                .toFile(outputExt);

        } catch (error) {
            console.log(error, filePath)
        }

    }));
}