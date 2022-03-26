import { Timestamp } from "firebase/firestore";

export interface Lecture {
    id: string
    courseID: string,
    description: string,
    ownerID:string,
    thumbnailUrl:string,
    title: string,
    uploadDate: Timestamp,
    videoUrl: string,
    //avalibility:boolean (public or private)
}
