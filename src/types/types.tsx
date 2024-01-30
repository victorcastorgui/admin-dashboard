export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface ProductType {
  name: string;
  price: number;
  weight: number;
  width: number;
  length: number;
  category: string;
  discount: number;
  caseDetail: string;
  dial: string;
  hand: string;
  material: string;
  importantNote: string;
  movement: string;
  model: Model[];
}

export interface Model {
  name: string;
  photos: string[];
  stock: number;
}
