import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { RegistrationComponent } from './../../view/registration/registration.component';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { set, ref, onValue } from 'firebase/database';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Course } from './../models/course';
import { Lecture } from '../models/lecture';
import { arrayRemove, arrayUnion, doc, documentId } from 'firebase/firestore';
import { User } from '../models/user';
import { Thread } from '../models/thread';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore, private auth: AuthService, private storage: AngularFireStorage) { }

  //////////////////////////////////////////
  ///////////// CRUD for Users /////////////
  //////////////////////////////////////////

  getUser(uid:string | undefined){
    if (uid) {
      return this.db.collection<User>('users').doc(uid).valueChanges();
    }
    else {
      return of(undefined)
    }
  }

  async editUser(uid: string, fname: string, lname: string, img?: File) {
    if (fname) {
      await this.db.collection('users').doc(uid).update({fname: fname})
      .catch(error => {
        console.log(error);
      });
    }

    if (lname) {
      await this.db.collection('users').doc(uid).update({lname: lname});
    }

    if (img) {
      this.storage.upload('users/' + uid + '_thumb', img);
    }
  }

  deleteUser(uid: string, email: string, password: string) {
    this.getUser(uid).pipe(take(1)).subscribe(user => {
      if (user?.role == 'Teacher') {
        this.getTeacherCourses(uid).pipe(take(1)).subscribe(courses => {
          courses.forEach(async course => {
            await this.deleteCourse(course.id);
          });
          try {
            this.storage.ref('users/' + uid + '_thumb').delete();
          } catch (error) {
            console.log(error);
          }
          this.db.collection('users').doc(uid).delete();
          this.auth.deleteAccount(email, password);
        });
      }
      else {
        this.getStudentCourses(uid).pipe(take(1)).subscribe(courses => {
          courses.forEach(async course => {
            await this.removeStudent(course.id, uid);
          });
          this.storage.ref('users/' + uid + '_thumb').delete();
          this.db.collection('users').doc(uid).delete();
          this.auth.deleteAccount(email, password);
        })
      }
    });
  }


  ////////////////////////////////////////////
  ///////////// CRUD for Courses /////////////
  ////////////////////////////////////////////
  
  async createCourse(course: Course) {
    return await this.db.collection('courses').add(course);
  }

  async editCourse(cid: string, title: string, img?: File) {
    if (title) {
      await this.db.collection('courses').doc(cid).update({title: title});
    }

    if (img) {
      this.storage.upload(cid + '/' + 'thumb', img);
    }
  }

  deleteCourse(cid: string) {
    let courseRef = this.db.collection('courses').doc(cid);
    try {
      this.storage.ref(cid + 'thumb').delete();
    } catch (error) {
      console.log(error);
    }
    this.getCourse(cid).pipe(take(1)).subscribe(course => {
      course?.lectures.forEach(lecture => {
        this.deleteLecture(lecture, cid);
      });
      courseRef.delete();
      try {
        this.storage.ref(cid).delete();
      } catch (error) {
        console.log(error);
      }
    });
  }

  getTeacherCourses(uid:string | undefined) {
    return this.db.collection<Course>('courses', ref => ref.where('owner', '==', uid)).valueChanges({idField: 'id'});
  }

  getStudentCourses(uid:string | undefined) {
    return this.db.collection<Course>('courses', ref => ref.where('students', 'array-contains', uid)).valueChanges({idField: 'id'});
  }

  async addStudent(cid:string, sid:string) {
    return await this.db.collection('courses').doc(cid).update({
      students: arrayUnion(sid)
    })
  }

  async removeStudent(cid:string, sid:string) {
    return await this.db.collection('courses').doc(cid).update({
      students: arrayRemove(sid)
    })
  }

  getCourse(cid:string) {
    if (cid) {
      return this.db.collection<Course>('courses').doc(cid).valueChanges({idField: 'id'});
    }
    else {
      return of(undefined);
    }
  }


  /////////////////////////////////////////////
  ///////////// CRUD for Lectures /////////////
  /////////////////////////////////////////////

  createLecture(lecture:Lecture, cid: string, thumbnail: File, video: File){
    return new Promise( async (resolve:any, reject) => {
      await this.db.collection('lectures').add(lecture)
      .then(async lecture => {
        // Add lecture to its course's lectures array
        await this.db.collection('courses').doc(cid).update({ lectures: arrayUnion(lecture.id) });

        // Lecture thumbnail and url logic
        let thumb;
        if (!thumbnail) {
          thumb = 'DEFAULTIMAGE'
        }
        else {
          thumb = cid + '/' + lecture.id + '_thumb';
          this.storage.upload(thumb, thumbnail);
        }

        // Updating lecture with id and urls
        let vid = cid + '/' + lecture.id;
        lecture.update({
          id: lecture.id, 
          thumbnailUrl: thumb,
          videoUrl: vid
        });
        //trying to do a progress bar

        // Uploading video
        this.storage.upload(vid, video);
        resolve(true);
      })
      .catch(() => {reject()});
    });
  }

  async editLecture(lid: string, cid: string, title: string, description: string, thumbnail?: File) {
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

  // add deleting comments after
  async deleteLecture(lid: string, cid: string) {
    let lecture = this.db.collection('lectures').doc(lid);
    this.db.collection('courses').doc(cid).update({ lectures: arrayRemove(lid) });
    try {
      this.storage.ref(cid + '/' + lid).delete();
    } catch (error) {
      console.log(error);
    }
    try {
      this.storage.ref(cid + '/' + lid + '_thumb').delete();
    } catch (error) {
      console.log(error);
    }
    this.getLecture(lid).pipe(take(1)).subscribe(lecture => {
      // Loop through comment array and delete each one
    })
    return await lecture.delete();
  }

  async removeLecture(lid:string | undefined){
    return await this.db.collection('lectures').doc(lid).update({
      students: arrayRemove(lid)
    })
  }

  getCourseLectures(cid:string | undefined){
    if (cid) {
      return this.db.collection<Lecture>('lectures', ref => ref.where('courseID', '==', cid)).valueChanges({idField: 'id'});
    }
    else {
      return of(undefined)
    }
  }

  getLecture(lid:string){
    return this.db.collection<Lecture>('lectures').doc(lid).valueChanges({idField: 'id'});
  }


 //////////////////////////////////////////
  ///////////// CRUD for Threads /////////////
  //////////////////////////////////////////

 
  //have to add threads to lectures still
  async createThread(thread: Thread) {
    return await this.db.collection('threads').add(thread).then(t => {t.update({id:t.id})});
  }

  addThreadToLecture(lid:string | undefined){

  }

  getLectureThreads(lid:string | undefined){
    if (lid) {
      return this.db.collection<Thread>('threads', ref => ref.where('lectureID', '==', lid)).valueChanges({idField: 'id'})
    }
    else {
      return of(undefined)
    }
  }
}