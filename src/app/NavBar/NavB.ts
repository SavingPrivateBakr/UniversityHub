import { Directive, ElementRef, Host, HostBinding, HostListener } from "@angular/core";
import { Scroll } from "@angular/router";

@Directive({
    selector: '[changer]'
  })

  export class NavB{
    @HostBinding('style.backgroundColor') color : string |any;
    @HostBinding('style.transition') trans : string| any;
    constructor(private el: ElementRef ) { }
    @HostListener('window:scroll')
    onWindowScroll(event: Screen) {
  
        
        if(window.pageYOffset>=500)
        {
         
             this.trans='0.5s'
            this.color="#ffffff";
        }
        else
        {
            this.trans='0.5s'
            this.color="#ffffff00"
        }
   
     
    }

   
}
  