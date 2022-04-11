import { Timestamp } from "firebase/firestore"

export interface Thread {
    datePosted: Timestamp,
    threadOwnerID: string,
    message: string,
    replies: string[],
    timePosted : number, 
    id: string,
    lectureID: string,
}