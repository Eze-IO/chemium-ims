import {
    HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import { empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status == 404) {
                    this.router.navigateByUrl('/404', {replaceUrl: true});

                    return empty;
                } else if (error instanceof HttpErrorResponse && error.status == 403) {
                    this.router.navigateByUrl('/403', {replaceUrl: true});

                    return empty;
                } else if (error instanceof HttpErrorResponse && error.status == 500) {
                    this.router.navigateByUrl('/500', {replaceUrl: true});

                    return empty;
                }
                else
                    return throwError(error);
            }));
    }
}

export const HttpErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
};