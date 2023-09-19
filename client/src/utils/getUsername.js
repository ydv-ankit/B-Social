function getUsername(email) {
  let uname = email.split("@");
  return uname[0];
}

export { getUsername };
