import { Option } from "../interfaces/option";
import { ListType } from "../interfaces/style";

export const getStyles = (
  styleListId: string,
  setStyleOptions: React.Dispatch<React.SetStateAction<Option[] | undefined>>
) => {
  Liferay.Service(
    "/listtype.listtypeentry/get-list-type-entries",
    {
      listTypeDefinitionId: styleListId,
      start: 0,
      end: 100,
    },
    function (response: ListType[]) {
      setStyleOptions(
        response.map((item) => ({
          value: item.key,
          label: item.nameCurrentValue,
        }))
      );
    }
  );
};
