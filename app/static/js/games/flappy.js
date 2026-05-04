(() => {
  const c=document.getElementById('flappy'), x=c.getContext('2d');
  const W=c.width,H=c.height, G=0.45, JUMP=-7.5, GAP=130, PIPE_W=55, SPEED=2.2;
  let bird, pipes, score, dead, frame, awarded;
  const sc=document.getElementById('flap-score');
  function reset(){bird={y:H/2,v:0,x:80}; pipes=[]; score=0; dead=false; frame=0; awarded=0; sc.textContent=0;}
  function jump(){ if(dead){reset(); return;} bird.v=JUMP; }
  function step(){
    if(!dead){
      bird.v+=G; bird.y+=bird.v; frame++;
      if(frame%90===0){ const top = 50+Math.random()*(H-GAP-150); pipes.push({x:W,top,scored:false}); }
      pipes.forEach(p=>p.x-=SPEED);
      pipes=pipes.filter(p=>p.x+PIPE_W>0);
      pipes.forEach(p=>{
        if(!p.scored && p.x+PIPE_W<bird.x){ p.scored=true; score++; sc.textContent=score; }
        if(bird.x+15>p.x && bird.x-15<p.x+PIPE_W && (bird.y-15<p.top||bird.y+15>p.top+GAP)) dead=true;
      });
      if(bird.y>H-15||bird.y<15) dead=true;
      if(dead && !awarded){ awarded=1; awardPoints('flappy', score*2); }
    }
    draw();
  }
  function draw(){
    x.fillStyle='#04040f'; x.fillRect(0,0,W,H);
    pipes.forEach(p=>{
      x.fillStyle='#bfff00';
      x.fillRect(p.x,0,PIPE_W,p.top);
      x.fillRect(p.x,p.top+GAP,PIPE_W,H-p.top-GAP);
    });
    x.fillStyle='#ffe600'; x.beginPath(); x.arc(bird.x,bird.y,15,0,Math.PI*2); x.fill();
    x.fillStyle='#000'; x.beginPath(); x.arc(bird.x+5,bird.y-3,3,0,Math.PI*2); x.fill();
    if(dead){ x.fillStyle='rgba(0,0,0,.7)'; x.fillRect(0,0,W,H);
      x.fillStyle='#ff2bd6'; x.font='bold 26px Orbitron'; x.textAlign='center';
      x.fillText("O'YIN TUGADI", W/2, H/2-10);
      x.fillStyle='#fff'; x.font='14px Rubik'; x.fillText('Bosing — qaytadan', W/2, H/2+20);}
  }
  document.addEventListener('keydown', e=>{ if(e.code==='Space'){e.preventDefault(); jump();}});
  c.addEventListener('click', jump);
  reset(); setInterval(step, 1000/60);
})();
