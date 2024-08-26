import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector : '[UniversityApplication]'
})

export class UniversityApplication implements OnInit{





    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        let targetElement: HTMLElement | null = null;
        const elements = this.el.nativeElement.getElementsByClassName('apply-buttons');
       
     if(elements)
     {
     for (let i = 0; i < elements.length; i++) {
      this.renderer.setStyle(elements[i],'transition', 'opacity 0.3s ease-in-out');
      this.renderer.setStyle(elements[i], 'opacity', '0');
    }
  }
        
    }

    @HostListener('mouseenter') onMouseEnter() {


      const elements = this.el.nativeElement.getElementsByClassName('apply-buttons');
     
  
   if(elements)
   {
   for (let i = 0; i < elements.length; i++) {
    this.renderer.setStyle(elements[i],'transition', 'opacity 0.3s ease-in-out');
    this.renderer.setStyle(elements[i], 'opacity', '1');
  }
}
    
      }

      @HostListener('mouseleave') onMouseLeave() {
       
      const elements = this.el.nativeElement.getElementsByClassName('apply-buttons');
     
  
      if(elements)
      {
      for (let i = 0; i < elements.length; i++) {
       this.renderer.setStyle(elements[i],'transition', 'opacity 0.3s ease-in-out');
       this.renderer.setStyle(elements[i], 'opacity', '0');
     }
   }
      }
}
