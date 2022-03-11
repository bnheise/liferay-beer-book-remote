export const loadObjectDef = async (filepath: any) => {
  const response = await fetch(filepath);
  console.log(response);
  const json = await response.text();
  console.log(json);
};

interface ObjectDefinition {
  active: boolean;
  objectActions: Array<any>;
  label: object;
  panelCategoryKey: string;
  pluralLabel: object;
  objectLayouts: Array<any>;
  system: boolean;
  objectViews: Array<any>;
  objectFields: ObjectField[];
  scope: string;
  name: string;
  portlet: boolean;
  actions: object;
  status: object;
}

interface ObjectField {
  indexedAsKeyword: boolean;
  indexed: boolean;
  indexedLanguageId: string;
  name: string;
  DBType: string;
  label: FieldLabel;
  type: string;
  required: boolean;
}

interface FieldLabel {
  [key: string]: string;
}

export const objectExists = (
  object: ObjectDefinition,
  allObjects: ObjectDefinition[]
) => {
  let fields = object.objectFields;

  for (let currentObject of allObjects) console.log(currentObject);
};

const fieldMatches = () => {};
