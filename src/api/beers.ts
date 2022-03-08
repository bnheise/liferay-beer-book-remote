import { NewBeer } from "../interfaces/newBeerForm";
import { components } from "./schema";

export const getBeers = async (setData: React.Dispatch<any>) => {
  const response = await fetch(
    `${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers?p_auth=${
      Liferay.authToken
    }`
  );
  const json: any = await response.json();
  const beers: components["schemas"]["Beer"][] = json.items;
  setData(beers);
};

export const postBeer = async (data: NewBeer) => {
  let formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-csrf-token": Liferay.authToken,
  };
  const response = await fetch(
    `${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/`,
    { method: "POST", body: formData, headers }
  );

  return response.json();
};
