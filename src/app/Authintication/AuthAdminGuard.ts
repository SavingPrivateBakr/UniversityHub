import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
@Injectable({
    providedIn : 'root'
})
export class AdminGuard implements CanActivate{
    private jwtHelper = new JwtHelperService();
    constructor(private routers : Router)
    {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>  {
        const dataUser = localStorage.getItem("DataUser");
        if (dataUser) {
          const user = JSON.parse(dataUser);
          const decodedToken: any =this.jwtHelper.decodeToken(user.Token);
          const roles =  decodedToken.role|| [];
          if(roles=='admin')
          {
            return true;
          }
          else{
            return false;
          }
  
    }
    else 
    {
        return this.routers.createUrlTree(['**']);
    }

}

}
