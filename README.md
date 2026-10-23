# Tejal Ganvir – Portfolio (v2, animated)

A dark, animated personal portfolio built with **React 18, TypeScript, Vite and Framer Motion**.

What moves on the page:

- Aurora gradient background, a faint grid and a particle "constellation" that drifts away from your cursor
- Name that flips in letter by letter, and a typewriter that cycles through your roles
- Photo inside a spinning gradient ring, with orbiting tech icons, a code card that types itself and floating stat badges, all with mouse parallax
- Scrolling tech ribbon, counters that count up, 3D tilt cards with a cursor spotlight, magnetic buttons
- An experience timeline that draws itself as you scroll, animated skill filters, a scroll progress bar and a light/dark switch

If someone has "reduce motion" switched on in their operating system, the animations are turned off for them automatically.

## Run it on your machine

### 1. Install Node.js (one time)

You need **Node.js 18 or newer** (the LTS version, 20 or 22, is recommended).

1. Download the **LTS** installer from https://nodejs.org and run it with the default options.
2. Open a terminal (Windows: **Command Prompt** or **PowerShell**; Mac: **Terminal**) and check:

   ```bash
   node -v
   npm -v
   ```

   Both should print a version number.

### 2. Unzip and open the folder

Unzip `tejal-ganvir-portfolio-v2.zip`, then open a terminal in that folder:

```bash
cd path/to/tejal-ganvir-portfolio-v2
```

Tip: in VS Code, use **File → Open Folder…**, then **Terminal → New Terminal**.

### 3. Install the dependencies (one time)

```bash
npm install
```

### 4. Start the site

```bash
npm run dev
```

Open the address it prints, usually **http://localhost:5173**. The page reloads automatically when you save a change. Press `Ctrl + C` to stop.

## Edit your content

All the text lives in **`src/data/profile.ts`**:

- `typedRoles`: the phrases the typewriter cycles through
- `stats`: the numbers that count up (keep them true to your CV)
- `services`, `caseStudies`, `experience`, `skills`, `marquee`: the sections of the page
- `phone`: deliberately empty so your number isn't public; fill it in to show it

To replace the photo or CV, put the new file in `public/` and update `photo` or `resumeFile`.

## Tone the animation up or down

- Background particles: `src/components/Background.tsx` (the `count` line sets how many)
- Colours and gradients: the variables at the top of `src/styles/global.css`
- Speed of the floating, spinning and drifting effects: the `animation` lines in `global.css` (larger seconds = slower)

## Build and publish

```bash
npm run build     # type-checks and builds into dist/
npm run preview   # check the built site locally
```

Free hosting:

- **Vercel**: push to GitHub, then import the repository at https://vercel.com/new
- **Netlify**: drag the `dist/` folder onto https://app.netlify.com/drop

## Troubleshooting

- **`npm` is not recognised:** reopen the terminal after installing Node.js.
- **Port already in use:** Vite picks another port; use the address it prints.
- **Errors after editing `profile.ts`:** look for a missing comma or quote near your change. `npm run build` shows the exact line.
