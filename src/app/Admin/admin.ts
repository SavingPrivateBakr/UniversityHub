import { Component } from "@angular/core";
import { SendingCv, UserPageDirectives } from "../UserPage/userpageservica";
import { pipe } from "rxjs";

@Component({
    selector : 'admin',
    templateUrl : 'admin.html',
    styleUrl : 'admin.css'
})

export class admin { 

    public  body : SendingCv[]=[];   
    public shower : boolean = false;
  public we :string | undefined;
  public name :string | undefined;
    public id : string |undefined;
    public old : boolean =true;
    public new : boolean =true;
    constructor(private rr :UserPageDirectives )
    {
 
      

     }   
 

    
    ngOnInit(): void {
      if( this.rr.GetDetails()!=undefined){
      this.rr.GetDetailsAdmin()?.subscribe(
        response   => {        
            this.body=response;

  
          });
              
        this.rr.event.subscribe(w=>this.shower=w);
                     
    }
    }

}