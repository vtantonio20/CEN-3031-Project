import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { RegistrationComponent } from './../../view/registration/registration.component';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { set, ref, onValue } from 'firebase/database';
import { BehaviorSubject, Observable, of, switchMap, take, tap } from 'rxjs';
import { Course } from './../models/course';
import { Lecture } from '../models/lecture';
import { arrayRemove, arrayUnion, doc, documentId } from 'firebase/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore, private auth: AuthService, private storage: AngularFireStorage) { }

  //crud for lectures
  async createLecture(lecture:Lecture, cid: string, thumbnail: File, video: File){
    return await this.db.collection('lectures').add(lecture)
    .then(lecture => {
      let thumb;
      if (!thumbnail) {
        thumb = 'DEFAULTIMAGE'
      } else {
        thumb = cid + '/' + lecture.id + '_thumb';
        this.storage.upload(thumb, thumbnail);
      }
      let vid = cid + '/' + lecture.id;
      lecture.update({
        id: lecture.id, 
        thumbnailUrl: thumb,
        videoUrl: vid
      });
      this.storage.upload(vid, video);
    });
  }

  // add deleting comments after
  async deleteLecture(lid: string, cid: string) {
    let lecture = this.db.collection('lectures').doc(lid);
    this.storage.ref(cid + '/' + lid).delete();
    this.storage.ref(cid + '/' + lid + '_thumb').delete();
    return await lecture.delete();
  }

  async editLecture(lid: string, cid: string, title: string, description: string, thumbnail: File) {
    if (title) {
      await this.db.collection('lectures').doc(lid).update({title: title});
    }

    if (description) {
      await this.db.collection('lectures').doc(lid).update({description: description});
    }

    if (thumbnail) {
      this.storage.upload(cid + '/' + lid + '_thumb', thumbnail);
    }
  }

  getCourseLectures(cid:string | undefined){
    if (cid) {
      return this.db.collection<Lecture>('lectures', ref => ref.where('courseID', '==', cid)).valueChanges({idField: 'id'});
    }
    else {
      return of(undefined)
    }
  }

  async removeLecture(lid:string | undefined){
    return await this.db.collection('lectures').doc(lid).update({
      students: arrayRemove(lid)
    })
  }

  getLecture(lid:string){
    return this.db.collection<Lecture>('lectures').doc(lid).valueChanges({idField: 'id'});
  }

  getTeacherCourses(uid:string | undefined){
    return this.db.collection<Course>('courses', ref => ref.where('owner', '==', uid)).valueChanges({idField: 'id'});
  }
  getStudentCourses(uid:string | undefined){
    return this.db.collection<Course>('courses', ref => ref.where('students', 'array-contains', uid)).valueChanges({idField: 'id'});
  }

  getUser(uid:string | undefined){
    if (uid) {
      return this.db.collection<User>('users').doc(uid).valueChanges();
    }
    else {
      return of(undefined)
    }
  }

  async createCourse(course:Course ){
    return await this.db.collection('courses').add(course);
  }

  /**
   * Function allowings teachers to add students to a course
   */
  async addStudent(cid:string, sid:string){
    return await this.db.collection('courses').doc(cid).update({
      students: arrayUnion(sid)
    })
  }

  async removeStudent(cid:string, sid:string){
    return await this.db.collection('courses').doc(cid).update({
      students: arrayRemove(sid)
    })
  }

  //returns a single course when given courseID
  getCourse(cid:string){
    if (cid) {
      return this.db.collection<Course>('courses').doc(cid).valueChanges({idField: 'id'});
    }
    else {
      return of(undefined)
    }
  }
}
