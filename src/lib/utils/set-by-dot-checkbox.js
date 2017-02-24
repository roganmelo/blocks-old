export default (model, modelProp, value, checked) => {
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
      obj[part] = checked;
    } else {
      if(checked) {
        obj[part].push(value);
      } else {
        obj[part].splice(obj[part].indexOf(value), 1);
      }
    }

    return obj;
  }, model);
};
