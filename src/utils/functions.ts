export const getTranslationKey = (key: string) => {
  return key.split(" ").join("-").toLowerCase().replace(".", "");
};
