<div align="center">

# 🚿 Rodízio de Lavagem

**Organize a lavagem de roupas do prédio e economize água — um apartamento por dia.**

Real-time • Mobile-first • Deploy em Firebase

</div>

---

## 🧊 A motivação

Minha região enfrenta um período de **falta de água**, e com isso surgiu um problema real do dia a dia do pessoal do prédio: se muitos apartamentos ligam a máquina de lavar no mesmo dia, a pressão cai, o abastecimento se alonga e todo mundo sofre com as consequências.

Para resolver isso, desenvolvi esse app de **rodízio de lavagem**: cada apartamento marca o dia em que vai lavar roupa, garantindo que **apenas um morador lave por dia**. Assim a água é usada de forma consciente, organizada e sem brigas entre vizinhos.

---

## ✨ O que o app faz

- 🗓️ **Janela rolante de 14 dias** — começa hoje e desliza sozinha conforme os dias passam
- 🎠 **Carrossel horizontal responsivo** — navegue pelos dias com setas, no desktop ou no celular
- ⚡ **Tempo real** — atualizações instantâneas via `onSnapshot` do Firestore (sem precisar de F5)
- 🔒 **Permissão por sessão** — cada morador só pode excluir o agendamento que ele mesmo criou
- 📱 **Mobile-first** — formulário em modal, pensado para uso no celular

---

## 🛠️ Tecnologias

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

</div>

- **Frontend:** React 19 + TypeScript
- **Build:** Vite + Oxlint
- **Estilo:** Tailwind CSS 4 (`@tailwindcss/vite`)
- **Backend (BaaS):** Firebase Firestore (dados em tempo real) + Firebase Auth (sessão anônima)

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js (v18+)
- Um projeto no [Firebase](https://console.firebase.google.com) com **Cloud Firestore** e **Authentication (Anônimo)** habilitados

### Passos

```bash
# 1. Instale as dependências
npm install

# 2. Crie o arquivo de ambiente a partir do exemplo
cp .env.local.example .env.local
```

Preencha o `.env.local` com as credenciais do seu projeto Firebase:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

```bash
# 3. Rode em desenvolvimento
npm run dev
```

Abra `http://localhost:5173` no navegador.

---

## 📦 Deploy (Firebase Hosting)

```bash
# 1. Gera a build de produção em ./dist
npm run build

# 2. Configure o hosting (public dir: dist, SPA: yes)
firebase init hosting

# 3. Faça o deploy
firebase deploy --only hosting
```

O Firebase devolve uma URL pública no formato `seu-app.web.app`. Para atualizar depois, basta repetir o `npm run build` + `firebase deploy --only hosting`.

---

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── DayList.tsx       # Carrossel horizontal de dias (navegação + estado do form)
│   ├── DayCard.tsx       # Card de um dia (ocupado/livre) + modal de reserva
│   └── BookingForm.tsx   # Formulário de marcação de horário
├── hooks/
│   └── useBookings.ts    # Dados em tempo real (Firestore) + exclusão por sessão
├── types/
│   └── booking.ts        # Tipo Booking (date, apartment, name, createdBy)
├── utils/
│   └── dates.ts          # Janela de 14 dias + formatação segura de data
├── firebase.ts           # Inicialização do Firebase
└── App.tsx               # Raiz do app
```

---

## 📜 Scripts

| Comando           | Descrição                          |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento        |
| `npm run build`   | Compila (TS + Vite) para produção  |
| `npm run lint`    | Lint com Oxlint                    |
| `npm run preview` | Previsualiza a build de produção   |

---

<div align="center">

Feito para ajudar o dia a dia do pessoal do prédio.

</div>
