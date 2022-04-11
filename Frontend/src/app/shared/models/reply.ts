import { Timestamp } from "firebase/firestore"

export interface reply {
    datePosted: Timestamp,
    threadID: string,
    message: string,
    id: string
    ownerID: string 
}