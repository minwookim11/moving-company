# Cloudflare Workers 자동 배포 설정

## 원인

기존 저장소에는 `wrangler.toml`, Wrangler 의존성, GitHub Actions workflow가 없었습니다. 따라서 GitHub `main` push가 `moving-company` Worker의 빌드·배포를 자동으로 실행한다는 근거가 없었습니다. Cloudflare API에서 확인한 기존 배포는 Upload/Unknown deployment 기록이며 GitHub 연동 빌드 기록은 확인하지 못했습니다.

## 로컬 배포 구성

- Worker 이름: `moving-company`
- 정적 Assets: `./dist`
- SPA fallback: `single-page-application`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- 설정 파일: `wrangler.toml`
- Wrangler: `4.158.0`

이 설정은 새 Worker나 Pages 프로젝트를 만들지 않고 기존 `moving-company` 이름을 대상으로 합니다. R2, D1, Turnstile, Worker API binding은 포함하지 않습니다.

## Cloudflare 대시보드에서 필요한 설정

Cloudflare Workers & Pages → `moving-company` → Settings → Builds에서 GitHub 저장소 `minwookim11/moving-company`와 `main` 브랜치를 연결하고 다음 값을 입력합니다.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

연결 저장 후 테스트용 별도 브랜치 push에서 Preview 빌드가 생성되는지 확인한 뒤 운영 `main` 배포를 승인합니다. 대시보드 설정은 현재 CLI에서 읽을 수 없으므로 이 단계는 사용자 계정 화면 확인이 필요합니다.
