# 📚 공책 (공유해요, 당신의 책장)

개인의 독서 활동을 기록하고 공유하며, 다양한 책에 대한 토론이 가능한 소셜 독서 플랫폼입니다.

- 나만의 책장을 만들어 별점과 한줄평을 기록할 수 있습니다.
- 책을 읽다 인상 깊은 구절을 발견하면, 책갈피로 저장할 수 있습니다.
- 저장한 책갈피 중 하나를 매일 랜덤으로 카카오톡으로 받아볼 수 있습니다.
- 다른 유저들과 책에 대한 의견을 나누고, 공감과 토론을 이어갈 수 있습니다.
- 직관적인 UI/UX를 통해 독서 기록을 꾸준히 남길 수 있도록 도와줍니다.

<br />

## 🚀 배포 주소

🔗 [https://gongchaek.site](https://gongchaek.site)

<br />

## 🛠️ 사용 기술 스택

### 💻 프론트엔드 & 개발 환경

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)

### 🔧 상태 관리 & 비동기 통신

![React Query](https://img.shields.io/badge/React_Query-FF4154?logo=reactquery&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)

### 🚀 배포 & 협업 도구

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)
![Google Docs](https://img.shields.io/badge/Google%20Docs-4285F4?logo=googledocs&logoColor=white)

<br />

## 📁 디렉토리 구조

```bash
📦 FRONT/
├── dev-dist/                # 빌드 결과물 (vite preview 용도 등)
├── node_modules/            # 프로젝트 의존 모듈
├── public/                  # 정적 파일 (favicon 등)
├── src/                     # 소스 코드 루트
│   ├── api/                 # API 요청 모듈 (axios, query 함수 등)
│   ├── assets/              # 이미지, 폰트 등 정적 리소스
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── hooks/               # 커스텀 훅 정의
│   ├── layouts/             # 페이지 레이아웃 컴포넌트
│   ├── pages/               # 라우팅 단위의 페이지 컴포넌트
│   ├── router/              # 라우팅 설정 파일
│   ├── slices/              # Redux Toolkit 슬라이스 관리
│   ├── util/                # 유틸 함수 및 공용 로직
│   ├── App.css
│   ├── App.jsx              # 최상위 App 컴포넌트
│   ├── index.css
│   ├── main.jsx             # React 진입점 (root render)
│   ├── statusMapping.js     # 상태 코드 매핑 유틸
│   └── store.js             # Redux store 설정
├── .env                     # 환경 변수 설정
├── .gitignore
├── eslint.config.js         # ESLint 설정
├── index.html               # Vite 진입 HTML
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js       # TailwindCSS 설정
├── vite.config.js           # Vite 설정
```

<br />

## 📷 스크린샷 (선택)

📌 예시

- 메인 페이지

- 책 상세 페이지

- 리뷰 작성 페이지

- 반응형 모바일 뷰

  <br />

## 🗂️ 기획 문서 및 디자인

- 기획 문서 (Google Docs): [공책 기획서 링크](#)
- 디자인 시안 (Figma): [공책 UI 링크](#)

<br />

## 👥 팀 구성 및 역할 분담

본 프로젝트는 총 5인으로 구성된 팀 프로젝트로, 프론트엔드, 백엔드, 풀스택 개발자 간 협업을 통해 진행되었습니다.

| 이름        | 역할       | 담당 영역 및 주요 업무                                                                                                                                                                                          |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 이석현 (본인) | 풀스택 개발 | - React 기반 SPA 구조 설계<br>- Vite + Tailwind + ESLint/Prettier 초기 환경 세팅<br>- Zustand/Redux + React Query 상태 관리 설계 및 구현<br>- 재사용 가능한 UI 컴포넌트 구현<br>- 반응형 및 접근성 고려한 UI/UX 설계<br>- Netlify CI/CD 및 운영 자동화 구축 |
| 프론트 A     | 프론트엔드 개발 | - 도서 상세/책갈피/한줄평 페이지 구현<br>- React Router 기반 라우팅 구조 구성<br>- 사용자 인터랙션 중심 기능 개발<br>- Figma 기반 컴포넌트 구현                                                                                                     |
| 풀스택 B     | 풀스택 개발   | - 전체 기술 구조 통합 및 배포 환경 조율<br>- API 스키마 및 DB 모델 설계<br>- 카카오톡 메시지 전송 기능 구현<br>- 프론트-백 연동 및 CORS, 인증 처리                                                                                                    |
| 백엔드 C     | 백엔드 개발   | - 사용자 인증/인가 및 토큰 기반 로그인 API<br>- 도서 정보, 책갈피, 유저 데이터 관련 CRUD API 구현<br>- MongoDB 기반 데이터 모델링 및 최적화                                                                                                       |
| 백엔드 D     | 백엔드 개발   | - 전체 API 문서화 (Swagger/OpenAPI 등)<br>- 에러 핸들링 및 응답 코드 표준화<br>- 서버 로깅 및 배포 자동화 스크립트 관리                                                                                                                   |




## 🙌 기여 및 라이선스

- 본 프로젝트는 포트폴리오 및 개인 학습 목적의 프로젝트입니다.
- 피드백 및 개선 제안은 언제든지 환영합니다!

---
