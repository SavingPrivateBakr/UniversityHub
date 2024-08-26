import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./AuthinticationService";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
       
        return this.auth.user.pipe(
            take(1),
            exhaustMap(user => {
         
               
                if (!user || !user.token) {
                  
                    return next.handle(req);
                }

              
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                   
            
                return next.handle(modifiedReq);
            })
        );
    }

     shouldExclude(request : any) {
        // List of URLs or conditions to exclude the interceptor
        const excludedUrls = ['http://universities.hipolabs.com/search','http://universityhub.runasp.net/University/Universities','http://universityhub.runasp.net/Account/register'];
        
        return excludedUrls.includes(request.url);
      }
}