import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root' // Provides the service at the root level
  })

export class navbarservice{
    show :boolean  =false;
    shoow = new EventEmitter();
     shower()
    {
      this.shoow.emit(true);
     

            this.show=true;
        
    }

     leave()
    {
        this.shoow.emit(false);
        this.show=false;
    }
}
