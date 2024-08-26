import { HttpClient, HttpParams } from "@angular/common/http";
import { computeMsgId, Conditional } from "@angular/compiler";
import { Component, ComponentFactoryResolver, EventEmitter, Input, input, ViewChild, viewChild } from "@angular/core";
import { EmailValidator, FormControl, FormControlName, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "./AuthinticationService";
import { router } from "../app.routes";
import { ActivatedRoute, Router } from "@angular/router";
import { ErrorDirective } from "../Error/ErrorDirective";
import { Error} from "../Error/Error"
import { navbarservice } from "../NavBar/NavBarservice";
@Component({
    selector : 'Auth',
    templateUrl:'Authintication.html',
    styleUrl :'Authintication.css'
})

export class Auth{

    constructor(private http : HttpClient, private Auth : AuthService,private routes :Router,private active :ActivatedRoute,
        private navbarservic :navbarservice){}
    private apiUrl = 'http://universityhub.runasp.net/Account/register';
            public errormessage : string[] | undefined=[];
 
    formsignup : NgForm | any= new FormGroup(
        {




 username: new FormControl(null),

firstname: new FormControl(null),

lastname : new FormControl(null),
          
            Email : new FormControl(null,Validators.email),
        Password : new FormControl(),
    });
    @ViewChild(ErrorDirective) child :ErrorDirective | any;

    error : boolean =false;
    showSignup : boolean | any = true;
    toggleForm(){
        this.errormessage=undefined
        this.showSignup=!this.showSignup;
    }
  

    signup()
    {
        let email : string |any =this.formsignup.get('Email').value;
      
        let password : string |any =this.formsignup.get('Password').value

       let username: string |any=this.formsignup.get('username').value

    let    firstname: string |any =this.formsignup.get('firstname').value
        
    let    lastname :string |any  =this.formsignup.get('lastname').value
                  
   
         this.Auth.signup(email,password,username,firstname,lastname).subscribe(w=>{
            this.navbarservic.shower();
           
            this.routes.navigate(['/home'],
                {relativeTo:this.active})
            },
            er=>{    this.errormessage = er['error']
                .replace(/\.\s*/g, '\n')  // Replace periods with newlines
                .split('\n')   ;           // Split by newlines
                    this.errormessage?.pop();
            console.log(this.errormessage);

            });
         this.formsignup.reset();
    }

    login()
    {
        let email : string |any =this.formsignup.get('Email').value;
      
        let password : string |any =this.formsignup.get('Password').value
           

         this.Auth.login(email,password).subscribe(w=>{
    
            this.navbarservic.shower();
           
            this.routes.navigate(['/home'],
                {relativeTo:this.active})
             
            },
        er=>(this.errormessage=er['error']));
    
    }

    Error(mess : string)
    {
       
       const host= this.child.ViewContainerRef;

      const componentreft=  host.createComponent(Error);
            componentreft.instance.message=mess.replace(/_/g, ' ').toLowerCase();;
    }
    
    
  
}