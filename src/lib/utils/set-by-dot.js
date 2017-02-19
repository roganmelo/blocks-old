export default (model, modelProp, value) => {
  let parts = modelProp.split('.');
  let lastIndex = parts.length - 1;

  return parts.reduce((obj, part, index) => {
    if(index !== lastIndex) {
      if (!obj.hasOwnProperty(part) || typeof obj[part] !== 'object') {
        obj[part] = {};
      }

      return obj[part];
    }

    obj[part] = value;

    return obj;
  }, model);
};
