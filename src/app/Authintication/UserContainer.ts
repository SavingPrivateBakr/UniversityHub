

export class UserContainer{
    constructor (
        private email : string | any ,
         private Token : string ,
         
          private expiresOn : number ,
          private dateofexpiration:Date,
        private registered? : string){

        }

        get token()
        {
        

            if(!this.dateofexpiration || new Date() > this.dateofexpiration)
            {
                return null;
            }
            return this.Token;
        }
}