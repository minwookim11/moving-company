# 짐까치 SEO 및 검색 등록 준비

## 적용 내용

- 운영 주소 `https://moving-company.kkkadad.workers.dev/`를 canonical, Open Graph, sitemap, robots에 반영
- 메인 title과 description에 구미 용달, 구미 1톤 용달, 구미 원룸이사, 구미 소형이사, 구미 가구 운송을 자연스럽게 반영
- `MovingCompany` JSON-LD에 확인된 브랜드명, 대표번호, 구미시 서비스 지역만 반영
- 실제 사진의 설명 가능한 alt 텍스트와 개인정보 비식별화 갤러리 유지
- `/privacy`는 사이트맵에 낮은 우선순위로 포함
- UTM 파라미터를 세션에 보존하고 CTA 이벤트를 `window.dataLayer`에 기록할 수 있게 구성

GA4 측정 ID는 아직 설정하지 않았습니다. `src/config.ts`의 `ga4Id`에 실제 발급값을 넣은 뒤 분석 스크립트를 연결해야 합니다.

## 네이버 서치어드바이저

1. 서치어드바이저에서 운영 URL을 사이트로 등록합니다.
2. HTML 메타태그 방식의 실제 인증값을 발급합니다.
3. 발급값을 임의로 바꾸지 말고 `index.html`의 `naver-site-verification` 주석 슬롯에 입력합니다.
4. `https://moving-company.kkkadad.workers.dev/`에서 소유 확인을 완료합니다.
5. 사이트맵으로 `https://moving-company.kkkadad.workers.dev/sitemap.xml`을 제출합니다.
6. 메인 URL을 URL 검사하고 색인 생성 요청을 진행합니다.

운영 도메인과 사업자 주소가 확정되기 전에는 주소 기반 구조화 데이터나 임의의 사업자 정보를 추가하지 않습니다.

## 검색광고 준비 상태

랜딩페이지로 사용할 메인 페이지의 전화 CTA, 이메일 견적 CTA, 할인 신청 체크박스, 사진 첨부 UI, UTM 보존 구조를 유지하고 있습니다. 다만 FormSubmit 인증과 실제 네이버 메일 첨부 수신이 아직 확인되지 않았으므로 광고 집행 완료 상태가 아닙니다.

전화번호 버튼 클릭은 `jimkkachi:cta`와 `dataLayer`에 기록할 수 있지만 실제 통화 성사는 웹에서 확인할 수 없습니다. GA4를 사용하려면 실제 측정 ID와 개인정보 설정을 먼저 확정해야 합니다.
