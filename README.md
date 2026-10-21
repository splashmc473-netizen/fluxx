# Fluxx Code — Site + Admin + PWA

Site profissional + painel administrativo completo para agência de criação de sites.

## 📁 Estrutura

```
fluxxcode/
├── index.html          → site público
├── admin.html          → painel administrativo
├── manifest.json       → PWA
├── sw.js               → Service Worker
├── README.md
├── css/
│   ├── style.css
│   └── admin.css
├── js/
│   ├── data.js         → dados + persistência
│   ├── app.js          → lógica do site
│   └── admin.js        → lógica do painel
└── icons/
    ├── icon.svg
    └── icon-maskable.svg
```

## 🚀 Como usar

1. Crie a pasta `fluxxcode/` com as subpastas
2. Cole cada arquivo no lugar certo
3. Abra `index.html` no navegador
4. Painel admin: `admin.html` (ou link no rodapé)
5. **Senha padrão: `fluxx123`** — troque em Configurações

> Para PWA completo, rode um servidor local:
> ```bash
> npx serve .
> ```

## 🎛 Painel Administrativo

- **Dashboard** — visão geral de leads
- **Leads** — mensagens do formulário com status
- **Serviços** — CRUD com ícone, nome, descrição e preço
- **Portfólio** — CRUD de projetos
- **Depoimentos** — CRUD de avaliações
- **Configurações** — marca, contato, redes, senha, stats, tecnologias
- **Exportar/Importar** — backup JSON

## 🌐 Publicar grátis

- **Netlify:** arraste a pasta em netlify.com
- **Vercel:** idem em vercel.com
- **GitHub Pages:** suba num repositório e ative em Settings → Pages

## 🔐 Segurança

A senha do admin é **proteção visual** (front-end puro). Para produção real, use Supabase Auth ou backend próprio.

## 🎨 Paleta

- Fundo: `#061224`
- Ciano: `#22D3EE`
- Azul: `#1E5EFF`
- Texto: `#F0F6FF`

## 📄 Licença

Uso livre.