const { promises: fs } = require("fs")
const path = require("path")
const sharp = require("sharp")

main()

async function main() {


    await resizeAlbum("../assets/profiles", "../_site/assets/profiles-min", 100, 100)
    await resizeAlbum("../assets/events", "../_site/assets/events-min", 674)


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