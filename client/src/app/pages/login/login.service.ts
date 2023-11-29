import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class UserService {
    private loginurl = 'http://localhost:8080/login';

    constructor(private http: HttpClient) { }

    login(username: String, password: String): Observable<String> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        const body = { username: username, password: password };

        return this.http.post<string>(this.loginurl, body, httpOptions);
    }

}
