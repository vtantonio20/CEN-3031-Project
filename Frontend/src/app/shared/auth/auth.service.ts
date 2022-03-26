import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable, of, switchMap, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //authenticated:boolean;
  //data:any;
  //currentUser:User;
  user$: Observable<User | null | undefined>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges({idField: 'id'});
        }
        else {
          return of(null);
        }
      })
    );
  }

  //intialize(){
  //  this.auth.onAuthStateChanged(user => {
  //    if(user){
  //      this.authenticated= true;
  //      onValue(ref(this.db.database, 'users/' + user.uid), (snapshot) => {
  //        this.data = snapshot.val();
  //        this.currentUser = Object.setPrototypeOf(this.data, User);
  //      },{onlyOnce:true})
  //    }
  //  })
  //}

  ngOnInit(){}

  async login(email:string, password:string){
    return await this.auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  async register(email:string, fname:string, lname:string, password:string, role:string){
    return await this.auth.createUserWithEmailAndPassword(email, password)
    .then(async user => {
      //const newUser: User | null | undefined = new User(user.user?.uid!, user.user?.email!, fname, lname, role);
      await this.db.collection('users').doc(user.user?.uid).set({email:email, fname:fname, lname:lname, role:role})
      .then(async resp => {
        //window.alert('Registered successfully');
        //await this.auth.signOut();
        this.router.navigate(['/dashboard']);
      })
    })
    /*.catch(error => {
      console.log(error);
    });*/
  }
  async logout(){
    await this.auth.signOut();
    this.router.navigate(['/home']);
  }

  isLoggedIn(): Promise<User | null | undefined> {
    const userPromise = new Promise<User | null | undefined>((resolve, reject) => {
      this.user$.pipe(take(1)).subscribe(user => {
        resolve(user);
      });
    })
    return userPromise;
  }



}
