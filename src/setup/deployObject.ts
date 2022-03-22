import { objectExists } from "./util";

const run = async () => {
  const response = await fetch(
    "http://test@liferay.com:test@localhost:8080/o/object-admin/v1.0/object-definitions/"
  );

  const data = await response.json();
  console.log(data);
  // objectExists();
};

run();
