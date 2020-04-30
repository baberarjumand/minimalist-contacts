import { User } from '../model/user.model';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import { AuthService } from './auth.service';
import { mergeMap, take } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<User> {
  private anonDisplayPic =
    'https://lh3.googleusercontent.com/WWf1rBcOuRR0_ZnI7oITQ84B12npfXzFhKk1Gk_begmmxBBUe_fIbO1atx_BBLJPwVPlT-cDqs6UA8yZKKBPjmNivTAVFcuJHtdJ6av5usoHhxAzsq0oXNHN-zZW0eS4KjPlBkOsgECs5xHeJxz7M8Gyy7K1n6fr2carPyPMm5HDi5y0oO3z_rzpBwF2A0QP9UUFAwhhGI3FhJrIgWzhy8HCi9_cbHdZBdQ9b8RITy5L745hJCkBzAcm4_Pt4t0DYhKq_PLeGkY8ej1XxuY_XlbcnFd8ZXHgRR1_0TMlqTPGZjgv1OqGDafE7Ff4JOe0DpW2z8fXQNaM8ujT-IdB-o2AT9Lsrv-9KXkICSrMZeSGWkTUVdCDW_NZdSLfxqi8DGcLWECMbklf2_G7cdEr9hzYkYzAHhTsLDQjZKmOD7IKzzwdK-f8FZNhUfqYG-kMHxxD9KMBaD_j4fOGX9tr4hgWqbK5qZITQWM-Hq9Nb-hIIVdkkX3EuufsRc4bXGJSjmTq216ZeBNTK2ztmuMxmd02Jt415gwn_KHcljKHdSkwIZliIlBtDar5vcjlKl3kzHLlyk3fO6-q9Y1vBYX3xKo6OMDzSkb53h0mFuYoJDQ_ybqTyJj3W4m2ufXOwnSUFLMHulycCr2w7C7E3jz6XVakHiAejVhdDR9UVjYXZP2-tL-B3NseEsoVVIhdLK8tZQfWONkPi8FtuTZSYrbAUQrluU6YXQ3N8UlU0OFd4qOoR2JNnPE49N_3=s809-no';
  private anonymousUser: User = {
    uid: '1337',
    email: 'john@doe.com',
    displayName: 'John Doe',
    photoURL: this.anonDisplayPic,
    emailVerified: false,
    isAnon: true,
  };

  constructor(private authService: AuthService) {}

  resolve(): Observable<User> {
    return this.authService.isUserAnon().pipe(
      mergeMap((isUserAnon) =>
        iif(
          () => isUserAnon,
          of(this.anonymousUser),
          this.authService.getCurrentUserDetails()
        )
      ),
      take(1)
    );
  }
}
