'use strict';
// Times are billions of years relative to the present. Uncertain dates have a
// representative coordinate for navigation and an explicit user-facing range.
const sources = {
 earth:['NASA · 지구','https://science.nasa.gov/earth/facts/'],
 snowball:['NASA GISS · 눈덩이 지구 연구','https://www.giss.nasa.gov/research/features/201508_slushball/'],
 impactEarth:['LPI · 칙술루브 충돌','https://www.lpi.usra.edu/science/kring/Chicxulub/'],
 solar:['NASA · 태양계','https://science.nasa.gov/solar-system/solar-system-facts/'],
 formation:['Segura 외 · 형성 과정 종설','https://arxiv.org/abs/2607.27543'],
 sun:['NASA · 태양','https://science.nasa.gov/sun/facts/'],
 tack:['Walsh 외 (2011) · Nature','https://www.nature.com/articles/nature10201'],
 moon:['NASA · 달의 형성','https://science.nasa.gov/moon/formation/'],
 lunar:['NASA · 달의 기록','https://science.nasa.gov/moon/facts/'],
 kuiper:['NASA · 카이퍼 벨트','https://science.nasa.gov/solar-system/kuiper-belt/facts/'],
 uranus:['NASA · 천왕성','https://science.nasa.gov/uranus/facts/'],
 mars:['NASA · 화성','https://science.nasa.gov/mars/facts/'],
 maven:['NASA · MAVEN 분석','https://www.nasa.gov/news-release/nasas-maven-reveals-most-of-mars-atmosphere-was-lost-to-space/'],
 dryVenus:['Constantinou 외 (2024) · 금성 내부','https://arxiv.org/abs/2412.01879'],
 venus:['NASA · 금성','https://science.nasa.gov/venus/venus-facts/'],
 rings:['NASA · 토성 고리 연구','https://www.nasa.gov/solar-system/saturns-rings-young-and-ephemeral-three-nasa-ames-studies-say/'],
 oldRings:['Hyodo 외 · 고리의 오염 저항성','https://www.ipgp.fr/en/news-and-agenda/news/a-new-perspective-on-the-age-of-saturns-rings/'],
 phobos:['NASA · 포보스','https://science.nasa.gov/mars/moons/phobos/'],
 future:['ESA · 태양의 미래','https://www.esa.int/Science_Exploration/Space_Science/Gaia/Gaia_reveals_the_past_and_future_of_the_Sun'],
 giant:['Schröder & Smith (2008)','https://arxiv.org/abs/0801.4031']
};
const historyEvents = [
 {id:'cloud',year:-4.6,date:'약 46억 년 전',title:'태양 성운이 수축하다',body:'중력이 가스와 먼지 구름을 끌어모읍니다. 회전하는 구름은 원반이 되고, 중심에는 원시 태양이 만들어집니다.',kind:'theory',badge:'형성 모형',target:'태양계',focus:-1,effect:'disk',note:'초기 과정은 성운설에 따른 재구성입니다.',refs:['solar']},
 {id:'grains',year:-4.567,date:'약 45.7억 년 전',title:'먼지에서 행성의 씨앗으로',body:'작은 고체 입자들이 모여 자갈과 미행성으로 성장합니다. 운석은 이 초기 태양계의 재료와 변화를 보존한 기록입니다.',kind:'evidence',badge:'시료·형성 모형',target:'원시 원반',focus:-1,effect:'disk',note:'여러 성장 과정이 겹칩니다. 하나의 순간에 일어난 사건은 아닙니다.',refs:['formation']},
 {id:'jupiter',year:-4.565,date:'초기 수백만 년',title:'거대 행성이 가스를 모으다',body:'목성 같은 가스 행성은 원반의 가스가 사라지기 전에 성장해야 합니다. 빠르게 자란 거대 행성의 중력이 주변 재료의 이동에 영향을 줍니다.',kind:'theory',badge:'행성 형성 모형',target:'목성',focus:4,effect:'accretion',note:'시간축 위치는 초기 형성기를 나타내는 대표값입니다.',refs:['solar','formation']},
 {id:'grand-tack',year:-4.563,date:'초기 수백만 년 · 시점 불확실',title:'목성의 대이동, 그랜드 택',body:'목성이 안쪽으로 이동하다 토성과의 상호작용으로 방향을 바꿨다는 가설입니다. 작은 화성과 소행성대의 구성을 설명하려는 모형 중 하나입니다.',kind:'theory',badge:'가설',target:'목성 · 토성',focus:4,effect:'migration',note:'화면의 이동 경로는 개념도입니다. 실제 경로나 발생 시점이 확정된 것은 아닙니다.',refs:['tack']},
 {id:'disk-clears',year:-4.56,date:'초기 수백만~수천만 년',title:'원반이 걷히고 행성이 드러나다',body:'어린 태양 주변의 가스와 먼지가 줄어듭니다. 남은 암석 천체들은 계속 충돌하며 지구형 행성의 재료가 됩니다.',kind:'theory',badge:'형성 모형',target:'태양계',focus:-1,effect:'disk',note:'가스 소실과 암석 행성의 성장은 서로 다른 시간척도로 진행됩니다.',refs:['sun','formation']},
 {id:'rocky-worlds',year:-4.54,date:'약 45.4억 년 전',title:'암석 행성들의 성장',body:'태양에 가까운 영역에서 암석과 금속이 뭉쳐 행성이 됩니다. 반복되는 충돌은 행성을 키우는 동시에 표면을 뜨겁게 만듭니다.',kind:'theory',badge:'형성 모형',target:'내행성',focus:2,effect:'hot-earth',note:'완성 시점은 행성마다 다릅니다.',refs:['solar']},
 {id:'moon-impact',year:-4.5,date:'약 45억 년 전 · 추정',title:'거대 충돌이 달을 남기다',body:'원시 지구에 큰 천체가 충돌한 뒤 파편에서 달이 형성됐다는 가설이 유력합니다. 달과 지구 암석의 유사한 성분이 중요한 단서입니다.',kind:'theory',badge:'유력 가설',target:'지구 · 달',focus:2,effect:'impact',note:'충돌체 수, 충돌 각도, 정확한 시점은 연구 중입니다.',refs:['moon']},
 {id:'magma-moon',year:-4.45,date:'달 형성 뒤 수천만~수억 년',title:'달을 덮은 마그마 바다',body:'뜨거운 달의 표면이 식으면서 광물이 굳어집니다. 가벼운 광물이 떠올라 밝은 초기 지각을 만들었다는 해석을 달 시료가 뒷받침합니다.',kind:'evidence',badge:'암석 시료·해석',target:'달',focus:2,effect:'hot-moon',note:'냉각은 긴 과정입니다. 표시 시점은 그 과정의 한 장면입니다.',refs:['moon']},
 {id:'lunar-crust',year:-4.4,date:'약 44억 년 전',title:'달의 오래된 지각',body:'달 고지대의 밝은 암석은 초기 지각이 남긴 흔적입니다. 지구보다 지질 활동이 적은 달은 초기 태양계의 기록을 오래 간직합니다.',kind:'evidence',badge:'시료·지질 해석',target:'달',focus:2,effect:'moon',note:'암석의 연대와 달 전체 표면의 나이는 동일하지 않습니다.',refs:['moon']},
 {id:'uranus-tilt',year:-4.3,date:'초기 태양계 · 시점 미상',title:'천왕성은 왜 옆으로 누웠을까?',body:'천왕성의 자전축은 약 98도 기울어져 있습니다. 초기의 큰 충돌은 이 극단적인 기울기를 설명하는 가능한 시나리오입니다.',kind:'theory',badge:'기원 가설',target:'천왕성',focus:6,effect:'tilt',note:'43억 년 전 위치는 탐험용 배치입니다. 충돌 연대를 뜻하지 않습니다.',refs:['uranus']},
 {id:'giant-instability',year:-4.1,date:'초기 태양계 · 시점 논쟁',title:'거대 행성들의 궤도 재편',body:'거대 행성들이 지금보다 조밀한 배치에서 상호작용하며 이동했다는 모형입니다. 천왕성과 해왕성의 바깥쪽 이동은 작은 얼음 천체들의 궤도도 바꿉니다.',kind:'theory',badge:'궤도 진화 모형',target:'외행성',focus:7,effect:'outer-migration',note:'니스 모형 계열의 개념도입니다. 불안정이 언제 일어났는지는 논쟁 중입니다.',refs:['kuiper','uranus']},
 {id:'icy-frontier',year:-4.05,date:'초기 궤도 재편기',title:'태양계 가장자리로 흩어진 얼음',body:'해왕성과 거대 행성의 중력은 얼음 천체를 흩어 놓습니다. 일부는 카이퍼 벨트에 남고, 일부는 더 먼 궤도나 태양계 밖으로 향했을 것으로 해석됩니다.',kind:'theory',badge:'동역학 모형',target:'카이퍼 벨트',focus:7,effect:'comets',note:'태양계 가장자리의 형성은 장기간에 걸친 과정입니다.',refs:['kuiper']},
 {id:'wet-mars',year:-4,date:'약 40억 년 전 전후',title:'화성에도 물이 흐르던 때',body:'오래된 계곡, 삼각주와 물에 의해 만들어지는 광물은 화성 표면에 물이 흘렀음을 보여줍니다. 따뜻하고 습한 환경이 얼마나 지속됐는지는 여전히 연구 중입니다.',kind:'evidence',badge:'지형·광물 증거',target:'화성',focus:3,effect:'wet-mars',note:'물의 존재와 생명체의 존재는 별개입니다. 화성 생명은 확인되지 않았습니다.',refs:['mars','maven']},
 {id:'bombardment',year:-3.9,date:'약 41~38억 년 전',title:'충돌 분지가 새겨지다',body:'거대한 충돌들이 달 표면에 깊은 흔적을 남겼습니다. 약 39억 년 전 충돌이 급증했다는 후기 대폭격 가설과, 긴 감소 과정이었다는 해석을 구분해야 합니다.',kind:'theory',badge:'충돌 기록·논쟁',target:'달 · 내행성',focus:2,effect:'bombardment',note:'많은 충돌 흔적은 관측되지만, 하나의 급격한 대폭격이 있었는지는 논쟁입니다.',refs:['lunar']},
 {id:'lunar-maria',year:-3.5,date:'약 42~12억 년 전의 여러 시기',title:'검은 용암이 달의 바다를 채우다',body:'달 내부의 마그마가 올라와 충돌 분지 바닥을 메웁니다. 오늘날 맨눈으로 보이는 어두운 ‘바다’는 물이 아니라 굳은 현무암 평원입니다.',kind:'evidence',badge:'지질·시료 증거',target:'달',focus:2,effect:'moon',note:'달 화산활동은 여러 시기에 일어났으며 이후에도 이어졌습니다.',refs:['lunar']},
 {id:'mars-loss',year:-3,date:'수십억 년에 걸친 변화',title:'화성의 대기가 우주로 새어나가다',body:'MAVEN은 화성 대기의 많은 부분이 우주로 빠져나갔다는 증거를 찾았습니다. 태양풍과 복사는 차갑고 건조한 현재 화성으로의 변화에 기여했습니다.',kind:'evidence',badge:'관측에 근거한 재구성',target:'화성',focus:3,effect:'atmosphere-loss',note:'30억 년 전은 장기 변화를 보여주는 대표값입니다. 대기는 지금도 유출됩니다.',refs:['maven']},
 {id:'venus-question',year:-2,date:'과거의 금성 · 시점 미상',title:'금성에도 바다가 있었을까?',body:'금성의 과거에 액체 물과 온화한 환경이 있었는지는 열린 질문입니다. 현재의 뜨거운 표면과 두꺼운 대기만으로 과거의 바다를 확정할 수는 없습니다.',kind:'theory',badge:'미해결 가설',target:'금성',focus:1,effect:'venus',note:'20억 년 전 위치는 탐험용 배치이며, 바다가 있었다는 확정 연대가 아닙니다.',refs:['venus','dryVenus']},
 {id:'young-rings',year:-.2,date:'수억 년 전? · 연대 논쟁',title:'토성의 고리는 뒤늦게 생겼을까?',body:'고리의 질량과 오염을 분석한 일부 연구는 나이를 수억 년 이하로 추정합니다. 더 오래된 고리 모형도 있어, 고리의 탄생 시점을 확정할 수는 없습니다.',kind:'theory',badge:'경쟁 가설',target:'토성',focus:5,effect:'rings',note:'2억 년 전은 젊은 고리 가설의 예시입니다. 과거 화면의 고리 유무는 확정 복원이 아닙니다.',refs:['rings','oldRings']},
 {id:'present',year:0,date:'현재',title:'지금, 여덟 행성의 태양계',body:'형성과 충돌, 궤도 변화가 쌓여 지금의 태양계가 되었습니다. 행성뿐 아니라 소행성, 혜성, 위성과 얼음 천체도 각자의 역사를 간직하고 있습니다.',kind:'fact',badge:'관측·측정',target:'태양계',focus:-1,effect:'present',note:'현재 위치도 실제 천체력이 아닌 설명용 배치입니다.',refs:['solar']},
 {id:'phobos',year:.05,date:'약 5천만 년 후',title:'포보스, 화성에 가까워지다',body:'화성의 위성 포보스는 조금씩 안쪽으로 접근합니다. 앞으로 화성에 충돌하거나, 조석력으로 부서져 고리가 될 가능성이 있습니다.',kind:'future',badge:'미래 예측',target:'화성 · 포보스',focus:3,effect:'phobos',note:'화면은 고리로 부서지는 시나리오를 보여줍니다. 결말과 시점은 확정되지 않았습니다.',refs:['phobos']},
 {id:'ring-rain',year:.3,date:'앞으로 수억 년? · 모형 의존',title:'영원하지 않을 토성의 고리',body:'고리 물질은 충돌과 행성으로 떨어지는 흐름을 통해 줄어듭니다. 일부 모형은 앞으로 수억 년 안에 고리가 크게 사라질 가능성을 제시합니다.',kind:'future',badge:'모형별 예측',target:'토성',focus:5,effect:'ring-rain',note:'고리의 수명은 유입률과 손실률 가정에 민감합니다.',refs:['rings']},
 {id:'sun-warms',year:3.4,date:'약 34억 년 후 · 추정',title:'태양의 표면 온도는 정점으로',body:'ESA가 소개한 태양 유사별의 진화 경로에서는 태양이 나이 약 80억 년에 표면 온도 정점에 도달합니다. 이후에는 표면이 식으면서 크기가 커지는 경로를 따릅니다.',kind:'future',badge:'항성 진화 예측',target:'태양',focus:-1,effect:'warming',note:'표면 온도, 중심 온도와 총 광도는 서로 다른 양입니다.',refs:['future']},
 {id:'hydrogen-end',year:5,date:'약 50억 년 후 · 추정',title:'중심 수소 연료의 끝',body:'태양 중심의 수소가 고갈되면 핵융합이 일어나는 영역과 내부 구조가 달라집니다. 익숙한 주계열 단계가 끝나고 거성으로의 변화가 진행됩니다.',kind:'future',badge:'항성 진화 예측',target:'태양',focus:-1,effect:'red-giant',note:'진입 시점은 모형에 따라 달라집니다.',refs:['future']},
 {id:'red-giant',year:7,date:'약 70억 년 후 전후',title:'태양이 적색거성으로 부풀다',body:'팽창하는 외피는 내행성의 영역에까지 이를 수 있습니다. 수성과 금성은 삼켜질 것으로 예상되며, 태양계 안쪽의 풍경은 크게 달라집니다.',kind:'future',badge:'항성 진화 예측',target:'태양 · 내행성',focus:-1,effect:'red-giant',note:'붉은 표면은 더 낮은 표면 온도를 뜻합니다. 커진 별의 총 광도는 높습니다.',refs:['sun']},
 {id:'earth-fate',year:7.59,date:'약 75.9억 년 후 · 특정 모형',title:'지구는 살아남을 수 있을까?',body:'태양의 질량 감소는 지구 궤도를 넓힐 수 있지만, 조석 작용은 반대로 지구를 끌어당깁니다. 2008년의 한 진화 모형은 지구가 결국 삼켜진다고 예측했습니다.',kind:'future',badge:'모형별 시나리오',target:'지구 · 태양',focus:2,effect:'engulfment',note:'75.9억 년은 해당 연구의 수치이며 보편적으로 확정된 날짜가 아닙니다.',refs:['giant']},
 {id:'mass-loss',year:7.7,date:'후기 거성 단계 · 대표 시점',title:'태양의 질량이 우주로 흩어지다',body:'거성 단계의 태양은 많은 물질을 바깥으로 잃습니다. 남은 행성들의 궤도도 달라질 수 있으며, 태양의 최종 질량은 현재보다 작아집니다.',kind:'future',badge:'항성 진화 예측',target:'태양 · 외행성',focus:-1,effect:'mass-loss',note:'세부 변화는 질량 손실 모형에 따라 달라집니다.',refs:['giant']},
 {id:'nebula',year:7.8,date:'약 80억 년 후 전후 · 대표값',title:'남겨진 외피는 빛날까?',body:'방출된 가스와 남은 뜨거운 핵이 마지막 장면을 만듭니다. 태양이 얼마나 뚜렷한 행성상 성운을 만들지는 모형에 따라 다릅니다.',kind:'future',badge:'미래 시나리오',target:'태양의 잔해',focus:-1,effect:'nebula',note:'화면의 고리 모양과 색은 설명용입니다. 성운의 정확한 형태를 예측한 것이 아닙니다.',refs:['giant','future']},
 {id:'white-dwarf',year:8,date:'약 80억 년 후 전후 · 대표값',title:'백색왜성으로 남는 태양',body:'태양은 초신성이나 블랙홀이 되지 않고 작은 백색왜성으로 남습니다. 핵융합을 멈춘 잔해는 남은 열을 방출하며 아주 오랫동안 식어 갑니다.',kind:'future',badge:'항성 진화 예측',target:'백색왜성',focus:-1,effect:'dwarf',note:'여정의 끝은 소멸이 아닌 냉각의 시작입니다.',refs:['sun','future']}
];

// Earth surface views are conceptual, not reconstructed palaeogeographic maps.
historyEvents.push(
 {id:'early-life',year:-3.8,date:'약 38억 년 전 · 대표 시점',title:'바다, 생명의 무대가 되다',body:'물이 머무는 바다는 초기 생명체가 살아갈 환경을 제공했습니다. 생명의 기원 시점과 경로에는 여전히 많은 질문이 남아 있습니다.',kind:'theory',badge:'지질 기록·해석',target:'지구',focus:2,effect:'ocean-life',note:'생명이 처음 태어난 날짜를 확정한 표시가 아닙니다. 바다와 생명 활동을 개념적으로 강조합니다.',refs:['earth']},
 {id:'snowball',year:-.71,date:'약 7.1억 년 전 · 대표 시점',title:'얼음이 저위도로 내려오다',body:'저위도까지 이어진 빙하의 흔적은 지구가 극심한 빙하기를 겪었음을 보여줍니다. 바다 전체가 얼었는지, 일부 열린 바다가 남았는지는 논의 중입니다.',kind:'theory',badge:'지질 증거·빙하 모형',target:'지구',focus:2,effect:'snowball',note:'눈덩이 지구 가설의 개념 장면입니다. 이 시기에는 여러 빙하기가 있었으며 화면은 하나의 연속된 결빙을 뜻하지 않습니다.',refs:['snowball']},
 {id:'thaw',year:-.635,date:'약 6억 3,500만 년 전',title:'긴 빙하기를 벗어나다',body:'크라이오제니아기의 마지막 큰 빙하기가 끝나면서 바다와 지표의 환경도 변화합니다. 얼음이 물러나는 과정과 그 원인을 기후 모형으로 연구하고 있습니다.',kind:'evidence',badge:'지질 기록·기후 모형',target:'지구',focus:2,effect:'thaw',note:'해빙 효과는 변화를 설명하기 위한 장면입니다. 실제 해빙 속도나 대륙 배치를 재현하지 않습니다.',refs:['snowball']},
 {id:'chicxulub',year:-.066,date:'약 6,600만 년 전',title:'우주에서 온 충돌, 지구의 전환점',body:'칙술루브 충돌은 백악기 말 대멸종과 연결됩니다. 충돌구와 경계 지층의 기록은 거대한 충돌이 지구 환경에 남긴 흔적을 보여줍니다.',kind:'evidence',badge:'충돌구·지층 증거',target:'지구',focus:2,effect:'chicxulub',note:'확산되는 빛과 먼지는 충돌의 개념 표현입니다. 실제 충돌 위치·규모·지속 시간을 비례 재현하지 않습니다.',refs:['impactEarth']}
);
historyEvents.sort((a,b)=>a.year-b.year);
const bodyEvents = {
 system:['cloud','grains','disk-clears','present'],
 sun:['cloud','disk-clears','sun-warms','hydrogen-end','red-giant','earth-fate','mass-loss','nebula','white-dwarf'],
 mercury:['rocky-worlds','bombardment','red-giant'],
 venus:['rocky-worlds','bombardment','venus-question','red-giant'],
 earth:['rocky-worlds','moon-impact','bombardment','early-life','snowball','thaw','chicxulub','present','earth-fate'],
 moon:['moon-impact','magma-moon','lunar-crust','bombardment','lunar-maria'],
 mars:['rocky-worlds','grand-tack','wet-mars','mars-loss','phobos'],
 phobos:['phobos'],jupiter:['jupiter','grand-tack','giant-instability','mass-loss'],
 saturn:['grand-tack','giant-instability','young-rings','ring-rain','mass-loss'],
 uranus:['uranus-tilt','giant-instability','mass-loss'],neptune:['giant-instability','icy-frontier','mass-loss'],
 kuiper:['icy-frontier','giant-instability']
};
const encyclopedia = {name:'태양계',key:'system',description:'하나의 별과 그 주위를 도는 세계들. 사건을 펼쳐 해당 시대로 이동하세요.',children:[
 {name:'태양',key:'sun',description:'태양계의 중심별 · 형성에서 백색왜성까지'},
 {name:'암석 행성',children:[
  {name:'수성',key:'mercury',description:'안쪽 세계 · 암석 행성의 형성과 태양의 팽창'},
  {name:'금성',key:'venus',description:'두꺼운 대기 · 과거 환경에 관한 서로 다른 모형'},
  {name:'지구',key:'earth',description:'물과 얼음, 충돌과 생명 · 변화하는 우리 행성',children:[{name:'달',key:'moon',description:'지구의 위성 · 거대 충돌과 지각의 기록'}]},
  {name:'화성',key:'mars',description:'옛 물의 흔적 · 대기의 손실',children:[{name:'포보스',key:'phobos',description:'화성의 위성 · 궤도의 미래'}]}
 ]},
 {name:'거대 행성',children:[{name:'목성',key:'jupiter',description:'빠른 성장과 초기 궤도 이동 가설'},{name:'토성',key:'saturn',description:'고리의 나이와 사라지는 물질'},{name:'천왕성',key:'uranus',description:'크게 기울어진 자전축의 기원'},{name:'해왕성',key:'neptune',description:'외곽 궤도의 재편과 얼음 천체들'}]},
 {name:'작은 천체들의 영역',children:[{name:'카이퍼 벨트',key:'kuiper',description:'태양계 외곽에 남은 얼음 천체의 기록'}]}
]};
