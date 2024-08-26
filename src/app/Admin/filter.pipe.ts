import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name : 'filter'})

export class filterpipe implements PipeTransform{
    transform(value: any, args?: any):any {
     if(!value)
     {
        return null;
     }
     if(!args)
     {
        return value;
     }

     args=args.toLowerCase();
     return value.filter(function(w:any){return JSON.stringify(w).toLowerCase().includes(args);

     })
    }
    
}