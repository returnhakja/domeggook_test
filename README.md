# 도매꾹 상품 목록 페이지

## 기술 스택

- React 19 + TypeScript
- Vite
- Zustand
- 순수 CSS

## 주요 기능

- 도매꾹 API 상품 목록 조회
- 무한 스크롤 (Intersection Observer)
- 필터 바텀 시트 (키워드 검색)
- 로딩 스피너

## 프로젝트 구조

```
src/
├── api/                  # API 호출 함수
├── assets/icons/         # SVG 아이콘
├── components/           # 컴포넌트 (폴더별 tsx + css)
│   ├── Header/
│   ├── FilterBar/
│   ├── FilterSheet/
│   ├── ProductItem/
│   ├── ProductListPage/
│   └── Spinner/
├── constants/            # 상수
├── hooks/                # 커스텀 훅
├── store/                # Zustand 스토어
├── types/                # TypeScript 타입
└── utils/                # 유틸 함수
```

## 실행 방법

### 1. 의존성 설치

npm install

### 2. 환경변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 아래 내용을 추가합니다.

VITE_DOMEGGOOK_API_KEY=API*키

### 3. 개발 서버 실행

npm run dev

### 4. 빌드

npm run build
