export const is = {
  // Check if the argument is a function
  function: (arg: any): arg is Function => typeof arg === 'function',

  // Check if the argument is an object and not null or an array
  object: <T>(arg: T): arg is T =>
    typeof arg === 'object' && arg !== null && !Array.isArray(arg),

  // Check if the argument is an array
  array: <T>(arg: any): arg is T[] => Array.isArray(arg),

  // Check if the argument is a string
  string: (arg: any): arg is string => typeof arg === 'string',

  // Check if the argument is a valid Date object
  date: (date: any): date is Date =>
    date instanceof Date || !isNaN(new Date(date).getTime()),

  // Check if two values are equal (deep comparison)
  equal: <T>(data1: T, data2: T): boolean =>
    JSON.stringify(data1) === JSON.stringify(data2),

  // Check if a value is an image MIME type (e.g., 'image/png')
  image: (type: any): type is string =>
    typeof type === 'string' && /image\/(png|jpg|jpeg|gif|webp)/.test(type),
};
