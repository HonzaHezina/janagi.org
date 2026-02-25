# janAGI — AI bez magie. S kontrolou.

Statický web projektu **janAGI**, který vysvětluje přístup „AI orchestrace místo black-box magie“ pro byznys i technické publikum.

## Positioning v jedné větě

**AI rozhoduje, workflow provádí, audit ukládá.**

## Co je nové na webu

- Nová sekce **„Magie vs provoz“**: proč demo logika nestačí pro produkční provoz.
- Jasné rozlišení cest **SaaS vs Open Source** v sekci publika.
- Hero message: **„AI bez magie. S kontrolou.“**

## SaaS vs Open Source

- **SaaS (pro firmy):** rychlý pilot, jasná odpovědnost, metriky dopadu, governance-ready provoz.
- **Open Source (pro techniky):** vendor-neutral stack, modulární rozšiřování, GitHub-first spolupráce.

## Lokální spuštění

Stačí otevřít `index.html` v prohlížeči.

Pro lokální server:

```bash
python -m http.server 8000
```

A potom otevřít `http://localhost:8000`.

## Deploy poznámka (Coolify / Nginx)

Po pushi změn:

1. spusťte **Redeploy** v Coolify,
2. bumpněte verzi CSS v `index.html` (např. `styles.css?v=20260225`), aby se změny propsaly bez cache problému.

## Struktura

- `index.html` — obsah a sekce webu
- `styles.css` — vzhled a layout
- `script.js` — interakce (animace, UI chování)

---

janAGI: workflow-first AI pro reálný provoz.
