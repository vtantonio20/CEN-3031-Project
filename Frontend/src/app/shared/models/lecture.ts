import { Timestamp } from "firebase/firestore";

export interface Lecture {
    courseID: string,
    description: string,
    thumbnailUrl:string,
    title: string,
    uploadDate: Timestamp,
    uploader: string,
    videoUrl: string,
    id: string
    //avalibility:boolean (public or private)
}
