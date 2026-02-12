export type Food = {
  id: string;
  barcode?: string;
  product_name: string;
  brands?: string;
  image_url?: string;
  nutriscore?: string;
  energy: number;        
  proteins: number;      
  fat: number;           
  carbohydrates: number;
  raw_json: string;     
  created_at: string;
};
