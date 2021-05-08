const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHENTICATED = 401;
const HTTP_UNAUTHORIZED = 403;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER = 500;
const HTTP_BAD_GATEWAY = 502;
const HTTP_SERVICE_UNAVAILABLE = 503;
const HTTP_GATEWAY_TIMEOUT = 504;
const regions = {
  OCE: "OC1",
  NA: "NA1",
  KR: "KR",
  JP: "JP1",
  EUW: "EUW1",
  EUNE: "EUN1",
  BR: "BR1",
  LAS: "LA1",
  LAN: "LA2",
  RU: "RU",
  TR: "TR",
};
const countries = {
  OCE: "americas",
  NA: "americas",
  KR: "asia",
  JP: "asia",
  EUW: "europe",
  EUNE: "europe",
  BR: "americas",
  LAS: "americas",
  LAN: "americas",
  RU: "europe",
  TR: "europe",
};
const RANKED_SOLO = "RANKED_SOLO_5x5";
const RANKED_FLEX = "RANKED_FLEX_SR";

export {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_NO_CONTENT,
  HTTP_NOT_FOUND,
  HTTP_UNAUTHENTICATED,
  HTTP_UNAUTHORIZED,
  HTTP_OK,
  HTTP_INTERNAL_SERVER,
  HTTP_BAD_GATEWAY,
  HTTP_SERVICE_UNAVAILABLE,
  HTTP_GATEWAY_TIMEOUT,
  RANKED_SOLO,
  RANKED_FLEX,
  regions,
  countries,
};
