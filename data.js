/* =========================================================
   data.js — 홈페이지 내용은 전부 여기서 수정하세요.
   - 이미지: 주소(URL)를 '' 안에 넣으면 적용, 비워두면 기본 그라데이션이 나와요.
   - 음악: src 에 mp3 주소를 넣으면 실제로 재생돼요. 비워두면 재생 '연출'만 돼요.
   - body 에는 <b>, <br>, <p> 같은 간단한 HTML을 써도 돼요.

   ★ 홈페이지 안에서 고칠 수 있어요: 주소 끝에 ?owner 를 붙여 들어가면 ✎ EDIT → 고치고 [홈페이지에 저장]
     사진은 media/ 폴더에, 글은 이 파일에 자동으로 저장돼요.
   ========================================================= */

const SITE = {
  /* ---------- 기본 정보 ---------- */
  brand: { name: 'SETLIST-01', sub: 'MOON STUDIO', start: 'P2U', home: 'SYRINGE-01', homeSub: 'ARCH CLINIC' },   // home = 메인 화면 왼쪽 위 로고 글자
  // 큰 제목: before + [마이크 모양 I] + after  →  SETL🎤ST
  title: { before: 'SETL', after: 'ST', tilt: true },   // tilt: 가운데 I(마이크)가 가끔 기울어지는 효과 (끄려면 false)
  pair: {
    a: 'PURE',                       // 나 (드림주/오너캐)
    b: 'UXI',                        // 상대 캐릭터
    aRole: 'FRONT ROW · No.1 FAN',
    bRole: 'LEAD VOCAL · 月とナイフ',
    pill: 'MIDNIGHT ENCORE LIVE ✦',
    since: '2026-04-24',             // 사귄 날(1일) — D+ 계산 기준
    nextGoal: 200,                   // 다음 기념일 D+
    passNo: 'No. PU-0424',
    status: 'BONDED',
    barcode: 'A-CLASS GUIDE × S-CLASS SENTINEL',
    image: ''                        // 메인 오른쪽 카드 커플 이미지
  },
  // 오른쪽 BACKSTAGE PASS 카드에서 ‹ › 로 넘겨보는 페어 목록 (원하는 만큼 추가)
  //  - image: 앞면 이미지 / imageBack: 사진을 눌러 뒤집었을 때 나오는 뒷면 이미지 (비우면 글자 카드)
  //  - nextGoal 을 비우면 다음 100일 단위가 자동으로 잡혀요
  pairs: [
    { a: 'PURE', b: 'UXI', since: '2026-04-24', passNo: 'No. PU-0424', status: 'BONDED', barcode: 'A-CLASS GUIDE × S-CLASS SENTINEL', image: '', imageBack: '', note: '맨 앞줄 오른쪽, 앵콜 마지막 소절' },
    { a: 'PAIR', b: 'TWO', since: '2026-02-14', passNo: 'No. PT-0214', status: 'ON STAGE', barcode: 'GUITAR × DRUM', image: '', imageBack: '', note: '두 번째 페어 메모를 적어주세요' },
    { a: 'PAIR', b: 'THREE', since: '2025-12-25', passNo: 'No. PT-1225', status: 'ENCORE', barcode: 'BASS × KEYBOARD', image: '', imageBack: '', note: '세 번째 페어 메모를 적어주세요' }
  ],
  pairLabels: { first: 'ADMITTED', pair: 'PAIR', status: 'STATUS', together: 'TOGETHER FOR', flip: '뒤집기' },
  // 메인 카드(티켓) 글자 — DATE(오늘 날짜)와 DOORS(지금 시각)는 자동으로 바뀌어요
  heroTicket: {
    tour: '2026 月とナイフ LIVE TOUR — THE MIDNIGHT ENCORE PROTOCOL',
    info: [['GATE', 'B'], ['ROW', '01'], ['SEAT', 'R-07']],   // DATE · DOORS 뒤에 붙는 칸
    stubNo: 'STUB · No. HR-0424',
    stubTitle: ['MOON', 'LIVE', 'HOUSE'],
    passBand: 'ALL ACCESS', passVol: '★ 05', passName: 'BACKSTAGE', passImage: '',
    admit: 'ADMIT ONE'
  },
  studio: 'STUDIO · ON AIR 24H',
  online: 'PROTOCOL ONLINE',
  residence: 'MOON STUDIO · BACKSTAGE',
  venue: 'ARCH MEDICAL CENTER',
  passLabel: 'PAIR INFORMATION',
  footer: 'MOON STUDIO',
  marquee: 'OFF THE RECORD ✦ MOON LIVE HOUSE ✦ 月とナイフ LIVE TOUR 2026 ✦ HANA × REN ✦ LEAVING BEFORE THE ENCORE IS NOT ALLOWED ✦',
  credit: { top: '© ↳ PpLE', bottom: 'Syringe.' },

  /* ---------- 메인 화면 위 배너 (SYRINGE) ---------- */
  // 페어 이름(PURE × UXI)과 D+ 숫자는 위 pairs 에서 자동으로 가져와요 (‹ › 로 넘기면 같이 바뀌어요)
  clinic: {
    kicker: 'ARCH CLINIC · RESIDENCE',                            // 큰 글씨 위 한 줄
    title: 'UNRELEASED',                                          // 메인 큰 글씨 (길면 자동으로 작아져요)
    chips: ['LOVE DISORDER CLINIC +', '5.0 mL · STERILE // OPEN 24H'],   // 페어 이름 옆 알약들
    tab: 'INFIRMARY · OPEN 24H',                                  // 배너 오른쪽 위 알약 (옆 날짜는 오늘 날짜로 자동)
    nav: 'LUVINFO'                                                // 위 메뉴 네 번째 글자 (누르면 D-DAY)
  },

  /* ---------- 첫 화면(인트로) ---------- */
  // {d} = 자동 D+ 숫자
  // 마우스 커서: 도트 주사기 하나로 고정 (이 값은 지금 안 써요)
  cursor: 'capsule',
  intro: {
    nav: ['01 · ARCHIVE', '02 · SETLIST', '03 · KEY'],          // 왼쪽 위 메뉴 글자
    live: 'LIVE', liveLine: 'BPM <b>{d}</b> · ROOM 07 · MIC ON',   // 심전도 위 글자
    kicker: '月とナイフ — BACKSTAGE ARCHIVE', vol: 'VOL. 05',
    title: ['OFF THE', 'RECORD'],                               // 입장화면 큰 젤리 글씨 (두 줄)
    roles: ['LEAD VOCAL', 'FRONT ROW'],                        // HANA × REN 옆 두 줄
    pill: 'ENCORE NIGHT ✦',
    tune: ['TUNING · ', 'FILLING THE KEY', 'READY ✦'],          // 로딩 중 / 다 찼을 때
    marquee: 'OFF THE RECORD ✦ 月とナイフ LIVE TOUR 2026 ✦ HANA × REN ✦ LEAVING BEFORE THE ENCORE IS NOT ALLOWED ✦',
    onair: ['SOUNDCHECK', '· ON AIR'],
    gate: ['ENTRANCE', 'STAND BY', 'OPEN', 'WELCOME'],
    buttons: ['LOADING', 'ENTER', 'ADMITTED'],
    // 입장 화면 (자물쇠) 글자
    entry: { brand: 'UNRELEASED', sub: 'moon studio', room: 'ROOM 0101', gate: ['STAND BY', 'OPEN', 'OPENING'], load: ['UNLOCKING ROOM 0101', 'READY — 자물쇠를 눌러 주세요'] },
    clinic: { nav: ['HOME', 'CATEGORY', 'NOTICE', 'LUVINFO'], online: 'NOW ADMITTING', status: ['READING CHART', 'CHECKING PULSE', 'SYMPTOM: LOVE', 'NO CURE FOUND', 'ADMISSION READY'] },   // 입장 화면 위 메뉴 · 알약 · 바뀌는 글자
    seconds: 2.6                                                 // 열쇠가 다 차오르는 시간(초)
  },

  /* ---------- 메인 6×4 앱 칸 중 새로 생긴 칸 ----------
     type: 'grid' = 사진 칸 6개 / 'list' = 줄 목록
     grid → items: [제목, 날짜, 사진주소] / list → rows: [내용, 날짜]  (원하는 만큼 추가)
     (Stage Monitor · Notice 칸은 원래 있던 창이 열려요) */
  extraApps: [
    { id: 'gallery', name: 'Gallery', type: 'grid', items: [['제목 1', '10.26', ''], ['제목 2', '10.23', ''], ['제목 3', '10.20', ''], ['제목 4', '10.17', ''], ['제목 5', '10.14', ''], ['제목 6', '10.11', '']] },
    { id: 'letters', name: 'Letters', type: 'grid', items: [['편지 1', '10.26', ''], ['편지 2', '10.23', ''], ['편지 3', '10.20', '']] },
    { id: 'lockbox', name: 'Lock Box', type: 'list', rows: [['항목 1', '10.25'], ['항목 2', '10.23'], ['항목 3', '10.21']] },
    { id: 'setlist', name: 'Setlist', type: 'grid', items: [['곡 1', '10.26', ''], ['곡 2', '10.23', ''], ['곡 3', '10.20', '']] },
    { id: 'camera', name: 'Camera', type: 'grid', items: [['사진 1', '10.26', ''], ['사진 2', '10.23', ''], ['사진 3', '10.20', '']] },
    { id: 'calendar', name: 'Calendar', type: 'list', rows: [['일정 1', '10.25'], ['일정 2', '10.23'], ['일정 3', '10.21']] },
    { id: 'archive', name: 'Archive', type: 'list', rows: [['기록 1', '10.25'], ['기록 2', '10.23'], ['기록 3', '10.21']] },
    // ↓ 4번째 줄 마지막 3칸 : 자기소개 · 리스트 · 링크(맞배너) — 글자를 바꾸면 창 안 내용이 바뀌어요
    { id: 'about', name: 'Profile', icon: 'idcard', type: 'about',
      no: 'NO. 2026-HANA', title: 'PROFILE', sub: 'ABOUT // SELF INTRO',
      handle: '@handle',
      info: [['STATUS', '여기에 상태를 적어요'], ['TYPE', '여기에 타입을 적어요']], infoNote: '*짧은 메모가 들어가요',
      table: [['항목 1', '메모가 들어가요'], ['항목 2', '메모가 들어가요'], ['항목 3', '-'], ['항목 4', '메모가 들어가요\n두 줄도 돼요']],
      ng: ['NG', '주의할 점 제목', '주의할 점 설명이 들어가요'],
      valid: 'VALID UNTIL: PERMANENT', org: 'MOON STUDIO', stamp: 'APPROVED' },
    { id: 'list', name: 'List', icon: 'list', type: 'inventory',
      chip: 'LOCKED', title: 'INVENTORY', sub: 'LIST // DATABASE',
      intro: '여기에 리스트 설명이 들어가요. 짧게 적어주세요.',
      groups: [['그룹 이름 1', '@handle', ['항목', '항목', '항목']], ['그룹 이름 2', '@handle', ['항목']], ['그룹 이름 3', '@handle', ['항목', '항목']]] },
    { id: 'linked', name: 'Linked', icon: 'link', type: 'linked',
      title: 'LINKED', sub: 'DOSSIERS', tag: 'LINKED DOSSIERS', no: 'NO. 2026-10-29',
      banner: { img: '', link: '' },                                  // 큰 배너 사진 주소 · 누르면 갈 주소
      crewTitle: 'CREW BANNER', crewSub: '♥ 맞배너',
      crew: [['처방전', 'TEAM', '@name', '', ''], ['처방전', 'TEAM', '@name', '', ''], ['처방전', 'TEAM', '@name', '', ''], ['처방전', 'TEAM', '@name', '', '']] }   // [위 띠 글자, 오른쪽 작은 글자, 이름, 사진 주소, 링크]
    // ↓ 시안의 5번째 줄 8칸 (메인 홈 8×4)
    // OOC 보관함 : 분류(k 영어 · n 한글)마다 문구 목록 — 누르면 복사돼요
    ,{ id: 'ooc', name: 'OOC', type: 'ooc', room: 'ROOM 04', sub: 'ARCHIVE // COPY & PASTE', hint: '분류를 누르면 OOC가 나와요. COPY를 누르면 바로 복사돼요.',
      cats: [
        { k: 'HELLO', n: '인사', items: ['(( 안녕하세요! 오늘도 잘 부탁드려요 ))', '(( 늦은 시간에 인사드려요, 편하게 이어 주세요 ))', '(( 처음 뵙겠습니다! 잘 부탁드려요 ))'] },
        { k: 'LATE', n: '늦은 답장', items: ['(( 답이 늦어 죄송해요! 천천히 이어갈게요 ))', '(( 오늘은 답이 조금 느릴 수 있어요 ))'] },
        { k: 'AWAY', n: '자리 비움', items: ['(( 잠깐 자리 비울게요, 금방 올게요! ))', '(( 밥 먹고 올게요 ))', '(( 오늘은 여기까지 할게요, 내일 이어가요 ))'] },
        { k: 'THANKS', n: '감사', items: ['(( 오늘도 함께해 주셔서 감사해요 ))', '(( 덕분에 너무 즐거웠어요! ))'] },
        { k: 'BYE', n: '마무리', items: ['(( 수고하셨어요! 좋은 밤 보내세요 ))', '(( 다음에 또 이어가요, 감사합니다 ))'] },
        { k: 'ETC', n: '기타', items: ['(( 여기에 OOC 문구가 들어가요 ))'] }
      ] },
    // 프롬프트 보관함 : 분류마다 사진 + 배경(bg) · 의상(fit) 프롬프트
    //   wide: true → 가로 사진 / 없으면 세로 사진 · image = 예시 사진 · images = 결과 사진 3장 (✎ EDIT 에서 사진 자리를 눌러 넣어도 돼요)
    { id: 'prompt', name: 'Prompt', type: 'prompt', room: 'ROOM 05', sub: 'BACKGROUND + OUTFIT', hint: '세로 · 가로 사진이 섞여도 각자 모양에 맞게 보여요.',
      cats: [
        { k: 'DAILY', n: '일상', items: [
          { t: '하늘색 오후', image: '', images: ['', '', ''], bg: 'cozy cafe by the window, soft afternoon sunlight, pale blue walls, potted plants, light bokeh', fit: 'oversized sky blue knit sweater, pleated white skirt, loafers, small silver earrings' },
          { t: '새벽 옥상', wide: true, image: '', images: ['', '', ''], bg: 'rooftop at dawn, pale blue sky, city lights fading, light haze, calm and lonely atmosphere', fit: 'white hoodie, mint windbreaker over it, wide denim pants, canvas sneakers' },
          { t: '여기에 제목', image: '', images: ['', '', ''], bg: '여기에 배경 프롬프트가 들어가요.', fit: '여기에 의상 프롬프트가 들어가요.' } ] },
        { k: 'STAGE', n: '무대', items: [
          { t: '유리 라이브하우스', wide: true, image: '', images: ['', '', ''], bg: 'small live house stage, glass panels, mint spotlight, scattered confetti, empty seats, wide angle', fit: 'cropped mint stage jacket, glossy pastel fabric, silver zipper details, white wide pants' },
          { t: '앵콜 무대', image: '', images: ['', '', ''], bg: 'concert stage after encore, blue laser lights, floating sparkles, smoky air, audience lightsticks', fit: 'sheer white blouse, sky blue corset vest, star hair pins, platform boots' } ] },
        { k: 'SEASON', n: '계절', items: [
          { t: '눈 오는 밤', wide: true, image: '', images: ['', '', ''], bg: 'snowy street at night, warm shop lights, falling snow, quiet blue tone, soft glow', fit: 'long cream coat, mint muffler, knitted gloves, white earmuffs' } ] }
      ] },
    { id: 'album', name: 'Album', type: 'grid', items: [['사진 1', '11.04', ''], ['사진 2', '11.02', ''], ['사진 3', '10.30', '']] },
    { id: 'guestbook', name: 'Guest Book', type: 'list', rows: [['방명록 1', '11.04'], ['방명록 2', '11.02'], ['방명록 3', '10.30']] },
    { id: 'diary', name: 'Diary', type: 'list', rows: [['일기 1', '11.04'], ['일기 2', '11.02'], ['일기 3', '10.30']] },
    { id: 'shop', name: 'Shop', type: 'grid', items: [['상품 1', '11.04', ''], ['상품 2', '11.02', ''], ['상품 3', '10.30', '']] },
    { id: 'stickers', name: 'Stickers', type: 'grid', items: [['스티커 1', '11.04', ''], ['스티커 2', '11.02', ''], ['스티커 3', '10.30', '']] },
    { id: 'radio', name: 'Radio', type: 'list', rows: [['방송 1', '11.04'], ['방송 2', '11.02'], ['방송 3', '10.30']] },
    // ↓ SYRINGE 시안 10×5 (50칸) 으로 늘어난 18칸 — 이름·내용 자유롭게 바꿔도 돼요
    { id: 'mail', name: 'Mail', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'map', name: 'Map', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'settings', name: 'Settings', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'notes', name: 'Notes', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'wishlist', name: 'Wishlist', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'video', name: 'Video', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'xgame', name: 'Game', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'search', name: 'Search', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'weather', name: 'Weather', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'contacts', name: 'Contacts', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'cloud', name: 'Cloud', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'alarm', name: 'Alarm', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'wallet', name: 'Wallet', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'library', name: 'Library', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'stats', name: 'Stats', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'scan', name: 'Scan', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'pharmacy', name: 'Pharmacy', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] },
    { id: 'vitals', name: 'Vitals', type: 'list', rows: [['항목 1', '11.15'], ['항목 2', '11.12'], ['항목 3', '11.09']] }
  ],

  /* ---------- 메인 화면 글자 ---------- */
  home: {
    kicker: '月とナイフ — BACKSTAGE ARCHIVE', vol: 'VOL.05',     // 큰 젤리 글씨 위 한 줄
    title: ['OFF THE', 'RECORD'],                                 // (휴대폰용 예전 젤리 글씨)
    word: 'UNRELEASED',                                           // 메인 큰 글씨 (끝에 민트색 점이 붙어요)
    nowPlaying: { title: 'NOW PLAYING', list: ['OPENING', 'MOONLIT ♪', 'KNIFE EDGE', 'ENCORE'], on: 2, time: ['01:48', '04:12'] },   // 오른쪽 위 NOW PLAYING 카드 (on = 강조할 줄 번호)
    // 메인 제목 메모장 (SETLIST 메모 + 오른쪽 포스트잇)
    note: {
      kicker: "TONIGHT'S ORDER · 月とナイフ",
      list: [['01', 'OPENING', true], ['02', 'MOONLIT FEEDBACK', true], ['03', 'KNIFE EDGE', false], ['04', 'ENCORE NIGHT', false]],   // [번호, 곡, 체크]
      sticky: ['NOTE TO', 'HANA\n& REN', 'ENCORE ✦']   // 포스트잇: 위 작은 글씨 / 가운데 큰 글씨(\n 줄바꿈) / 아래 글씨
    },
    keyTitle: 'KEY № 01', keySub: 'D+{d} · STILL TURNING',      // 가운데 열쇠 위 글자
    keySeconds: 14                                               // 열쇠가 한 바퀴 도는 시간(초)
  },

  /* ---------- 넓은 화면(전체화면)에서만 보이는 기타 설계도 ---------- */
  // labels: [큰 글자, 작은 글자] — 위에서부터 헤드 · 넥 · 픽업 · 바디 · 브릿지
  // 넓은 화면(전체화면) 가운데 — 악기 도안을 사선으로 쌓아서 보여줘요
  //  stack: 악기 이미지 목록. 악기에 마우스를 올리면 설명(rows)이 나와요
  //   src: 내장 그림 이름(guitar·bass·drums·keys·vocals) 또는 내 이미지 주소 / x, y: 가운데 위치(%) / w: 너비(%) / r: 기울기(°) / side: 설명 위치 L·R / labelY: 설명 높이(%)
  //  notes: 손글씨 메모 (\n = 줄바꿈)
  blueprint: {
    image: '',
    keySize: 85,   // ★ 열쇠 크기 (%) — 100 = 꽉 차게, 숫자를 줄이면 작아져요 (추천 75~95)
    keyX: -6,      // ★ 열쇠 좌우 위치 (%) — 숫자를 줄이면(-) 왼쪽, 키우면(+) 오른쪽
    keyY: 0,       // ★ 열쇠 위아래 위치 (%) — 숫자를 줄이면(-) 위로, 키우면(+) 아래로
    dim: 'OVERALL · 168 (1:1)',
    detail: 'DETAIL A',
    capTop: ['BAND EQUIPMENT', 'MUSIC MAKES US STAY'],
    capBottom: ['MOON STUDIO', 'OFF THE RECORD'],
    capRight: ['SAME STAGE', 'DIFFERENT DREAMS'],
    // stack 을 비워두면 '클로버 열쇠 도면'이 나와요. 악기 그림을 쓰고 싶으면 아래 '쉬는 악기' 줄을 stack 안에 넣고 src 에 이미지 주소를 넣으면 돼요.
    labels: [   // 열쇠 부위에 마우스 올리면 나오는 글자 — 클로버 · 목 · 기둥 · 톱니
      ['BOW', 'CLOVER · FILIGREE'],
      ['COLLAR', 'CROWN BAND'],
      ['SHANK', 'KNURLED GRIP'],
      ['BIT', 'HEART WARD']
    ],
    stack: [],
    // 쉬는 악기 (화면에는 안 나와요)
    spare: [
      { name: 'BASS', model: 'JAZZ TYPE · 4 STRINGS', src: '', x: 53, y: 50, w: 56, r: 14, side: 'R', labelY: 70, rows: [['LENGTH', '1,180 mm'], ['WIDTH', '340 mm'], ['SCALE', '34"'], ['STRINGS', '4']] },
      { name: 'GUITAR', model: 'STRAT TYPE', src: '', x: 44, y: 22, w: 30, r: -8, side: 'R', labelY: 14, rows: [['LENGTH', '1,000 mm'], ['WIDTH', '325 mm'], ['SCALE', '25.5"']] },
      { name: 'DRUMS', model: 'SNARE DRUM · STICKS', src: '', x: 52, y: 58, w: 52, r: -6, side: 'R', labelY: 52, rows: [['DIAMETER', '350 mm'], ['HEIGHT', '150 mm'], ['STICKS', '7A · 2 pcs']] },
      { name: 'KEYS', model: '61 KEYS', src: '', x: 50, y: 72, w: 74, r: -8, side: 'L', labelY: 68, rows: [['LENGTH', '1,000 mm'], ['WIDTH', '300 mm'], ['HEIGHT', '100 mm']] },
      { name: 'VOCALS', model: 'STAND MIC', src: '', x: 64, y: 86, w: 19, r: 22, side: 'R', labelY: 82, rows: [['HEIGHT', '1,800 mm'], ['BASE', '250 mm'], ['WEIGHT', '2.1 kg']] }
    ],
    notes: []
  },





  // 설계도 아래 SPEC SHEET 카드 — {d} = 자동 D+ 숫자, {today} = 오늘 날짜
  spec: {
    sub: 'DRAWING Nº SY-01 · ARCH CLINIC',
    title: 'SPEC SHEET',
    cells: [['GUIDE', 'PURE'], ['SENTINEL', 'UXI'], ['SINCE P2U', 'D+{d}'], ['TODAY', '{today}'], ['DRAWN BY', '↳ PpLE'], ['SCALE', '1 : 1']]
  },

  /* ---------- 음악 (Player · 하단 BGM) ---------- */
  bgm: [
    { title: 'Love Disorder', artist: 'PURE × UXI', cover: '', src: '', time: '3:19', line: 'Beep. Beep.' },
    { title: 'B-P-M', artist: 'HANA × REN', cover: '', src: '', time: '2:58', line: '심장이 빨라지는 건' },
    { title: 'Knife Edge', artist: 'HANA × REN', cover: '', src: '', time: '3:41', line: '칼끝 같은 조명 아래' },
    { title: 'Catch', artist: 'HANA × REN', cover: '', src: '', time: '3:05', line: '손끝에 걸린 마지막 코드' },
    { title: 'Last Train', artist: 'HANA × REN', cover: '', src: '', time: '4:12', line: '막차가 떠나도 괜찮아' }
  ],

  /* ---------- MEMBER (캐릭터 프로필) ---------- */
  // 처음 열릴 때는 open 번호(0부터)의 캐릭터가 보여요.
  memberOpen: 1,
  members: [
    {
      key: 'hana', name: 'HANA', tag: 'FRONT ROW · No.1 FAN', theme: 'light', code: 'H-1103',
      badge: 'ALL-ACCESS PASS', level: '[ BACKSTAGE : ESSENTIAL ]',
      avatar: '', hero: '',
      quote: '‘늘 같은 자리, 맨 앞줄 오른쪽. 그가 노래하다 고개를 들면 가장 먼저 닿는 곳에 그녀가 있다.’',
      note: { label: 'OFFICIAL NOTE', text: '“月とナイフ의 첫 공연부터 한 번도 빠지지 않은 관객. 지금은 리허설 룸 출입이 허락된 유일한 외부인이다. 세트리스트가 바뀌면 멤버들보다 먼저 알아차리고, 공연이 끝나면 아무 말 없이 수건을 건넨다.”' },
      headline: 'MEMBER PROFILE',
      role: { title: 'ROLE & HABIT', entries: [
        { name: '백스테이지 매니저 (Backstage Care)', text: '공연 전엔 목 캔디와 따뜻한 물을, 공연 후엔 수건을 건넨다. 렌이 목이 잠기면 제일 먼저 눈치채는 사람이자, 멤버들의 고민 상담도 들어주는 무대 뒤의 숨은 스태프.' },
        { name: '맨 앞줄의 떼창', text: '• 앵콜 신호: 객석에서 가장 먼저 앵콜을 외친다.<br>• 박자 유지: 그녀가 흥얼거리면 밴드 전체의 템포가 안정된다.' }
      ] },
      gallery: ['', '', ''],
      bgm: 0, song: 3
    },
    {
      key: 'ren', name: 'REN', tag: 'LEAD VOCAL · 月とナイフ', theme: 'dark', code: 'R-0424',
      badge: 'HEADLINER', level: '[ STAGE LEVEL : ENCORE ]',
      avatar: '', hero: '',
      quote: '가장 낮게 속삭이고, 가장 높이 지른다. 무대 위에선 누구에게도 시선을 주지 않지만, 앵콜 마지막 소절만은 늘 같은 곳을 향한다.',
      directive: { label: '[ STAGE DIRECTIVE ]', title: '리드 보컬 ‘렌’ 특별 관리 프로토콜', sub: '공연 전 2시간 | 대기실 외 출입 금지' },
      report: { title: 'SITUATION REPORT', paragraphs: [
        '투어 셋째 날 밤, 그의 전장은 <b>무대 위</b>였습니다. 사흘 연속 잠을 거른 채 리허설을 반복하던 렌은, 결국 사운드체크 도중 마이크를 내려놓았습니다.',
        '스태프 누구의 말도 듣지 않던 그는, 객석 맨 앞줄 오른쪽에 <span class="hl">그녀가 앉는 순간</span> 아무렇지 않게 다시 첫 소절을 불렀습니다.',
        '그날 이후 밴드에는 <b>규칙 하나</b>가 생겼습니다. 공연 전 2시간, 대기실 문은 그녀에게만 열린다는 것.'
      ] },
      gallery: ['', '', ''],
      bgm: 2, song: 4
    }
  ],

  /* ---------- 캐릭터 정리 창 (東京青藍大学 · FRONTLINE · ETC. 앱) ----------
     - worlds 안에 앱 하나당 한 덩어리가 있어요. (seiran = 東京青藍大学, frontline = FRONTLINE, etc = ETC.)
     - 각 덩어리 안의 MEMBER / PAIR / AU 가 창 위쪽 탭 3개예요. 그 안에 캐릭터를 넣으면 카드가 생겨요.
     - 캐릭터 한 명 = { ... } 덩어리 하나. 복사해서 붙여넣고 내용만 바꾸면 돼요.
     - ARCH 앱은 예전 MEMBER 창을 그대로 열어요 (여기와 상관없음). */
  characters: {
    title: ['CHARACTERS', 'MEMBERS'], sub: 'MEMBER DATABASE', drawnBy: '↳ HANA',
    tabs: [['member', 'MEMBER'], ['pair', 'PAIR'], ['au', 'AU']],
    worlds: {
      seiran: { name: '東京青藍大学', no: 'CH-03',
        member: [
        { dept: '人文学部', name: '캐릭터 1', en: 'Character One', quote: '한 줄 소개가 들어가요', tags: ['#태그'],
          spec: [['AGE', '00'], ['HEIGHT', '000'], ['BIRTH', '00.00'], ['LOVER', '연인 이름']],   // 사진 옆 작은 칸 4개 (LOVER 아래에 연인·이름을 직접 적어요)
          card: '', photo: '',             // card: 목록·상세 사진 / photo: PHOTO 버튼 눌렀을 때 보일 사진 (비우면 card 사진, 4:5 비율 추천)
          theme: { title: 'CHARACTER SONG', src: '' },   // 상세창 ♪ CHARACTER SONG 버튼 (src 에 mp3 주소)
          profile: { rows: [['좋아하는 것', '내용'], ['싫어하는 것', '내용'], ['특징', '내용']], personality: '성격이 들어가요.', memo: '짧은 설명이 들어가요.' },
          prompts: [{ title: '기본 외형', text: '프롬프트를 적어요' }, { title: '의상', text: '프롬프트를 적어요' }],
          gallery: ['', '', ''],   // GALLERY 탭 사진 (개수 자유)
          music: [{ title: '노래 제목', artist: '가수', src: '' }],
          talk: [
            { name: '다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: true, likes: 2922, text: '리뷰 내용을 적어주세요.', replies: [['캐릭터 1', '이 캐릭터의 답'], ['다른 캐릭터', '리뷰 쓴 캐릭터의 답']] },
            { name: '또 다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: false, likes: 876, text: '리뷰 내용을 적어주세요.', replies: [] }
          ] },
        { dept: '言語学部', name: '캐릭터 2', en: 'Character Two', quote: '한 줄 소개가 들어가요', tags: ['#태그'],
          spec: [['AGE', '00'], ['HEIGHT', '000'], ['BIRTH', '00.00'], ['LOVER', '연인 이름']],   // 사진 옆 작은 칸 4개 (LOVER 아래에 연인·이름을 직접 적어요)
          card: '', photo: '',             // card: 목록·상세 사진 / photo: PHOTO 버튼 눌렀을 때 보일 사진 (비우면 card 사진, 4:5 비율 추천)
          theme: { title: 'CHARACTER SONG', src: '' },   // 상세창 ♪ CHARACTER SONG 버튼 (src 에 mp3 주소)
          profile: { rows: [['좋아하는 것', '내용'], ['싫어하는 것', '내용'], ['특징', '내용']], personality: '성격이 들어가요.', memo: '짧은 설명이 들어가요.' },
          prompts: [{ title: '기본 외형', text: '프롬프트를 적어요' }, { title: '의상', text: '프롬프트를 적어요' }],
          gallery: ['', '', ''],   // GALLERY 탭 사진 (개수 자유)
          music: [{ title: '노래 제목', artist: '가수', src: '' }],
          talk: [
            { name: '다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: true, likes: 2922, text: '리뷰 내용을 적어주세요.', replies: [['캐릭터 2', '이 캐릭터의 답'], ['다른 캐릭터', '리뷰 쓴 캐릭터의 답']] },
            { name: '또 다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: false, likes: 876, text: '리뷰 내용을 적어주세요.', replies: [] }
          ] },
        { dept: 'デザイン学部', name: '캐릭터 3', en: 'Character Three', quote: '한 줄 소개가 들어가요', tags: ['#태그'],
          spec: [['AGE', '00'], ['HEIGHT', '000'], ['BIRTH', '00.00'], ['LOVER', '연인 이름']],   // 사진 옆 작은 칸 4개 (LOVER 아래에 연인·이름을 직접 적어요)
          card: '', photo: '',             // card: 목록·상세 사진 / photo: PHOTO 버튼 눌렀을 때 보일 사진 (비우면 card 사진, 4:5 비율 추천)
          theme: { title: 'CHARACTER SONG', src: '' },   // 상세창 ♪ CHARACTER SONG 버튼 (src 에 mp3 주소)
          profile: { rows: [['좋아하는 것', '내용'], ['싫어하는 것', '내용'], ['특징', '내용']], personality: '성격이 들어가요.', memo: '짧은 설명이 들어가요.' },
          prompts: [{ title: '기본 외형', text: '프롬프트를 적어요' }, { title: '의상', text: '프롬프트를 적어요' }],
          gallery: ['', '', ''],   // GALLERY 탭 사진 (개수 자유)
          music: [{ title: '노래 제목', artist: '가수', src: '' }],
          talk: [
            { name: '다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: true, likes: 2922, text: '리뷰 내용을 적어주세요.', replies: [['캐릭터 3', '이 캐릭터의 답'], ['다른 캐릭터', '리뷰 쓴 캐릭터의 답']] },
            { name: '또 다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: false, likes: 876, text: '리뷰 내용을 적어주세요.', replies: [] }
          ] }
        ],
        pair: [
        /* 페어 하나 = { ... } 덩어리 하나
           badge: 왼쪽 위 초록 뱃지 (비우면 안 보임) / tags: 오른쪽 위 작은 글씨
           since: 시작일 (YYYY-MM-DD) → D+ 날짜가 매일 자동 계산돼요 / next: 다음 기념일 (D+숫자)
           photo: 16:9 사진 / back: 사진을 누르면 뒤집혀서 나오는 뒷면 사진 (비우면 두 캐릭터 이름이 적힌 뒷면)
           a, b: 두 캐릭터. link 에 MEMBER 의 이름을 똑같이 적으면 그 캐릭터의 사진·소개·태그를 그대로 가져와요
                 (MEMBER 에 없는 캐릭터면 a/b 안에 photo, quote, tags, en 을 직접 적어도 돼요)
           페어를 누르면 → 캐릭터 사진 화면 (오른쪽 동그라미로 a/b 전환) → 아래 PAIR LOG ↗ 누르면 페어 상세 */
        { badge: 'MAIN', name: '페어 이름', en: 'PAIR NAME', quote: '페어 한 줄 소개가 들어가요.', tags: '태그 X 태그',
          status: 'BONDED', since: '2026-08-30', next: 100, photo: '', back: '', memo: '페어 메모 · 관계 설명을 자유롭게.',
          a: { name: '캐릭터 1', sub: '人文学部', avatar: '', link: '캐릭터 1' },
          b: { name: '상대 캐릭터', sub: 'GUEST', avatar: '', link: '' } },
        { badge: 'MAIN', name: '페어 이름', en: 'PAIR NAME', quote: '페어 한 줄 소개가 들어가요.', tags: '태그 X 태그',
          status: 'ING', since: '2026-08-20', next: 100, photo: '', back: '', memo: '',
          a: { name: '캐릭터 2', sub: '言語学部', avatar: '', link: '캐릭터 2' },
          b: { name: '상대 캐릭터', sub: 'GUEST', avatar: '', link: '' } }
        ],
        au: []
      },
      /* ---------- ARCH (밝은 ROSTER 목록 + AGENT PROFILE 상세) ----------
         groups: 목록에서 줄로 나뉘는 그룹 (name 왼쪽 큰 글씨 / cls 오른쪽 등급 / color 줄·등급 색)
         캐릭터의 group 에 그룹 key 를 적으면 그 줄로 들어가요.
         attr / attrColor: 카드 아래 동그란 속성 뱃지 글자 / 색
         theme: 'light' 밝은 창 / 'dark' 어두운 창
         sections: 상세창 내용 칸. type 종류 →
           directive (가운데 [ ] 제목) / report (글 상자, <b>굵게</b> <span class="hl">강조</span> 가능)
           table (프로필 표 + 평가 인용문) / analysis (분석 · 소제목 + • 목록) / protocol (⚠ 경고 상자) */
      arch: { name: 'ARCH', no: 'CH-01', style: 'roster', term: 'ARCH TERMINAL', footer: 'ARCH CENTER',
        groups: [
          { key: 'prima', name: 'ARCH-PRIMA', cls: 'SS-CLASS', color: '#3d8de0' },
          { key: 'v1', name: 'VANGUARD 1팀', cls: 'S-CLASS', color: '#e5534b' }
        ],
        member: [
        { group: 'prima', name: '캐릭터 A', en: 'Agent A', attr: '무속성', attrColor: '#7fb8c8', card: '', avatar: '', hero: '',
          tag: 'A-CLASS GUIDE', code: 'P-0001', theme: 'light', badge: 'A-CLASS ENTITY',
          level: '[ MEDICAL SUPPORT : ESSENTIAL ]', quote: '‘가장 순수한 존재가 건네는, 가장 완벽한 안식. 한 줄 소개가 여기에 들어가요.’',
          bgm: 0, song: 1, gallery: ['', '', ''],
          sections: [
            { type: 'table', title: 'AGENT PROFILE',
              rows: [['CODENAME', '코드네임 (Code)'], ['CLASSIFICATION', 'A-Class Guide / Chief Medic'], ['ATTRIBUTE', '[ 무속성 (Non-Attribute) ]'], ['AGE/NATIONALITY', '00세 / 국적']],
              evalLabel: 'OFFICIAL EVALUATION', eval: '“공식 평가가 들어가요. 이 캐릭터가 조직 안에서 어떤 평가를 받고 있는지, 어떤 이력을 가지고 있는지 적어주세요.”' },
            { type: 'report', title: 'PERSONAL RECORD', paragraphs: ['캐릭터의 과거와 지금을 적는 칸이에요. <b>굵게</b> 쓰고 싶은 곳은 b 태그로 감싸면 돼요.', '문단을 나누고 싶으면 쉼표로 구분해서 하나 더 적으면 돼요. <span class="hl">강조하고 싶은 말</span>은 이렇게 표시돼요.'] }
          ] },
        { group: 'prima', name: '캐릭터 B', en: 'Agent B', attr: '전기 속성', attrColor: '#e8b93a', card: '', avatar: '', hero: '',
          tag: 'S-CLASS SENTINEL', code: 'U-0002', theme: 'dark', badge: 'S-CLASS ENTITY',
          level: '[ THREAT LEVEL : CONTROL ]', quote: '‘한 줄 소개가 들어가요. 캐릭터를 대표하는 대사나 문장을 적어주세요.’',
          bgm: 2, song: 4, gallery: ['', '', ''],
          sections: [
            { type: 'directive', label: '[ EMERGENCY DIRECTIVE ]', title: 'S급 센티널 ‘캐릭터 B’ 특별 관리 프로토콜', sub: '기밀 등급 표시 | 담당자 외 열람 금지' },
            { type: 'report', title: 'SITUATION REPORT', paragraphs: ['현재 상황 보고가 들어가요. 캐릭터가 어떤 상태인지, 무엇이 문제인지 적어주세요.', '<b>소속 · 직함</b> 같은 중요한 단어는 굵게, <span class="hl">‘캐릭터 B’</span> 같은 이름은 강조로 표시할 수 있어요.'] },
            { type: 'table', title: 'AGENT PROFILE',
              rows: [['CODENAME', '코드네임 (Code)'], ['CLASSIFICATION', 'S-Class Elemental Sentinel'], ['ATTRIBUTE', '[ 전기 (Fulmen) ]'], ['AGE/NATIONALITY', '00세 / 국적']],
              evalLabel: 'PSYCHOLOGICAL EVALUATION', eval: '“심리 평가가 들어가요. 성향, 불안 요소, 필요한 관리 같은 것을 적어주세요.”' },
            { type: 'analysis', title: 'SUBJECT ANALYSIS [TMI]', groups: [
              { label: '외형적 특징 (VISUAL DATA)', items: [['신장/체격', '000cm. 체격 설명.'], ['주요 특징', '머리 · 눈 등 외형 특징.'], ['복장', '자주 입는 옷.']] },
              { label: '성향 및 기호 (BEHAVIORAL PATTERN)', items: [['식성', '좋아하는 음식 · 싫어하는 음식.'], ['버릇', '자주 하는 행동.'], ['감정 표출', '감정을 드러내는 방식.']] } ] },
            { type: 'protocol', title: 'HANDLING PROTOCOL', text: '이 캐릭터를 대할 때 주의할 점이 들어가요. <b>꼭 지켜야 하는 것</b>은 굵게 써주세요.' }
          ] },
        { group: 'v1', name: '캐릭터 C', en: 'Agent C', attr: '불 속성', attrColor: '#e5534b', card: '', tag: 'S-CLASS SENTINEL', code: 'V-0003', theme: 'dark', badge: 'S-CLASS ENTITY',
          level: '[ VANGUARD : FRONT ]', quote: '‘한 줄 소개가 들어가요.’', bgm: 0, song: 1, gallery: ['', '', ''],
          sections: [{ type: 'table', title: 'AGENT PROFILE', rows: [['CODENAME', '코드네임'], ['CLASSIFICATION', 'S-Class Sentinel'], ['ATTRIBUTE', '[ 불 (Ignis) ]'], ['AGE/NATIONALITY', '00세 / 국적']], evalLabel: 'OFFICIAL EVALUATION', eval: '“평가가 들어가요.”' }] },
        { group: 'v1', name: '캐릭터 D', en: 'Agent D', attr: '바람 속성', attrColor: '#4cbf7a', card: '', tag: 'A-CLASS GUIDE', code: 'V-0004', theme: 'light', badge: 'A-CLASS ENTITY',
          level: '[ VANGUARD : SUPPORT ]', quote: '‘한 줄 소개가 들어가요.’', bgm: 0, song: 1, gallery: ['', '', ''],
          sections: [{ type: 'table', title: 'AGENT PROFILE', rows: [['CODENAME', '코드네임'], ['CLASSIFICATION', 'A-Class Guide'], ['ATTRIBUTE', '[ 바람 (Ventus) ]'], ['AGE/NATIONALITY', '00세 / 국적']], evalLabel: 'OFFICIAL EVALUATION', eval: '“평가가 들어가요.”' }] }
        ],
        pair: [
        { badge: 'MAIN', name: '페어 이름', en: 'PAIR NAME', quote: '페어 한 줄 소개가 들어가요.', tags: '태그 X 태그',
          status: 'BONDED', since: '2026-04-24', next: 200, photo: '', back: '', memo: '페어 메모 · 관계 설명을 자유롭게.',
          a: { name: '캐릭터 A', link: '캐릭터 A' }, b: { name: '캐릭터 B', link: '캐릭터 B' } }
        ],
        au: []
      },
      frontline: { name: 'FRONTLINE', no: 'CH-04',
        member: [
        { dept: '소속', name: '캐릭터 5', en: 'Character Five', quote: '한 줄 소개가 들어가요', tags: ['#태그'],
          spec: [['AGE', '00'], ['HEIGHT', '000'], ['BIRTH', '00.00'], ['LOVER', '연인 이름']],   // 사진 옆 작은 칸 4개 (LOVER 아래에 연인·이름을 직접 적어요)
          card: '', photo: '',             // card: 목록·상세 사진 / photo: PHOTO 버튼 눌렀을 때 보일 사진 (비우면 card 사진, 4:5 비율 추천)
          theme: { title: 'CHARACTER SONG', src: '' },   // 상세창 ♪ CHARACTER SONG 버튼 (src 에 mp3 주소)
          profile: { rows: [['좋아하는 것', '내용'], ['싫어하는 것', '내용'], ['특징', '내용']], personality: '성격이 들어가요.', memo: '짧은 설명이 들어가요.' },
          prompts: [{ title: '기본 외형', text: '프롬프트를 적어요' }, { title: '의상', text: '프롬프트를 적어요' }],
          gallery: ['', '', ''],   // GALLERY 탭 사진 (개수 자유)
          music: [{ title: '노래 제목', artist: '가수', src: '' }],
          talk: [
            { name: '다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: true, likes: 2922, text: '리뷰 내용을 적어주세요.', replies: [['캐릭터 5', '이 캐릭터의 답'], ['다른 캐릭터', '리뷰 쓴 캐릭터의 답']] },
            { name: '또 다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: false, likes: 876, text: '리뷰 내용을 적어주세요.', replies: [] }
          ] },
        { dept: '소속', name: '캐릭터 6', en: 'Character Six', quote: '한 줄 소개가 들어가요', tags: ['#태그'],
          spec: [['AGE', '00'], ['HEIGHT', '000'], ['BIRTH', '00.00'], ['LOVER', '연인 이름']],   // 사진 옆 작은 칸 4개 (LOVER 아래에 연인·이름을 직접 적어요)
          card: '', photo: '',             // card: 목록·상세 사진 / photo: PHOTO 버튼 눌렀을 때 보일 사진 (비우면 card 사진, 4:5 비율 추천)
          theme: { title: 'CHARACTER SONG', src: '' },   // 상세창 ♪ CHARACTER SONG 버튼 (src 에 mp3 주소)
          profile: { rows: [['좋아하는 것', '내용'], ['싫어하는 것', '내용'], ['특징', '내용']], personality: '성격이 들어가요.', memo: '짧은 설명이 들어가요.' },
          prompts: [{ title: '기본 외형', text: '프롬프트를 적어요' }, { title: '의상', text: '프롬프트를 적어요' }],
          gallery: ['', '', ''],   // GALLERY 탭 사진 (개수 자유)
          music: [{ title: '노래 제목', artist: '가수', src: '' }],
          talk: [
            { name: '다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: true, likes: 2922, text: '리뷰 내용을 적어주세요.', replies: [['캐릭터 6', '이 캐릭터의 답'], ['다른 캐릭터', '리뷰 쓴 캐릭터의 답']] },
            { name: '또 다른 캐릭터', avatar: '', relation: '관계', call: '호칭', best: false, likes: 876, text: '리뷰 내용을 적어주세요.', replies: [] }
          ] }
        ],
        pair: [],
        au: []
      },
      etc: { name: 'ETC.', no: 'CH-00',
        member: [],
        pair: [],
        au: []
      }
    }
  },

  /* ---------- MOONtalk (메신저) ---------- */
  chat: {
    partner: 'REN', status: '대기실 · 온라인', avatar: '',
    me: { name: 'HANA', avatar: '' },
    // from: 'them'(상대) / 'me'(나)
    messages: [
      { from: 'them', text: '밥 안 먹으면 오늘 리허설 끝나고 바로 데리러 간다' },
      { from: 'them', text: '선택해. 얌전히 문 열어줄래 아니면 내가 매니저 형한테 키 받아서 들어갈까?' },
      { from: 'me', text: '협박범 진짜' },
      { from: 'me', text: '열어놨어——' },
      { from: 'them', text: '하나야, 혹시 오늘 저녁에 약속 있어? 공연 끝나고 파스타 먹으러 갈까' },
      { from: 'them', text: '리허설 중에 다치지 말고, 힘들면 꼭 중간중간 쉬어가면서 해. 네 응원 소리 다 들려——' },
      { from: 'them', text: '♥', emo: true },
      { from: 'them', text: '방금 복도에서 스쳐 지나갔는데, 나 못 봤지? 우리 고양이ㅋㅋ' },
      { from: 'them', text: '지금 어디야? 위치 공유 꺼놨어?' },
      { from: 'them', text: '사운드체크 끝나면 바로 연락할게' },
      { from: 'them', text: '공연 끝나고 뒷문으로 와 🌙' }
    ],
    replies: ['응, 듣고 있어', '지금 대기실. 너 온 거 보여', '…앵콜 한 곡 더 할까', '목소리 괜찮아. 너 오면 더 괜찮고', '잠깐만, 매니저 형 온다'],
    // 홈에 있으면 가끔 상대가 보내는 메시지 (알림으로 떠요)
    incoming: ['♥', '보고 싶다', '어디야?']
  },

  /* ---------- 자동 알림 (초 단위) ---------- */
  toasts: [
    { app: 'talk', delay: 52 }
  ],

  /* ---------- Stage Monitor ---------- */
  monitor: {
    title: 'Stage Monitor', sub: 'MOON 스테이지 관리 시스템',
    zones: ['대기실', '무대', '합주실', '백스테이지'],   // 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래
    a: { name: '하나', tag: 'FAN · FRONT ROW', zone: '무대', bpm: 68 },
    b: { name: '렌', tag: 'VOCAL · HEADLINER', zone: '합주실', bpm: 112 },
    distance: 448,
    gaugeLabel: '앵콜 필요',
    scale: ['안정', '주의', '앵콜 필요'],
    gauge: 100,
    button: '하나에게 앵콜 요청',
    last: '마지막 앵콜 —',
    footer: 'B1 · 무대 뒤',
    log: [
      { t: '22:40:02', text: '렌 → 합주실' },
      { t: '22:40:02', text: '하나 → 무대' },
      { t: '22:40:02', text: '▲ 앵콜 필요도 100% · 텐션 위험', warn: true },
      { t: '22:40:02', text: '▲ 앵콜 필요도 70% 넘음 · 앵콜 권장', warn: true }
    ],
    alert: { title: 'Stage Monitor · 긴급', text: '보컬 \'REN\' 앵콜 필요도 100%! 지금 바로 앵콜이 필요해요', act: '앵콜 요청' }
  },

  /* ---------- Pedal Board (톤 조합실) ---------- */
  pedal: {
    title: 'Pedal Board', code: 'MOON GEAR · PB-01', status: 'IN TUNE',
    mission: '새벽 발라드 톤',
    stats: [{ label: 'VOLUME', value: 5.00, unit: 'dB', fix: 2 }, { label: 'TUNE', value: 440, unit: 'Hz', fix: 0, jitter: 0 }, { label: 'GAIN', value: 100, unit: '%', fix: 0, jitter: 2 }],
    items: [
      { key: 'rv', name: '리버브', en: 'REVERB', color: '#dfe7ef' },
      { key: 'od', name: '드라이브', en: 'OVERDRIVE', color: '#f5c55a' },
      { key: 'dl', name: '딜레이', en: 'DELAY', color: '#4f9be8' },
      { key: 'ch', name: '코러스', en: 'CHORUS', color: '#6fc3f0' }
    ],
    hint: '페달을 앰프에 3개까지 연결하고 톤을 만들어 보세요 ✦',
    recipes: [
      { combo: ['dl', 'dl', 'rv'], name: '새벽 3시 리버브', desc: '미션 완료! 렌이 제일 좋아하는 톤이에요 ✦' },
      { combo: ['ch', 'ch', 'ch'], name: '물속의 달', desc: '몽롱하고 반짝이는 소리 ✦' },
      { combo: ['od', 'od', 'od'], name: '라이브 하우스 굉음', desc: '스피커가 조금 울었어요 ✦' },
      { combo: ['od', 'dl', 'rv'], name: '앵콜 직전의 소리', desc: '객석이 전부 일어났어요 ✦' },
      { combo: ['rv', 'rv', 'ch'], name: '첫눈 오는 합주실', desc: '조용하고 따뜻한 소리 ✦' }
    ],
    total: 34,
    fail: { name: '알 수 없는 노이즈', desc: '하울링이 났어요… 다시 조합해 볼까요?' }
  },

  /* ---------- Memo (탭 = 페이지) ---------- */
  memo: [
    { tab: '연습 메모', sections: [
      { title: 'SETLIST · VOL.05', items: [
        { text: '01 Moonlit Feedback — 인트로 반 박자 늦게', done: false },
        { text: '02 B-P-M — 브릿지 후 떼창 파트', done: false },
        { text: '03 Knife Edge — 렌 애드리브 구간 비워두기', done: true },
        { text: '앵콜 Last Train — 하나 자리 보고 부르기', done: false }
      ] }
    ] },
    { tab: '할 일', sections: [
      { title: 'TO DO · HANA', items: [
        { text: '렌 목 캔디 (유자맛) 사기 (매진이었음… 다른 맛 사옴)', done: true },
        { text: '투어 3회차 티켓팅 10시 정각', done: false },
        { text: '앵콜곡 떼창 파트 외우기', done: false },
        { text: '리허설 룸 출입증 챙기기', done: false },
        { text: '렌 잠 못 잔 거 체크', done: false }
      ] },
      { title: 'TO DO · REN', items: [
        { text: '하나 자리 맨 앞줄 오른쪽 확인', done: true },
        { text: '셋리스트 마지막 곡 몰래 바꾸기', done: false },
        { text: '새벽 4시 데모 녹음 ← 그냥 포기', done: true },
        { text: '뒤풀이 장소 예약', done: false },
        { text: '대기실 정리', done: false }
      ] }
    ] },
    { tab: '낙서장', sections: [
      { title: 'SECRET · 비밀 노트', note: '고민 중 🌙', items: [
        { text: '대기실 소파에 하나 전용 담요 하나 놔둘까?', done: false },
        { text: '매니저 형이 알면 뭐라 하겠지만 내 마음이니까…', done: false, plain: true }
      ] }
    ] }
  ],

  /* ---------- Records (카테고리 글) ---------- */
  records: {
    root: 'Setlist',
    folders: [
      { id: 'hana', name: 'HANA', icon: 'heart' },
      { id: 'music', name: 'music', icon: 'note' },
      { id: 'etc', name: 'etc', icon: 'folder' },
      { id: 'bang', name: '!', icon: 'bell' }
    ],
    // no: 글 번호(창 제목 #번호), 위에 있을수록 최신
    posts: [
      { no: 11, folder: 'hana', title: '안녕하세요… 홈을 옮겼습니다', tag: 'HANA', date: '2026. 10. 16.', thumb: '', excerpt: '새 홈 오픈♡',
        body: '<p>이제 <b>티스토리</b>는 잘 안 쓸 것 같아요!!!</p><p>기존에 배너 교환해주셨던 분들께서는 제 배너 주소를</p>',
        link: 'https://example.com/', after: '로 바꿔주시면 감사 또 감사…♡ <span class="soft">(새로 교환하실 분들도 연락주세요)</span>' },
      { no: 13, folder: 'music', title: 'Catch BGM ver.', tag: '♪ music', date: '2026. 10. 19.', thumb: '', thumbLabel: 'HANA×REN', dark: 'navy',
        music: { title: 'Catch BGM ver.', artist: 'Hana X Ren', label: '[MOON] Theme BGM 01', bgm: 3, lyrics: ['손끝에 걸린 마지막 코드', '네가 웃으면 박자가 틀려', '괜찮아, 다시 처음부터', '이번엔 너를 보고 부를게'] } },
      { no: 14, folder: 'music', title: 'Moonlit Feedback BGM ver.', tag: '♪ music', date: '2026. 10. 19.', thumb: '', thumbLabel: 'HANA×REN', dark: 'navy',
        music: { title: 'Moonlit Feedback BGM ver.', artist: 'Hana X Ren', label: '[MOON] Theme BGM 01', bgm: 0, lyrics: ['앰프가 꺼진 뒤에도', '귓가에 남는 하울링', '그게 너라는 걸', '이제야 알았어'] } },
      { no: 12, folder: 'music', title: 'Ren 번외곡 | Knife Edge', tag: '♪ music', date: '2026. 10. 17.', thumb: '', thumbLabel: 'REN', excerpt: '오늘 리허설 날이에요★', dark: 'green',
        music: { title: 'Knife Edge', artist: 'Ren', label: '[MOON] Bonus track', bgm: 2, lyrics: ['칼끝 같은 조명 아래 서면', '숨 쉬는 법을 잊어도', '맨 앞줄 오른쪽', '그 자리만은 안 잊어', '박수 소리가 멀어져도', '네 목소리는 들려', '한 곡만 더, 너를 위해서'] } },
      { no: 9, folder: 'music', title: 'Hana 번외곡 | Monitor Glow', tag: '♪ music', date: '2026. 6. 10.', thumb: '', thumbLabel: 'HANA', dark: 'navy',
        music: { title: 'Monitor Glow', artist: 'Hana', label: '[MOON] Bonus track', bgm: 1, lyrics: ['차가운 monitor glow', '깨어나는 pulse', '누구보다 완벽하게', '"믿고 맡길 수 있는 사람"', '실패 따윈 허락 안 돼', '흔들리는 모든 것이'] } },
      { no: 8, folder: 'music', title: 'Ren 번외곡 | 맞아, 난 네가 좋아', tag: '♪ music', date: '2026. 6. 10.', thumb: '', thumbLabel: 'REN', dark: 'navy',
        music: { title: '맞아, 난 네가 좋아', artist: 'Ren', label: '[MOON] Bonus track', bgm: 4, lyrics: ['막차가 떠나도 괜찮아', '앵콜은 아직 남았으니까'] } },
      { no: 7, folder: 'music', title: 'Hana | Theme BGM 01', tag: '♪ music', date: '2026. 6. 10.', thumb: '', thumbLabel: 'HANA', dark: 'navy',
        music: { title: 'Theme BGM 01', artist: 'Hana', label: '[MOON] Theme BGM 01', bgm: 1, lyrics: ['심장이 빨라지는 건', '템포 때문이 아니야'] } }
    ]
  },

  /* ---------- Notice ---------- */
  notice: {
    lockLabel: '✦ PROMPT ✦',
    posts: [
      { no: 10, title: '✎ : Banner', tag: 'NOTICE', date: '2026. 10. 14.', excerpt: '배너 교환',
        images: [{ src: '', name: 'setlist-1.gif', size: '283KB', url: 'https://example.com/setlist-1.gif' }, { src: '', name: 'setlist-2.gif', size: '269KB', url: 'https://example.com/setlist-2.gif' }],
        fields: [{ label: 'Title(alt)', value: 'Setlist' }, { label: 'Link', value: 'https://example.com/' }, { label: 'Subtitle', value: 'beats per minute<br><small>(필수 X)</small>', dim: true }] }
    ]
  },

  /* ---------- Neighbors (배너 교환) ---------- */
  neighbors: {
    mine: { name: 'Setlist', desc: '클릭하면 배너교환 페이지로 이동', banner: '', link: '#' },
    list: [
      { no: '01', name: 'Moonrise Radio', desc: '지구인 인증', banner: '', link: '#' },
      { no: '02', name: 'Pl(uto)²pia', desc: '우리 둘 다 고장 난 거야. 근데 고장 난 것끼리 붙잡고 있으면 좀 덜 흔들리더라고.', banner: '', link: '#' },
      { no: '09', name: '♡', desc: '바보야, 너 같은 애를 좋아하나 봐.', banner: '', link: '#' },
      { no: '10', name: 'into the deep blue', desc: '대형견 임시 보호소', banner: '', link: '#' }
    ]
  },

  /* ---------- Internet ---------- */
  internet: {
    flix: {
      name: 'Lunaflix', domain: 'lunaflix.tv', path: '/browse/hana', viewer: '하나',
      hero: { badge: '이어보기', title: '너의 파장이 보여', meta: 'S2 · 12화', time: '41:20 / 62:10', progress: 66, image: '' },
      hero2: { badge: '렌 님이 시청 중', title: '2026 투어 파이널', meta: 'HANA vs REN | 매치 하이라이트', time: '4:11 / 95:01', progress: 4, image: '', big: ['THE LAST', 'ENCORE'], sub: 'HANA VS REN · BO5' },
      row: [
        { title: '너의 파장이 보여', meta: 'S2 · 12화 · 41:20 / 62:10', image: '', w: 66 },
        { title: '나의 맨 앞줄 수호천사! (+번외)', meta: '1기 · 1화 · 7:02 / 24:30', image: '', w: 28 },
        { title: '우리 합주실에 기타리스트가 산다', meta: '3화 · 58:44 / 70:00', image: '', w: 84 },
        { title: '2026 투어 파이널', meta: 'HANA vs REN | 매치 하이라이트 · 4:11 / 95:01', image: '', w: 4 }
      ]
    },
    stats: {
      name: 'TICKET.GG', domain: 'ticket.gg', path: '/fan/맨앞줄오른쪽-HANA',
      player: '맨앞줄오른쪽#HANA', sub: '주 포지션 · 스탠딩', tier: 'GRANDMASTER', lp: '812 LP', rate: 61, rateSub: '186승 121패',
      history: [
        { result: '성공', mode: '오픈 예매', min: '28분', icon: '스', role: '스탠딩', score: '12 / 2 / 9', diff: '12분 전', win: true },
        { result: '성공', mode: '오픈 예매', min: '31분', icon: '지', role: '지정석', score: '9 / 3 / 14', diff: '1시간 전', win: true },
        { result: '실패', mode: '취소표', min: '25분', icon: '스', role: '스탠딩', score: '7 / 6 / 5', diff: '새벽 4:02', win: false },
        { result: '성공', mode: '선예매', min: '22분', icon: '앵', role: '앵콜석', score: '5 / 1 / 22', diff: '어제 · 2연석', win: true }
      ],
      tip: { label: '추천 공략', title: '맨앞줄 공략: 오픈 3초 전 새로고침 금지', text: '1. 대기열 70% 넘으면 무리하지 말고 취소표 노려라 2. 예매 버튼 누를 때 숨 참기 3. 좌석보다 시야 우선 ㄱㄱ', by: 'by 맨앞줄오른쪽 · 조회 12.4만' }
    }
  },

  /* ---------- Game ---------- */
  game: {
    name: 'MOON BEAT', logo: 'M', coins: '4,240', gems: '520', player: '맨앞줄오른쪽', lv: 'Lv. 168',
    patch: 'NEW GAME MODE · PATCH 14.20', mode: '앵콜 방어전', modeEn: 'ENCORE DEFENSE',
    desc: '꺼져가는 객석의 함성을 막고 앵콜을 지키자.',
    invite: '공연장에 정적 출현! 앵콜 방어전에 참여하세요',
    social: '소셜 7/17',
    friends: [
      { name: '무리하지마', status: '대기실 · 게임 대기 중', on: true }, { name: '베이스는사랑', status: '게임 중 · 12:25', on: true },
      { name: '드럼치는곰', status: '게임 중 · 12:25', on: true }, { name: 'MOONcode', status: '게임 중 · 10:01', on: true },
      { name: 'MOONcandy', status: '게임 중 · 10:01', on: true }, { name: '바보온달', status: '온라인', on: true },
      { name: '평강공주', status: '온라인', on: true }, { name: 'zzunsiki', status: '오프라인' }, { name: 'romdrom', status: '오프라인' },
      { name: '정의의 사도', status: '오프라인' }, { name: '고기먹고싶다', status: '오프라인' }, { name: '연습벌레123', status: '오프라인' },
      { name: 'Demon', status: '오프라인' }, { name: 'Cherry', status: '오프라인' }, { name: 'Ritsu', status: '오프라인' }, { name: 'Miyu', status: '오프라인' }, { name: '여동이', status: '오프라인' }
    ]
  },

  /* ---------- Link Hub ---------- */
  // 링크 허브 — name: 보이는 이름, desc: 작은 설명, url: 이동할 주소, image: 썸네일 이미지 주소
  links: [
    { name: '링크 이름 1', desc: '설명을 적어주세요', url: 'https://example.com', image: '' },
    { name: '링크 이름 2', desc: '설명을 적어주세요', url: 'https://example.com', image: '' },
    { name: '링크 이름 3', desc: '설명을 적어주세요', url: 'https://example.com', image: '' },
    { name: '링크 이름 4', desc: '설명을 적어주세요', url: 'https://example.com', image: '' },
    { name: '링크 이름 5', desc: '설명을 적어주세요', url: 'https://example.com', image: '' },
    { name: '링크 이름 6', desc: '설명을 적어주세요', url: 'https://example.com', image: '' }
  ]
};
