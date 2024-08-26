import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
@Injectable({
    providedIn : 'root'
})
export class alreadyauth implements CanActivate{

    constructor(private routers : Router)
    {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>  {
       if(localStorage.getItem('DataUser')!=null)
       {
        return true;
       }
     else
        {   return this.routers.createUrlTree(['/auth']);}
      
    }

    
}