import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RegistrationComponent } from './../../view/registration/registration.component';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { set, ref, onValue } from 'firebase/database';
import { User } from '../user/user';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { user } from 'rxfire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated:boolean;
  data:any;
  currentUser:User;
  //private currentUserSubject: BehaviorSubject<User>;
  //public currentUser: Observable<User>;
  constructor(private auth: AngularFireAuth, private router: Router, private db:AngularFireDatabase) {
    
  }
  
  intialize(){
    this.auth.onAuthStateChanged(user => {
      if(user){
        this.authenticated= true;
        onValue(ref(this.db.database, 'users/' + user.uid), (snapshot) => {
          this.data = snapshot.val();
          this.currentUser = Object.setPrototypeOf(this.data, User);
        },{onlyOnce:true})
      }
    })

  }
  ngOnInit(){
  }
  login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password).then(() => {
      //snapshot
      this.auth.currentUser.then((user) => {
        if(user){
          this.authenticated= true;
          onValue(ref(this.db.database, 'users/' + user.uid), (snapshot) => {
            this.data = snapshot.val();
          },{onlyOnce:true})
        }else{
          this.authenticated=false;

        }
      }).then(() => {
        console.log('succesfully logged in')
      })
    });
  }

  register(email:string, fname:string, lname:string, password:string,role:string){
    return this.auth.createUserWithEmailAndPassword(email, password).then(()=>{
      
      this.auth.currentUser.then((user) => {
        if(user){
          let userData = ref(this.db.database, 'users/' + user.uid);
          set(userData, { email: email, fname: fname, lname: lname, role: role });
          this.authenticated= true;
          onValue(ref(this.db.database, 'users/' + user.uid), (snapshot) => {
            this.data = snapshot.val();
          },{onlyOnce:true})
          /*onValue(userData, (snapshot) => {
            this.currentUser=((snapshot.val()));
            console.log((snapshot.val()) || 'Anonymous');
            console.log((snapshot.val().email) || 'Anonymous');
            console.log((snapshot.val().fname) || 'Anonymous');
            console.log((snapshot.val().lname) || 'Anonymous');
            console.log((snapshot.val().role) || 'Anonymous');
          })*/
        }else{
          this.authenticated=false;
        }
      }).then(() => {
        console.log('succesfully written')
      })
    })
  }

  
  /*currentUser(){
    return this.auth.currentUser.then((user) => {
      if(user){
        onValue(ref(this.db.database, 'users/' + user.uid), (snapshot) => {
          console.log((snapshot.val()) || 'Anonymous');
          console.log((snapshot.val().email) || 'Anonymous');
          console.log((snapshot.val().fname) || 'Anonymous');
          console.log((snapshot.val().lname) || 'Anonymous');
          console.log((snapshot.val().role) || 'Anonymous');
        })
      }
        
    });
  }*/
  logout(){
    return this.auth.signOut();
  }




}
