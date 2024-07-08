export const getCatUrl = (catNo: number) => `https://www.dlsite.com/maniax/fsr/=/genre/${catNo}/from/work.genre`;

export const getWorkUrl = (workno: string) => `https://play.dlsite.com/#/work/${workno}`;

export const WORK_CATEGORY: Record<string, Record<string, Record<number, string>>> = {
  R18: {
    appeal: {
      509: '3D作品',
      497: 'ASMR',
      508: 'TRPG',
      516: 'TRPGシナリオ',
      517: 'TRPGリプレイ集',
      518: 'TRPGルールブック',
      513: 'VTuber',
      62: '脚',
      73: 'アニメ',
      323: 'アヘ顔',
      309: 'アンソロジー',
      56: '癒し',
      68: '淫語',
      61: '鬱',
      58: 'オールハッピー',
      311: 'おさわり',
      63: 'お尻/ヒップ',
      65: 'おっぱい',
      502: '男主人公',
      432: '女主人公',
      55: '感動',
      507: '技術書',
      312: 'きせかえ',
      433: '逆転無し',
      60: '女性視点',
      296: 'シリーズもの',
      69: '汁/液大量',
      515: '総集編',
      57: '淡白/あっさり',
      71: '断面図',
      49: '着衣',
      50: 'チラリズム',
      510: 'ツクール',
      512: '東方Project',
      431: 'ドット',
      496: 'バイノーラル/ダミヘ',
      310: '評論',
      64: 'フェチ',
      66: 'マニアック/変態',
      51: '萌え',
      52: '燃え',
      70: '連続絶頂',
    },
    system: {
      10: 'SF',
      448: '色仕掛け',
      440: '浮気',
      26: 'オカルト',
      3: '屋外',
      504: 'おねショタ',
      2: 'オフィス/職場',
      35: 'おもらし',
      526: '快楽堕ち',
      12: '格闘',
      1: '学校/学園',
      532: '逆アナル',
      530: '逆NTR',
      5: 'ギャグ',
      20: 'キャットファイト',
      14: '恋人同士',
      7: 'コメディ',
      22: 'サスペンス',
      444: '時間停止',
      32: '純愛',
      534: 'ショタおね',
      15: 'シリアス',
      11: 'スポーツ',
      245: '性転換(TS)',
      445: '石化',
      34: '戦場',
      533: '戦闘エロ',
      295: 'ソフトエッチ',
      6: '退廃/背徳/インモラル',
      301: '電車',
      31: '同居',
      438: '同棲',
      28: '歳の差',
      8: '日常/生活',
      250: '女体化',
      48: '寝取られ',
      529: '寝取らせ',
      302: '寝取り',
      441: 'ノンフィクション/体験談',
      46: 'ハーレム',
      24: 'バイオレンス',
      446: '売春/援交',
      437: '初体験',
      443: '憑依',
      16: 'ファンタジー',
      447: '風俗/ソープ',
      13: 'ほのぼの',
      19: 'ホラー',
      29: '魔法',
      300: '丸呑み',
      298: 'ミステリー',
      442: '耳かき',
      9: 'ミリタリー',
      158: '百合',
      455: 'ラブコメ',
      4: 'ラブラブ/あまあま',
      308: '料理/グルメ',
      17: '歴史/時代物',
    },
    play: {
      136: 'SM',
      145: '青姦',
      325: '悪堕ち',
      125: '足コキ',
      160: 'アナル',
      487: 'イラマチオ',
      142: '淫乱',
      514: 'オナサポ',
      524: 'オホ声',
      135: 'オナニー',
      127: '顔射',
      148: '浣腸',
      137: '緊縛',
      153: 'くすぐり',
      527: 'クリ責め',
      119: 'ゲイ/男同士',
      270: '下克上',
      146: '拘束',
      488: '口内射精',
      489: 'ごっくん/食ザー',
      144: '言葉責め',
      131: '搾乳',
      503: 'ささやき',
      133: '産卵',
      501: '潮吹き',
      149: '羞恥/恥辱',
      132: '出産',
      162: '触手',
      152: '焦らし',
      161: 'スカトロ',
      464: 'スパンキング',
      156: '男性受け',
      523: '乳首責め',
      124: '手コキ',
      155: '盗撮',
      128: '中出し',
      461: '尿道',
      129: '妊娠/孕ませ',
      112: 'ノーマルプレイ',
      122: 'パイズリ',
      138: 'フェラチオ',
      116: '複数プレイ/乱交',
      126: 'ぶっかけ',
      117: '放置プレイ',
      159: '放尿/おしっこ',
      130: '母乳',
      528: '本番なし',
      500: '耳舐め',
      118: 'レズ/女同士',
      143: '露出',
      123: '和姦',
      314: 'トランス/暗示ボイス',
    },
    item: {
      299: 'おむつ',
      263: 'おもちゃ',
      256: '首輪/鎖/拘束具',
      257: '道具/異物',
      260: 'ピアス/装飾品',
      262: 'ムチ/縄/蝋燭',
      265: '薬物',
      266: 'ローション',
    },
    character: {
      232: 'OL',
      212: '妹',
      98: 'ウェイトレス',
      92: 'エプロン',
      235: 'エルフ/妖精',
      222: '幼なじみ',
      242: 'お嬢様',
      303: '男の娘',
      220: 'お姉さん',
      304: 'おやじ',
      226: '女教師',
      107: 'ガーター',
      412: '外国人',
      400: '学生',
      221: '既婚者',
      217: '義姉',
      249: '擬人化',
      216: '義母',
      214: '義妹',
      91: '着物/和服',
      415: 'ギャル',
      227: '教師',
      258: '靴下',
      505: 'くノ一',
      81: '軍服',
      284: '警察/刑事',
      409: '芸能人/アイドル/モデル',
      251: 'けもの/獣化',
      86: 'コスプレ',
      85: 'ゴスロリ',
      506: 'サキュバス/淫魔',
      96: 'シスター',
      82: '下着',
      315: '実姉',
      268: '姉妹',
      218: '熟女',
      288: '主従',
      225: '女医',
      234: '女王様/お姫様',
      206: '少女',
      210: '少年',
      111: '女装',
      211: 'ショタ',
      317: '人外娘/モンスター娘',
      105: 'スーツ',
      104: 'スクール水着',
      102: 'ストッキング',
      100: 'スパッツ',
      74: '制服',
      75: 'セーラー服',
      233: '戦士',
      285: '先輩/後輩',
      414: 'ゾンビ',
      411: '体育会系/スポーツ選手',
      76: '体操着',
      59: 'ツンデレ',
      237: '天使/悪魔',
      246: '天然',
      281: '同級生/同僚',
      209: '年上',
      79: 'ナース',
      101: 'ニーソックス',
      244: 'ニューハーフ',
      99: 'バニーガール',
      213: '母親',
      83: 'パンツ',
      416: 'ビッチ',
      219: '人妻',
      223: '双子',
      208: 'ぷに',
      419: '不良/ヤンキー',
      88: 'ブルマ',
      269: '変身ヒロイン',
      197: 'ボクっ娘',
      224: '保健医',
      87: 'ボンデージ',
      240: '魔法少女',
      241: '魔法使い/魔女',
      80: '巫女',
      77: '水着',
      90: 'ミニスカ',
      486: '未亡人',
      215: '娘',
      78: 'メイド',
      255: 'メガネ',
      272: 'ヤクザ/裏社会',
      316: 'ヤンデレ',
      239: '幽霊',
      243: '妖怪',
      93: 'ラバー',
      94: 'レオタード',
      405: 'レスラー/格闘家',
      254: 'ロボット/アンドロイド',
    },
    appearence: {
      189: '陰毛/腋毛',
      321: '褐色/日焼け',
      191: '巨根',
      194: '巨大化',
      182: '巨乳/爆乳',
      181: '筋肉',
      170: '金髪',
      171: '黒髪',
      176: '獣耳',
      166: 'ショートカット',
      193: '処女',
      178: 'スレンダー',
      185: '乳首/乳輪',
      177: '長身',
      174: 'ツインテール',
      187: 'ツルペタ',
      192: '童貞',
      175: 'ネコミミ',
      188: 'パイパン',
      183: '貧乳/微乳',
      184: '複乳/怪乳/超乳',
      190: 'フタナリ',
      473: '太め/デブ',
      322: '包茎',
      196: '方言',
      186: 'ぼて腹/妊婦',
      173: 'ポニーテール',
      179: 'ムチムチ',
      198: '無表情',
      167: 'ロングヘア',
    },
  },
};

export const WORK_CATEGORY_NAME: Record<number, string> = {
  ...WORK_CATEGORY.R18.appeal,
  ...WORK_CATEGORY.R18.system,
  ...WORK_CATEGORY.R18.play,
  ...WORK_CATEGORY.R18.item,
  ...WORK_CATEGORY.R18.character,
  ...WORK_CATEGORY.R18.appearence,
};
