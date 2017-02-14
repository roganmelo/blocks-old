export default (model, modelProp, value, isCheckbox, checked) => {
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
      if(!isCheckbox) {
        obj[part] = value;
      } else {
        obj[part] = checked;
      }
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
