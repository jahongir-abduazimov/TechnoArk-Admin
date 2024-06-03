// --------- Authorization  -------------

export interface Signin {
  email: string;
  password: string | number;
}

export interface Signup extends Signin {
  first_name: string;
  last_name: string;
  phone_number: string
}

export interface Request {
  sign_in: (data: Signin) => any;
  sign_up: (data: Signup) => any;
}

export interface AuthStore {
  getData: (data: Signin) => Promise<any>;
  createData: (data: Signup) => Promise<any>;
}

// ------------ Category ----------------

export interface CategoryRequest {
  get_categories: () => any;
  create_category: (data: any) => any;
  update_category: (id: number, data:any) => any;
  delete_category: (id: number) => any;
  get_subcategory: (id: any) => any;
}

export interface CategoryStore {
  categories: any[];
  subCategories: any[];
  isLoading: boolean;
  getCategories: () => Promise<any>;
  createCategory: (data: any) => Promise<any>;
  updateCategory: (id: number, data:any) => Promise<any>;
  deleteCategory: (id: number) => Promise<any>;
  getSubCategory: (id: any) => Promise<any>;
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
