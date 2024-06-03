// --------- Authorization  -------------

export interface Signin {
  username: string;
  password: string | number;
}

export interface Request {
  sign_in: (data: Signin) => any;
}

export interface AuthStore {
  getData: (data: Signin) => Promise<any>;
}

// ------------ Category ----------------

export interface CategoryRequest {
  get_categories: () => any;
  create_category: (data: any) => any;
  update_category: (id: number, data:any) => any;
  delete_category: (id: number) => any;
}

export interface CategoryStore {
  categories: any[];
  isLoading: boolean;
  getCategories: () => Promise<any>;
  createCategory: (data: any) => Promise<any>;
  updateCategory: (id: number, data:any) => Promise<any>;
  deleteCategory: (id: number) => Promise<any>;
}

// ------------ Global ----------------

export interface TableProps {
  columns: {
    title: string;
    dataIndex: string;
    key: string;
    render?: any;
  }[];
  data: { key: string; name: string }[];
  boolean: boolean;
}
