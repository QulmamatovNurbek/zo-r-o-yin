(() => {
  const c = document.getElementById('snake'), x = c.getContext('2d');
  const G = 20, N = 20; let snake, dir, food, score, dead, timer;
  const scoreEl = document.getElementById('snake-score');
  function reset(){ snake=[{x:10,y:10}]; dir={x:1,y:0}; food=spawn(); score=0; dead=false; scoreEl.textContent=0; }
  function spawn(){ while(true){const f={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)};
    if(!snake.some(s=>s.x===f.x&&s.y===f.y)) return f;} }
  function step(){
    if(dead) return;
    const h={x:snake[0].x+dir.x, y:snake[0].y+dir.y};
    if(h.x<0||h.x>=N||h.y<0||h.y>=N||snake.some(s=>s.x===h.x&&s.y===h.y)){
      dead=true; awardPoints('snake', score); draw(); return;
    }
    snake.unshift(h);
    if(h.x===food.x&&h.y===food.y){ score++; scoreEl.textContent=score; food=spawn(); }
    else snake.pop();
    draw();
  }
  function draw(){
    x.fillStyle='#04040f'; x.fillRect(0,0,c.width,c.height);
    x.fillStyle='#ff2bd6'; x.fillRect(food.x*G+2,food.y*G+2,G-4,G-4);
    snake.forEach((s,i)=>{ x.fillStyle = i===0?'#00f0ff':'#7c3aed'; x.fillRect(s.x*G+1,s.y*G+1,G-2,G-2); });
    if(dead){ x.fillStyle='rgba(0,0,0,.7)'; x.fillRect(0,0,c.width,c.height);
      x.fillStyle='#ff2bd6'; x.font='bold 28px Orbitron'; x.textAlign='center';
      x.fillText("O'YIN TUGADI", c.width/2, c.height/2-10);
      x.fillStyle='#fff'; x.font='16px Rubik'; x.fillText("Ball: "+score, c.width/2, c.height/2+20); }
  }
  document.addEventListener('keydown', e=>{
    const k=e.key.toLowerCase();
    if((k==='arrowup'||k==='w')&&dir.y!==1) dir={x:0,y:-1};
    else if((k==='arrowdown'||k==='s')&&dir.y!==-1) dir={x:0,y:1};
    else if((k==='arrowleft'||k==='a')&&dir.x!==1) dir={x:-1,y:0};
    else if((k==='arrowright'||k==='d')&&dir.x!==-1) dir={x:1,y:0};
  });
  document.getElementById('snake-restart').onclick=()=>{reset(); draw();};
  reset(); draw();
  timer=setInterval(step,110);
})();
