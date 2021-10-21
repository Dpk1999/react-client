export const getError = (error, field) => error[field];
export const hasError = (error) => (!!error.length);
export const isTouched = (touched) => {
//   console.log(touched);
  let flag = false;
  touched.forEach((element) => {
    // console.log('element', element);
    if (element) {
      flag = true;
    }
  });
  return flag;
};
