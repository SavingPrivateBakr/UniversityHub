import { Directive, HostBinding, HostListener } from "@angular/core";
import { UserPageDirectives } from "../userpageservica";

@Directive({selector:'[close]'})

export class close{
    @HostBinding('style.background') background: string | undefined;
    show : boolean = false;
    constructor( private _RR :UserPageDirectives) {}
    
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
      
        if(event.currentTarget==event.target )
        {
          
        this._RR.event.emit(false);
       
        }  
    }
}