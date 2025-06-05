import React, { useEffect, useState } from "react";
import { PiMagnifyingGlass, PiBarcode } from "react-icons/pi";
import ISBNScanner3 from "./ISBNScanner3";
import ISBNReader from "./ISBNReader";
import { useNavigate } from "react-router-dom";

// 책 제목, 작가명, ISBN으로 검색
const ISBNBookSearch = ({ onSearchSubmit, searchHistory = null }) => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 관리
  const [isScannerActive, setIsScannerActive] = useState(false); // ISBN 스캔 활성화
  const [isReaderActive, setIsReaderActive] = useState(false); // ISBN 촬영 활성화

  useEffect(() => {
    if (searchHistory) {
      setSearchKeyword(searchHistory);
    }
  }, [searchHistory]);

  // 검색 실행 처리
  const handleSearch = () => {
    if (searchKeyword) {
      onSearchSubmit(searchKeyword); // 상위 컴포넌트로 검색 실행
    }
  };

  // 엔터키 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터키 입력 시 검색 실행
    }
  };

  const handleSwitchToCapture = () => {
    setIsScannerActive(false);
    setIsReaderActive(true);
  };

  const handleOpenScanner = () => {
    setIsScannerActive(true);
  };

  const handleCloseScanner = () => {
    setIsScannerActive(false);
  };

  const handleSuccessToGetISBN = (code) => {
    setIsReaderActive(false);
    setIsScannerActive(false);
    navigate(`detail/${code}`, { replace: true });
  };

  return (
    <div className="w-full flex h-10 justify-center items-center bg-undbgmain gap-2">
      <div
        className="w-full h-full px-2 flex items-center justify-between border
    border-unddisabled rounded-full bg-white"
      >
        {/* 검색 버튼 */}
        <button onClick={handleSearch}>
          <PiMagnifyingGlass size={28} color="#78716C" />
        </button>
        {/* 검색어 입력 */}
        <input
          type="search"
          placeholder="책 제목, 작가명, ISBN으로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)} // 입력값 상태 업데이트
          onKeyDown={handleKeyDown} // 엔터키 이벤트 처리
          className="text-undtextdark text-und16 w-full pl-1"
        />
        {/* 바코드 버튼 */}
      </div>
      <button onClick={handleOpenScanner}>
        <PiBarcode size={28} color="#78716C" />
      </button>
      {/* ISBN 스캔 모달 렌더링 */}
      {isScannerActive && (
        <ISBNScanner3
          onSwitchToCapture={handleSwitchToCapture}
          onCloseScannner={handleCloseScanner}
          onSuccessScan={handleSuccessToGetISBN}
        />
      )}
      {isReaderActive && <ISBNReader onSuccessRead={handleSuccessToGetISBN} />}
    </div>
  );
};

export default ISBNBookSearch;
