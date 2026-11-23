/* =========================================================
   data.js — 홈페이지 내용 (✎ EDIT → 홈페이지에 저장 · 2026. 11. 24. 오전 12:53:00)
   - 홈페이지 주소 끝에 ?owner 를 붙여 들어가면 ✎ EDIT 로 바로 고칠 수 있어요.
   - 사진은 media/ 폴더에 있어요.
   ========================================================= */

const SITE = {
  // 로고 · 이름
  "brand": {
    "name": "SETLIST-01",
    "sub": "MOON STUDIO",
    "start": "P2U",
    "home": "UNRELEASED-01",
    "homeSub": "SEIRAN UNIV. BAND",
    "image": ""
  },

  // (예전) 큰 제목
  "title": {
    "before": "SETL",
    "after": "ST",
    "tilt": true
  },

  // 기본 페어 (D-DAY 알림)
  "pair": {
    "a": "PURE",
    "b": "UXI",
    "aRole": "FRONT ROW · No.1 FAN",
    "bRole": "LEAD VOCAL · 月とナイフ",
    "pill": "MIDNIGHT ENCORE LIVE ✦",
    "since": "2026-04-24",
    "nextGoal": 200,
    "passNo": "TICKET No. 0424",
    "status": "BONDED",
    "barcode": "FRONT ROW × LEAD VOCAL",
    "image": ""
  },

  // 페어 목록 (오른쪽 카드 · 배너 D+)
  "pairs": [
    {
      "a": "PURE",
      "b": "UXI",
      "since": "2026-04-24",
      "passNo": "TICKET No. 0424",
      "status": "BONDED",
      "barcode": "FRONT ROW × LEAD VOCAL",
      "image": "",
      "imageBack": "",
      "note": "맨 앞줄 오른쪽, 앵콜 마지막 소절"
    },
    {
      "a": "PAIR",
      "b": "TWO",
      "since": "2026-02-14",
      "passNo": "No. PT-0214",
      "status": "ON STAGE",
      "barcode": "GUITAR × DRUM",
      "image": "",
      "imageBack": "",
      "note": "두 번째 페어 메모를 적어주세요"
    },
    {
      "a": "PAIR",
      "b": "THREE",
      "since": "2025-12-25",
      "passNo": "No. PT-1225",
      "status": "ENCORE",
      "barcode": "BASS × KEYBOARD",
      "image": "",
      "imageBack": "",
      "note": "세 번째 페어 메모를 적어주세요"
    }
  ],

  // 페어 카드 작은 글자
  "pairLabels": {
    "first": "FIRST LIVE",
    "pair": "PAIR",
    "status": "STATUS",
    "together": "TOGETHER FOR",
    "flip": "뒤집기"
  },

  // (예전) 티켓
  "heroTicket": {
    "tour": "2026 月とナイフ LIVE TOUR — THE MIDNIGHT ENCORE PROTOCOL",
    "info": [
      [
        "GATE",
        "B"
      ],
      [
        "ROW",
        "01"
      ],
      [
        "SEAT",
        "R-07"
      ]
    ],
    "stubNo": "STUB · No. HR-0424",
    "stubTitle": [
      "MOON",
      "LIVE",
      "HOUSE"
    ],
    "passBand": "ALL ACCESS",
    "passVol": "★ 05",
    "passName": "BACKSTAGE",
    "passImage": "",
    "admit": "ADMIT ONE"
  },

  // (예전) 글자
  "studio": "STUDIO · ON AIR 24H",

  // 위 바 알약 글자
  "online": "CLUB ROOM OPEN",

  // (예전) 글자
  "residence": "MOON STUDIO · BACKSTAGE",

  // 페어 카드 위 제목
  "venue": "SEIRAN FESTIVAL · LIVE STAGE",

  // 페어 카드 작은 제목
  "passLabel": "PAIR INFORMATION",

  // (예전) 글자
  "footer": "MOON STUDIO",

  // (예전) 흐르는 글자
  "marquee": "OFF THE RECORD ✦ MOON LIVE HOUSE ✦ 月とナイフ LIVE TOUR 2026 ✦ HANA × REN ✦ LEAVING BEFORE THE ENCORE IS NOT ALLOWED ✦",

  // 아래 바 오른쪽 글자
  "credit": {
    "top": "© ↳ PpLE",
    "bottom": "Unreleased."
  },

  // 위 배너 (SYRINGE)
  "clinic": {
    "kicker": "SEIRAN UNIV. · LIGHT MUSIC CLUB",
    "title": "UNRELEASED",
    "chips": [
      "CAMPUS BAND +",
      "CLUB ROOM 402 // AFTER CLASS"
    ],
    "tab": "REHEARSAL · OPEN 24H",
    "nav": ""
  },

  // cursor
  "cursor": "capsule",

  // 입장화면
  "intro": {
    "lock": {
      "password": "0424",
      "title": "MEMBERS ONLY",
      "text": "비밀번호를 입력해 주세요",
      "wrong": "비밀번호가 달라요"
    },
    "nav": [
      "01 · ARCHIVE",
      "02 · SETLIST",
      "03 · KEY"
    ],
    "live": "LIVE",
    "liveLine": "BPM <b>{d}</b> · ROOM 07 · MIC ON",
    "kicker": "月とナイフ — BACKSTAGE ARCHIVE",
    "vol": "VOL. 05",
    "title": [
      "OFF THE",
      "RECORD"
    ],
    "roles": [
      "LEAD VOCAL",
      "FRONT ROW"
    ],
    "pill": "ENCORE NIGHT ✦",
    "tune": [
      "TUNING · ",
      "FILLING THE KEY",
      "READY ✦"
    ],
    "marquee": "OFF THE RECORD ✦ 月とナイフ LIVE TOUR 2026 ✦ HANA × REN ✦ LEAVING BEFORE THE ENCORE IS NOT ALLOWED ✦",
    "onair": [
      "SOUNDCHECK",
      "· ON AIR"
    ],
    "gate": [
      "ENTRANCE",
      "STAND BY",
      "OPEN",
      "WELCOME"
    ],
    "buttons": [
      "LOADING",
      "ENTER",
      "ON STAGE"
    ],
    "entry": {
      "brand": "UNRELEASED",
      "sub": "moon studio",
      "room": "ROOM 0101",
      "gate": [
        "STAND BY",
        "OPEN",
        "OPENING"
      ],
      "load": [
        "UNLOCKING ROOM 0101",
        "READY — 자물쇠를 눌러 주세요"
      ]
    },
    "clinic": {
      "nav": [
        "HOME",
        "CATEGORY",
        "NOTICE"
      ],
      "online": "NOW REHEARSING",
      "sub": "FRONT ROW × LEAD VOCAL",
      "unit": "VOL",
      "status": [
        "TUNING UP",
        "SOUNDCHECK",
        "CLUB ROOM 402",
        "ENCORE READY",
        "READY TO PLAY"
      ]
    },
    "seconds": 2.6
  },

  // 아이콘 창 내용 (Gallery · About · Mail …)
  "extraApps": [
    {
      "id": "gallery",
      "name": "Gallery",
      "type": "grid",
      "items": [
        [
          "제목 1",
          "10.26",
          ""
        ],
        [
          "제목 2",
          "10.23",
          ""
        ],
        [
          "제목 3",
          "10.20",
          ""
        ],
        [
          "제목 4",
          "10.17",
          ""
        ],
        [
          "제목 5",
          "10.14",
          ""
        ],
        [
          "제목 6",
          "10.11",
          ""
        ]
      ]
    },
    {
      "id": "letters",
      "name": "Letters",
      "type": "grid",
      "items": [
        [
          "편지 1",
          "10.26",
          ""
        ],
        [
          "편지 2",
          "10.23",
          ""
        ],
        [
          "편지 3",
          "10.20",
          ""
        ]
      ]
    },
    {
      "id": "lockbox",
      "name": "Lock Box",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "10.25"
        ],
        [
          "항목 2",
          "10.23"
        ],
        [
          "항목 3",
          "10.21"
        ]
      ]
    },
    {
      "id": "setlist",
      "name": "Setlist",
      "type": "grid",
      "items": [
        [
          "곡 1",
          "10.26",
          ""
        ],
        [
          "곡 2",
          "10.23",
          ""
        ],
        [
          "곡 3",
          "10.20",
          ""
        ]
      ]
    },
    {
      "id": "camera",
      "name": "Camera",
      "type": "grid",
      "items": [
        [
          "사진 1",
          "10.26",
          ""
        ],
        [
          "사진 2",
          "10.23",
          ""
        ],
        [
          "사진 3",
          "10.20",
          ""
        ]
      ]
    },
    {
      "id": "calendar",
      "name": "Calendar",
      "type": "list",
      "rows": [
        [
          "일정 1",
          "10.25"
        ],
        [
          "일정 2",
          "10.23"
        ],
        [
          "일정 3",
          "10.21"
        ]
      ]
    },
    {
      "id": "archive",
      "name": "Archive",
      "type": "list",
      "rows": [
        [
          "기록 1",
          "10.25"
        ],
        [
          "기록 2",
          "10.23"
        ],
        [
          "기록 3",
          "10.21"
        ]
      ]
    },
    {
      "id": "about",
      "name": "Profile",
      "icon": "idcard",
      "type": "about",
      "no": "NO. 2026-HANA",
      "title": "PROFILE",
      "sub": "ABOUT // SELF INTRO",
      "handle": "@handle",
      "info": [
        [
          "STATUS",
          "여기에 상태를 적어요"
        ],
        [
          "TYPE",
          "여기에 타입을 적어요"
        ]
      ],
      "infoNote": "*짧은 메모가 들어가요",
      "table": [
        [
          "항목 1",
          "메모가 들어가요"
        ],
        [
          "항목 2",
          "메모가 들어가요"
        ],
        [
          "항목 3",
          "-"
        ],
        [
          "항목 4",
          "메모가 들어가요\n두 줄도 돼요"
        ]
      ],
      "ng": [
        "NG",
        "주의할 점 제목",
        "주의할 점 설명이 들어가요"
      ],
      "valid": "VALID UNTIL: PERMANENT",
      "org": "MOON STUDIO",
      "stamp": "APPROVED"
    },
    {
      "id": "list",
      "name": "List",
      "icon": "list",
      "type": "inventory",
      "chip": "LOCKED",
      "title": "INVENTORY",
      "sub": "LIST // DATABASE",
      "intro": "여기에 리스트 설명이 들어가요. 짧게 적어주세요.",
      "groups": [
        [
          "그룹 이름 1",
          "@handle",
          [
            "항목",
            "항목",
            "항목"
          ]
        ],
        [
          "그룹 이름 2",
          "@handle",
          [
            "항목"
          ]
        ],
        [
          "그룹 이름 3",
          "@handle",
          [
            "항목",
            "항목"
          ]
        ]
      ]
    },
    {
      "id": "linked",
      "name": "Linked",
      "icon": "link",
      "type": "linked",
      "title": "LINKED",
      "sub": "DOSSIERS",
      "tag": "LINKED DOSSIERS",
      "no": "NO. 2026-10-29",
      "banner": {
        "img": "",
        "link": ""
      },
      "crewTitle": "CREW BANNER",
      "crewSub": "♥ 맞배너",
      "crew": [
        [
          "처방전",
          "TEAM",
          "@name",
          "",
          ""
        ],
        [
          "처방전",
          "TEAM",
          "@name",
          "",
          ""
        ],
        [
          "처방전",
          "TEAM",
          "@name",
          "",
          ""
        ],
        [
          "처방전",
          "TEAM",
          "@name",
          "",
          ""
        ]
      ]
    },
    {
      "id": "ooc",
      "name": "OOC",
      "type": "ooc",
      "room": "ROOM 04",
      "sub": "ARCHIVE // COPY & PASTE",
      "hint": "분류를 누르면 OOC가 나와요. COPY를 누르면 바로 복사돼요.",
      "cats": [
        {
          "k": "HELLO",
          "n": "인사",
          "items": [
            "(( 안녕하세요! 오늘도 잘 부탁드려요 ))",
            "(( 늦은 시간에 인사드려요, 편하게 이어 주세요 ))",
            "(( 처음 뵙겠습니다! 잘 부탁드려요 ))"
          ]
        },
        {
          "k": "LATE",
          "n": "늦은 답장",
          "items": [
            "(( 답이 늦어 죄송해요! 천천히 이어갈게요 ))",
            "(( 오늘은 답이 조금 느릴 수 있어요 ))"
          ]
        },
        {
          "k": "AWAY",
          "n": "자리 비움",
          "items": [
            "(( 잠깐 자리 비울게요, 금방 올게요! ))",
            "(( 밥 먹고 올게요 ))",
            "(( 오늘은 여기까지 할게요, 내일 이어가요 ))"
          ]
        },
        {
          "k": "THANKS",
          "n": "감사",
          "items": [
            "(( 오늘도 함께해 주셔서 감사해요 ))",
            "(( 덕분에 너무 즐거웠어요! ))"
          ]
        },
        {
          "k": "BYE",
          "n": "마무리",
          "items": [
            "(( 수고하셨어요! 좋은 밤 보내세요 ))",
            "(( 다음에 또 이어가요, 감사합니다 ))"
          ]
        },
        {
          "k": "ETC",
          "n": "기타",
          "items": [
            "(( 여기에 OOC 문구가 들어가요 ))"
          ]
        }
      ]
    },
    {
      "id": "prompt",
      "name": "Prompt",
      "type": "prompt",
      "room": "ROOM 05",
      "sub": "BACKGROUND + OUTFIT",
      "hint": "세로 · 가로 사진이 섞여도 각자 모양에 맞게 보여요.",
      "cats": [
        {
          "k": "DAILY",
          "n": "일상",
          "items": [
            {
              "t": "하늘색 오후",
              "image": "",
              "images": [
                "",
                "",
                ""
              ],
              "bg": "cozy cafe by the window, soft afternoon sunlight, pale blue walls, potted plants, light bokeh",
              "fit": "oversized sky blue knit sweater, pleated white skirt, loafers, small silver earrings"
            },
            {
              "t": "새벽 옥상",
              "wide": true,
              "image": "",
              "images": [
                "",
                "",
                ""
              ],
              "bg": "rooftop at dawn, pale blue sky, city lights fading, light haze, calm and lonely atmosphere",
              "fit": "white hoodie, mint windbreaker over it, wide denim pants, canvas sneakers"
            },
            {
              "t": "여기에 제목",
              "image": "",
              "images": [
                "",
                "",
                ""
              ],
              "bg": "여기에 배경 프롬프트가 들어가요.",
              "fit": "여기에 의상 프롬프트가 들어가요."
            }
          ]
        },
        {
          "k": "STAGE",
          "n": "무대",
          "items": [
            {
              "t": "유리 라이브하우스",
              "wide": true,
              "image": "",
              "images": [
                "",
                "",
                ""
              ],
              "bg": "small live house stage, glass panels, mint spotlight, scattered confetti, empty seats, wide angle",
              "fit": "cropped mint stage jacket, glossy pastel fabric, silver zipper details, white wide pants"
            },
            {
              "t": "앵콜 무대",
              "image": "",
              "images": [
                "",
                "",
                ""
              ],
              "bg": "concert stage after encore, blue laser lights, floating sparkles, smoky air, audience lightsticks",
              "fit": "sheer white blouse, sky blue corset vest, star hair pins, platform boots"
            }
          ]
        },
        {
          "k": "SEASON",
          "n": "계절",
          "items": [
            {
              "t": "눈 오는 밤",
              "wide": true,
              "image": "",
              "images": [
                "",
                "",
                ""
              ],
              "bg": "snowy street at night, warm shop lights, falling snow, quiet blue tone, soft glow",
              "fit": "long cream coat, mint muffler, knitted gloves, white earmuffs"
            }
          ]
        }
      ]
    },
    {
      "id": "album",
      "name": "Album",
      "type": "grid",
      "items": [
        [
          "사진 1",
          "11.04",
          ""
        ],
        [
          "사진 2",
          "11.02",
          ""
        ],
        [
          "사진 3",
          "10.30",
          ""
        ]
      ]
    },
    {
      "id": "guestbook",
      "name": "Guest Book",
      "type": "list",
      "rows": [
        [
          "방명록 1",
          "11.04"
        ],
        [
          "방명록 2",
          "11.02"
        ],
        [
          "방명록 3",
          "10.30"
        ]
      ]
    },
    {
      "id": "diary",
      "name": "Diary",
      "type": "list",
      "rows": [
        [
          "일기 1",
          "11.04"
        ],
        [
          "일기 2",
          "11.02"
        ],
        [
          "일기 3",
          "10.30"
        ]
      ]
    },
    {
      "id": "shop",
      "name": "Shop",
      "type": "grid",
      "items": [
        [
          "상품 1",
          "11.04",
          ""
        ],
        [
          "상품 2",
          "11.02",
          ""
        ],
        [
          "상품 3",
          "10.30",
          ""
        ]
      ]
    },
    {
      "id": "stickers",
      "name": "Stickers",
      "type": "grid",
      "items": [
        [
          "스티커 1",
          "11.04",
          ""
        ],
        [
          "스티커 2",
          "11.02",
          ""
        ],
        [
          "스티커 3",
          "10.30",
          ""
        ]
      ]
    },
    {
      "id": "radio",
      "name": "Radio",
      "type": "list",
      "rows": [
        [
          "방송 1",
          "11.04"
        ],
        [
          "방송 2",
          "11.02"
        ],
        [
          "방송 3",
          "10.30"
        ]
      ]
    },
    {
      "id": "mail",
      "name": "Mail",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "map",
      "name": "Map",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "settings",
      "name": "Settings",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "notes",
      "name": "Notes",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "wishlist",
      "name": "Wishlist",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "video",
      "name": "Video",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "xgame",
      "name": "Game",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "search",
      "name": "Search",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "weather",
      "name": "Weather",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "contacts",
      "name": "Contacts",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "cloud",
      "name": "Cloud",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "alarm",
      "name": "Alarm",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "wallet",
      "name": "Wallet",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "library",
      "name": "Library",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "stats",
      "name": "Stats",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "scan",
      "name": "Scan",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "pharmacy",
      "name": "Lyrics",
      "icon": "page",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "vitals",
      "name": "Tuner",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.15"
        ],
        [
          "항목 2",
          "11.12"
        ],
        [
          "항목 3",
          "11.09"
        ]
      ]
    },
    {
      "id": "clock",
      "name": "Clock",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "lab",
      "name": "Studio",
      "icon": "mic",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "ward",
      "name": "Green Room",
      "icon": "sofa",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "chart",
      "name": "Score",
      "icon": "note",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "pmonitor",
      "name": "Monitor",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "exam",
      "name": "Soundcheck",
      "icon": "headphones",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "thermo",
      "name": "Mixer",
      "icon": "sliders",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "vaccine",
      "name": "Demo",
      "icon": "disc",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "firstaid",
      "name": "Merch",
      "icon": "shirt",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "ticket",
      "name": "Ticket",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "playlist",
      "name": "Playlist",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "metronome",
      "name": "Metronome",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "snapshot",
      "name": "Polaroid",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "backstage",
      "name": "Backstage",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "tourbus",
      "name": "Tour",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "ampli",
      "name": "Amp",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "encore",
      "name": "Encore",
      "icon": "sparkle",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "fanmail",
      "name": "Fanmail",
      "icon": "mail",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "tape",
      "name": "Tape",
      "icon": "disc",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "pick",
      "name": "Pick",
      "icon": "pick",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "micstand",
      "name": "Mic",
      "icon": "mic",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    },
    {
      "id": "afterparty",
      "name": "Afterparty",
      "icon": "moon",
      "type": "list",
      "rows": [
        [
          "항목 1",
          "11.21"
        ],
        [
          "항목 2",
          "11.18"
        ],
        [
          "항목 3",
          "11.15"
        ]
      ]
    }
  ],

  // (예전/휴대폰) 메인 글자
  "home": {
    "kicker": "月とナイフ — BACKSTAGE ARCHIVE",
    "vol": "VOL.05",
    "title": [
      "OFF THE",
      "RECORD"
    ],
    "word": "UNRELEASED",
    "nowPlaying": {
      "title": "NOW PLAYING",
      "list": [
        "OPENING",
        "MOONLIT ♪",
        "KNIFE EDGE",
        "ENCORE"
      ],
      "on": 2,
      "time": [
        "01:48",
        "04:12"
      ]
    },
    "note": {
      "kicker": "TONIGHT'S ORDER · 月とナイフ",
      "list": [
        [
          "01",
          "OPENING",
          true
        ],
        [
          "02",
          "MOONLIT FEEDBACK",
          true
        ],
        [
          "03",
          "KNIFE EDGE",
          false
        ],
        [
          "04",
          "ENCORE NIGHT",
          false
        ]
      ],
      "sticky": [
        "NOTE TO",
        "HANA\n& REN",
        "ENCORE ✦"
      ]
    },
    "keyTitle": "KEY № 01",
    "keySub": "D+{d} · STILL TURNING",
    "keySeconds": 14
  },

  // (예전) 설계도
  "blueprint": {
    "image": "",
    "keySize": 85,
    "keyX": -6,
    "keyY": 0,
    "dim": "OVERALL · 168 (1:1)",
    "detail": "DETAIL A",
    "capTop": [
      "BAND EQUIPMENT",
      "MUSIC MAKES US STAY"
    ],
    "capBottom": [
      "MOON STUDIO",
      "OFF THE RECORD"
    ],
    "capRight": [
      "SAME STAGE",
      "DIFFERENT DREAMS"
    ],
    "labels": [
      [
        "BOW",
        "CLOVER · FILIGREE"
      ],
      [
        "COLLAR",
        "CROWN BAND"
      ],
      [
        "SHANK",
        "KNURLED GRIP"
      ],
      [
        "BIT",
        "HEART WARD"
      ]
    ],
    "stack": [],
    "spare": [
      {
        "name": "BASS",
        "model": "JAZZ TYPE · 4 STRINGS",
        "src": "",
        "x": 53,
        "y": 50,
        "w": 56,
        "r": 14,
        "side": "R",
        "labelY": 70,
        "rows": [
          [
            "LENGTH",
            "1,180 mm"
          ],
          [
            "WIDTH",
            "340 mm"
          ],
          [
            "SCALE",
            "34\""
          ],
          [
            "STRINGS",
            "4"
          ]
        ]
      },
      {
        "name": "GUITAR",
        "model": "STRAT TYPE",
        "src": "",
        "x": 44,
        "y": 22,
        "w": 30,
        "r": -8,
        "side": "R",
        "labelY": 14,
        "rows": [
          [
            "LENGTH",
            "1,000 mm"
          ],
          [
            "WIDTH",
            "325 mm"
          ],
          [
            "SCALE",
            "25.5\""
          ]
        ]
      },
      {
        "name": "DRUMS",
        "model": "SNARE DRUM · STICKS",
        "src": "",
        "x": 52,
        "y": 58,
        "w": 52,
        "r": -6,
        "side": "R",
        "labelY": 52,
        "rows": [
          [
            "DIAMETER",
            "350 mm"
          ],
          [
            "HEIGHT",
            "150 mm"
          ],
          [
            "STICKS",
            "7A · 2 pcs"
          ]
        ]
      },
      {
        "name": "KEYS",
        "model": "61 KEYS",
        "src": "",
        "x": 50,
        "y": 72,
        "w": 74,
        "r": -8,
        "side": "L",
        "labelY": 68,
        "rows": [
          [
            "LENGTH",
            "1,000 mm"
          ],
          [
            "WIDTH",
            "300 mm"
          ],
          [
            "HEIGHT",
            "100 mm"
          ]
        ]
      },
      {
        "name": "VOCALS",
        "model": "STAND MIC",
        "src": "",
        "x": 64,
        "y": 86,
        "w": 19,
        "r": 22,
        "side": "R",
        "labelY": 82,
        "rows": [
          [
            "HEIGHT",
            "1,800 mm"
          ],
          [
            "BASE",
            "250 mm"
          ],
          [
            "WEIGHT",
            "2.1 kg"
          ]
        ]
      }
    ],
    "notes": []
  },

  // SPEC SHEET 카드
  "spec": {
    "sub": "SETLIST Nº 01 · SEIRAN UNIV. BAND",
    "title": "SPEC SHEET",
    "cells": [
      [
        "FRONT ROW",
        "PURE"
      ],
      [
        "LEAD VOCAL",
        "UXI"
      ],
      [
        "SINCE P2U",
        "D+{d}"
      ],
      [
        "TODAY",
        "{today}"
      ],
      [
        "ARRANGED BY",
        "↳ PpLE"
      ],
      [
        "TRACK",
        "01"
      ]
    ]
  },

  // 음악 (Player · 아래 BGM)
  "bgm": [
    {
      "title": "Snow Rehearsal (Piano Waltz)",
      "artist": "SEIRAN UNIV. BAND · BGM",
      "cover": "",
      "src": "media/bgm-snow-waltz2.mp3",
      "time": "2:46",
      "line": "눈 오는 밤, 동아리방 피아노 앞에서",
      "rotate": true
    },
    {
      "title": "Snow Rehearsal (Sleigh Ride)",
      "artist": "SEIRAN UNIV. BAND · BGM",
      "cover": "",
      "src": "media/bgm-sleigh.mp3",
      "time": "2:34",
      "line": "썰매 방울 따라 합주실로 뛰어가기",
      "rotate": true
    },
    {
      "title": "Snow Rehearsal (Lullaby)",
      "artist": "SEIRAN UNIV. BAND · BGM",
      "cover": "",
      "src": "media/bgm-lullaby.mp3",
      "time": "2:51",
      "line": "불 꺼진 동아리방, 창밖에 눈",
      "rotate": true
    },
    {
      "title": "Snow Rehearsal (Music Box)",
      "artist": "SEIRAN UNIV. BAND · BGM",
      "cover": "",
      "src": "media/bgm-xmas.mp3",
      "time": "0:50",
      "line": "눈 내리는 동아리방, 마지막 합주"
    },
    {
      "title": "Love Disorder",
      "artist": "PURE × UXI",
      "cover": "",
      "src": "",
      "time": "3:19",
      "line": "Beep. Beep."
    },
    {
      "title": "B-P-M",
      "artist": "HANA × REN",
      "cover": "",
      "src": "",
      "time": "2:58",
      "line": "심장이 빨라지는 건"
    },
    {
      "title": "Knife Edge",
      "artist": "HANA × REN",
      "cover": "",
      "src": "",
      "time": "3:41",
      "line": "칼끝 같은 조명 아래"
    },
    {
      "title": "Catch",
      "artist": "HANA × REN",
      "cover": "",
      "src": "",
      "time": "3:05",
      "line": "손끝에 걸린 마지막 코드"
    },
    {
      "title": "Last Train",
      "artist": "HANA × REN",
      "cover": "",
      "src": "",
      "time": "4:12",
      "line": "막차가 떠나도 괜찮아"
    }
  ],

  // 처음 보이는 MEMBER 번호
  "memberOpen": 1,

  // MEMBER 프로필
  "members": [
    {
      "key": "hana",
      "name": "HANA",
      "tag": "FRONT ROW · No.1 FAN",
      "theme": "light",
      "code": "H-1103",
      "badge": "ALL-ACCESS PASS",
      "level": "[ BACKSTAGE : ESSENTIAL ]",
      "avatar": "",
      "hero": "",
      "quote": "‘늘 같은 자리, 맨 앞줄 오른쪽. 그가 노래하다 고개를 들면 가장 먼저 닿는 곳에 그녀가 있다.’",
      "note": {
        "label": "OFFICIAL NOTE",
        "text": "“月とナイフ의 첫 공연부터 한 번도 빠지지 않은 관객. 지금은 리허설 룸 출입이 허락된 유일한 외부인이다. 세트리스트가 바뀌면 멤버들보다 먼저 알아차리고, 공연이 끝나면 아무 말 없이 수건을 건넨다.”"
      },
      "headline": "MEMBER PROFILE",
      "role": {
        "title": "ROLE & HABIT",
        "entries": [
          {
            "name": "백스테이지 매니저 (Backstage Care)",
            "text": "공연 전엔 목 캔디와 따뜻한 물을, 공연 후엔 수건을 건넨다. 렌이 목이 잠기면 제일 먼저 눈치채는 사람이자, 멤버들의 고민 상담도 들어주는 무대 뒤의 숨은 스태프."
          },
          {
            "name": "맨 앞줄의 떼창",
            "text": "• 앵콜 신호: 객석에서 가장 먼저 앵콜을 외친다.<br>• 박자 유지: 그녀가 흥얼거리면 밴드 전체의 템포가 안정된다."
          }
        ]
      },
      "gallery": [
        "",
        "",
        ""
      ],
      "bgm": 0,
      "song": 3
    },
    {
      "key": "ren",
      "name": "REN",
      "tag": "LEAD VOCAL · 月とナイフ",
      "theme": "dark",
      "code": "R-0424",
      "badge": "HEADLINER",
      "level": "[ STAGE LEVEL : ENCORE ]",
      "avatar": "",
      "hero": "",
      "quote": "가장 낮게 속삭이고, 가장 높이 지른다. 무대 위에선 누구에게도 시선을 주지 않지만, 앵콜 마지막 소절만은 늘 같은 곳을 향한다.",
      "directive": {
        "label": "[ STAGE DIRECTIVE ]",
        "title": "리드 보컬 ‘렌’ 특별 관리 프로토콜",
        "sub": "공연 전 2시간 | 대기실 외 출입 금지"
      },
      "report": {
        "title": "SITUATION REPORT",
        "paragraphs": [
          "투어 셋째 날 밤, 그의 전장은 <b>무대 위</b>였습니다. 사흘 연속 잠을 거른 채 리허설을 반복하던 렌은, 결국 사운드체크 도중 마이크를 내려놓았습니다.",
          "스태프 누구의 말도 듣지 않던 그는, 객석 맨 앞줄 오른쪽에 <span class=\"hl\">그녀가 앉는 순간</span> 아무렇지 않게 다시 첫 소절을 불렀습니다.",
          "그날 이후 밴드에는 <b>규칙 하나</b>가 생겼습니다. 공연 전 2시간, 대기실 문은 그녀에게만 열린다는 것."
        ]
      },
      "gallery": [
        "",
        "",
        ""
      ],
      "bgm": 2,
      "song": 4
    }
  ],

  // 캐릭터 정리 창 (東京青藍大学 · ARCH · FRONTLINE · ETC.)
  "characters": {
    "title": [
      "CHARACTERS",
      "MEMBERS"
    ],
    "sub": "MEMBER DATABASE",
    "drawnBy": "↳ HANA",
    "tabs": [
      [
        "member",
        "MEMBER"
      ],
      [
        "pair",
        "PAIR"
      ],
      [
        "au",
        "AU"
      ]
    ],
    "worlds": {
      "seiran": {
        "name": "東京青藍大学",
        "no": "CH-03",
        "member": [
          {
            "dept": "人文学部",
            "name": "연유이",
            "en": "Yeon Yui",
            "quote": "한 줄 소개",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격이 들어가요.",
              "memo": "짧은 설명이 들어가요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              },
              {
                "title": "의상",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": [
              {
                "name": "다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": true,
                "likes": 2922,
                "text": "리뷰 내용을 적어주세요.",
                "replies": [
                  [
                    "캐릭터 1",
                    "이 캐릭터의 답"
                  ],
                  [
                    "다른 캐릭터",
                    "리뷰 쓴 캐릭터의 답"
                  ]
                ]
              },
              {
                "name": "또 다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": false,
                "likes": 876,
                "text": "리뷰 내용을 적어주세요.",
                "replies": []
              }
            ]
          },
          {
            "dept": "言語学部",
            "name": "캐릭터 2",
            "en": "Character Two",
            "quote": "한 줄 소개가 들어가요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격이 들어가요.",
              "memo": "짧은 설명이 들어가요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              },
              {
                "title": "의상",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": [
              {
                "name": "다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": true,
                "likes": 2922,
                "text": "리뷰 내용을 적어주세요.",
                "replies": [
                  [
                    "캐릭터 2",
                    "이 캐릭터의 답"
                  ],
                  [
                    "다른 캐릭터",
                    "리뷰 쓴 캐릭터의 답"
                  ]
                ]
              },
              {
                "name": "또 다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": false,
                "likes": 876,
                "text": "리뷰 내용을 적어주세요.",
                "replies": []
              }
            ]
          },
          {
            "dept": "デザイン学部",
            "name": "캐릭터 3",
            "en": "Character Three",
            "quote": "한 줄 소개가 들어가요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격이 들어가요.",
              "memo": "짧은 설명이 들어가요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              },
              {
                "title": "의상",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": [
              {
                "name": "다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": true,
                "likes": 2922,
                "text": "리뷰 내용을 적어주세요.",
                "replies": [
                  [
                    "캐릭터 3",
                    "이 캐릭터의 답"
                  ],
                  [
                    "다른 캐릭터",
                    "리뷰 쓴 캐릭터의 답"
                  ]
                ]
              },
              {
                "name": "또 다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": false,
                "likes": 876,
                "text": "리뷰 내용을 적어주세요.",
                "replies": []
              }
            ]
          },
          {
            "dept": "소속",
            "name": "새 캐릭터 4",
            "en": "New Character 4",
            "quote": "한 줄 소개를 적어 주세요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격을 적어 주세요.",
              "memo": "짧은 메모를 적어 주세요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": []
          }
        ],
        "pair": [
          {
            "badge": "MAIN",
            "name": "페어 이름",
            "en": "PAIR NAME",
            "quote": "페어 한 줄 소개가 들어가요.",
            "tags": "태그 X 태그",
            "status": "BONDED",
            "since": "2026-08-30",
            "next": 100,
            "photo": "",
            "back": "",
            "memo": "페어 메모 · 관계 설명을 자유롭게.",
            "a": {
              "name": "캐릭터 1",
              "sub": "人文学部",
              "avatar": "",
              "link": "캐릭터 1"
            },
            "b": {
              "name": "상대 캐릭터",
              "sub": "GUEST",
              "avatar": "",
              "link": ""
            }
          },
          {
            "badge": "MAIN",
            "name": "페어 이름",
            "en": "PAIR NAME",
            "quote": "페어 한 줄 소개가 들어가요.",
            "tags": "태그 X 태그",
            "status": "ING",
            "since": "2026-08-20",
            "next": 100,
            "photo": "",
            "back": "",
            "memo": "",
            "a": {
              "name": "캐릭터 2",
              "sub": "言語学部",
              "avatar": "",
              "link": "캐릭터 2"
            },
            "b": {
              "name": "상대 캐릭터",
              "sub": "GUEST",
              "avatar": "",
              "link": ""
            }
          }
        ],
        "au": []
      },
      "arch": {
        "name": "ARCH",
        "no": "CH-01",
        "style": "roster",
        "term": "ARCH TERMINAL",
        "footer": "ARCH CENTER",
        "groups": [
          {
            "key": "prima",
            "name": "ARCH-PRIMA",
            "cls": "SS-CLASS",
            "color": "#3d8de0"
          },
          {
            "key": "v1",
            "name": "VANGUARD 1팀",
            "cls": "S-CLASS",
            "color": "#e5534b"
          }
        ],
        "member": [
          {
            "group": "prima",
            "duo": [
              {
                "name": "페르소나 A",
                "en": "Persona",
                "tag": "PERSONA",
                "theme": "dark",
                "badge": "",
                "level": "[ PERSONA FILE ]",
                "quote": "‘캐릭터 A의 상대, 내 페르소나예요. 한 줄 소개를 적어 주세요.’",
                "card": "",
                "avatar": "",
                "hero": "",
                "gallery": [
                  "",
                  "",
                  ""
                ],
                "sections": [
                  {
                    "type": "table",
                    "title": "PERSONA PROFILE",
                    "rows": [
                      [
                        "NAME",
                        "이름"
                      ],
                      [
                        "RELATION",
                        "캐릭터 A와의 관계"
                      ],
                      [
                        "AGE",
                        "00"
                      ]
                    ]
                  }
                ]
              }
            ],
            "name": "캐릭터 A",
            "en": "Agent A",
            "attr": "무속성",
            "attrColor": "#7fb8c8",
            "card": "",
            "avatar": "",
            "hero": "",
            "tag": "A-CLASS GUIDE",
            "code": "P-0001",
            "theme": "light",
            "badge": "A-CLASS ENTITY",
            "level": "[ MEDICAL SUPPORT : ESSENTIAL ]",
            "quote": "‘가장 순수한 존재가 건네는, 가장 완벽한 안식. 한 줄 소개가 여기에 들어가요.’",
            "bgm": 0,
            "song": 1,
            "gallery": [
              "",
              "",
              ""
            ],
            "sections": [
              {
                "type": "table",
                "title": "AGENT PROFILE",
                "rows": [
                  [
                    "CODENAME",
                    "코드네임 (Code)"
                  ],
                  [
                    "CLASSIFICATION",
                    "A-Class Guide / Chief Medic"
                  ],
                  [
                    "ATTRIBUTE",
                    "[ 무속성 (Non-Attribute) ]"
                  ],
                  [
                    "AGE/NATIONALITY",
                    "00세 / 국적"
                  ]
                ],
                "evalLabel": "OFFICIAL EVALUATION",
                "eval": "“공식 평가가 들어가요. 이 캐릭터가 조직 안에서 어떤 평가를 받고 있는지, 어떤 이력을 가지고 있는지 적어주세요.”"
              },
              {
                "type": "report",
                "title": "PERSONAL RECORD",
                "paragraphs": [
                  "캐릭터의 과거와 지금을 적는 칸이에요. <b>굵게</b> 쓰고 싶은 곳은 b 태그로 감싸면 돼요.",
                  "문단을 나누고 싶으면 쉼표로 구분해서 하나 더 적으면 돼요. <span class=\"hl\">강조하고 싶은 말</span>은 이렇게 표시돼요."
                ]
              }
            ]
          },
          {
            "group": "v1",
            "duo": [
              {
                "name": "페르소나 C",
                "en": "Persona",
                "tag": "PERSONA",
                "theme": "light",
                "badge": "",
                "level": "[ PERSONA FILE ]",
                "quote": "‘캐릭터 C의 상대, 내 페르소나예요. 한 줄 소개를 적어 주세요.’",
                "card": "",
                "avatar": "",
                "hero": "",
                "gallery": [
                  "",
                  "",
                  ""
                ],
                "sections": [
                  {
                    "type": "table",
                    "title": "PERSONA PROFILE",
                    "rows": [
                      [
                        "NAME",
                        "이름"
                      ],
                      [
                        "RELATION",
                        "캐릭터 C와의 관계"
                      ],
                      [
                        "AGE",
                        "00"
                      ]
                    ]
                  }
                ]
              }
            ],
            "name": "캐릭터 C",
            "en": "Agent C",
            "attr": "불 속성",
            "attrColor": "#e5534b",
            "card": "",
            "tag": "S-CLASS SENTINEL",
            "code": "V-0003",
            "theme": "dark",
            "badge": "S-CLASS ENTITY",
            "level": "[ VANGUARD : FRONT ]",
            "quote": "‘한 줄 소개가 들어가요.’",
            "bgm": 0,
            "song": 1,
            "gallery": [
              "",
              "",
              ""
            ],
            "sections": [
              {
                "type": "table",
                "title": "AGENT PROFILE",
                "rows": [
                  [
                    "CODENAME",
                    "코드네임"
                  ],
                  [
                    "CLASSIFICATION",
                    "S-Class Sentinel"
                  ],
                  [
                    "ATTRIBUTE",
                    "[ 불 (Ignis) ]"
                  ],
                  [
                    "AGE/NATIONALITY",
                    "00세 / 국적"
                  ]
                ],
                "evalLabel": "OFFICIAL EVALUATION",
                "eval": "“평가가 들어가요.”"
              }
            ]
          },
          {
            "group": "prima",
            "duo": [
              {
                "name": "페르소나",
                "en": "Persona",
                "card": "",
                "avatar": "",
                "hero": "",
                "tag": "PERSONA",
                "code": "P-0001",
                "theme": "dark",
                "badge": "",
                "level": "[ PERSONA FILE ]",
                "quote": "‘한 줄 소개를 적어 주세요.’",
                "bgm": 0,
                "song": 1,
                "gallery": [
                  "",
                  "",
                  ""
                ],
                "sections": [
                  {
                    "type": "table",
                    "title": "AGENT PROFILE",
                    "rows": [
                      [
                        "CODENAME",
                        "코드네임 (Code)"
                      ],
                      [
                        "CLASSIFICATION",
                        "A-Class Guide / Chief Medic"
                      ],
                      [
                        "ATTRIBUTE",
                        "[ 무속성 (Non-Attribute) ]"
                      ],
                      [
                        "AGE/NATIONALITY",
                        "00세 / 국적"
                      ]
                    ],
                    "evalLabel": "OFFICIAL EVALUATION",
                    "eval": "“공식 평가가 들어가요. 이 캐릭터가 조직 안에서 어떤 평가를 받고 있는지, 어떤 이력을 가지고 있는지 적어주세요.”"
                  },
                  {
                    "type": "report",
                    "title": "PERSONAL RECORD",
                    "paragraphs": [
                      "캐릭터의 과거와 지금을 적는 칸이에요. <b>굵게</b> 쓰고 싶은 곳은 b 태그로 감싸면 돼요.",
                      "문단을 나누고 싶으면 쉼표로 구분해서 하나 더 적으면 돼요. <span class=\"hl\">강조하고 싶은 말</span>은 이렇게 표시돼요."
                    ]
                  }
                ]
              }
            ],
            "name": "새 캐릭터 3",
            "en": "New Character 3",
            "attr": "무속성",
            "attrColor": "#7fb8c8",
            "card": "",
            "avatar": "",
            "hero": "",
            "tag": "A-CLASS GUIDE",
            "code": "P-0001",
            "theme": "light",
            "badge": "A-CLASS ENTITY",
            "level": "[ MEDICAL SUPPORT : ESSENTIAL ]",
            "quote": "‘한 줄 소개를 적어 주세요.’",
            "bgm": 0,
            "song": 1,
            "gallery": [
              "",
              "",
              ""
            ],
            "sections": [
              {
                "type": "table",
                "title": "AGENT PROFILE",
                "rows": [
                  [
                    "CODENAME",
                    "코드네임 (Code)"
                  ],
                  [
                    "CLASSIFICATION",
                    "A-Class Guide / Chief Medic"
                  ],
                  [
                    "ATTRIBUTE",
                    "[ 무속성 (Non-Attribute) ]"
                  ],
                  [
                    "AGE/NATIONALITY",
                    "00세 / 국적"
                  ]
                ],
                "evalLabel": "OFFICIAL EVALUATION",
                "eval": "“공식 평가가 들어가요. 이 캐릭터가 조직 안에서 어떤 평가를 받고 있는지, 어떤 이력을 가지고 있는지 적어주세요.”"
              },
              {
                "type": "report",
                "title": "PERSONAL RECORD",
                "paragraphs": [
                  "캐릭터의 과거와 지금을 적는 칸이에요. <b>굵게</b> 쓰고 싶은 곳은 b 태그로 감싸면 돼요.",
                  "문단을 나누고 싶으면 쉼표로 구분해서 하나 더 적으면 돼요. <span class=\"hl\">강조하고 싶은 말</span>은 이렇게 표시돼요."
                ]
              }
            ]
          }
        ],
        "pair": [
          {
            "badge": "MAIN",
            "name": "페어 이름",
            "en": "PAIR NAME",
            "quote": "페어 한 줄 소개가 들어가요.",
            "tags": "태그 X 태그",
            "status": "BONDED",
            "since": "2026-04-24",
            "next": 200,
            "photo": "",
            "back": "",
            "memo": "페어 메모 · 관계 설명을 자유롭게.",
            "a": {
              "name": "캐릭터 A",
              "link": "캐릭터 A"
            },
            "b": {
              "name": "캐릭터 C",
              "link": "캐릭터 C"
            }
          }
        ],
        "au": []
      },
      "frontline": {
        "name": "FRONTLINE",
        "no": "CH-04",
        "member": [
          {
            "dept": "RED ZONE",
            "name": "Yvelyn Sinclair",
            "en": "이블린 싱클레어",
            "quote": "한 줄 소개가 들어가요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격이 들어가요.",
              "memo": "짧은 설명이 들어가요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              },
              {
                "title": "의상",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": [
              {
                "name": "다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": true,
                "likes": 2922,
                "text": "리뷰 내용을 적어주세요.",
                "replies": [
                  [
                    "캐릭터 5",
                    "이 캐릭터의 답"
                  ],
                  [
                    "다른 캐릭터",
                    "리뷰 쓴 캐릭터의 답"
                  ]
                ]
              },
              {
                "name": "또 다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": false,
                "likes": 876,
                "text": "리뷰 내용을 적어주세요.",
                "replies": []
              }
            ]
          },
          {
            "dept": "소속",
            "name": "캐릭터 6",
            "en": "Character Six",
            "quote": "한 줄 소개가 들어가요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격이 들어가요.",
              "memo": "짧은 설명이 들어가요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              },
              {
                "title": "의상",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": [
              {
                "name": "다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": true,
                "likes": 2922,
                "text": "리뷰 내용을 적어주세요.",
                "replies": [
                  [
                    "캐릭터 6",
                    "이 캐릭터의 답"
                  ],
                  [
                    "다른 캐릭터",
                    "리뷰 쓴 캐릭터의 답"
                  ]
                ]
              },
              {
                "name": "또 다른 캐릭터",
                "avatar": "",
                "relation": "관계",
                "call": "호칭",
                "best": false,
                "likes": 876,
                "text": "리뷰 내용을 적어주세요.",
                "replies": []
              }
            ]
          },
          {
            "dept": "CROWN GATE",
            "name": "새 캐릭터 5",
            "en": "New Character 5",
            "quote": "한 줄 소개를 적어 주세요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격을 적어 주세요.",
              "memo": "짧은 메모를 적어 주세요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": []
          },
          {
            "dept": "소속",
            "name": "새 캐릭터 4",
            "en": "New Character 4",
            "quote": "한 줄 소개를 적어 주세요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격을 적어 주세요.",
              "memo": "짧은 메모를 적어 주세요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": []
          },
          {
            "dept": "SILVER SLOT",
            "name": "새 캐릭터 5",
            "en": "New Character 5",
            "quote": "한 줄 소개를 적어 주세요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격을 적어 주세요.",
              "memo": "짧은 메모를 적어 주세요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": []
          },
          {
            "dept": "소속",
            "name": "새 캐릭터 6",
            "en": "New Character 6",
            "quote": "한 줄 소개를 적어 주세요",
            "tags": [
              "#태그"
            ],
            "spec": [
              [
                "AGE",
                "00"
              ],
              [
                "HEIGHT",
                "000"
              ],
              [
                "BIRTH",
                "00.00"
              ],
              [
                "LOVER",
                "연인 이름"
              ]
            ],
            "card": "",
            "photo": "",
            "theme": {
              "title": "CHARACTER SONG",
              "src": ""
            },
            "profile": {
              "rows": [
                [
                  "좋아하는 것",
                  "내용"
                ],
                [
                  "싫어하는 것",
                  "내용"
                ],
                [
                  "특징",
                  "내용"
                ]
              ],
              "personality": "성격을 적어 주세요.",
              "memo": "짧은 메모를 적어 주세요."
            },
            "prompts": [
              {
                "title": "기본 외형",
                "text": "프롬프트를 적어요"
              }
            ],
            "gallery": [
              "",
              "",
              ""
            ],
            "music": [
              {
                "title": "노래 제목",
                "artist": "가수",
                "src": ""
              }
            ],
            "talk": []
          }
        ],
        "pair": [],
        "au": []
      },
      "etc": {
        "name": "ETC.",
        "no": "CH-00",
        "member": [],
        "pair": [],
        "au": []
      }
    }
  },

  // TALK 메신저 (대화방)
  "chat": {
    "me": {
      "name": "HANA",
      "avatar": ""
    },
    "rooms": [
      {
        "name": "REN",
        "status": "대기실 · 온라인",
        "avatar": "",
        "time": "오후 11:02",
        "unread": 4,
        "messages": [
          {
            "from": "them",
            "text": "밥 안 먹으면 오늘 리허설 끝나고 바로 데리러 간다"
          },
          {
            "from": "them",
            "text": "선택해. 얌전히 문 열어줄래 아니면 내가 매니저 형한테 키 받아서 들어갈까?"
          },
          {
            "from": "me",
            "text": "협박범 진짜"
          },
          {
            "from": "me",
            "text": "열어놨어——"
          },
          {
            "from": "them",
            "text": "하나야, 혹시 오늘 저녁에 약속 있어? 공연 끝나고 파스타 먹으러 갈까"
          },
          {
            "from": "them",
            "text": "리허설 중에 다치지 말고, 힘들면 꼭 중간중간 쉬어가면서 해. 네 응원 소리 다 들려——"
          },
          {
            "from": "them",
            "text": "♥",
            "emo": true
          },
          {
            "from": "them",
            "text": "방금 복도에서 스쳐 지나갔는데, 나 못 봤지? 우리 고양이ㅋㅋ"
          },
          {
            "from": "them",
            "text": "지금 어디야? 위치 공유 꺼놨어?"
          },
          {
            "from": "them",
            "text": "사운드체크 끝나면 바로 연락할게"
          },
          {
            "from": "them",
            "text": "공연 끝나고 뒷문으로 와 🌙"
          }
        ],
        "replies": [
          "응, 듣고 있어",
          "지금 대기실. 너 온 거 보여",
          "…앵콜 한 곡 더 할까",
          "목소리 괜찮아. 너 오면 더 괜찮고",
          "잠깐만, 매니저 형 온다"
        ],
        "incoming": [
          "♥",
          "보고 싶다",
          "어디야?"
        ]
      },
      {
        "name": "밴드 단톡방",
        "status": "4명 · 대화 중",
        "notice": "토요일 축제 리허설 오후 3시 · 402호 집합",
        "avatar": "",
        "time": "오후 9:40",
        "unread": 12,
        "messages": [
          {
            "from": "them",
            "name": "드럼",
            "text": "내일 합주 7시 맞지?"
          },
          {
            "from": "them",
            "name": "베이스",
            "text": "402호 키 누가 갖고 있어"
          },
          {
            "from": "me",
            "text": "나한테 있어! 6시 반에 열어둘게"
          },
          {
            "from": "them",
            "name": "드럼",
            "text": "천사다 진짜",
            "react": "♥ 2"
          },
          {
            "from": "them",
            "name": "REN",
            "text": "셋리스트 3번 4번 순서 바꾸자"
          }
        ],
        "replies": [
          "ㅇㅋㅇㅋ",
          "내일 봐!",
          "간식 사갈게"
        ],
        "incoming": []
      },
      {
        "name": "매니저 형",
        "status": "연락 가능",
        "avatar": "",
        "time": "어제",
        "unread": 0,
        "messages": [
          {
            "from": "them",
            "text": "축제 무대 리허설 시간 확정됐다"
          },
          {
            "from": "them",
            "text": "토요일 오후 3시. 늦지 마라"
          },
          {
            "from": "me",
            "text": "넵 알겠습니다!"
          }
        ],
        "replies": [
          "그래",
          "확인했다"
        ],
        "incoming": []
      }
    ]
  },

  // 자동 알림
  "toasts": [
    {
      "app": "talk",
      "delay": 52
    }
  ],

  // Stage Monitor
  "monitor": {
    "title": "Stage Monitor",
    "sub": "MOON 스테이지 관리 시스템",
    "zones": [
      "대기실",
      "무대",
      "합주실",
      "백스테이지"
    ],
    "a": {
      "name": "하나",
      "tag": "FAN · FRONT ROW",
      "zone": "무대",
      "bpm": 68
    },
    "b": {
      "name": "렌",
      "tag": "VOCAL · HEADLINER",
      "zone": "합주실",
      "bpm": 112
    },
    "distance": 448,
    "gaugeLabel": "앵콜 필요",
    "scale": [
      "안정",
      "주의",
      "앵콜 필요"
    ],
    "gauge": 100,
    "button": "하나에게 앵콜 요청",
    "last": "마지막 앵콜 —",
    "footer": "B1 · 무대 뒤",
    "log": [
      {
        "t": "22:40:02",
        "text": "렌 → 합주실"
      },
      {
        "t": "22:40:02",
        "text": "하나 → 무대"
      },
      {
        "t": "22:40:02",
        "text": "▲ 앵콜 필요도 100% · 텐션 위험",
        "warn": true
      },
      {
        "t": "22:40:02",
        "text": "▲ 앵콜 필요도 70% 넘음 · 앵콜 권장",
        "warn": true
      }
    ],
    "alert": {
      "title": "Stage Monitor · 긴급",
      "text": "보컬 'REN' 앵콜 필요도 100%! 지금 바로 앵콜이 필요해요",
      "act": "앵콜 요청"
    }
  },

  // Pedal Board
  "pedal": {
    "title": "Pedal Board",
    "code": "MOON GEAR · PB-01",
    "status": "IN TUNE",
    "mission": "새벽 발라드 톤",
    "stats": [
      {
        "label": "VOLUME",
        "value": 5,
        "unit": "dB",
        "fix": 2
      },
      {
        "label": "TUNE",
        "value": 440,
        "unit": "Hz",
        "fix": 0,
        "jitter": 0
      },
      {
        "label": "GAIN",
        "value": 100,
        "unit": "%",
        "fix": 0,
        "jitter": 2
      }
    ],
    "items": [
      {
        "key": "rv",
        "name": "리버브",
        "en": "REVERB",
        "color": "#DDF2E8"
      },
      {
        "key": "od",
        "name": "드라이브",
        "en": "OVERDRIVE",
        "color": "#F2C66B"
      },
      {
        "key": "dl",
        "name": "딜레이",
        "en": "DELAY",
        "color": "#3FAE84"
      },
      {
        "key": "ch",
        "name": "코러스",
        "en": "CHORUS",
        "color": "#2F4E45"
      }
    ],
    "hint": "페달을 앰프에 3개까지 연결하고 톤을 만들어 보세요 ✦",
    "recipes": [
      {
        "combo": [
          "dl",
          "dl",
          "rv"
        ],
        "name": "새벽 3시 리버브",
        "desc": "미션 완료! 렌이 제일 좋아하는 톤이에요 ✦"
      },
      {
        "combo": [
          "ch",
          "ch",
          "ch"
        ],
        "name": "물속의 달",
        "desc": "몽롱하고 반짝이는 소리 ✦"
      },
      {
        "combo": [
          "od",
          "od",
          "od"
        ],
        "name": "라이브 하우스 굉음",
        "desc": "스피커가 조금 울었어요 ✦"
      },
      {
        "combo": [
          "od",
          "dl",
          "rv"
        ],
        "name": "앵콜 직전의 소리",
        "desc": "객석이 전부 일어났어요 ✦"
      },
      {
        "combo": [
          "rv",
          "rv",
          "ch"
        ],
        "name": "첫눈 오는 합주실",
        "desc": "조용하고 따뜻한 소리 ✦"
      }
    ],
    "total": 34,
    "fail": {
      "name": "알 수 없는 노이즈",
      "desc": "하울링이 났어요… 다시 조합해 볼까요?"
    }
  },

  // Memo
  "memo": [
    {
      "tab": "연습 메모",
      "sections": [
        {
          "title": "SETLIST · VOL.05",
          "items": [
            {
              "text": "01 Moonlit Feedback — 인트로 반 박자 늦게",
              "done": false
            },
            {
              "text": "02 B-P-M — 브릿지 후 떼창 파트",
              "done": false
            },
            {
              "text": "03 Knife Edge — 렌 애드리브 구간 비워두기",
              "done": true
            },
            {
              "text": "앵콜 Last Train — 하나 자리 보고 부르기",
              "done": false
            }
          ]
        }
      ]
    },
    {
      "tab": "할 일",
      "sections": [
        {
          "title": "TO DO · HANA",
          "items": [
            {
              "text": "렌 목 캔디 (유자맛) 사기 (매진이었음… 다른 맛 사옴)",
              "done": true
            },
            {
              "text": "투어 3회차 티켓팅 10시 정각",
              "done": false
            },
            {
              "text": "앵콜곡 떼창 파트 외우기",
              "done": false
            },
            {
              "text": "리허설 룸 출입증 챙기기",
              "done": false
            },
            {
              "text": "렌 잠 못 잔 거 체크",
              "done": false
            }
          ]
        },
        {
          "title": "TO DO · REN",
          "items": [
            {
              "text": "하나 자리 맨 앞줄 오른쪽 확인",
              "done": true
            },
            {
              "text": "셋리스트 마지막 곡 몰래 바꾸기",
              "done": false
            },
            {
              "text": "새벽 4시 데모 녹음 ← 그냥 포기",
              "done": true
            },
            {
              "text": "뒤풀이 장소 예약",
              "done": false
            },
            {
              "text": "대기실 정리",
              "done": false
            }
          ]
        }
      ]
    },
    {
      "tab": "낙서장",
      "sections": [
        {
          "title": "SECRET · 비밀 노트",
          "note": "고민 중 🌙",
          "items": [
            {
              "text": "대기실 소파에 하나 전용 담요 하나 놔둘까?",
              "done": false
            },
            {
              "text": "매니저 형이 알면 뭐라 하겠지만 내 마음이니까…",
              "done": false,
              "plain": true
            }
          ]
        }
      ]
    }
  ],

  // Records (CATEGORY)
  "records": {
    "root": "Setlist",
    "folders": [
      {
        "id": "hana",
        "name": "HANA",
        "icon": "heart"
      },
      {
        "id": "music",
        "name": "music",
        "icon": "note"
      },
      {
        "id": "etc",
        "name": "etc",
        "icon": "folder"
      },
      {
        "id": "bang",
        "name": "!",
        "icon": "bell"
      }
    ],
    "posts": [
      {
        "no": 11,
        "folder": "hana",
        "title": "안녕하세요… 홈을 옮겼습니다",
        "tag": "HANA",
        "date": "2026. 10. 16.",
        "thumb": "",
        "excerpt": "새 홈 오픈♡",
        "body": "<p>이제 <b>티스토리</b>는 잘 안 쓸 것 같아요!!!</p><p>기존에 배너 교환해주셨던 분들께서는 제 배너 주소를</p>",
        "link": "https://example.com/",
        "after": "로 바꿔주시면 감사 또 감사…♡ <span class=\"soft\">(새로 교환하실 분들도 연락주세요)</span>"
      },
      {
        "no": 13,
        "folder": "music",
        "title": "Catch BGM ver.",
        "tag": "♪ music",
        "date": "2026. 10. 19.",
        "thumb": "",
        "thumbLabel": "HANA×REN",
        "dark": "navy",
        "music": {
          "title": "Catch BGM ver.",
          "artist": "Hana X Ren",
          "label": "[MOON] Theme BGM 01",
          "bgm": 3,
          "lyrics": [
            "손끝에 걸린 마지막 코드",
            "네가 웃으면 박자가 틀려",
            "괜찮아, 다시 처음부터",
            "이번엔 너를 보고 부를게"
          ]
        }
      },
      {
        "no": 14,
        "folder": "music",
        "title": "Moonlit Feedback BGM ver.",
        "tag": "♪ music",
        "date": "2026. 10. 19.",
        "thumb": "",
        "thumbLabel": "HANA×REN",
        "dark": "navy",
        "music": {
          "title": "Moonlit Feedback BGM ver.",
          "artist": "Hana X Ren",
          "label": "[MOON] Theme BGM 01",
          "bgm": 0,
          "lyrics": [
            "앰프가 꺼진 뒤에도",
            "귓가에 남는 하울링",
            "그게 너라는 걸",
            "이제야 알았어"
          ]
        }
      },
      {
        "no": 12,
        "folder": "music",
        "title": "Ren 번외곡 | Knife Edge",
        "tag": "♪ music",
        "date": "2026. 10. 17.",
        "thumb": "",
        "thumbLabel": "REN",
        "excerpt": "오늘 리허설 날이에요★",
        "dark": "green",
        "music": {
          "title": "Knife Edge",
          "artist": "Ren",
          "label": "[MOON] Bonus track",
          "bgm": 2,
          "lyrics": [
            "칼끝 같은 조명 아래 서면",
            "숨 쉬는 법을 잊어도",
            "맨 앞줄 오른쪽",
            "그 자리만은 안 잊어",
            "박수 소리가 멀어져도",
            "네 목소리는 들려",
            "한 곡만 더, 너를 위해서"
          ]
        }
      },
      {
        "no": 9,
        "folder": "music",
        "title": "Hana 번외곡 | Monitor Glow",
        "tag": "♪ music",
        "date": "2026. 6. 10.",
        "thumb": "",
        "thumbLabel": "HANA",
        "dark": "navy",
        "music": {
          "title": "Monitor Glow",
          "artist": "Hana",
          "label": "[MOON] Bonus track",
          "bgm": 1,
          "lyrics": [
            "차가운 monitor glow",
            "깨어나는 pulse",
            "누구보다 완벽하게",
            "\"믿고 맡길 수 있는 사람\"",
            "실패 따윈 허락 안 돼",
            "흔들리는 모든 것이"
          ]
        }
      },
      {
        "no": 8,
        "folder": "music",
        "title": "Ren 번외곡 | 맞아, 난 네가 좋아",
        "tag": "♪ music",
        "date": "2026. 6. 10.",
        "thumb": "",
        "thumbLabel": "REN",
        "dark": "navy",
        "music": {
          "title": "맞아, 난 네가 좋아",
          "artist": "Ren",
          "label": "[MOON] Bonus track",
          "bgm": 4,
          "lyrics": [
            "막차가 떠나도 괜찮아",
            "앵콜은 아직 남았으니까"
          ]
        }
      },
      {
        "no": 7,
        "folder": "music",
        "title": "Hana | Theme BGM 01",
        "tag": "♪ music",
        "date": "2026. 6. 10.",
        "thumb": "",
        "thumbLabel": "HANA",
        "dark": "navy",
        "music": {
          "title": "Theme BGM 01",
          "artist": "Hana",
          "label": "[MOON] Theme BGM 01",
          "bgm": 1,
          "lyrics": [
            "심장이 빨라지는 건",
            "템포 때문이 아니야"
          ]
        }
      }
    ]
  },

  // Notice
  "notice": {
    "lockLabel": "✦ PROMPT ✦",
    "posts": [
      {
        "no": 10,
        "title": "✎ : Banner",
        "tag": "NOTICE",
        "date": "2026. 10. 14.",
        "excerpt": "배너 교환",
        "images": [
          {
            "src": "",
            "name": "setlist-1.gif",
            "size": "283KB",
            "url": "https://example.com/setlist-1.gif"
          },
          {
            "src": "",
            "name": "setlist-2.gif",
            "size": "269KB",
            "url": "https://example.com/setlist-2.gif"
          }
        ],
        "fields": [
          {
            "label": "Title(alt)",
            "value": "Setlist"
          },
          {
            "label": "Link",
            "value": "https://example.com/"
          },
          {
            "label": "Subtitle",
            "value": "beats per minute<br><small>(필수 X)</small>",
            "dim": true
          }
        ]
      }
    ]
  },

  // Neighbors
  "neighbors": {
    "mine": {
      "name": "Setlist",
      "desc": "클릭하면 배너교환 페이지로 이동",
      "banner": "",
      "link": "#"
    },
    "list": [
      {
        "no": "01",
        "name": "Moonrise Radio",
        "desc": "지구인 인증",
        "banner": "",
        "link": "#"
      },
      {
        "no": "02",
        "name": "Pl(uto)²pia",
        "desc": "우리 둘 다 고장 난 거야. 근데 고장 난 것끼리 붙잡고 있으면 좀 덜 흔들리더라고.",
        "banner": "",
        "link": "#"
      },
      {
        "no": "09",
        "name": "♡",
        "desc": "바보야, 너 같은 애를 좋아하나 봐.",
        "banner": "",
        "link": "#"
      },
      {
        "no": "10",
        "name": "into the deep blue",
        "desc": "대형견 임시 보호소",
        "banner": "",
        "link": "#"
      }
    ]
  },

  // Internet
  "internet": {
    "flix": {
      "name": "Lunaflix",
      "domain": "lunaflix.tv",
      "path": "/browse/hana",
      "viewer": "하나",
      "hero": {
        "badge": "이어보기",
        "title": "너의 파장이 보여",
        "meta": "S2 · 12화",
        "time": "41:20 / 62:10",
        "progress": 66,
        "image": ""
      },
      "hero2": {
        "badge": "렌 님이 시청 중",
        "title": "2026 투어 파이널",
        "meta": "HANA vs REN | 매치 하이라이트",
        "time": "4:11 / 95:01",
        "progress": 4,
        "image": "",
        "big": [
          "THE LAST",
          "ENCORE"
        ],
        "sub": "HANA VS REN · BO5"
      },
      "row": [
        {
          "title": "너의 파장이 보여",
          "meta": "S2 · 12화 · 41:20 / 62:10",
          "image": "",
          "w": 66
        },
        {
          "title": "나의 맨 앞줄 수호천사! (+번외)",
          "meta": "1기 · 1화 · 7:02 / 24:30",
          "image": "",
          "w": 28
        },
        {
          "title": "우리 합주실에 기타리스트가 산다",
          "meta": "3화 · 58:44 / 70:00",
          "image": "",
          "w": 84
        },
        {
          "title": "2026 투어 파이널",
          "meta": "HANA vs REN | 매치 하이라이트 · 4:11 / 95:01",
          "image": "",
          "w": 4
        }
      ]
    },
    "stats": {
      "name": "TICKET.GG",
      "domain": "ticket.gg",
      "path": "/fan/맨앞줄오른쪽-HANA",
      "player": "맨앞줄오른쪽#HANA",
      "sub": "주 포지션 · 스탠딩",
      "tier": "GRANDMASTER",
      "lp": "812 LP",
      "rate": 61,
      "rateSub": "186승 121패",
      "history": [
        {
          "result": "성공",
          "mode": "오픈 예매",
          "min": "28분",
          "icon": "스",
          "role": "스탠딩",
          "score": "12 / 2 / 9",
          "diff": "12분 전",
          "win": true
        },
        {
          "result": "성공",
          "mode": "오픈 예매",
          "min": "31분",
          "icon": "지",
          "role": "지정석",
          "score": "9 / 3 / 14",
          "diff": "1시간 전",
          "win": true
        },
        {
          "result": "실패",
          "mode": "취소표",
          "min": "25분",
          "icon": "스",
          "role": "스탠딩",
          "score": "7 / 6 / 5",
          "diff": "새벽 4:02",
          "win": false
        },
        {
          "result": "성공",
          "mode": "선예매",
          "min": "22분",
          "icon": "앵",
          "role": "앵콜석",
          "score": "5 / 1 / 22",
          "diff": "어제 · 2연석",
          "win": true
        }
      ],
      "tip": {
        "label": "추천 공략",
        "title": "맨앞줄 공략: 오픈 3초 전 새로고침 금지",
        "text": "1. 대기열 70% 넘으면 무리하지 말고 취소표 노려라 2. 예매 버튼 누를 때 숨 참기 3. 좌석보다 시야 우선 ㄱㄱ",
        "by": "by 맨앞줄오른쪽 · 조회 12.4만"
      }
    }
  },

  // Game
  "game": {
    "name": "MOON BEAT",
    "logo": "M",
    "coins": "4,240",
    "gems": "520",
    "player": "맨앞줄오른쪽",
    "lv": "Lv. 168",
    "patch": "NEW GAME MODE · PATCH 14.20",
    "mode": "앵콜 방어전",
    "modeEn": "ENCORE DEFENSE",
    "desc": "꺼져가는 객석의 함성을 막고 앵콜을 지키자.",
    "invite": "공연장에 정적 출현! 앵콜 방어전에 참여하세요",
    "social": "소셜 7/17",
    "friends": [
      {
        "name": "무리하지마",
        "status": "대기실 · 게임 대기 중",
        "on": true
      },
      {
        "name": "베이스는사랑",
        "status": "게임 중 · 12:25",
        "on": true
      },
      {
        "name": "드럼치는곰",
        "status": "게임 중 · 12:25",
        "on": true
      },
      {
        "name": "MOONcode",
        "status": "게임 중 · 10:01",
        "on": true
      },
      {
        "name": "MOONcandy",
        "status": "게임 중 · 10:01",
        "on": true
      },
      {
        "name": "바보온달",
        "status": "온라인",
        "on": true
      },
      {
        "name": "평강공주",
        "status": "온라인",
        "on": true
      },
      {
        "name": "zzunsiki",
        "status": "오프라인"
      },
      {
        "name": "romdrom",
        "status": "오프라인"
      },
      {
        "name": "정의의 사도",
        "status": "오프라인"
      },
      {
        "name": "고기먹고싶다",
        "status": "오프라인"
      },
      {
        "name": "연습벌레123",
        "status": "오프라인"
      },
      {
        "name": "Demon",
        "status": "오프라인"
      },
      {
        "name": "Cherry",
        "status": "오프라인"
      },
      {
        "name": "Ritsu",
        "status": "오프라인"
      },
      {
        "name": "Miyu",
        "status": "오프라인"
      },
      {
        "name": "여동이",
        "status": "오프라인"
      }
    ]
  },

  // Link Hub
  "links": [
    {
      "name": "링크 이름 1",
      "desc": "설명을 적어주세요",
      "url": "https://example.com",
      "image": ""
    },
    {
      "name": "링크 이름 2",
      "desc": "설명을 적어주세요",
      "url": "https://example.com",
      "image": ""
    },
    {
      "name": "링크 이름 3",
      "desc": "설명을 적어주세요",
      "url": "https://example.com",
      "image": ""
    },
    {
      "name": "링크 이름 4",
      "desc": "설명을 적어주세요",
      "url": "https://example.com",
      "image": ""
    },
    {
      "name": "링크 이름 5",
      "desc": "설명을 적어주세요",
      "url": "https://example.com",
      "image": ""
    },
    {
      "name": "링크 이름 6",
      "desc": "설명을 적어주세요",
      "url": "https://example.com",
      "image": ""
    }
  ],

  // 화면에서 직접 바꾼 글자 (원래 글자 → 바꾼 글자)
  "textOverrides": {},

  // 사진 위치 · 크기 (사진 자리에서 조절)
  "imgPos": {}
};
