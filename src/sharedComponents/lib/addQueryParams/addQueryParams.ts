/**
 * Возвращает параметры строки запроса из строки search с добавленными additionalParams в виде строки включая '?'.
 * @param search - строка параметров к которой добавить additionalParams
 * @param additionalParams - объект с доп парамерами
 */
export function getQueryParams(additionalParams?: OptionalRecord<string, string>, search?: string) {
  if (!additionalParams) return '';
  const searchParams = new URLSearchParams(search);
  Object.entries(additionalParams).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value);
    }
  });
  return `?${searchParams.toString()}`;
}

/**
 * Возвращает текущие параметры строки запроса с добавленными additionalParams в виде строки включая '?'.
 * @param additionalParams
 */
export function getCurrentQueryParams(additionalParams?: OptionalRecord<string, string>) {
  return getQueryParams(additionalParams, window.location.search);
}

/**
 * Добавляет additionalParams к текущим параметрам строки запроса
 * @param additionalParams
 */
export function addCurrentQueryParams(
  additionalParams: OptionalRecord<string, string>,
  replace = false,
) {
  if (replace) {
    window.history.replaceState(null, '', window.location.pathname + getCurrentQueryParams(additionalParams));
  } else {
    window.history.pushState(null, '', window.location.pathname + getCurrentQueryParams(additionalParams));
  }
}

/**
 * Устанавливает additionalParams к текущим параметрам строки запроса
 * @param additionalParams
 */
export function setCurrentQueryParams(params: OptionalRecord<string, string>, replace = false) {
  if (replace) {
    window.history.replaceState(null, '', window.location.pathname + getQueryParams(params));
  } else {
    window.history.pushState(null, '', window.location.pathname + getQueryParams(params));
  }
}
