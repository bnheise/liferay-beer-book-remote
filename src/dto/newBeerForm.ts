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
  eBC: 0,
  iBU: 0,
  aBV: 0,
  style: { key: "" },
  price: 0,
  imageUrl: "",
};

export interface StyleOptions {
  label: string;
  value: string;
}
