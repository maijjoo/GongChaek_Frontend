# 공책 (공유해요, 당신의 책장)

## 📌 프로젝트 개요

공책은 개인 유저의 독서 활동을 기록, 공유하고 책에 대한 토론을 진행할 수 있는 플랫폼입니다.



## 🚀 배포 주소

- 웹사이트: [https://gongchaek.site](https://gongchaek.site)



## 🛠️ 사용 기술 스택

💻 프론트엔드 & 개발 환경

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)


🔧 상태 관리 & 비동기 통신

![React Query](https://img.shields.io/badge/React_Query-FF4154?logo=reactquery&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)


🚀 배포 & 협업 도구

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)
![Google Docs](https://img.shields.io/badge/Google%20Docs-4285F4?logo=googledocs&logoColor=white)



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
