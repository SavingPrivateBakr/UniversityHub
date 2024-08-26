import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NavBar } from './NavBar/NavBar';
import { home } from './HomePage/HomePage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavB } from './NavBar/NavB';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpContext } from '@angular/common/http';
import { Auth } from './Authintication/Authintication.';
import { router } from './app.routes';
import { AuthService } from './Authintication/AuthinticationService';
import { AuthInterceptor } from './Authintication/AuthinticationInterseptor';
import { ErrorDirective } from './Error/ErrorDirective';
import { UniversityApplication } from './HomePage/HomePaged';
import { Applyuniversitys } from './Applyuniversity/Applyuniversity';
import { userpage } from './UserPage/userpage';
import { SafeUrlPipe } from './santinizer';
import { UserPageDirective } from './UserPage/userpageservice';
import { image } from './UserPage/image/image';
import { close } from './UserPage/image/Imageclose';
import { admin } from './Admin/admin';
import { filterpipe } from './Admin/filter.pipe';
import { UniversitySearch } from './UniversitySearch/UniversitySearch';
import { filterpipes } from './Admin/filter.pipes';
import { DetailsUniComponent } from './Details/DetailsUni';


@NgModule({
  declarations: [
    Applyuniversitys,
    UniversityApplication,
    AppComponent,
    NavBar,home,NavB,Auth,ErrorDirective,userpage,SafeUrlPipe,UserPageDirective,image,close,admin,filterpipe,UniversitySearch
    ,filterpipes,DetailsUniComponent
  ],
  imports: [
    BrowserModule,  ReactiveFormsModule,HttpClientModule ,router,FormsModule 
    
  ],
  providers:[
  {
    provide:HTTP_INTERCEPTORS,
   useClass : AuthInterceptor,
   multi:true
  }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
