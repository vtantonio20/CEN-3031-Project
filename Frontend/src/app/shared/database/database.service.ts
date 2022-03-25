import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  constructor(private db: AngularFirestore, private auth:AuthService) { }

  //crud for lectures
  async createLecture(lecture:Lecture){
    return await this.db.collection('lectures').add(lecture);
  }
  getCourseLectures(cid:string | undefined){
    return this.db.collection<Lecture>('lectures', ref => ref.where('courseID', '==', cid)).valueChanges({idField: 'id'});
  }

  async removeLecture(lid:string | undefined){
    return await this.db.collection('lectures').doc(lid).update({
      students: arrayRemove(lid)
    })
  }



  getTeacherCourses(uid:string | undefined){
    return this.db.collection<Course>('courses', ref => ref.where('owner', '==', uid)).valueChanges({idField: 'id'});
  }

  getStudentCourses(uid:string | undefined){
    return this.db.collection<Course>('courses', ref => ref.where('students', 'array-contains', uid)).valueChanges({idField: 'id'});
  }

  getUser(uid:string | undefined){
    return this.db.collection<User>('users').doc(uid).valueChanges();
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
      return this.db.collection<Course>('courses').doc(cid).valueChanges();
    }


}
