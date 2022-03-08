import { components } from "./schema";

export const getBeers = async (
  setData: React.Dispatch<components["schemas"]["Beer"][]>
) => {
  const response = await fetch(
    `${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers?p_auth=${
      Liferay.authToken
    }`
  );
  const json: any = await response.json();
  const beers: components["schemas"]["Beer"][] = json.items;
  setData(beers);
};

export const postBeer = async (data: components["schemas"]["Beer"]) => {
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-csrf-token": Liferay.authToken,
  };

  const response = await fetch(
    `${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/`,
    { method: "POST", body: JSON.stringify(data), headers }
  );

  return response.json();
};
