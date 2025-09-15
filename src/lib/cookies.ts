// 쿠키 옵션을 위한 인터페이스 정의
interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: Date;
  "max-age"?: number;
  secure?: boolean;
  samesite?: "Strict" | "Lax" | "None";
  [key: string]: string | number | boolean | Date | undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  // 1. 옵션 설정
  options = {
    path: "/",
    ...options,
  };

  // 2. 쿠키 문자열 만들기
  // ex) cookieString = "맛있는음식=치킨"
  let cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  // 3. 옵션 추가하기
  for (const optionKey in options) {
    // optionKey -> path
    // options = { path: "/", secure: true }
    // options[optionKey] -> options["path"] => "/"
    const optionValue = options[optionKey]; // "/"

    if (
      optionValue === false ||
      optionValue === undefined ||
      optionValue === null
    ) {
      continue;
    }

    let finalValue = optionValue;
    // 날짜 -> expires -> 날짜
    // toUTCString() -> "Fri, 31 Dec 9999 23:59:59 GMT"
    if (optionValue instanceof Date) {
      finalValue = optionValue.toUTCString();
    }

    // "맛있는음식=치킨;"
    cookieString += "; " + optionKey;

    // secure=true
    if (finalValue !== true) {
      // "맛있는음식=치킨; path=/"
      cookieString += "=" + finalValue;
    }
  }

  document.cookie = cookieString;
}

export function isCookieExists(name: string): boolean {
  const encodedName = encodeURIComponent(name);
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(encodedName + "="))
    ? true
    : false;
}

export function deleteCookie(name: string) {
  document.cookie = encodeURIComponent(name) + "=; Max-age=0";
}

export function getCookie(name: string): string | undefined {
  // 1. 쿠키 이름을 인코딩한다.
  // ex) "user name" -> "user%20name";
  const encodedName = encodeURIComponent(name);

  // 2. document.cookie를 "; "로 분리하여 쿠키 배열을 만든다.
  // ex) document.cookie= "user%20name=kim; theme=dark" -> ["user%20name=kim", "theme=dark"]
  const cookies = document.cookie.split("; ");

  // 3. 배열에서 존재하는지 찾기
  // ex) "user%20name"이라는 키가 있는지를 찾아야 됨
  const cookie = cookies.find((cookie) => cookie.startsWith(encodedName + "="));
  if (cookie) {
    // "user%20name=kim" -> kim
    return decodeURIComponent(cookie.split("=")[1]);
  }

  return undefined;
}
