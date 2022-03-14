import { useLocation, useNavigate } from "react-router-dom";

export function useLiferayNavigate() {
  const { pathname } = useLocation();
  const _navigate = useNavigate();
  return (url: string) => {
    const subdashIndex =
      pathname.indexOf("/-") === -1 ? pathname.length : pathname.indexOf("/-");

    _navigate(
      `${window.location.href
        .replace(Liferay.ThemeDisplay.getPortalURL(), "")
        .substring(0, subdashIndex)}/-/${url}`,
      { replace: true }
    );
  };
}
