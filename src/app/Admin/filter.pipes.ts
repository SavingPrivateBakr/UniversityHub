import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name : 'filters'})

export class filterpipes implements PipeTransform{
   transform(items: any[], searchTerm: string, property: string): any[] {
      if (!items) {
        return [];
      }
      if (!searchTerm) {
        return items;
      }
  
      searchTerm = searchTerm.toLowerCase();
  
      return items.filter(item => {
        // Convert the specified property to a string and compare exactly
        const value = item[property]?.toString().toLowerCase();
        return value === searchTerm;
      });
   
    }
    
}