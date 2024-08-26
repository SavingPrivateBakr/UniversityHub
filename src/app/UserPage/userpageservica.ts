import { EventEmitter, Injectable, Renderer2 } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { UserContainer } from "../Authintication/UserContainer";
import { AuthService, formers } from "../Authintication/AuthinticationService";
import { Auth } from "../Authintication/Authintication.";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";


export interface SendingCv {
  id:string;
    studentName: string;
    universityName: string;
    approvalStatus: boolean;
    files: string; // Base64 string
    descussion : string;
  }
  
@Injectable({
    providedIn: 'root'
  })
export class UserPageDirectives {
  
public event=new EventEmitter();
public events= new EventEmitter();
public  body : SendingCv[]=[];   
public shower : boolean = false;
public eventimage = new Subject<string>();

public eventimager = new Subject<string>();
public  imageSrc :string |undefined;
public  id:string |undefined;
 public discuss :string |undefined;
constructor(private Auth : AuthService ,private client:HttpClient)
   {
    

}

ImageDetails(files:string , id:string , discuss: string)
{
this.imageSrc=files;
this.id=id;
this.discuss=discuss;
}
     
  GetDetails() : Observable<SendingCv[]> | undefined
  {
    const dataUser = localStorage.getItem("DataUser");
    let w : any;

    if (dataUser) {
        
             w = JSON.parse(dataUser);

             const headerse = new HttpHeaders({
              'apper': w.email,
              'Authorization': `Bearer ${w.Token}` // Use Bearer token if that’s your token type
            });
           
              
              // Make the HTTP GET request with headers
           return   this.client.get<SendingCv[]>('http://universityhub.runasp.net/University/ApplyApplication',{headers : headerse})
         
     

            } 
            return undefined;
  }


  GetDetailsAdmin() : Observable<SendingCv[]> | undefined
  {
    const dataUser = localStorage.getItem("DataUser");
    let w : any;

    if (dataUser) {
        
             w = JSON.parse(dataUser);

             const headerse = new HttpHeaders({
              'apper': w.email,
              'Authorization': `Bearer ${w.Token}` // Use Bearer token if that’s your token type
            });
           
              
              // Make the HTTP GET request with headers
           return   this.client.get<SendingCv[]>('http://universityhub.runasp.net/admin/GetAllApplications',{headers : headerse})
         
     

            } 
            return undefined;
  }

  
}