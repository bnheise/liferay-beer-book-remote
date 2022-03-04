export interface NewBeer {
  brewer: string;
  name: string;
  eBC: number;
  iBU: number;
  aBV: number;
  style: Style;
  price: number;
  imageUrl: string;
}

interface Style {
  key: string;
}

export const emptyBeer: NewBeer = {
  brewer: "",
  name: "",
  eBC: -1,
  iBU: -1,
  aBV: -1,
  style: { key: "" },
  price: -1,
  imageUrl: "",
};

export interface StyleOptions {
  label: string;
  value: string;
}
