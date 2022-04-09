import { Timestamp } from "firebase/firestore"

export interface Thread {
    datePosted: Timestamp,
    threadOwnerID: string,
    message: string,
    replies: string[],
    timePosted : string, 
    id: string,
    lectureID: string,
}