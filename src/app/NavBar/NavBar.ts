import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild, ViewChildren } from "@angular/core";
import { AuthService } from "../Authintication/AuthinticationService";
import { ActivatedRoute, Router } from "@angular/router";
import { navbarservice } from "./NavBarservice";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { router } from "../app.routes";
@Component({
    selector:'NavBar',
    templateUrl:'NavBar.html',
    styleUrl:'NavBar.css'
})

export class NavBar implements OnInit, AfterViewInit {
    text  :string |undefined="NaN";
    private jwtHelper = new JwtHelperService();
    
    sh:any=localStorage.getItem("DataUser");

    constructor(private auth : AuthService,private routes :Router,private active :ActivatedRoute,private navbarservic :navbarservice,private renders : Renderer2,private cdr: ChangeDetectorRef)
    {
   
    }

    ngOnInit() {
 
      this.sh = localStorage.getItem("DataUser");
      const email = JSON.parse(this.sh)?.email;
      if(email)
      this.text=email;
  
        this.navbarservic.shoow.subscribe(w => {
          this.sh = w;
  
          if (this.sh) {
            this.sh = localStorage.getItem("DataUser");
            const email = JSON.parse(this.sh)?.email;
            if (email) {
              console.log(email);
              
            
            this.text=email;
            
         
  
             
            }
          }
        });
      
    }
      ngAfterViewInit() {
      
    }
   
    signout(){

            this.auth.signout();
            
            this.sh=localStorage.getItem("DataUser");
            this.routes.navigate(['home'],{relativeTo:this.active});
    }

    Navigate()
    {
      const dataUser = localStorage.getItem("DataUser");
      if (dataUser) {
        const user = JSON.parse(dataUser);
        const decodedToken: any =this.jwtHelper.decodeToken(user.Token);
        const roles =  decodedToken.role|| [];
        console.log(roles);
        if(roles=='admin')
        { 
       
          this.routes.navigate(['admin']);
        }
        else{
          this.routes.navigate(['userpage']);
        }
  }
    }

   
}