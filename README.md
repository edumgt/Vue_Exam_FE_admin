# exam-admin

시험/문항 관리용 Vue 2 기반 Admin Frontend 프로젝트입니다.

## 기술 스택

### Frontend
- **Vue 2.6.10**: SPA UI 프레임워크
- **Vue Router 3**: 라우팅
- **Vuex 3**: 전역 상태 관리
- **Element UI 2.10**: UI 컴포넌트 라이브러리
- **Axios**: API 통신
- **SCSS + node-sass**: 스타일 전처리

### Build / Tooling
- **Vue CLI 3 (@vue/cli-service 3.8)**: 개발 서버 및 빌드
- **Babel**: JS 트랜스파일링
- **ESLint**: 코드 린트
- **svg-sprite-loader**: SVG 아이콘 스프라이트 처리

### Runtime / Environment
- **Node.js 12 ~ 16 권장**
- `mode` 기반 환경 분리: `dev`, `test`, `pre`, `prod`
- 기본 API 엔드포인트는 `.env.*`의 `VUE_APP_API` 값 사용

---

## 실행 방법 (상세)

### 1) Node 버전 준비
이 프로젝트는 `node-sass@4.x`를 사용하므로 Node 버전에 민감합니다.

```bash
nvm install 16
nvm use 16
node -v
npm -v
```

> 기존 README 기준으로 Node 12~16 범위를 권장합니다.

### 2) 패키지 설치
기존 프로젝트 가이드(미러 레지스트리)와 일반 설치 방법 중 하나를 사용하세요.

#### 옵션 A: 기존 가이드(taobao 미러) 사용
```bash
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm install --registry https://registry.npm.taobao.org
```

#### 옵션 B: 기본 npm 레지스트리 사용
```bash
npm install
```

### 3) 환경 변수 확인
아래 파일로 환경이 분리되어 있습니다.

- `.env.dev` : 로컬 개발
- `.env.test` : 테스트 빌드
- `.env.pre` : 사전검증 빌드
- `.env.prod` : 운영 빌드

주요 변수 예시:

```env
VUE_APP_API='http://localhost:8001'
VUE_APP_URL='http://localhost:8001'
```

로컬 백엔드 주소가 다르면 `.env.dev` 값을 먼저 수정하세요.

### 4) 개발 서버 실행
```bash
npm run serve
```

- 실행 후 기본적으로 `http://localhost:8080`에서 확인합니다.
- 프론트엔드 API 호출 대상은 `.env.dev`의 `VUE_APP_API`를 따릅니다.

### 5) 린트 실행
```bash
npm run lint
```

### 6) 배포 빌드
목적에 맞게 mode를 선택해 빌드합니다.

```bash
npm run build        # prod mode
npm run build:dev    # dev mode
npm run build:test   # test mode
npm run build:pre    # pre mode
npm run build:prod   # prod mode
```

빌드 결과물은 `dist/` 디렉터리에 생성됩니다.

---

## 백엔드 연동 / 프록시 참고

개발 환경에서는 `.env.dev`의 API 주소를 통해 백엔드(예: `localhost:8001`)와 통신합니다.
운영 환경에서는 Nginx에서 `/api/`를 백엔드로 프록시하는 구성을 사용할 수 있습니다.

## Nginx gzip 예시
```nginx
gzip on;
gzip_min_length 1k;
gzip_comp_level 1;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/bmp application/x-bmp image/x-ms-bmp application/vnd.ms-fontobject font/ttf font/opentype font/x-woff;
gzip_vary on;
gzip_disable "MSIE [1-6]\.";
gzip_buffers 32 4k;
gzip_http_version 1.0;
```

## Nginx 서버 예시
```nginx
server {
    listen       81;
    server_name  admin;
    root         /usr/local/exam/admin;
    index        index.html;

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

    location /api/ {
       proxy_pass  http://localhost:8001;
    }
}
```
