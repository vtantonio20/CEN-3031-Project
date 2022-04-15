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

  ngOnInit(){}

  async login(email:string, password:string) {
    return await this.auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  async register(email:string, fname:string, lname:string, password:string, role:string) {
    return await this.auth.createUserWithEmailAndPassword(email, password)
    .then(async user => {
      //const newUser: User | null | undefined = new User(user.user?.uid!, user.user?.email!, fname, lname, role);
      await this.db.collection('users').doc(user.user?.uid).set({email:email, fname:fname, lname:lname, role:role})
      .then(async resp => {
        this.router.navigate(['/dashboard']);
      })
    })
  }

  async updateEmail(email: string, password: string, newE: string): Promise<any> {
    let prom = new Promise(async (resolve, reject) => {
      await this.auth.signInWithEmailAndPassword(email, password)
      .then(async cred => {

        await cred.user?.updateEmail(newE)
        .then(success => {
          this.db.collection('users').doc(cred.user?.uid).update({email: newE});
          resolve('success'); 
        })
        .catch(error => { reject('Invalid Email'); });

      })
      .catch(error => { reject('Invalid Password'); });
    });
    return prom;
  }

  async updatePassword(email: string, oldP: string, newP: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.auth.signInWithEmailAndPassword(email, oldP)
      .then(async cred => {

        await cred.user?.updatePassword(newP)
        .then(success => { resolve('success'); })
        .catch(error => { reject('Invalid New Password'); });

      })
      .catch(error => { reject('Incorrect Password'); });
    });
  }

  async deleteAccount(email: string, password: string): Promise<any> {
    let prom = new Promise(async (resolve, reject) => {
      await this.auth.signInWithEmailAndPassword(email, password)
      .then(cred => {
        cred.user?.delete().then(() => { this.router.navigate(['/home']); resolve('success'); })
        .catch(error => { reject('Could not delete account') });
      })
      .catch(error => { reject('Invalid Password') });
    });
    return prom;
  }

  async logout() {
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