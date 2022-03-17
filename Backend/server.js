import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise = ffmpegInstance.load();

async function getFFmpeg() {
    if (ffmpegLoadingPromise) {
        await ffmpegLoadingPromise;
        ffmpegLoadingPromise = undefined;
    }

    return ffmpegInstance;
}

const app = express();
const port = 3000;
const upload = multer({
    // Puts data in a buffer rather than to disk
    storage: multer.memoryStorage(),
    // 100 mb size limit
    limits: { fileSize: 100 * 1024 * 1024 }
})

app.use(cors());

app.listen(port, () => {
    console.log('The express server is running.');
});

app.post('/uploadVideo', upload.single('video'), async (req, res) => {
    const videoData = req.file.buffer;

    const ffmpeg = await getFFmpeg();
    const inputFileName = `input-video`;
    const outputFileName = `output-image.png`;
    let outputData = null;

    ffmpeg.FS('writeFile', inputFileName, videoData);

    
})