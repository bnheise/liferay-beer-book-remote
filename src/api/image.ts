export const postImage = async (
  file: File,
  beerName: string,
  repoId: string,
  folderId: string
) => {
  let imageData = new FormData();
  const randomSuffix = Math.random();

  imageData.append("file", file);
  imageData.append("repositoryId", repoId);
  imageData.append("folderId", folderId);
  imageData.append("mimeType", file?.type);
  imageData.append("title", genBeerImageName(beerName, randomSuffix));
  imageData.append(
    "sourceFileName",
    appendRandomSuffix(file?.name, randomSuffix)
  );
  imageData.append("description", `Product image for ${beerName}`);
  imageData.append("changeLog", "");

  const imagePostUrl = `${Liferay?.ThemeDisplay?.getPortalURL()}/api/jsonws/dlapp/add-file-entry?p_auth=${
    Liferay.authToken
  }`;

  const response = await fetch(imagePostUrl, {
    method: "POST",
    body: imageData,
  });

  return response.json();
};

const genBeerImageName = (name: string, random: number) =>
  `${name} Product Image ${random}`;

const appendRandomSuffix = (filename: string, random: number) =>
  filename.replace(".", `${random}.`);
