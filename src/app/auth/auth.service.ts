import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://localhost/digi_service/public/index.php';
  errorData: {};
  isLoggedIn = false;
  basic = '';

  constructor(private http: HttpClient) { }

  redirectUrl: string;

  login(username: string, password: string) {
    console.log(username,password);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basic });
  let options = { headers: headers }; 

//     headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
// headers.append('Access-Control-Allow-Credentials', 'true');

return this.http.post('http://localhost/digi_service/public/index.php', JSON.stringify({username: username, password: password}), options);
    /*return this.http.post(`${this.serverUrl}`, {username: username, password: password},options)
    .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
         // this.isLoggedIn = true;
        }
      }),
      catchError(this.handleError)
    );*/
  }

  getAuthorizationToken() {
    return "23";

    /*const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;*/
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
