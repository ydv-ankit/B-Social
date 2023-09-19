function getStoredCookies() {
  const cookies = document.cookie;
  return cookies.split(";");
}

function setCookies(key, value) {
  document.cookie = key + "=" + value;
}

export { getStoredCookies, setCookies };
