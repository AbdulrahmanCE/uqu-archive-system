import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { api } from '../services/api';
import { ProgressBarService } from '../services/progress-bar.service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(
        private snackBar: MatSnackBar,
        private progressBar: ProgressBarService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.progressBar.changeAuthStatus(true);

        const token: string = localStorage.getItem('token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if ((event instanceof HttpResponse)) {
                    if(event.body.message) {
                        this.snackBar.open(event.body.message, "نجاح", {duration: 4000});
                    }
                    this.progressBar.changeAuthStatus(false);
                }
                
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let reqAndErr = {
                    request: request,
                    error: error
                };
                
                if(error.status >= 400 && error.status < 500) {
                    this.snackBar.open(error.error.message, "خطأ", {duration: 4000});

                }

                this.progressBar.changeAuthStatus(false);
                
                return throwError(reqAndErr);
            }));
    }
}