export const saveToLocalStorage = (storageName, storageContents) => {
  const storageNameToString = storageName.toString();
  const storageContentsStringified = JSON.stringify(storageContents);
  localStorage.setItem(storageNameToString, storageContentsStringified);
};

export const getFromLocalStorage = storageName => {
  const storageNameToString = storageName.toString();
  return localStorage.getItem(storageNameToString);
};

export const deleteFromLocalStorage = storageName => {
  const storageNameToString = storageName.toString();
  localStorage.removeItem(storageNameToString);
};
