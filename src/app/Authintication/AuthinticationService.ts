import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, first, last, Subject, tap } from "rxjs";
import { UserContainer } from "./UserContainer";

export interface formers{
  token:	string,
    email:	string,
    expiresOn:	Date,
    localId:	string,
    dateofexpiration : string;
}

@Injectable({
    providedIn: 'root' // Provides the service at the root level
  })
export class AuthService implements OnInit {
  
    private  apiUrl:string|undefined ;
    private  para = new HttpParams().set('key', 'AIzaSyB7o4qqaqurvHiB0xCDPdyt2OKN36qOtZc');
    private  body : any;
      user = new BehaviorSubject<UserContainer | null>(null);
     tokenexpirationtime:any;
      
        constructor(private http : HttpClient)
        {
        
        
        }
    ngOnInit(): void {
    
    }
    
        signup(email:string,password:string,username:string,firstname:string,lastname:string)
        {
           
            this.apiUrl='http://universityhub.runasp.net/Account/register';
            this.body = {
                email,
                password,
                username ,
                lastname,
                firstname
              };
       
             return this.http.post<any>(this.apiUrl, this.body);
        }

        login(Email : string,Password : string)
        {
           
            this.apiUrl = 'http://universityhub.runasp.net/Account/Login';
            this.body = {
                Email,
                Password,
            
              };

             return this.http.post<formers>(this.apiUrl, this.body).pipe(tap(w=>{
              console.log(w);
                const expirationTime =  new Date(w.expiresOn).getHours() * 3600000;
                const expirationdata=new Date(w.expiresOn);
         
                const usera = new UserContainer(w.email,
                  w.token,expirationTime,expirationdata); 
                localStorage.setItem('DataUser',JSON.stringify(usera));
                console.log(usera);
                this.user.next(usera);
               
            })
            );
        }

        autologin()
        {
         const data = localStorage.getItem('DataUser');
  
         if(!data)
         {
       
          return ;
         }
         const jdata : formers = JSON.parse(data);
         
         const expirationTime =  new Date(jdata.expiresOn).getHours() * 3600000;
         const loaded = new UserContainer(jdata.email,jdata.token,expirationTime,new Date(new Date()+jdata.dateofexpiration));  

         if(loaded.token)
         {
       
        const newexpiration = new Date(jdata.dateofexpiration).getTime()-new Date().getTime();
    
        this.autologout(newexpiration);
          this.user.next(loaded);
         }
        }

        autologout(expirationtime : number)
        {
          
            this.tokenexpirationtime=setTimeout(() => {
              this.signout();
            }, (expirationtime));
        }

        

        signout()
        {
          window.location.reload();
          localStorage.removeItem('DataUser');
          this.user.next(null);
          if(this.tokenexpirationtime)
          {
            clearTimeout(this.tokenexpirationtime);
          }
          this.tokenexpirationtime=null;
        }

    
}