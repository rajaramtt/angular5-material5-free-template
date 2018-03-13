export class ProductsForm {
    constructor(
      public id?: number,
      public product?:string,
      public name?: string,
      public price?: number,
      public quantity?: number,
      public status?: string,
      public images?:any[]
    ) {}
  }
