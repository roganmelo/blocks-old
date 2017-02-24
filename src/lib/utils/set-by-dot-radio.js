export default (model, modelProp, value, name) => {
  let parts = modelProp.split('.');
  let lastIndex = parts.length - 1;

  return parts.reduce((obj, part, index) => {
    if(index !== lastIndex) {
      if (!obj.hasOwnProperty(part) || typeof obj[part] !== 'object') {
        obj[part] = {};
      }

      return obj[part];
    }

    if(!Array.isArray(obj[part])) {
      obj[part] = value;
    } else {
      const item = obj[part].find(item => item.name === name);

      if(item) {
        obj[part].splice(obj[part].indexOf(item), 1);
      }

      obj[part].push({ name, value });
    }

    return obj;
  }, model);
};
