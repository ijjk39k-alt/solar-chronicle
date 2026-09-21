'use strict';
const $ = id => document.getElementById(id);
const NASA = 'https://science.nasa.gov/';
const ESA = 'https://www.esa.int/Science_Exploration/Space_Science/Gaia/Gaia_reveals_the_past_and_future_of_the_Sun';
const eras = [
 {year:-4.6,short:'태양 성운',date:'46억 년 전',title:'먼지에서<br>시작된 우주',subtitle:'아직 행성은 없습니다.<br>중력이 흩어진 물질을 모으기 시작합니다.',badge:'형성 모형',type:'theory',event:'하나의 구름, 모든 것의 시작',text:'약 46억 년 전, 가스와 먼지 구름이 중력으로 수축했습니다. 회전하는 구름은 납작한 원반이 되고, 중심에는 태양이 될 물질이 모였습니다. 성운설에 따른 재구성입니다.',source:NASA+'solar-system/solar-system-facts/',sourceName:'NASA',kind:'태양 성운',detail:'가스와 먼지의 중력 수축'},
 {year:-4.56,short:'행성 탄생',date:'약 45.6억 년 전',title:'먼지가 모여<br>세계가 되다',subtitle:'충돌하고, 뭉치고, 자라며.<br>원반 속에서 행성들이 모습을 갖춥니다.',badge:'형성 모형',type:'theory',event:'원시 행성계 원반',text:'어린 태양 주위의 고체 입자가 뭉쳐 미행성과 원시 행성으로 성장합니다. 안쪽에는 암석 행성, 더 차가운 바깥쪽에는 거대 행성들이 형성됩니다. 형성 속도와 경로는 행성마다 다릅니다.',source:NASA+'solar-system/solar-system-facts/',sourceName:'NASA',kind:'어린 태양',detail:'미행성의 충돌과 성장'},
 {year:-4.5,short:'달의 탄생',date:'약 45억 년 전',title:'충돌이 남긴<br>우리의 달',subtitle:'파괴의 순간에서<br>새로운 동반자가 태어납니다.',badge:'유력 가설',type:'theory',event:'지구와 테이아의 거대 충돌',text:'화성 크기의 천체가 원시 지구에 충돌하고, 파편에서 달이 형성됐다는 가설이 유력합니다. 달 암석의 성분이 이를 뒷받침하지만, 충돌 시점과 구체적인 과정은 연구 중입니다.',source:NASA+'moon/formation/',sourceName:'NASA',kind:'초기 태양계',detail:'거대 충돌과 궤도의 정리'},
 {year:0,short:'현재',date:'지금',title:'우리가 아는<br>태양계',subtitle:'하나의 별, 여덟 개의 세계.<br>우주의 한순간에 우리가 있습니다.',badge:'관측·측정',type:'fact',event:'푸른 행성의 시대',text:'약 46억 년을 지나온 태양계. 여덟 행성이 태양을 공전하고, 소행성과 얼음 천체들이 그 사이와 너머를 채웁니다. 지구는 지금까지 생명체가 확인된 유일한 세계입니다.',source:NASA+'solar-system/solar-system-facts/',sourceName:'NASA',kind:'주계열성',detail:'안정적인 수소 핵융합'},
 {year:5,short:'태양의 변화',date:'약 50억 년 후',title:'익숙한 별이<br>변하기 시작하다',subtitle:'중심의 연료가 줄어들며<br>태양은 다음 생애로 향합니다.',badge:'미래 예측',type:'future',event:'주계열 단계의 끝을 향해',text:'태양 중심의 수소가 고갈되면서 내부 구조와 에너지 생성 방식이 바뀝니다. 이후 크게 팽창하는 거성 단계로 진입합니다. 전환 시점은 항성 진화 모형에 따른 대략적인 예측입니다.',source:ESA,sourceName:'ESA',kind:'주계열 말기',detail:'중심 수소의 고갈'},
 {year:7,short:'적색거성',date:'약 70억 년 후',title:'태양이 삼킨<br>안쪽의 세계',subtitle:'붉게 부푼 태양.<br>태양계는 완전히 다른 풍경이 됩니다.',badge:'미래 예측',type:'future',event:'거대하게 팽창하는 태양',text:'태양은 적색거성으로 팽창하며 수성과 금성을 삼킬 것으로 예측됩니다. 지구의 최종 운명은 질량 손실과 조석 작용 등에 달려 있습니다. 화면의 지구 소실은 가능한 시나리오입니다.',source:'https://arxiv.org/abs/0801.4031',sourceName:'Schröder & Smith (2008)',kind:'적색거성',detail:'외피 팽창 · 질량 손실'},
 {year:7.8,short:'외피 방출',date:'약 78억 년 후',title:'마지막 빛을<br>우주에 돌려주다',subtitle:'바깥층은 성간 공간으로.<br>그 중심에 뜨거운 핵이 남습니다.',badge:'미래 예측',type:'future',event:'행성상 성운으로 향하는 외피',text:'후기 거성 단계를 거치며 태양은 바깥층을 우주로 방출합니다. 남은 뜨거운 핵이 가스를 밝히면 행성상 성운이 나타날 수 있습니다. 표시된 형태와 시점은 설명을 위한 예시입니다.',source:ESA,sourceName:'ESA',kind:'외피 방출',detail:'팽창하는 가스 · 드러나는 핵'},
 {year:8,short:'백색왜성',date:'약 80억 년 후',title:'별이 남긴<br>조용한 잔광',subtitle:'사라지는 대신, 작게 남아서.<br>아주 오랜 냉각이 시작됩니다.',badge:'미래 예측',type:'future',event:'태양의 마지막 모습, 백색왜성',text:'태양은 지구 정도 크기의 조밀한 백색왜성으로 남을 것으로 예상됩니다. 핵융합을 멈춘 잔해는 저장된 열을 내보내며 서서히 식습니다. 초신성이나 블랙홀이 되는 경로는 아닙니다.',source:ESA,sourceName:'ESA',kind:'백색왜성',detail:'핵융합 종료 · 오랜 냉각'}
];
const planets = [
 {name:'수성',color:[160,149,130],size:4.1,orbit:.135,angle:3.9,period:.241},
 {name:'금성',color:[220,184,128],size:7,orbit:.208,angle:5.65,period:.615},
 {name:'지구',color:[60,140,189],size:8.5,orbit:.29,angle:2.2,period:1},
 {name:'화성',color:[195,98,62],size:5.7,orbit:.373,angle:3.4,period:1.88},
 {name:'목성',color:[205,171,136],size:25,orbit:.53,angle:.65,period:11.86},
 {name:'토성',color:[211,194,148],size:20.5,orbit:.69,angle:3.5,period:29.46},
 {name:'천왕성',color:[119,200,208],size:12,orbit:.845,angle:5.55,period:84},
 {name:'해왕성',color:[67,102,198],size:11.5,orbit:1,angle:2.7,period:164.8}
];
const state = {time:0,playing:false,loop:true,labels:true,orbits:true,era:3,event:18,clock:0,dragging:false,endHold:0,speed:1,follow:false,focusOverride:null};
let uiDirty=true,sceneDirty=true,lastUIEvent=-1,lastUIChapter='',pendingAnnouncement=false;
const ui=Object.fromEntries(Array.from(document.querySelectorAll('[id]'),el=>[el.id,el]));
const textIfChanged=(id,value)=>{if(ui[id].textContent!==value)ui[id].textContent=value};
const background=document.createElement('canvas');
let backdropReady=false;
const camera={x:0,y:0,zoom:1,ready:false};
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas=$('universe'),ctx=canvas.getContext('2d',{alpha:false});
let W=0,H=0,dpr=1,previous=0,drawn=0,dragStart=0,dragTime=0,lastAnnounce=-1;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a),0,1);return t*t*(3-2*t)};
const mix=(a,b,t)=>a+(b-a)*t;
let seed=1874;
function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
const stars=Array.from({length:950},()=>({x:rand(),y:rand(),r:rand()*1.1+.2,a:rand()*.55+.13,phase:rand()*6.28}));
const particles=Array.from({length:1550},()=>({r:Math.sqrt(rand()),a:rand()*Math.PI*2,z:(rand()-.5)*2,size:rand()*1.2+.25,heat:rand()}));
function resize(){
 W=innerWidth;H=$('app').clientHeight;dpr=Math.min(devicePixelRatio||1,1.5);
 canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
 background.width=canvas.width;background.height=canvas.height;const bg=background.getContext('2d',{alpha:false});bg.setTransform(dpr,0,0,dpr,0,0);bg.fillStyle='#080c11';bg.fillRect(0,0,W,H);
 for(const star of stars){bg.fillStyle=`rgba(178,203,221,${star.a*.9})`;bg.fillRect(star.x*W,star.y*H,star.r,star.r)}
 backdropReady=true;uiDirty=true;sceneDirty=true;camera.ready=false;
}
addEventListener('resize',resize);resize();

// Shaded spheres are illustrative glyphs in the orbital model, not photographic textures.
function sphereTexture(p,index){
 const c=document.createElement('canvas');c.width=c.height=160;const g=c.getContext('2d'),im=g.createImageData(160,160);
 for(let y=0;y<160;y++)for(let x=0;x<160;x++){
  const nx=(x-80)/78,ny=(y-80)/78,rr=nx*nx+ny*ny;if(rr>1)continue;
  const z=Math.sqrt(1-rr),lat=Math.asin(ny),lon=Math.atan2(nx,z);
  let col=p.color.slice(),n=Math.sin(lon*19+Math.sin(lat*11)*2)*Math.cos(lat*23)+Math.sin(lon*31+lat*19)*.45;
  let grain=(rand()-.5)*.1;
  if(index===4||index===5){const band=Math.sin(ny*40+Math.sin(lon*7)*.9)+.3*Math.sin(ny*100+lon*9);col=col.map((v,k)=>v+(k===2?23:18)*band);if(index===4&&Math.pow((nx-.35)/.26,2)+Math.pow((ny-.25)/.12,2)<1)col=[173,106,72]}
  else if(index===2){let land=Math.sin(lon*5+Math.sin(lat*8))+Math.cos(lat*7-lon*3)+.55*Math.sin(lon*14+lat*8);if(land>.85)col=[102,135,95];if(Math.abs(ny)>.86)col=[208,224,222];const cloud=Math.sin(lon*17+lat*27+Math.sin(lon*9)*2);if(cloud>1-.18*Math.sin(lat*13))col=col.map(v=>mix(v,235,.66))}
  else if(index<4)col=col.map(v=>v+n*9);
  const light=clamp((nx*-.56+ny*-.35+z*.75)*1.2,0,1),shade=.06+light*.94+grain;
  const off=(y*160+x)*4;im.data[off]=clamp(col[0]*shade,0,255);im.data[off+1]=clamp(col[1]*shade,0,255);im.data[off+2]=clamp(col[2]*shade,0,255);im.data[off+3]=clamp((1-rr)*700,0,255);
 }g.putImageData(im,0,0);return c;
}
const textures=planets.map(sphereTexture);
const moltenEarth=sphereTexture({color:[222,103,42]},3);
const iceEarth=sphereTexture({color:[202,224,235]},3);
const oceanEarth=sphereTexture({color:[49,120,166]},3);
const wetMars=sphereTexture({color:[116,142,153]},3);
const sunTexture=(()=>{const c=document.createElement('canvas');c.width=c.height=240;const g=c.getContext('2d'),im=g.createImageData(240,240);for(let y=0;y<240;y++)for(let x=0;x<240;x++){const nx=(x-120)/117,ny=(y-120)/117,r=Math.hypot(nx,ny);if(r>1)continue;const n=(Math.sin(x*.74+Math.sin(y*.56))*Math.cos(y*.9)+rand()*1.4)/2.4,b=1-r*r*.28;let i=(y*240+x)*4;im.data[i]=255*b;im.data[i+1]=(187+n*34)*b;im.data[i+2]=(61+n*22)*b;im.data[i+3]=clamp((1-r)*1400,0,255)}g.putImageData(im,0,0);return c})();

// The navigation coordinate is linear in geological time, independent of event density.
const FIRST_YEAR=-4.6,LAST_YEAR=8,TRAVEL_SECONDS=90;
function yearAt(t){return mix(FIRST_YEAR,LAST_YEAR,clamp(t,0,7)/7)}
function timeForYear(year){return clamp((year-FIRST_YEAR)/(LAST_YEAR-FIRST_YEAR)*7,0,7)}
function eventPosition(i){return timeForYear(historyEvents[i].year)}
function indexAtTime(time){let i=0;while(i<historyEvents.length-1&&eventPosition(i+1)<=time+1e-10)i++;return i}
const narrative={phase:'manual',elapsed:0,duration:10,opacity:1};
const bodyFocus={sun:-1,mercury:0,venus:1,earth:2,moon:2,mars:3,phobos:3,jupiter:4,saturn:5,uranus:6,neptune:7};
const bodyNames={sun:'태양',mercury:'수성',venus:'금성',earth:'지구',moon:'달',mars:'화성',phobos:'포보스',jupiter:'목성',saturn:'토성',uranus:'천왕성',neptune:'해왕성'};
function focusIndex(event){return state.focusOverride!==null?bodyFocus[state.focusOverride]:event.focus}
function focusName(event){return state.focusOverride!==null?bodyNames[state.focusOverride]:event.target}
function holdDuration(){return 10/Math.min(state.speed,1.5)}
function beginHold(){state.focusOverride=null;lastUIEvent=-1;narrative.phase='hold';narrative.elapsed=0;narrative.duration=holdDuration();pendingAnnouncement=true;uiDirty=true}
function advancePlayback(delta){
 if(narrative.phase==='hold'){
  narrative.elapsed=Math.min(narrative.duration,narrative.elapsed+delta);
  if(narrative.elapsed>=narrative.duration){
   if(state.event===historyEvents.length-1){if(state.loop){setTime(0,false,true);beginHold()}else pause();}
   else narrative.phase='travel';
  }
 }else{
  const nextIndex=state.event+1,target=eventPosition(nextIndex);
  const next=state.time+delta*7/TRAVEL_SECONDS*state.speed;
  if(next>=target-1e-10){setTime(target,false,true);beginHold()}
  else setTime(next,false,true);
 }
}
function updateNarrative(){
 const p=clamp(narrative.elapsed/narrative.duration,0,1);
 narrative.opacity=!state.playing?1:narrative.phase==='hold'?(reduced?1:smooth(0,.08,p)*(1-smooth(.84,1,p))):0;
 ui.eventContent.style.opacity=narrative.opacity;
 ui.eventContent.inert=state.playing&&narrative.opacity<.05;
 ui.readingProgress.style.transform=`scaleX(${state.playing&&narrative.phase==='hold'?p:0})`;
 textIfChanged('narrativeStatus',!state.playing?'선택한 시대 · 직전 또는 해당 사건':narrative.phase==='hold'?'사건 관측 · 연대 잠시 정지':'다음 사건으로 시간 이동 중');
 textIfChanged('narrativeDuration',state.playing&&narrative.phase==='hold'?Math.ceil(narrative.duration-narrative.elapsed)+'초':'');
}
function visualTime(year){let i=0;while(i<6&&eras[i+1].year<=year)i++;return clamp(i+(year-eras[i].year)/(eras[i+1].year-eras[i].year),0,7)}
function timeLabel(year){const n=Math.abs(year);if(n<1e-9)return '현재';if(n<.1)return (n*1e5).toLocaleString('ko-KR',{maximumFractionDigits:0})+'만 년';return (n*10).toLocaleString('ko-KR',{maximumFractionDigits:2})+'억 년'}
const eraButtons=[];
for(const year of [-4.6,-2,0,2,4,6,8]){
 const b=document.createElement('button');b.className='era-button';b.style.left=(timeForYear(year)/7*100)+'%';
 b.innerHTML=`<span>${year===0?'현재':timeLabel(year)}</span><small>${year<0?'전':year>0?'후':'우리가 있는 순간'}</small>`;
 b.onclick=()=>{pause();setTime(timeForYear(year),true);syncUI()};$('eraButtons').appendChild(b);eraButtons.push({button:b,year});
}
const markerButtons=[],archiveButtons=[],treeButtons=[];
let markerGroups=[];
let group='';
historyEvents.forEach((e,i)=>{
 const marker=document.createElement('span');marker.className='event-tick '+e.kind;marker.style.left=(eventPosition(i)/7*100)+'%';marker.setAttribute('aria-hidden','true');$('eventMarkers').appendChild(marker);markerButtons.push(marker);
 const nextGroup=e.year<0?'과거 · 형성과 변화':e.year===0?'현재 · 우리가 있는 순간':'미래 · 모형이 그리는 가능성';
 if(nextGroup!==group){const h=document.createElement('h3');h.className='archive-heading';h.textContent=nextGroup;$('eventList').appendChild(h);group=nextGroup}
 const b=document.createElement('button');b.className='archive-event';b.innerHTML=`<span class="archive-number">${String(i+1).padStart(2,'0')}</span><span><strong>${e.title}</strong><small>${e.date} · ${e.target}</small></span><span class="badge ${e.kind}">${e.badge}</span>`;b.onclick=()=>{$('chronicle').close();seekEvent(i)};$('eventList').appendChild(b);archiveButtons.push(b);
});
function renderMarkerGroups(){
 for(const group of markerGroups)group.button.remove();markerGroups=[];
 const width=Math.max(200,W*.88);let indices=[];
 function flush(){if(!indices.length)return;const members=indices.slice(),button=document.createElement('button');
  button.className='event-marker'+(members.length>1?' cluster':'');
  button.style.left=(members.reduce((sum,i)=>sum+eventPosition(i),0)/members.length/7*100)+'%';
  button.textContent=members.length>1?String(members.length):'•';
  button.title=members.length>1?members.length+'개 사건 · 펼쳐 보기':historyEvents[members[0]].date+' · '+historyEvents[members[0]].title;
  button.setAttribute('aria-label',button.title);button.onclick=()=>{if(members.length===1){seekEvent(members[0]);return}pause();ui.markerChoices.replaceChildren();
   for(const i of members){const e=historyEvents[i],b=document.createElement('button');b.className='tree-event';b.innerHTML=`<small>${e.date} · ${e.target}</small><strong>${e.title} ↗</strong>`;b.onclick=()=>{ui.markerPicker.close();seekEvent(i)};ui.markerChoices.appendChild(b)}ui.markerPicker.showModal()};
  ui.eventMarkers.appendChild(button);markerGroups.push({button,indices:members});indices=[];
 }
 for(let i=0;i<historyEvents.length;i++){if(indices.length&&(eventPosition(i)-eventPosition(indices[0]))/7*width>30)flush();indices.push(i)}flush();uiDirty=true;lastUIEvent=-1;
}
renderMarkerGroups();addEventListener('resize',renderMarkerGroups);
ui.closeMarkerPicker.onclick=()=>ui.markerPicker.close();
ui.eventContent.addEventListener('focusin',()=>{if(state.playing)pause()});
ui.eventDetails.addEventListener('toggle',()=>{if(ui.eventDetails.open&&state.playing)pause()});
function buildTree(node,parent,depth=0){
 const branch=document.createElement('details');branch.className='tree-branch';branch.open=depth<2;
 const summary=document.createElement('summary'),ids=bodyEvents[node.key]||[];
 summary.innerHTML=`<span>${node.name}</span>${node.key?`<small>${ids.length}개 사건</small>`:''}`;branch.appendChild(summary);
 if(node.description){const desc=document.createElement('p');desc.textContent=node.description;branch.appendChild(desc)}
 for(let i=0;i<historyEvents.length;i++){const e=historyEvents[i];if(!ids.includes(e.id))continue;const b=document.createElement('button');b.className='tree-event';
  b.innerHTML=`<small>${e.date} · ${e.badge}</small><strong>${e.title}<span> ↗</span></strong>`;
  b.onclick=()=>{ui.chronicle.close();state.follow=true;seekEvent(i,node.key)};branch.appendChild(b);treeButtons.push({button:b,index:i});
 }
 for(const child of node.children||[])buildTree(child,branch,depth+1);parent.appendChild(branch);
}
buildTree(encyclopedia,ui.bodyTree);
function archiveView(tree){ui.eventList.hidden=tree;ui.bodyTree.hidden=!tree;ui.chronologyTab.setAttribute('aria-pressed',String(!tree));ui.bodiesTab.setAttribute('aria-pressed',String(tree));textIfChanged('chronicleTitle',tree?'천체별 역사 도감':'태양계의 사건 연대기')}
ui.chronologyTab.onclick=()=>archiveView(false);ui.bodiesTab.onclick=()=>archiveView(true);
$('eventCount').textContent=historyEvents.length;
function setTime(value,announce=false,automatic=false){
 const n=Number(value);if(!Number.isFinite(n))return;
 state.time=clamp(n,0,7);state.event=indexAtTime(state.time);
 if(!automatic){state.focusOverride=null;narrative.phase="manual";narrative.elapsed=0;}
 const y=yearAt(state.time);state.era=Math.min(7,Math.floor(visualTime(y)+1e-7));uiDirty=true;sceneDirty=true;pendingAnnouncement ||= announce;
}
function syncUI(){
 updateNarrative();if(!uiDirty)return;uiDirty=false;
 const year=yearAt(state.time),e=historyEvents[state.event],chapter=eras[state.era];
 ui.followCamera.setAttribute('aria-pressed',String(state.follow));textIfChanged('cameraMode',state.follow?'ON':'OFF');
 textIfChanged('cameraStatus',state.follow?(focusIndex(e)>=0?'근접 관측 · '+focusName(e):['dwarf','warming','red-giant'].includes(e.effect)?'근접 관측 · '+e.target:'넓은 시야 · '+e.target):'사건의 천체를 가까이 관측합니다');
 ui.timeline.value=state.time;const valueText=timeLabel(year);
 textIfChanged('timeValue',valueText);textIfChanged('timeDirection',Math.abs(year)<1e-9?'지금, 이 순간':year<0?'현재로부터 과거':'현재로부터 미래 · 예측');
 textIfChanged('eraRange',`사건 ${state.event+1} / ${historyEvents.length} · ${e.target}`);
 const aria=`${valueText} ${year<0?'전':year>0?'후':''}, ${e.title}`;if(ui.timeline.getAttribute('aria-valuetext')!==aria)ui.timeline.setAttribute('aria-valuetext',aria);
 eraButtons.forEach(({button,year:y})=>button.classList.toggle('active',Math.abs(year-y)<1e-8));
 const chapterKey=state.era+':'+(year>0)+':'+(year>-4.45);
 if(chapterKey!==lastUIChapter){lastUIChapter=chapterKey;
  ui.eraTitle.innerHTML=state.era===2&&year>-4.45?'행성들이 쓴<br>서로 다른 역사':state.era===3&&year>0?'익숙한 세계의<br>다음 장면':chapter.title;
  ui.eraSubtitle.innerHTML=state.era===2&&year>-4.45?'충돌, 물, 대기, 그리고 고리.<br>각자의 시간이 태양계를 바꿉니다.':state.era===3&&year>0?'우리가 아는 태양계도<br>영원히 같은 모습은 아닙니다.':chapter.subtitle;
  textIfChanged('chapter',`CHAPTER ${String(state.era+1).padStart(2,'0')} / 08`);textIfChanged('sceneKind',state.era===2&&year>-4.45?'주계열성':chapter.kind);
 }
 if(lastUIEvent!==state.event){
  lastUIEvent=state.event;textIfChanged('evidence',e.badge);ui.evidence.className='badge '+e.kind;textIfChanged('eventTitle',e.title);textIfChanged('eventText',e.body);textIfChanged('eventDate',e.date);textIfChanged('eventTarget',e.target);textIfChanged('eventNote',e.note);ui.eventDetails.open=false;
  const source=sources[e.refs[0]];ui.eventSource.href=source[1];ui.eventSource.textContent=source[0]+' · 근거 읽기 ↗';ui.extraSources.replaceChildren();for(const ref of e.refs.slice(1)){const link=document.createElement('a');link.href=sources[ref][1];link.textContent=sources[ref][0]+' ↗';link.target='_blank';link.rel='noopener noreferrer';ui.extraSources.appendChild(link)}
  textIfChanged('eventNumber',`${String(state.event+1).padStart(2,'0')} / ${historyEvents.length}`);textIfChanged('sceneDetail',e.target+' · '+e.badge);textIfChanged('focusCaption',focusName(e)+' · '+e.title);
  markerButtons.forEach((b,i)=>{b.classList.toggle('active',i===state.event);if(i===state.event)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
  archiveButtons.forEach((b,i)=>b.classList.toggle('active',i===state.event));
  markerGroups.forEach(g=>g.button.classList.toggle('active',g.indices.includes(state.event)));
  treeButtons.forEach(({button,index})=>{button.classList.toggle('active',index===state.event);if(index===state.event)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current')});
  ui.previousEvent.disabled=state.event===0;ui.nextEvent.disabled=state.event===historyEvents.length-1;ui.back.disabled=state.event===0;ui.forward.disabled=state.event===historyEvents.length-1;
 }
 if(pendingAnnouncement){pendingAnnouncement=false;textIfChanged('announcement',e.date+', '+e.title)}
}
function seekEvent(index,body=null){pause();setTime(eventPosition(clamp(index,0,historyEvents.length-1)),true);state.focusOverride=Object.hasOwn(bodyFocus,body)?body:null;lastUIEvent=-1;syncUI()}
function pause(){state.playing=false;state.endHold=0;sceneDirty=true;uiDirty=true;updatePlay();updateNarrative()}
function updatePlay(){$('playIcon').textContent=state.playing?'Ⅱ':'▶';$('playText').textContent=state.playing?'일시 정지':'자동 탐험';$('play').setAttribute('aria-label',state.playing?'시간 자동 재생 일시 정지':'시간 자동 재생')}
function togglePlay(){if(state.playing){pause();return}if(state.time>=7)setTime(0);state.playing=true;
 if(narrative.phase==='manual'){if(Math.abs(state.time-eventPosition(state.event))<1e-9)beginHold();else narrative.phase='travel'}
 previous=0;sceneDirty=true;updatePlay();updateNarrative()}
$('followCamera').onclick=()=>{state.follow=!state.follow;uiDirty=true;sceneDirty=true;syncUI();textIfChanged('announcement',state.follow?'사건 따라보기를 켰습니다. 시간을 이동하면 해당 천체를 따라갑니다.':'태양계 전체 보기로 돌아갑니다.')};
$('play').onclick=togglePlay;$('back').onclick=$('previousEvent').onclick=()=>seekEvent(state.event-1);$('forward').onclick=$('nextEvent').onclick=()=>seekEvent(state.event+1);$('present').onclick=()=>seekEvent(historyEvents.findIndex(e=>e.id==='present'));
$('speed').onclick=()=>{const speeds=[.5,1,2];const fraction=narrative.elapsed/narrative.duration;state.speed=speeds[(speeds.indexOf(state.speed)+1)%3];narrative.duration=holdDuration();narrative.elapsed=fraction*narrative.duration;$('speed').textContent=state.speed+'×'};
$('chronicleButton').onclick=()=>{pause();$('chronicle').showModal()};$('closeChronicle').onclick=()=>$('chronicle').close();
$('loop').onclick=()=>{state.loop=!state.loop;$('loop').setAttribute('aria-pressed',state.loop)};
$('timeline').addEventListener('input',e=>{pause();setTime(e.target.value)});$('timeline').addEventListener('change',()=>setTime(state.time,true));
for(const name of ['labels','orbits'])$(name).onclick=()=>{state[name]=!state[name];uiDirty=true;sceneDirty=true;$(name).setAttribute('aria-pressed',state[name]);$(name).querySelector('span').textContent=state[name]?'ON':'OFF'};
canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;state.dragging=true;dragStart=e.clientX;dragTime=state.time;canvas.setPointerCapture(e.pointerId);pause()});
canvas.addEventListener('pointermove',e=>{if(state.dragging){setTime(dragTime+(e.clientX-dragStart)/Math.max(400,W*.8)*7);$('dragHint').style.opacity='.35'}});
function endDrag(){if(state.dragging){state.dragging=false;setTime(state.time,true)}}canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);canvas.addEventListener('lostpointercapture',endDrag);
$('sourcesButton').onclick=()=>{pause();$('guide').showModal()};$('closeGuide').onclick=()=>$('guide').close();$('guide').addEventListener('click',e=>{if(e.target===$('guide')){const r=$('guide').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('guide').close()}});
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else{$('announcement').textContent='이 브라우저에서는 전체 화면을 지원하지 않습니다.';$('fullscreen').textContent='—'}}catch{$('announcement').textContent='전체 화면으로 전환할 수 없습니다.'}};
document.addEventListener('keydown',e=>{if($('guide').open||$('chronicle').open||$('markerPicker').open||e.target.matches('input,button,a'))return;if(e.code==='Space'){e.preventDefault();togglePlay()}if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();pause();setTime(state.time+(e.key==='ArrowRight'?.04:-.04),true)}});
document.addEventListener('visibilitychange',()=>{previous=0;uiDirty=true});

const glowCache=new Map();
function glow(x,y,r,color,alpha=1){
 if(r<=0||alpha<=0)return;let sprite=glowCache.get(color);
 if(!sprite){sprite=document.createElement('canvas');sprite.width=sprite.height=192;const g=sprite.getContext('2d'),gradient=g.createRadialGradient(96,96,0,96,96,96);gradient.addColorStop(0,`rgba(${color},1)`);gradient.addColorStop(.22,`rgba(${color},.35)`);gradient.addColorStop(.55,`rgba(${color},.08)`);gradient.addColorStop(1,`rgba(${color},0)`);g.fillStyle=gradient;g.fillRect(0,0,192,192);glowCache.set(color,sprite)}
 const old=ctx.globalAlpha;ctx.globalAlpha=old*alpha;ctx.drawImage(sprite,x-r,y-r,r*2,r*2);ctx.globalAlpha=old;
}
const beltSprite=(()=>{const c=document.createElement('canvas');c.width=c.height=1024;const g=c.getContext('2d');for(let k=0;k<570;k++){const q=particles[k],outer=k>290,r=(outer?.92+q.r*.16:.425+q.r*.055)*440;g.fillStyle=outer?'rgba(94,124,142,.23)':'rgba(162,146,128,.4)';g.fillRect(512+Math.cos(q.a)*r,512+Math.sin(q.a)*r*.39,q.size,q.size)}return c})();
function draw(now){
 requestAnimationFrame(draw);if(document.hidden)return;if(reduced&&!state.playing&&!sceneDirty)return;drawn=now;
 const delta=previous?Math.min((now-previous)/1000,.15):0;previous=now;
 if(!reduced)state.clock+=delta;
 if(state.playing)advancePlayback(delta);
 syncUI();sceneDirty=false;
 const year=yearAt(state.time),t=visualTime(year),event=historyEvents[state.event],clock=state.clock,mobile=W<=650,scale=mobile?.69:clamp(W/1400,.75,1.22);
 const cx=W*(mobile?.51:.535),cy=mobile?Math.min(H*.335,390):(H-230)*.645;
 const radius=mobile?W*.465:Math.min(W*.43,(H-300)*.9),flatten=mobile?.40:.39,rotation=-.20;
 const point=(r,a,z=0)=>{const x=Math.cos(a)*r,y=Math.sin(a)*r*flatten;return{x:cx+x*Math.cos(rotation)-y*Math.sin(rotation),y:cy+x*Math.sin(rotation)+y*Math.cos(rotation)+z}};
 ctx.globalAlpha=1;if(backdropReady)ctx.drawImage(background,0,0,W,H);
 const red=smooth(4,5,t)*(1-smooth(5.75,6.2,t));const remnant=smooth(5.8,6.5,t);

 // Orbital circles share one projected plane. Early epochs instead expose the accretion disk.
 const formed=smooth(.6,2.6,t);
 const progress=state.playing?clamp(narrative.elapsed/narrative.duration,0,1):.5;
 const eventAlpha=narrative.opacity;
 const emphasis=.6+.4*Math.sin(Math.PI*clamp(progress*1.5,0,1));
 const orbitRadius=i=>{let r=planets[i].orbit;if(event.effect==='migration'&&(i===4||i===5))r*=1-.34*Math.sin(progress*Math.PI);if(event.effect==='outer-migration'&&i>=6)r*=.8+.2*progress;return r*radius};
 const bodies=planets.map((p,i)=>{
   const a=p.angle+clock*.052/Math.pow(p.period,.32)+t*.065;
   const pt=point(orbitRadius(i),a);return{...pt,p,i};
 }).sort((a,b)=>a.y-b.y);
 const activeFocus=focusIndex(event);
 const target=bodies.find(b=>b.i===activeFocus);
 const targetExists=!!target&&(activeFocus!==2||year<7.65)&&(activeFocus>=2||t<5.02+activeFocus*.13);
 const nearStar=state.follow&&(state.focusOverride==='sun'||['dwarf','warming','red-giant','engulfment'].includes(event.effect));
 const focusedBody=state.follow&&targetExists?target:null;
 const desired={x:focusedBody?focusedBody.x:cx,y:focusedBody?focusedBody.y:cy,zoom:1};
 if(focusedBody){const bodySize=focusedBody.p.size*scale*(.52+.48*smooth(.6,2,t));desired.zoom=clamp((mobile?38:62)/bodySize,2,8)}
 else if(nearStar)desired.zoom=event.effect==='dwarf'?6:1.35;
 if(!camera.ready){camera.x=cx;camera.y=cy;camera.zoom=1;camera.ready=true}
 const ease=reduced?1:1-Math.exp(-Math.max(delta,1/120)*6);
 camera.x=mix(camera.x,desired.x,ease);camera.y=mix(camera.y,desired.y,ease);camera.zoom=mix(camera.zoom,desired.zoom,ease);
 const screenPoint=p=>({x:cx+(p.x-camera.x)*camera.zoom,y:cy+(p.y-camera.y)*camera.zoom});
 ctx.save();
 // Keep enlarged worlds inside the observation area, clear of timeline controls.
 if(state.follow||camera.zoom>1.02){ctx.beginPath();ctx.rect(0,mobile?260:100,W,H-(mobile?870:390));ctx.clip()}
 ctx.translate(cx,cy);ctx.scale(camera.zoom,camera.zoom);ctx.translate(-camera.x,-camera.y);
 glow(cx,cy,radius*.95,red>.1?'113,41,20':'40,67,81',.11+red*.13);
 if(state.orbits&&formed>.02){ctx.lineWidth=.6;for(let i=0;i<planets.length;i++){
  const p=planets[i],lost=i<3?smooth(4.75,5.4,t):0;ctx.strokeStyle=`rgba(133,159,176,${(.18+(i===2?.08:0))*formed*(1-lost*.8)})`;
  ctx.beginPath();ctx.ellipse(cx,cy,orbitRadius(i),orbitRadius(i)*flatten,rotation,0,Math.PI*2);ctx.stroke();
 }}
 const disk=1-smooth(.8,2.8,t),nebula=1-smooth(0,.7,t);
 if(disk>.01){
  ctx.save();ctx.globalCompositeOperation='screen';
  const count=mobile?760:1200;
  for(let group=0;group<4;group++){ctx.beginPath();ctx.fillStyle=group<2?'rgba(210,156,103,.27)':'rgba(136,161,199,.18)';ctx.globalAlpha=disk;
   for(let k=group;k<count;k+=4){const q=particles[k],r=(.055+q.r*.95)*radius,a=q.a+clock*.025/(q.r+.2)+t*.6,pt=point(r,a,q.z*radius*.12*nebula),rr=q.size*scale*(1+nebula*1.4);ctx.moveTo(pt.x+rr,pt.y);ctx.arc(pt.x,pt.y,rr,0,6.284)}ctx.fill();
  }ctx.globalAlpha=1;
  for(let k=0;k<22;k++){const a=k*.7+clock*.007,pt=point(radius*(.2+k/30),a);glow(pt.x,pt.y,radius*(.09+nebula*.11),k%2?'123,81,62':'55,80,118',disk*.06)}
  ctx.restore();
 }
 // Surviving small-body belts; this is a schematic, not an ephemeris.
 if(formed>.05){ctx.save();ctx.globalAlpha=formed;ctx.translate(cx,cy);ctx.rotate(rotation);const size=radius*1024/440;ctx.drawImage(beltSprite,-size/2,-size/2,size,size);ctx.restore()}
 if(t>5.5){const neb=smooth(5.5,6.2,t)*(1-smooth(6.2,7,t)*.93);ctx.save();ctx.globalCompositeOperation='screen';for(let k=0;k<22;k++){
   const r=radius*(.18+(k/22)*.7)*(.8+smooth(5.5,7,t)*.3);ctx.strokeStyle=`rgba(${k<10?'104,189,182':'132,104,175'},${neb*.045})`;ctx.lineWidth=radius*.06;ctx.beginPath();ctx.ellipse(cx,cy,r,r*.64,rotation,0,6.284);ctx.stroke();
  }ctx.restore()}
 let sunR=mix(30,35,smooth(0,3,t))*scale*(.6+.4*smooth(0,.6,t));sunR=mix(sunR,116*scale,red);sunR=mix(sunR,6*scale,remnant);
 const sunColor=remnant>.6?'180,217,255':red>.2?'255,107,42':'255,171,54';
 glow(cx,cy,sunR*(remnant>.6?8:5.7),sunColor,remnant>.6?.36:.64);
 if(remnant<.6){ctx.drawImage(sunTexture,cx-sunR,cy-sunR,sunR*2,sunR*2);if(red>.01){ctx.save();ctx.globalCompositeOperation='source-atop';ctx.globalAlpha=red*.25;ctx.fillStyle='#ff5420';ctx.beginPath();ctx.arc(cx,cy,sunR*.97,0,6.284);ctx.fill();ctx.restore()}}
 else{const g=ctx.createRadialGradient(cx-sunR*.3,cy-sunR*.3,0,cx,cy,sunR);g.addColorStop(0,'#fff');g.addColorStop(.6,'#d8edff');g.addColorStop(1,'#7dabc9');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,sunR,0,6.284);ctx.fill()}
 if(state.labels){ctx.fillStyle='#e0c395';ctx.font=`${(mobile?10:12)/camera.zoom}px 'Noto Sans KR',sans-serif`;ctx.textAlign='center';ctx.fillText(t<.65?'원시 태양':t>6.3?'백색왜성':'태양',cx,cy+sunR+21*scale/camera.zoom)}
 const planetAlpha=smooth(.6,1.7,t);
 for(const b of bodies){const {p,i,x,y}=b;let a=planetAlpha;
  if(i<2)a*=1-smooth(4.72+i*.08,5.02+i*.13,t);
  if(i===2)a*=1-smooth(7.5,7.65,year);
  if(a<.01)continue;
  let r=p.size*scale*(.52+.48*smooth(.6,2,t));ctx.save();ctx.globalAlpha=a;
  if(i===2&&t>2.7&&t<4.4)glow(x,y,r*2.1,'74,158,233',.25);
  if(i===5){ctx.globalAlpha=a*(year>0?1-smooth(0,.6,year):event.effect==='rings'?.25+.75*progress:1);ctx.strokeStyle='rgba(190,175,145,.52)';ctx.lineWidth=r*.55;ctx.beginPath();ctx.ellipse(x,y,r*1.87,r*.50,-.34,0,6.284);ctx.stroke();ctx.strokeStyle='rgba(88,86,80,.8)';ctx.lineWidth=r*.07;ctx.beginPath();ctx.ellipse(x,y,r*1.77,r*.48,-.34,0,6.284);ctx.stroke()}
  ctx.globalAlpha=a;
  let surface=textures[i];if(i===2){if(year<-4.4)surface=moltenEarth;else if(year<-.72)surface=oceanEarth;else if((year>=-.717&&year<-.66)||(year>=-.65&&year<-.635))surface=iceEarth;}if(i===3&&event.effect==='wet-mars')surface=wetMars;ctx.drawImage(surface,x-r,y-r,2*r,2*r);
  if(i===2&&eventAlpha>0)drawEarthEffect(event,x,y,r,progress,eventAlpha);
  if(i===5){ctx.globalAlpha=a*(year>0?1-smooth(0,.6,year):event.effect==='rings'?.25+.75*progress:1);ctx.strokeStyle='rgba(204,188,153,.65)';ctx.lineWidth=r*.30;ctx.beginPath();ctx.ellipse(x,y,r*1.93,r*.52,-.34,0,Math.PI);ctx.stroke()}
  ctx.globalAlpha=a;
  if(i===2&&year>=-4.5&&year<7.5){const impact=event.effect==='impact'?(1-progress*.65)*eventAlpha:0;if(impact>.01){glow(x+r*.6,y,r*(3+impact),'255,133,57',impact*.72);for(let k=0;k<28;k++){const q=particles[k],aa=q.a+clock*.25,rr=r*(1.5+q.r*4)*impact;ctx.fillStyle=`rgba(250,172,94,${impact*.7})`;ctx.fillRect(x+Math.cos(aa)*rr,y+Math.sin(aa)*rr*.6,1.5,1.5)}}const ma=clock*.3+1.7,mx=x+Math.cos(ma)*r*2.1,my=y+Math.sin(ma)*r*1.4;ctx.fillStyle='#c0c2be';ctx.beginPath();ctx.arc(mx,my,Math.max(1.5,r*.22),0,6.284);ctx.fill();if(event.effect==='hot-moon')glow(mx,my,r*.85,'236,146,75',eventAlpha*.6)}
  ctx.save();ctx.globalAlpha*=eventAlpha;drawEventEffect(event,i,x,y,r,clock,progress,scale);ctx.restore();
  if(state.labels&&a>.35){const offset=i===5?r*2.2:r+9;ctx.strokeStyle='rgba(164,190,200,.3)';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(x+offset,y+3);ctx.lineTo(x+offset+10*scale,y+13*scale);ctx.stroke();ctx.textAlign='left';ctx.font=`${(mobile?10:12)/camera.zoom}px 'Noto Sans KR',sans-serif`;ctx.fillStyle=i===2?'#c5eddf':'#9baeb8';let tx=x+offset+14*scale,ty=y+17*scale;if(tx>W-50){tx=x-r-32;ty=y+r+20}ctx.fillText(p.name,tx,ty)}
  ctx.restore();
 }
 const moonEvent=state.focusOverride==='moon'||(state.focusOverride===null&&['magma-moon','lunar-crust','lunar-maria'].includes(event.id));
 const focus=activeFocus>=0&&targetExists?{x:target.x,y:target.y}:{x:cx,y:cy};
 if(moonEvent&&targetExists){const r=target.p.size*scale;focus.x+=Math.cos(clock*.3+1.7)*r*2.1;focus.y+=Math.sin(clock*.3+1.7)*r*1.4}
 const stellar=state.focusOverride==='sun'||(activeFocus<0&&!['cloud','grains','disk-clears','present'].includes(event.id));
 if((activeFocus>=0&&targetExists)||stellar){ctx.save();ctx.globalAlpha=eventAlpha;ctx.strokeStyle='rgba(191,232,206,.5)';ctx.lineWidth=.8;ctx.setLineDash([3,5]);ctx.beginPath();ctx.arc(focus.x,focus.y,(moonEvent?4*scale:stellar?sunR:target.p.size*scale)+12/camera.zoom,0,Math.PI*2);ctx.stroke();ctx.restore();
  const focusScreen=screenPoint(focus),padding=state.follow?(stellar?sunR:moonEvent?4*scale:target.p.size*scale)*camera.zoom+18:30*scale;
  ui.focusCaption.style.transform=`translate3d(${clamp(focusScreen.x+padding,16,W-(mobile?170:250))}px,${clamp(focusScreen.y-padding,270,H-(mobile?625:320))}px,0)`;ui.focusCaption.classList.add('visible');ui.focusCaption.style.opacity=eventAlpha;
 }else {ui.focusCaption.classList.remove('visible');ui.focusCaption.style.opacity=0;}
 if(event.effect==='comets'||event.effect==='bombardment'){ctx.save();ctx.globalAlpha=eventAlpha;ctx.strokeStyle=event.effect==='comets'?'rgba(145,201,226,.4)':'rgba(235,174,111,.5)';ctx.lineWidth=1;for(let k=0;k<18;k++){const q=particles[k],a=q.a+clock*.07,rr=radius*(.18+q.r*.85),p1=point(rr,a),p2=point(rr*(event.effect==='comets'?1.11:.91),a+.015);ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.stroke()}ctx.restore()}
 ctx.restore();
}
function drawEarthEffect(event,x,y,r,progress,alpha){
 const fx=event.effect;if(!['ocean-life','snowball','thaw','chicxulub'].includes(fx))return;
 ctx.save();ctx.globalAlpha*=alpha;
 if(fx==='snowball'||fx==='thaw'){
  const ice=fx==='thaw'?1-smooth(0,.8,progress):.8;
  ctx.globalAlpha*=ice;ctx.drawImage(iceEarth,x-r,y-r,r*2,r*2);ctx.globalAlpha=alpha;
  glow(x,y,r*2.7,'145,215,240',.25*ice);
 }
 if(fx==='ocean-life'){
  glow(x,y,r*2.6,'69,177,202',.32);ctx.strokeStyle='rgba(124,235,193,.65)';ctx.lineWidth=.6;
  for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(x,y,r*(1.2+k*.27+progress*.15),0,Math.PI*2);ctx.stroke()}
 }
 if(fx==='chicxulub'){
  const phase=smooth(0,.55,progress),px=x+r*.35,py=y-r*.3;
  ctx.strokeStyle='rgba(240,185,119,.7)';ctx.lineWidth=r*.09;ctx.beginPath();ctx.moveTo(px+r*2*(1-phase),py-r*2*(1-phase));ctx.lineTo(px+r*3.8*(1-phase),py-r*3.8*(1-phase));ctx.stroke();
  glow(px,py,r*(1+2*phase),'255,181,89',.6*(1-smooth(.5,1,progress)));
  ctx.strokeStyle=`rgba(223,175,120,${.6*(1-progress)})`;ctx.lineWidth=r*.12;ctx.beginPath();ctx.arc(px,py,r*(.2+phase*1.8),0,Math.PI*2);ctx.stroke();
 }
 ctx.restore();
}
function drawEventEffect(event,i,x,y,r,clock,progress,scale){
 if(event.focus!==i)return;
 const fx=event.effect;
 if(['wet-mars','venus','accretion'].includes(fx))glow(x,y,r*4,fx==='wet-mars'?'86,169,223':'236,146,75',.32);
 if(fx==='atmosphere-loss'){ctx.save();ctx.strokeStyle='rgba(115,192,232,.45)';for(let k=0;k<9;k++){const phase=(clock*.15+k/9)%1;ctx.beginPath();ctx.moveTo(x+r,y+(k-4)*r*.3);ctx.lineTo(x+r+phase*r*7,y+(k-4)*r*.7);ctx.stroke()}ctx.restore()}
 if(fx==='phobos'){ctx.save();ctx.strokeStyle='rgba(202,179,157,.7)';ctx.lineWidth=2*scale;ctx.beginPath();ctx.ellipse(x,y,r*2.4,r*.6,-.2,0,Math.PI*2);ctx.stroke();ctx.restore()}
 if(fx==='tilt'){ctx.save();ctx.translate(x,y);ctx.rotate(1.71);ctx.strokeStyle='#bfe8ceaa';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-r*2.2);ctx.lineTo(0,r*2.2);ctx.stroke();ctx.restore()}
 if(fx==='migration'||fx==='outer-migration'){ctx.save();ctx.strokeStyle='rgba(191,232,206,.6)';ctx.lineWidth=1;ctx.setLineDash([4,4]);const direction=fx==='migration'&&progress<.5?-1:1;ctx.beginPath();ctx.moveTo(x,y-r-9);ctx.lineTo(x+direction*46*scale,y-r-9);ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.moveTo(x+direction*38*scale,y-r-14);ctx.lineTo(x+direction*46*scale,y-r-9);ctx.lineTo(x+direction*38*scale,y-r-4);ctx.stroke();ctx.restore()}
}
setTime(timeForYear(0));syncUI();requestAnimationFrame(draw);
