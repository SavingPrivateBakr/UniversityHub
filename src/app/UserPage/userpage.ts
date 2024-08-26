import { AfterViewInit, Component, Input, input, OnInit } from "@angular/core";
import { UserContainer } from "../Authintication/UserContainer";
import { AuthService, formers } from "../Authintication/AuthinticationService";
import { Auth } from "../Authintication/Authintication.";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserPageDirectives } from "./userpageservica";
import { map } from "rxjs";

interface SendingCv {
  id:string;
    studentName: string;
    universityName: string;
    approvalStatus: boolean;
    descussion : string;
    files: string; // Base64 string
  }
  

@Component({
selector : "userpage",templateUrl : "userpage.html",styleUrl : "userpage.css",

})

export class userpage implements OnInit  {

    public  body : SendingCv[]=[];   
    public shower : boolean = false;
  public we :string | undefined;

    
    constructor(private Auth : AuthService ,private client:HttpClient,private rr :UserPageDirectives )
    {
 
      

     }   
 

    
    ngOnInit(): void {
      if( this.rr.GetDetails()!=undefined){
      this.rr.GetDetails()?.pipe(map(w=>{
        
        w.sort((a, b) => {
          if (a.approvalStatus === b.approvalStatus) return 0;
          return a.approvalStatus ? 1 : 0;
        });
        
        
        return w})).subscribe(
        response => {     
    
            this.body=response;
            
          });
         
                        this.rr.event.subscribe(w=>this.shower=w);
                        
                        this.rr.eventimage.subscribe((w:string) => {
                          this.we=w;
                        console.log(this.we);
                        });

                 
                        
                     
    }
  
    }

    senddetails(files:string,id:string,descussion:string)
    {
     
      console.log(files);
      this.rr.ImageDetails(files,id,descussion);
      this.shower=true;
    }
  }
    
