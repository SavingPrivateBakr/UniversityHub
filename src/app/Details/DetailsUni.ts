import { Component } from "@angular/core";

@Component({
    selector:'DetailsUni',
    templateUrl : 'DetailsUnis.html',
    styleUrl:'DetailsUni.css'
})

export class DetailsUniComponent{
  name: string = 'University Name';
  country: string = 'Country';
  profileImage: string = 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
  studentCount: number = 10000;
  programCount: number = 100;
  description: string = 'University description goes here...';

  featuredPrograms = [
    { name: 'Computer Science', description: 'Learn programming and software development.' },
    { name: 'Business Administration', description: 'Develop management and leadership skills.' },
    // Add more programs as needed
  ];

  facilities = [
    { name: 'Library', icon: 'fas fa-book' },
    { name: 'Sports Center', icon: 'fas fa-futbol' },
    { name: 'Laboratories', icon: 'fas fa-flask' },
    // Add more facilities as needed
  ];

  admissionsInfo: string = 'Admissions information and requirements go here...';

  constructor() { }

  ngOnInit(): void {
    // Fetch university data from a service if needed
  }

  openContactForm(): void {
    // Implement logic to open contact form
    console.log('Opening contact form...');
  }
}