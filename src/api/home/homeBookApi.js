import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 홈 추천 도서 API - AladinAPIController
const host = `${API_SERVER_HOST}/api/aladinApi`; // 베스트 셀러, 취향 맞춤
const gptHost = `${API_SERVER_HOST}/api/ai`; // AI 추천 도서

// 에러 공통 처리
const handleError = (err, message) => {
  if (import.meta.env.MODE === "development") {
    console.error(message, err);
  }
  throw new Error(message);
};

// 베스트셀러 목록 출력
export const getBestSeller = async () => {
  try {
    const res = await jwtAxios.get(`${host}/bestseller`);
    return res.data.data;
  } catch (err) {
    handleError(err, "Failed to fetch best seller data");
  }
};

// 취향 맞춤 목록 출력
export const getCategoryBest = async () => {
  try {
    const res = await jwtAxios.get(`${host}/editorChoice`);
    console.log("==========category bestseller: ", res);

    return res.data.data;
  } catch (err) {
    handleError(err, "Failed to fetch category best seller data");
  }
};

// AI 맞춤 목록 출력
export const getAIRecommend = async ({ signal }) => {
  try {
    const res = await jwtAxios.get(`${gptHost}/recommended`, {
      signal,
    });
    return res.data.data;
  } catch (err) {
    handleError(err, "Failed to fetch AI best seller data");
  }
};
