const { Jimp } = require('jimp');
const path = require('path');

async function createComposite() {
  try {
    const width = 800;
    const height = 1000;
    const topHeight = 500;
    const bottomHeight = 500;
    const bottomWidth = 400;

    // Create a base canvas (white background)
    const baseCanvas = new Jimp({ width, height, color: 0xffffffff });

    // Load top image (slate pencils)
    const topImg = await Jimp.read(path.join(__dirname, '../public/images/top_slate_pencils_src.jpg'));
    topImg.cover({ w: width, h: topHeight });

    // Load bottom left image (white chalk)
    const bottomLeftImg = await Jimp.read(path.join(__dirname, '../public/images/white_chalk.jpg'));
    bottomLeftImg.cover({ w: bottomWidth, h: bottomHeight });

    // Load bottom right image (color chalk)
    const bottomRightImg = await Jimp.read(path.join(__dirname, '../public/images/color_chalk.jpg'));
    bottomRightImg.cover({ w: bottomWidth, h: bottomHeight });

    // Composite top image at (0, 0)
    baseCanvas.composite(topImg, 0, 0);

    // Composite bottom left image at (0, topHeight)
    baseCanvas.composite(bottomLeftImg, 0, topHeight);

    // Composite bottom right image at (bottomWidth, topHeight)
    baseCanvas.composite(bottomRightImg, bottomWidth, topHeight);

    // Save final image
    const outputPath = path.join(__dirname, '../public/images/chalk_slate_pencils.jpg');
    await baseCanvas.write(outputPath);
    console.log('Composite image created successfully at', outputPath);
  } catch (err) {
    console.error('Error creating composite:', err);
  }
}

createComposite();
