import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./AuthinticationService";
import { map, Observable, tap } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class authguard implements CanActivate{

    constructor(private auth : AuthService , private routers : Router)
    {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
   
   return this.auth.user.pipe(map(w=>{
            if(!!w)
            {
                
                return true;
            }
            else {
                    
               
                    if(localStorage.getItem('DataUser')!=null)
                    {    return true;}
                    
                
                return this.routers.createUrlTree(['/auth']);
               
            }
        }
     ))
    
   
    }

}