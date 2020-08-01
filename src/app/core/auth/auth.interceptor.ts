import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../../models/token.model'
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: Token = this.authService.token;

        if (token.isValid()) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token.token)
            });

            return next.handle(cloned);
        }
        else {
            this.authService.logout();
            return next.handle(req);
        }
    }
}