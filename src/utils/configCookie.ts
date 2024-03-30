export function StoreCookie(dataToken: any) {
  setCookie("access_token", dataToken.access_token);
  setCookie("access_token", dataToken.access_token);
  setCookie("refresh_access_token", dataToken.refresh_access_token);
  setCookie("access_token_expired", dataToken.access_token_expired);
  setCookie(
    "refresh_access_token_expired",
    dataToken.refresh_access_token_expired
  );
}

export function getDataCookie() {
  const accessToken = getCookie("access_token");
  const refreshAccessToken = getCookie("refresh_access_token");
  const accessTokenExpired = getCookie("access_token_expired");
  const refreshAccessTokenExpired = getCookie("refresh_access_token_expired");

  return {
    accessToken,
    refreshAccessToken,
    accessTokenExpired,
    refreshAccessTokenExpired,
  };
}

export function removeCookie() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function setCookie(name: string, value: string) {
  document.cookie = name + "=" + (value || "") + "; path=/";
}

function getCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
