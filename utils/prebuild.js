const { promises: fs } = require("fs")
const { promisify } = require('util');
const path = require("path")
const sharp = require("sharp")
const nsg = require('node-sprite-generator');
const nsgAsync = promisify(nsg)

main()

async function main() {

    // standardize output sizes
    await resizeAlbum("../assets/profiles", "../_site/assets/profiles-min", 100, 100)
    await resizeAlbum("../assets/events", "../_site/assets/events-min", 674)

    // create sprite
    await spritifyImages("../_site/assets/profiles-min/*.jpg", "../_site/assets/sprites/profiles.jpg", "../assets/styles/profiles.css", "profiles-", "/assets/sprites/profiles.jpg")

    // create next gen image formats
    await processImages("../_site/assets/events-min")
    await processImages("../_site/assets/sprites")

}

async function processImages(inputDir) {
    let inputDirPath = path.join(__dirname, inputDir)

    // read paths in input dir
    let imagePaths = await fs.readdir(inputDirPath)

    let jpgPaths = imagePaths.filter(p => p.endsWith("jpg"))

    // async loop through all paths
    await Promise.all(jpgPaths.map(async(fileName) => {

        let filePath = path.join(inputDirPath, fileName)
        let outputPath = filePath.substr(0, filePath.lastIndexOf(".")) + ".webp";

        try {
            return sharp(filePath)
                .toFormat('webp')
                .toFile(outputPath);

        } catch (error) {
            console.log(error, filePath)
        }

    }));
}


async function spritifyImages(src, dest, style, prefix, spriteUrl) {

    let srcPath = path.join(__dirname, src)
    let destPath = path.join(__dirname, dest)
    let stylePath = path.join(__dirname, style)

    let destDir = path.dirname(destPath)
        // guarantee output path exists
    await fs.mkdir(destDir, { recursive: true });

    try {

        await nsgAsync({
            src: [
                srcPath
            ],
            layout: "packed",
            layoutOptions: {
                padding: 5
            },
            spritePath: destPath,
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