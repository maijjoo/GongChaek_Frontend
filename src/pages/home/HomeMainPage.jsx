import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
  getAIRecommend,
  getBestSeller,
  getCategoryBest,
} from "../../api/home/homeBookApi";

import BasicLayout from "../../layouts/BasicLayout";
import { TitleSearch } from "../../layouts/TopLayout";

import HomeBooksList from "../../components/home/HomeBookLIst";
import TabCondition from "../../components/commons/TabCondition";
import LoadingPage from "../LoadingPage";
import LoadingSpinner from "../../components/commons/LoadingSpinner";

import { PiTargetBold, PiHeartFill, PiMedalFill } from "react-icons/pi";

// 책 추천 홈 페이지
const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);

  // 베스트셀러 쿼리
  const {
    data: bestSeller = [],
    isLoading: bestLoading,
    error: bestError,
  } = useQuery({
    queryKey: ["bestSeller"],
    queryFn: getBestSeller,
  });

  // 카테고리별 추천 쿼리
  const {
    data: categoryBest = {},
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["categoryBest"],
    queryFn: getCategoryBest,
  });

  // AI 추천 쿼리
  const {
    data: aiRecommend = [],
    isLoading: aiLoading,
    isError: aiError,
  } = useQuery({
    queryKey: ["aiRecommend"],
    queryFn: getAIRecommend,
  });

  // 응답 빠른 API를 도착 즉시 렌더링하기 위한 변수
  const otherLoading = bestLoading || categoryLoading;

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (book) => {
    navigate(`detail/${book.isbn13}`);
  };

  // 로딩 피드백 텍스트
  const AILoadingMessage = (
    <>
      <LoadingSpinner size={"sm"} />
      <p className="text-und14 text-undtextgray">
        AI가 내 책장을 분석중이에요!
      </p>
      <p className="text-und14 text-undtextgray">잠시만 기다려 주세요</p>
    </>
  );

  // 에러 피드백 텍스트
  const AIFailMessage = (
    <p className="text-und14 text-undred">
      AI가 책장을 분석하는 중 오류가 발생했어요😢
    </p>
  );

  // activeTab 초기화
  useEffect(() => {
    if (!categoryBest || typeof categoryBest !== "object") return;

    const keys = Object.keys(categoryBest);
    if (keys.length > 0 && !activeTab) {
      console.log("💡 setting activeTab to:", keys[0]);
      setActiveTab(keys[0]);
    }
  }, [categoryBest]);

  return (
    <BasicLayout>
      {otherLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {/* 상단 네비 */}
          <div className="fixed top-0 left-0 w-full z-50 bg-undbgmain">
            <TitleSearch title={"홈"} showLine={true} />
          </div>
          {/* 베스트 셀러 */}
          <div className="pt-20 pl-6 pb-10">
            <div className="flex w-full h-full pb-2">
              <PiMedalFill size={24} color="#D55636" />
              <p className="ml-2 font-heavy text-undtextdark text-und18">
                주간 베스트 셀러
              </p>
            </div>
            <HomeBooksList
              books={Array.isArray(bestSeller) ? bestSeller : []}
              onCardClick={handleCardClick}
            />
          </div>
          {/* 카테고리 추천 도서 */}
          <div className="pb-10">
            <div className="flex w-full h-full pb-2 pl-6">
              <PiHeartFill size={24} color="#D55636" />
              <p className="ml-2 font-heavy text-undtextdark text-und18">
                취향별 추천 도서
              </p>
            </div>
            <div className="pb-4">
              <TabCondition
                tabs={Object.keys(categoryBest || {})}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showLine={false}
              />
            </div>
            {activeTab && (
              <div className="pl-6">
                <HomeBooksList
                  books={
                    Array.isArray(categoryBest[activeTab])
                      ? categoryBest[activeTab]
                      : []
                  }
                  onCardClick={handleCardClick}
                />
              </div>
            )}
          </div>
          {/* AI 추천 도서 */}
          <div className="pb-20 px-6">
            <div className="flex w-full h-full pb-2">
              <PiTargetBold size={24} color="#D55636" />
              <p className="ml-2 font-heavy text-undtextdark text-und18">
                AI 추천 도서
              </p>
            </div>
            {/* AI 추천 도서 비동기 렌더링, 에러, 로딩 피드백 */}
            {aiLoading ? (
              AILoadingMessage
            ) : aiError ? (
              AIFailMessage
            ) : (
              <HomeBooksList
                books={Array.isArray(aiRecommend) ? aiRecommend : []}
                onCardClick={handleCardClick}
              />
            )}
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export default HomePage;
