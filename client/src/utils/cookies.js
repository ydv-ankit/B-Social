function getUserId() {
  const cookies = document.cookie;
  const regex = /userId=([^',]+)/;

  let userId = null;

  // Loop through the array and extract userId values
  cookies.split(";").forEach((item) => {
    const match = item.match(regex);
    if (match) {
      // Push the matched userId value into the array
      userId = match[1];
    }
  });
  return userId;
}

function setCookies(key, value) {
  document.cookie = key + "=" + value;
}

export { setCookies, getUserId };
