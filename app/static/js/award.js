// Backendga ball yuborish — barcha o'yinlar foydalanadi
async function awardPoints(game, points) {
  try {
    const r = await fetch('/games/api/award', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({game, points})
    });
    const data = await r.json();
    if (data.ok) {
      // Headerdagi ball indikatorini yangilash
      const badges = document.querySelectorAll('header .font-display.font-bold');
      badges.forEach(b => { if (!isNaN(parseInt(b.textContent))) b.textContent = data.points; });
      return data;
    }
  } catch(e) { console.error(e); }
  return null;
}
