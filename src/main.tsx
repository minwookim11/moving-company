import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { siteConfig } from './config'
import './styles.css'

const campaignParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const currentParams = new URLSearchParams(window.location.search)
campaignParams.forEach((key) => {
  const value = currentParams.get(key)
  if (value) sessionStorage.setItem(`jimkkachi:${key}`, value)
})

window.addEventListener('jimkkachi:cta', (event) => {
  const label = (event as CustomEvent<string>).detail
  const params = Object.fromEntries(campaignParams.flatMap((key) => {
    const value = sessionStorage.getItem(`jimkkachi:${key}`)
    return value ? [[key, value]] : []
  }))
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ??= []
  dataLayer.push({ event: 'jimkkachi_cta', cta_name: label, ...params })
})

window.dispatchEvent(new CustomEvent('jimkkachi:cta', { detail: 'page_view' }))

const nativeFetch = window.fetch.bind(window)
const submitFormSubmitPost = (target: string, body: FormData) => new Promise<Response>((resolve) => {
  const form = document.createElement('form')
  form.action = target.replace('/ajax/', '/')
  form.method = 'POST'
  form.enctype = 'multipart/form-data'
  form.target = '_blank'
  const captcha = document.createElement('input')
  captcha.type = 'hidden'
  captcha.name = '_captcha'
  captcha.value = 'false'
  form.appendChild(captcha)
  body.forEach((value, name) => {
    if (value instanceof File) {
      const input = document.createElement('input')
      input.type = 'file'
      input.name = name
      const files = new DataTransfer()
      files.items.add(value)
      input.files = files.files
      form.appendChild(input)
    } else {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    }
  })
  document.body.appendChild(form)
  form.submit()
  resolve(new Response(JSON.stringify({ success: false, error: 'FormSubmit 결과가 새 탭에서 열렸습니다. 성공 화면을 확인해 주세요.' }), { status: 400, headers: { 'Content-Type': 'application/json' } }))
})

window.fetch = async (input, init) => {
  const target = typeof input === 'string' ? input : input instanceof Request ? input.url : ''
  if (target.includes('formsubmit.co/ajax/') && init?.body instanceof FormData) return submitFormSubmitPost(target, init.body)
  return nativeFetch(input, init)
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

requestAnimationFrame(() => {
  document.querySelectorAll('footer span, .privacyPage article p').forEach((element) => {
    if (element.textContent?.includes('구미개미용달')) element.textContent = element.textContent.replace('구미개미용달', siteConfig.legalName)
  })

  const header = document.querySelector('header')
  if (header && !document.querySelector('#eventBanner')) {
    const banner = document.createElement('section')
    banner.id = 'eventBanner'
    banner.className = 'eventBanner'
    banner.innerHTML = '<div class="container eventBannerInner"><p><strong>홈페이지 보고 연락하면 이사비 10% 할인!</strong></p><button type="button">견적 문의하기</button></div>'
    banner.querySelector('button')?.addEventListener('click', () => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' }))
    header.before(banner)
  }

  const actions = document.querySelector('.hero .actions')
  if (actions && !document.querySelector('#promoCard')) {
    const promo = document.createElement('aside')
    promo.id = 'promoCard'
    promo.className = 'promoCard'
    promo.innerHTML = '<span>JIMKKACHI SPECIAL</span><strong>홈페이지 방문 고객 특별 혜택</strong><b>이사비 10% 할인</b><small>“홈페이지 보고 연락했어요”라고 말씀해 주세요.</small>'
    actions.after(promo)
  }

  const quote = document.querySelector('#quote')
  if (!quote || document.querySelector('#gallery')) return
  const gallery = document.createElement('section')
  gallery.id = 'gallery'
  gallery.className = 'section gallerySection'
  gallery.innerHTML = `<div class="container"><div class="head"><div><label>FIELD GALLERY</label><h2>실제 작업 현장,<br/><strong>안전하게 확인하세요.</strong></h2></div><p>짐까치의 소형 운송·이사 현장입니다.<br/>개인정보가 보이지 않도록 정리한 사진만 공개합니다.</p></div><div class="galleryGrid"><figure><img src="/gallery/moving-load-01.png" alt="짐까치 이사 짐을 1톤 차량에 적재한 현장"/><figcaption>소형이사 짐 적재 현장</figcaption></figure><figure><img src="/gallery/moving-load-02.png" alt="짐까치 운송 차량에 생활짐을 고정한 현장"/><figcaption>생활짐 고정 운송 현장</figcaption></figure><figure><img src="/gallery/moving-load-03.png" alt="짐까치 박스와 가구 운송 현장"/><figcaption>박스·가구 운송 현장</figcaption></figure></div><p class="galleryNote">※ 고객 얼굴, 차량번호, 전화번호, 주소·위치 식별 정보가 보이지 않도록 편집한 공개용 사진입니다.</p></div>`
  quote.before(gallery)
})
