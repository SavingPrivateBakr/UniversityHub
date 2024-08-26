import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { home } from './HomePage/HomePage';
import { Auth } from './Authintication/Authintication.';
import { authguard } from './Authintication/Auth0Guard';
import { alreadyauth } from './Authintication/Auth1Guard';
import { Applyuniversitys } from './Applyuniversity/Applyuniversity';
import { userpage } from './UserPage/userpage';
import { admin } from './Admin/admin';
import { userGuard } from './Authintication/AuthuserGuard';
import { AdminGuard } from './Authintication/AuthAdminGuard';
import { UniversitySearch } from './UniversitySearch/UniversitySearch';
import {  DetailsUniComponent } from './Details/DetailsUni';



export const routes: Routes = [
  
{
  path:'home',component:home,children :[
   
  ]
},
{
  path:'auth',component:Auth
},
{
  path:'Applyuniversity/:name',component:Applyuniversitys,canActivate:[alreadyauth]
},


{
  path:'userpage',component:userpage,canActivate:[userGuard]
},
{
  path:'admin',component:admin,canActivate:[AdminGuard]
},
{
  path:'UniversitySearch',component:UniversitySearch
},
{
  path:'Details/:name',component:DetailsUniComponent
},
{
  path:'**',component:Auth
}];


@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class router {
    
}