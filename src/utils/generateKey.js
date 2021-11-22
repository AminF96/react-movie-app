function generateKey() {
  let key = 0;
  return () => {
    ++key;
    return key;
  };
}

export default generateKey();
