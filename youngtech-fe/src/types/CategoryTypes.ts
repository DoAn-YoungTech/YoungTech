 export interface Category_Paren {
    id: number; 
    name: string;
    idCateParen:number;
  }

  export interface Category_Child {
    id: number; 
    name: string;
    parent_id:number

  }

  export interface CategoryParenState {
    data: Category_Paren[];
    loading: boolean;
    error: string | null;
    idCateParen :number;
  }
  export interface CategoryChildState {
    data: Category_Child[];
    loading: boolean;
    error: string | null;
    idCateChild:number;
  }
  
