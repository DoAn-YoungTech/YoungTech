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
    categoryChild: Category_Paren[];
    loading: boolean;
    error: string | null;
    idCateParen :number;
  }
  export interface CategoryChildState {
    categoryChild: Category_Child[];
    nameCategory:Category_Child[];
    loading: boolean;
    error: string | null;
    idCateChild:number;
  }
  
