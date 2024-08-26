import { Component, Directive } from "@angular/core";

@Component({
    selector:'Error',
    templateUrl : 'Error.html',
    styleUrl : 'Error.css'
})

export class Error{
    message: string = "Zby there is somethig wrong";
    
}