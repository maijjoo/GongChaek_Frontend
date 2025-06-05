import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 토론 API - DiscussionCommentController / ChatGPTController
const host = `${API_SERVER_HOST}/api/discussion`;
const gptHost = `${API_SERVER_HOST}/api/ai`; // AI 토론 결과 분석

// 토론 목록
export const getForums = async (status, sort, search, lastId = null) => {
  let apiRoute = `${host}?status=${status}&sort=${sort}&search=${search}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }

  const res = await jwtAxios.get(apiRoute);
  return res.data.data;
};

// 토론 상세
export const getForumDetail = async (discussionId) => {
  const res = await jwtAxios.get(`${host}/detail?discussionId=${discussionId}`);

  return res.data.data;
};

// 찬성 참석
export const addJoinAgree = async (discussionId) => {
  const res = await jwtAxios.post(
    `${host}/joinAgree?discussionId=${discussionId}`
  );
  return res;
};

// 반대 참석
export const addJoinDisagree = async (discussionId) => {
  const res = await jwtAxios.post(
    `${host}/joinDisagree?discussionId=${discussionId}`
  );
  return res;
};

// 발의글 작성
export const writePropose = async (isbn13, title, content, startDate) => {
  const data = {
    isbn13,
    title,
    content,
    startDate,
  };
  const res = await jwtAxios.post(`${host}/register`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// 발의글 수정
export const modifyPropose = async (
  discussionId,
  title,
  content,
  modifyStartTime
) => {
  const data = {
    discussionId,
    title,
    content,
    modifyStartTime,
  };
  const res = await jwtAxios.patch(`${host}/update`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

// 토론 삭제(발의 상태일 때만)
export const deleteForum = async (discussionId) => {
  const res = await jwtAxios.delete(`${host}/${discussionId}`);
  return res;
};

// AI 토론 결과 분석
export const getAIResult = async (discussionId) => {
  const res = await jwtAxios.get(`${gptHost}/discussion/${discussionId}`);
  return res.data.data;
};
