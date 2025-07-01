# 💖 Love Website

A romantic, interactive web app built with React, TypeScript, Vite, styled-components, GSAP, and AOS. This project is a multi-step, playful, and heartfelt experience designed to surprise and delight your special someone.

---

## 🌹 Features & Flow

### 1. **Landing Page**

- Animated floating hearts background
- Welcome message with typing effect
- Asks for her name (stored in localStorage and used throughout the site)

### 2. **Do You Love Me? Page**

- Two playful buttons: "Yes" and "Yes" (no escape!)
- Buttons move or disable if she tries to avoid answering

### 3. **Drag & Drop Heart Game**

- Drag a heart into a glowing box
- Success message: "You just gave me your heart 💝"

### 4. **Unlock Message (Click & Hold)**

- Click and hold a glowing heart for 3 seconds
- Secret love message is revealed with a letter-by-letter typing animation
- If the message overflows, it auto-scrolls until complete, then allows manual scrolling

### 5. **Photo Gallery**

- Neon, glowing grid background (DJ/art room vibe)
- Animated "Our Photo Gallery" button
- On click, your photos flow across the screen one-by-one with a wavy, glowing, infinite animation (no overlap, slow, less glow)

---

## ✨ Tech Stack

- **React** (with Vite & TypeScript)
- **styled-components** for styling
- **GSAP** & **AOS** for animations
- **Dynamic image import** with Vite's `import.meta.glob`

---

## 🚀 Setup & Usage

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/love-website.git
   cd love-website
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Customization

- Add your own images to `src/image/` for the gallery
- Edit the secret message in `UnlockMessagePage.tsx`
- Change colors, fonts, or animations in the styled-components as you wish

---

## ❤️ Credits & Inspiration

- [GSAP](https://greensock.com/gsap/), [AOS](https://michalsnik.github.io/aos/), [Google Fonts](https://fonts.google.com/)
- Inspired by love, creativity, and the joy of surprising someone special!

---

## 📦 Project Structure

- `src/pages/` – All main pages (Landing, Love, Game, Unlock, Gallery)
- `src/components/` – Reusable UI components
- `src/image/` – Your photo gallery images
- `src/styles/` – Shared styled-components

---

## 📝 License

This project is for personal, non-commercial, and romantic use only. Spread love, not code! 💌
