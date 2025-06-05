import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days = 1) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days);

  return cookies.set(name, value, {
    expires: expires,
    path: "/",
    secure: true,
    sameSite: "Strict",
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, path = "/") => {
  cookies.remove(name, { path: path });
};

export const removeKakaoCookie = () => {
  const redirectUri = encodeURIComponent(
    import.meta.env.MODE === "development" // 실행 환경이
      ? "http://localhost:5173/"
      : "https://gongchaek.site/"
  );
  const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_KAKAO_REST_API_KEY_LOCAL
      : import.meta.env.VITE_KAKAO_REST_API_KEY
  }&logout_redirect_uri=${redirectUri}`;

  window.location.href = kakaoLogoutUrl;
};
