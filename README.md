# ZorO'yin 🎮

Uzbek tilidagi onlayn o'yinlar arenasi. Flask + SQLAlchemy + Tailwind + HTMX + Alpine.js.

## Ishga tushirish

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Brauzerda oching: http://localhost:5000

## PostgreSQL ga o'tish
`DATABASE_URL` muhit o'zgaruvchisini o'rnating:
```
export DATABASE_URL="postgresql://user:pass@host:5432/zoroyin"
```

## Ball tizimi
- Bepul o'yinlar — darhol ochiq
- 300 ball → Ilon, Flappy Qush ochiladi
- 800 ball → Tetris, Pong ochiladi

Zavqlaning! 🚀
