import { Component } from "@angular/core";
import { back } from "../HomePage/HomePage";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../Authintication/AuthinticationService";
import { ConstantPool } from "@angular/compiler";
import { elementAt } from "rxjs";

@Component({

    selector:'UniversitySearch',
    templateUrl : 'UniversitySearch.html',
    styleUrl : 'UniversitySearch.css'
})


export class UniversitySearch{
  name : string | undefined ;
  original:back[]=[];
    universities: back[] = []; // List of universities
    selectedCountry:any;
    filteredUniversities : any;
    paginatedUniversities: back[] = []; // Current page of universities
    currentPage = 1;
    itemsPerPage = 8;
    load = false;
    shower:boolean = false;
    constructor(private http: HttpClient, private auth : AuthService) {
  
      
    }
  
    async ngOnInit() {
      // Fetch universities data
      this.http.get<back[]>('http://universities.hipolabs.com/search').subscribe(data => {
        this.original=data;
        this.universities = data;
        this.load = true;
        this.updatePagination(); 
      });
     
      this.auth.autologin();
      
    }
    clicker()
    {
      this.filteredUniversities = this.original.filter(element =>{ 
        if(this.name!=undefined && this.selectedCountry)
        {
       return  element.name.toLowerCase().includes(this.name)&&  element.country.toLowerCase().includes(this.selectedCountry.toLowerCase());;
        }
       
        else if(this.selectedCountry && this.name==undefined)
        {
         return element.country.toLowerCase().includes(this.selectedCountry.toLowerCase());
        }
        else if(this.name)
          {
           return element.name.toLowerCase().includes(this.name);
          }
        else{
          return true;
        }
      }
      );
      this.universities=this.filteredUniversities;
      this.currentPage = 1;
      this.name=undefined;
      this.updatePagination(); 
      
    }
  
    updatePagination() {
  
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedUniversities = this.universities.slice(startIndex, endIndex);
    }
  
    nextPage() {
  
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
      return this.universities.length > this.itemsPerPage ?Math.ceil(this.universities.length ): 1;
    }
  
      
}