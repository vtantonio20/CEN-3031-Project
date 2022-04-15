import { Thread } from './thread';
import { Timestamp } from "firebase/firestore";

export interface Lecture {
    id: string
    courseID: string,
    description: string,
    ownerID:string,
    thumbnailUrl:string,
    title: string,
    threads:Thread[],
    uploadDate: Timestamp,
    videoUrl: string,
    //avalibility:boolean (public or private)
}
