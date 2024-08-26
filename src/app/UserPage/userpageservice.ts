import { Directive, ElementRef, EventEmitter, HostListener, Injectable, Input, IterableDiffers, QueryList, Renderer2, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { UserPageDirectives } from './userpageservica';

@Directive({
  selector: '[showcv]' // This will match elements with the `showcv` attribute
})


export class UserPageDirective {



    constructor(private el: ElementRef, private renderer: Renderer2,private rr: UserPageDirectives) {}
  
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
     
  
      
      
        this.rr.event.emit(true);
      
   
        

 
        
       
    }
  
}