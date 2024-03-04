export const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

export const getParams = (match) => {
  const values = match.result.slice(1);
  // 뒤에 쿼리파라미터 등이 붙어도 인지할 수 있게 작성
  // to do : 다시 보기...
  const keys = Array.from(match.route.Path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};
