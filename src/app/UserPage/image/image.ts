import { AfterViewInit, Component, Directive, input, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { UserPageDirectives } from "../userpageservica";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { JwtHelperService } from "@auth0/angular-jwt";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";

interface SendingCv {
    studentName: string;
    universityName: string;
    approvalStatus: boolean;
    files: string; // Base64 string
  }

@Component({

    selector:'image',
    templateUrl:'image.html',
    styleUrl:'image.css'
    
})


export class image implements OnChanges,OnInit{

  private jwtHelper = new JwtHelperService();
    @Input() imageSrc: string | undefined;
    @Input() show: boolean = false;
    @Input() id: string | undefined;
    @Input() discuss :string | undefined;
    admin : boolean = false;
    imageVisible: boolean = false;
    safeImageSrc: SafeResourceUrl | undefined;
    myForm:FormGroup|any;
  
    constructor(private sanitizer: DomSanitizer,private fb: FormBuilder,private http:HttpClient,private rr: UserPageDirectives) {

      const dataUser = localStorage.getItem("DataUser");
        if (dataUser) {
          const user = JSON.parse(dataUser);
          const decodedToken: any =this.jwtHelper.decodeToken(user.Token);
          const roles =  decodedToken.role|| [];
          console.log(roles);
          if(roles=='admin')
          {
            this.admin=true;
          }
          else{
          this.admin=false;
          }
    }

    this.myForm = this.fb.group({
     
      Id: [this.id  , Validators.required],
      Discuss: [null, Validators.required]
    });
  }
  ngOnInit(): void {
   
  this.safeImageSrc= this.rr.imageSrc;
  this.discuss=this.rr.discuss;
  this.id=this.rr.id;

  }
  submit(){

    this.myForm.get('Id')?.setValue(this.id);

    if (this.myForm.valid) {
     
      const formData = new FormData();
      formData.append('Discuss', this.myForm.get('Discuss')?.value);
      formData.append('Id', this.myForm.get('Id')?.value);

  

    const dataUser = localStorage.getItem("DataUser");
    console.log(dataUser);
    if (dataUser) {
      const user = JSON.parse(dataUser);
    
      const headersa = new HttpHeaders({
        'Authorization': `Bearer ${user.Token}`
      });
    
      this.http.post('http://universityhub.runasp.net/admin/VerifyApplication',formData,{headers:headersa}).subscribe(w=>{   this.rr.event.emit(false);  window.location.reload();});
   
        }
    }
  }
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['show']) {
        this.imageVisible = this.show;
      }
  
      if (changes['imageSrc']) {
        this.safeImageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageSrc || '');
      }
    }
  }