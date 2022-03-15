import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegistrationComponent } from './../../view/registration/registration.component';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { set, ref, onValue } from 'firebase/database';
import { BehaviorSubject, Observable, of, switchMap, take, tap } from 'rxjs';
import { Course } from './../models/course';
import { arrayRemove, arrayUnion } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore, private auth:AuthService) { }

  getTeacherCourses(uid:string | undefined){
    return this.db.collection<Course>('courses', ref => ref.where('owner', '==', uid)).valueChanges({idField: 'id'});
  }

  getStudentCourses(uid:string | undefined){
    return this.db.collection<Course>('courses', ref => ref.where('students', 'array-contains', uid)).valueChanges({idField: 'id'});
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

  

}
