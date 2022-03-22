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

export const saveBeer = async (
  data: components["schemas"]["Beer"],
  id: number | string | undefined = ""
) => {
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-csrf-token": Liferay.authToken,
  };
  const copy = { ...data };
  copy.actions = undefined;
  copy.creator = undefined;
  copy.status = undefined;
  const response = await fetch(
    `${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/${id}`,
    { method: id ? "PATCH" : "POST", body: JSON.stringify(copy), headers }
  );

  return response.json();
};

export const deleteBeer = async (data: components["schemas"]["Beer"]) => {
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-csrf-token": Liferay.authToken,
  };

  const response = await fetch(
    `${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/${data.id}`,
    { method: "DELETE", body: JSON.stringify(data), headers }
  );

  return response.text();
};
