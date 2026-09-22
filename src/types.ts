export interface OpenFdaData {
  brand_name?: string[];
  generic_name?: string[];
  route?: string[];
  product_type?: string[];
}

export interface DrugResult {
  setid?: string;
  openfda: OpenFdaData;
  indications_and_usage?: string[];
  warnings?: string[];
  dosage_and_administration?: string[];
}
