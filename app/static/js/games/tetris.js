(() => {
  const c=document.getElementById('tetris'), x=c.getContext('2d');
  const COLS=10, ROWS=20, S=24;
  const SHAPES=[
    [[1,1,1,1]],
    [[1,1],[1,1]],
    [[0,1,0],[1,1,1]],
    [[1,0,0],[1,1,1]],
    [[0,0,1],[1,1,1]],
    [[1,1,0],[0,1,1]],
    [[0,1,1],[1,1,0]],
  ];
  const COLORS=['#00f0ff','#ffe600','#7c3aed','#ff2bd6','#bfff00','#ff8c00','#22d3ee'];
  let grid, piece, score, dead, dropTimer, awarded;
  const sc=document.getElementById('tetris-score');
  function newPiece(){ const i=Math.floor(Math.random()*SHAPES.length);
    return {s:SHAPES[i].map(r=>[...r]), c:COLORS[i], x:3, y:0}; }
  function reset(){ grid=Array.from({length:ROWS},()=>Array(COLS).fill(0)); piece=newPiece(); score=0; dead=false; awarded=0; sc.textContent=0; }
  function collide(p){ for(let r=0;r<p.s.length;r++) for(let c2=0;c2<p.s[r].length;c2++){
    if(!p.s[r][c2]) continue; const nx=p.x+c2, ny=p.y+r;
    if(nx<0||nx>=COLS||ny>=ROWS) return true; if(ny>=0 && grid[ny][nx]) return true;} return false; }
  function merge(){ piece.s.forEach((r,i)=>r.forEach((v,j)=>{ if(v && piece.y+i>=0) grid[piece.y+i][piece.x+j]=piece.c; })); }
  function clear(){ let lines=0; for(let r=ROWS-1;r>=0;r--){
    if(grid[r].every(v=>v)){ grid.splice(r,1); grid.unshift(Array(COLS).fill(0)); lines++; r++; } }
    if(lines){ score+=lines*10; sc.textContent=score; awardPoints('tetris', lines*10); }
  }
  function rotate(){ const ns=piece.s[0].map((_,i)=>piece.s.map(r=>r[i]).reverse());
    const old=piece.s; piece.s=ns; if(collide(piece)) piece.s=old; }
  function drop(){ piece.y++; if(collide(piece)){ piece.y--; merge(); clear(); piece=newPiece();
    if(collide(piece)){ dead=true; if(!awarded){awarded=1;} } } }
  function draw(){
    x.fillStyle='#04040f'; x.fillRect(0,0,c.width,c.height);
    for(let r=0;r<ROWS;r++) for(let c2=0;c2<COLS;c2++) if(grid[r][c2]){
      x.fillStyle=grid[r][c2]; x.fillRect(c2*S+1,r*S+1,S-2,S-2); }
    if(piece) piece.s.forEach((r,i)=>r.forEach((v,j)=>{ if(v){
      x.fillStyle=piece.c; x.fillRect((piece.x+j)*S+1,(piece.y+i)*S+1,S-2,S-2); }}));
    if(dead){ x.fillStyle='rgba(0,0,0,.75)'; x.fillRect(0,0,c.width,c.height);
      x.fillStyle='#ff2bd6'; x.font='bold 22px Orbitron'; x.textAlign='center';
      x.fillText("TUGADI", c.width/2, c.height/2);
      x.fillStyle='#fff'; x.font='14px Rubik'; x.fillText('Ball: '+score, c.width/2, c.height/2+25);}
  }
  document.addEventListener('keydown', e=>{
    if(dead) return;
    if(e.key==='ArrowLeft'){piece.x--; if(collide(piece)) piece.x++;}
    else if(e.key==='ArrowRight'){piece.x++; if(collide(piece)) piece.x--;}
    else if(e.key==='ArrowDown'){drop();}
    else if(e.key==='ArrowUp'){rotate();}
  });
  reset();
  setInterval(()=>{ if(!dead) drop(); draw(); }, 450);
  setInterval(draw, 50);
})();
