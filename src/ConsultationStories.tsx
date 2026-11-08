import { Check, MessageSquareText } from 'lucide-react'

// Only de-identified excerpts from inspected business consultations are published.
// A completion label is used only when the source reservation shows service completion.
const stories = [
  {
    title: '옷장 운송, 작업 조건부터 확인',
    tag: '가구 운송 상담',
    completed: false,
    messages: [
      { side: 'customer', text: '가로 1200, 높이 2000 옷장입니다.' },
      { side: 'business', text: '올릴 때는 도와줄 분 계신가요?' },
      { side: 'customer', text: '트럭에서 엘베까지는 제가 도와드릴게요!' },
    ],
    summary: '가구 크기와 상하차 도움 여부를 확인한 상담입니다.',
  },
  {
    title: '운송 전, 층수와 일정을 확인',
    tag: '용달 예약',
    completed: true,
    messages: [
      { side: 'customer', text: '잘 부탁드립니다.' },
      { side: 'business', text: '네. 출발지는 몇 층, 도착지는 몇 층인가요?' },
      { side: 'customer', text: '층수는 1층이라고 하네요. 저도 1층입니다.' },
    ],
    summary: '운송 조건 확인 후 예약 수락·서비스 완료가 확인된 사례입니다.',
  },
  {
    title: '희망 시간을 맞춰 예약 진행',
    tag: '일정 조율',
    completed: true,
    messages: [
      { side: 'customer', text: '내일(월요일) 오전 11시에 시간 맞춰서 부탁드립니다. 내일 뵙겠습니다!' },
      { side: 'business', text: '네. 안녕하세요.' },
    ],
    summary: '예약 요청과 수락을 거쳐 서비스 완료가 확인된 사례입니다.',
  },
] as const

export default function ConsultationStories() {
  return <section id="consultations" className="section consultationSection" aria-labelledby="consultationTitle">
    <div className="container">
      <div className="head">
        <div><label>REAL CONSULTATIONS</label><h2 id="consultationTitle">당근에서 이어진,<br/><strong>실제 상담 이야기.</strong></h2></div>
        <p>짐의 크기부터 작업 조건, 희망 시간까지.<br/>실제 상담에서 나눈 이야기를 확인해 보세요.</p>
      </div>
      <div className="consultationGrid">
        {stories.map((story, index) => <article className="consultationCard" key={story.title}>
          <div className="consultationCardTop"><span className="consultationIcon"><MessageSquareText size={20}/></span><div><span className="consultationKicker">실제 당근 상담 발췌 · 0{index + 1}</span><h3>{story.title}</h3></div></div>
          <div className="consultationThread">
            <span className="consultationTag">{story.tag}</span>
            {story.messages.map((message, messageIndex) => <div className={`consultationMessage ${message.side}`} key={messageIndex}><span>{message.side === 'customer' ? '고객' : '짐까치'}</span><p>{message.text}</p></div>)}
            <div className={`consultationOutcome ${story.completed ? 'completed' : ''}`}><Check size={14}/>{story.completed ? '예약 기록에서 서비스 완료 확인' : '운송 조건 상담 발췌'}</div>
          </div>
          <p className="consultationSummary">{story.summary}</p>
        </article>)}
      </div>
      <div className="consultationBottom"><p>실제 대화 중 일부를 개인정보 제외·맞춤법·줄바꿈 정리하여 재구성했습니다. 브랜드 정비 이전의 상담 기록을 포함합니다.<br/>상담 사례와 서비스 완료 사례를 구분해 표시했으며, 운송 가능 여부와 견적은 개별 조건에 따라 확인합니다.</p><a href="#quote" className="btn primary"><MessageSquareText size={16}/> 내 짐도 상담하기</a></div>
    </div>
  </section>
}
