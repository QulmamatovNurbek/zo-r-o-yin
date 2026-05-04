(() => {
  const c=document.getElementById('pong'), x=c.getContext('2d');
  const W=c.width, H=c.height, PH=70, PW=10;
  let p1y=H/2-PH/2, p2y=H/2-PH/2, ball, s1=0, s2=0, ended=false;
  const e1=document.getElementById('p1'), e2=document.getElementById('p2');
  function resetBall(toLeft){ ball={x:W/2,y:H/2,vx:(toLeft?-4:4),vy:(Math.random()*4-2)}; }
  resetBall(Math.random()<.5);
  const keys={};
  document.addEventListener('keydown', e=>keys[e.key]=true);
  document.addEventListener('keyup', e=>keys[e.key]=false);
  c.addEventListener('mousemove', e=>{ const r=c.getBoundingClientRect(); p1y=e.clientY-r.top-PH/2; });
  function step(){
    if(ended) return;
    if(keys['ArrowUp']) p1y-=6; if(keys['ArrowDown']) p1y+=6;
    p1y=Math.max(0,Math.min(H-PH,p1y));
    // Bot AI
    const target=ball.y-PH/2; p2y += Math.sign(target-p2y)*Math.min(4.5, Math.abs(target-p2y));
    p2y=Math.max(0,Math.min(H-PH,p2y));
    ball.x+=ball.vx; ball.y+=ball.vy;
    if(ball.y<0||ball.y>H){ ball.vy*=-1; }
    if(ball.x<PW+10 && ball.y>p1y && ball.y<p1y+PH){ ball.vx=Math.abs(ball.vx)*1.05; ball.vy+=(ball.y-(p1y+PH/2))*0.08; }
    if(ball.x>W-PW-10 && ball.y>p2y && ball.y<p2y+PH){ ball.vx=-Math.abs(ball.vx)*1.05; ball.vy+=(ball.y-(p2y+PH/2))*0.08; }
    if(ball.x<0){ s2++; e2.textContent=s2; resetBall(false); }
    if(ball.x>W){ s1++; e1.textContent=s1; resetBall(true); }
    if(s1>=5||s2>=5){ ended=true; if(s1>s2) awardPoints('pong',30); }
    draw();
  }
  function draw(){
    x.fillStyle='#04040f'; x.fillRect(0,0,W,H);
    x.strokeStyle='rgba(255,255,255,.15)'; x.setLineDash([6,8]);
    x.beginPath(); x.moveTo(W/2,0); x.lineTo(W/2,H); x.stroke(); x.setLineDash([]);
    x.fillStyle='#00f0ff'; x.fillRect(8,p1y,PW,PH);
    x.fillStyle='#ff2bd6'; x.fillRect(W-PW-8,p2y,PW,PH);
    x.fillStyle='#fff'; x.beginPath(); x.arc(ball.x,ball.y,7,0,Math.PI*2); x.fill();
    if(ended){ x.fillStyle='rgba(0,0,0,.75)'; x.fillRect(0,0,W,H);
      x.fillStyle = s1>s2?'#bfff00':'#ff2bd6'; x.font='bold 32px Orbitron'; x.textAlign='center';
      x.fillText(s1>s2?'YUTDING! +30':'YUTQAZDING', W/2, H/2);}
  }
  setInterval(step, 1000/60);
})();
