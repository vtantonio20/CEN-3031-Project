export interface Lecture {
    id: string
    courseID: string,
    description: string,
    ownerID:string,
    thumbnailUrl:string,
    title: string,
    uploadDate: Date,
    videoUrl: string,
    //avalibility:boolean (public or private)
}
