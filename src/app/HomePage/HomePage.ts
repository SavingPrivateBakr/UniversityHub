import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../Authintication/AuthinticationService";
import { JwtHelperService } from '@auth0/angular-jwt';
export interface back{
    alpha_two_code: string;
  country: string;
  domains: string[];
  name: string;
  state_province: string | null;
  web_pages: string[];
}


@Component({
    selector:'home',
    templateUrl:'HomePage.html',
    styleUrl:'HomePgae.css'

})


export class home implements OnInit{
  universities: back[] = []; // List of universities
  paginatedUniversities: back[] = []; // Current page of universities
  currentPage = 1;
  itemsPerPage = 8;
  load = false;

  constructor(private http: HttpClient, private auth : AuthService) {

    
  }

  async ngOnInit() {
    // Fetch universities data
    this.http.get<back[]>('http://universities.hipolabs.com/search').subscribe(data => {
  
      this.universities = data;
      this.load = true;
      this.updatePagination(); // Update pagination once data is loaded
    });
   
    this.auth.autologin();
    
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUniversities = this.universities.slice(startIndex, endIndex);
  }

  nextPage() {

    this.getRoles();
    if (this.currentPage * this.itemsPerPage < this.universities.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  setPage(page: number) {
    if (page > 0 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.universities.length );
  }

    
  private jwtHelper = new JwtHelperService();

 
  getRoles() {
    const dataUser = localStorage.getItem('DataUser');
    let ww =null;
    if (dataUser) {  // Check if dataUser is not null
     
        const token: any = JSON.parse(dataUser);
        console.log(token.Token);
        ww =token.Token;
      }
  
   
  
      if (!ww) return [];
      
      const decodedToken = this.jwtHelper.decodeToken(ww);
       console.log(decodedToken || []);
       return null;
    }
  

    
}