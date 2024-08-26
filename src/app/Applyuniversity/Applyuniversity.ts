import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
    selector : 'Applyuniversity',
    templateUrl:'Applyuniversity.html',
    styleUrl : 'Applyuniversity.css'
})

export class Applyuniversitys{
  show:boolean =false
    succ : boolean = false;
    myForm:FormGroup|any;
      name : any;
  constructor(private fb: FormBuilder, private http: HttpClient,private router : ActivatedRoute) {}
  private jwtHelper = new JwtHelperService();
  ngOnInit() {
    let i : any;

    if(localStorage.getItem('DataUser'))
    {
      i= localStorage.getItem('DataUser');
 
    }

    this.router.paramMap.subscribe(w=>
      this.name = w.get('name'),
    )
    console.log(this.name);
    this.myForm = this.fb.group({
      username: [JSON.parse(i).email, Validators.required],
      UniversityName: [ this.name , Validators.required],
      cv: [null, Validators.required] // Initialize with null
    });
  }

  shower() {
    if (this.myForm.valid) {
      const formData = new FormData();
      formData.append('StudentName', this.myForm.get('username')?.value);
      formData.append('UniversityName', this.myForm.get('UniversityName')?.value);
      formData.append('User', this.myForm.get('username')?.value);
  
      const cvFile = this.myForm.get('cv')?.value;
      if (cvFile instanceof File) {
        const fileFormData = new FormData();
        fileFormData.append('image', cvFile);
  
        // Get the token from local storage
        const dataUser = localStorage.getItem("DataUser");
        if (dataUser) {
          const user = JSON.parse(dataUser);
          const decodedToken: any =this.jwtHelper.decodeToken(user.Token);
          const roles =  decodedToken|| [];
  
          // Headers with the Bearer token
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${user.Token}`
          });
  
          // Parameters for ImgBB API
          const params = new HttpParams().set('key', '1dc98f49e5210d19b03a64bdbe070925');
        
          this.http.post<any>('https://api.imgbb.com/1/upload', fileFormData, { params: params })
            .subscribe(
              imgBBResponse => {
             
                // Append the image URL to the form data
                formData.append('Files', imgBBResponse.data.display_url);
               
                // Submit the form data to your API
                this.http.put('http://universityhub.runasp.net/University/AddApplication', formData, { headers: headers })
                  .subscribe(
                    response => {
                      console.log(response);
                      this.succ = true;
                    },
                    error => {
                      console.error('Error submitting application:', error);
                      this.show = true;
                    }
                  );
              },
              error => {
                console.error('Error uploading file:', error);
                this.show = true;
              }
            );
        } else {
          console.error('No user data found in local storage.');
          this.show = true;
        }
      } else {
        console.error('The cv field must be a File object.');
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
     
      this.myForm.patchValue({
        cv: file // Assign the File object directly
      });
      this.myForm.get('cv')?.updateValueAndValidity();
    }
    else{
     
    }
  }
}
