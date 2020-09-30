const { promises: fs } = require("fs")
const path = require("path")
const sharp = require("sharp")

main()

async function main() {
    // create output dir
    let outputDir = path.join(__dirname, "../_site/assets/profiles-min")
    await fs.mkdir(outputDir, { recursive: true });


    let profileDir = path.join(__dirname, "../assets/profiles")
    let profilePaths = await fs.readdir(profileDir)

    await Promise.all(profilePaths.map(async(fileName) => {

        let filePath = path.join(profileDir, fileName)
        let outputPath = path.join(outputDir, fileName)
        let outputExt = outputPath.substr(0, outputPath.lastIndexOf(".")) + ".jpg";

        return sharp(filePath)
            .resize(100, 100)
            .toFile(outputExt);

    }));



}