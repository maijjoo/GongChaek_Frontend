import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { OnlyTitle } from "../../layouts/TopLayout";
import MenuBox from "../../components/settings/MenuBox";
import ProfileBox from "../../components/settings/ProfileBox";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { getMyInformation } from "../../api/settings/myPageApi";

const AdminPage = () => {
  const { doLogout, moveToPath, isAdmin, loginState } = useCustomLogin();
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    if (!isAdmin()) {
      alert("잘못된 접근 입니다.");
      navigate("/", { replace: true });
    }
  }, [isAdmin, navigate]);

  // 초기 정보 로드
  useEffect(() => {
    fetchMyInfo();
  }, [loginState]);

  const fetchMyInfo = async () => {
    try {
      const res = await getMyInformation();
      setMyInfo(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickLogout = () => {
    doLogout(myInfo.social);
    alert("로그아웃되었습니다.");
    moveToPath("/", { replace: true });
  };

  // 관리자가 아닌 경우 null 반환 (렌더링하지 않음)
  if (!isAdmin()) {
    return null;
  }

  return (
    <BasicLayout>
      <div className="w-full flex flex-col px-7 py-8 gap-4">
        <div className="w-full">
          <ProfileBox myInfo={myInfo} isAdmin={true} />
        </div>
        <div className="w-full">
          <MenuBox
            text={"신고 내역"}
            hasChild={false}
            childList={[]}
            link={"report"}
          />
        </div>

        <div className="w-full">
          <MenuBox
            text={"고객 지원"}
            hasChild={true}
            childList={["이용약관", "개인정보처리방침"]}
            link={["termsOfUse", "privacyPolicy"]}
          />
        </div>

        <div className="w-full">
          <MenuBox
            text={"계정"}
            hasChild={true}
            childList={["비밀번호 변경", "로그아웃"]}
            link={["changePassword", "logout"]}
            onChildClick={handleClickLogout}
            notToMove={["로그아웃"]}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default AdminPage;
