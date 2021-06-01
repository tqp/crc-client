import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    private TOKEN_KEY = 'AuthToken';
    private token: Subject<string> = new Subject<string>();
    public tokenObs = this.token.asObservable();

    constructor() {
    }

    public signOut(): void {
        window.sessionStorage.removeItem(this.TOKEN_KEY);
        window.sessionStorage.clear();
        localStorage.removeItem(this.TOKEN_KEY);
    }

    public saveJwtToken(token: string): void {
        // console.log('TokenStorageService -> saveJwtToken: ' + token);
        window.sessionStorage.removeItem(this.TOKEN_KEY);
        window.sessionStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.TOKEN_KEY, token);
        this.token.next(token); // Important: The Toolbar and Navigation components are listening for changes to this Observable.
    }

    public getJwtToken(): string {
        // console.log('TokenStorageService -> getToken: token=' + sessionStorage.getItem(this.TOKEN_KEY));
        return sessionStorage.getItem(this.TOKEN_KEY);
    }
}
