export const json = {
  string: function (arg: any) {
    return JSON.stringify(arg);
  },

  parse: function (arg: any) {
    try {
      return JSON.parse(arg.replace(/\n|\r/g, ""));
    } catch (e) {
    }

    return null;
  }
};
