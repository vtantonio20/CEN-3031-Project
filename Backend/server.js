import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createFFmpeg } from '@ffmpeg/ffmpeg';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiYuzGb7rNayD2mcLQp_3DasWftjQf8S4",
  authDomain: "third-project-a76e2.firebaseapp.com",
  databaseURL: "https://third-project-a76e2-default-rtdb.firebaseio.com",
  projectId: "third-project-a76e2",
  storageBucket: "third-project-a76e2.appspot.com",
  messagingSenderId: "858114061879",
  appId: "1:858114061879:web:b5470bb29d2df62dc8b1b2"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);



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
    // const videoData = req.file.buffer;

    // const ffmpeg = await getFFmpeg();
    // const inputFileName = `input-video`;
    // const outputFileName = `output-image.png`;
    // let outputData = null;

    // ffmpeg.FS('writeFile', inputFileName, videoData);
    
    let file = req['files'].video;
    
})