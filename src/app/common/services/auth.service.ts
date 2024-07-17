import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as AuthUser,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserRole } from '../../models/user-role.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUserSubject = new BehaviorSubject<AuthUser | null>(null);
  authUser$ = this.authUserSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private userService: UserService,
    private auth: Auth
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.authUserSubject.next(user);
      if (user) {
      } else {
        this.userService.updateUserRole(UserRole.Guest);
      }
    });
  }

  signIn(credentials: { email: string; password: string }): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      switchMap(() => of(undefined))
    );
  }

  signUp(credentials: { name: string; email: string; password: string }) {
    return from(createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      switchMap((credential) => {
        const uid = credential.user.uid;
        return from(
          setDoc(doc(this.firestore, `users/${uid}`), {
            uid,
            name: credentials.name,
            role: UserRole.Registered,
          })
        );
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.authUser$.pipe(switchMap((user) => of(!!user)));
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth)).pipe(switchMap(() => of(undefined)));
  }
}
