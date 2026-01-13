# 4 Gewinnt (Connect Four)

Ein modernes, responsives "4 Gewinnt" Spiel für den Browser, entwickelt mit React und Vite.

## Features

- **Spielmodi**:
  - **1 Spieler**: Treten Sie gegen eine Minimax-KI an.
  - **2 Spieler**: Spielen Sie lokal gegen einen Freund.
- **Design**:
  - Modernes UI mit flüssigen Animationen (Drop Bounce, Winning Pulse).
  - 100% Responsive: Optimiert für Desktop, Tablet und Mobile (Portrait & Landscape ohne Scrollen).
  - Visuelles Feedback durch Highlight der gewinnenden Steine.
- **Audio**: Synthetische Soundeffekte für Spielzüge und Siege (keine externen Assets nötig).
- **Tech Stack**: React, Vite, CSS Modules / Variables.

## Installation & Entwicklung

Voraussetzung: Node.js installiert.

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd 4gewinnt
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Dev-Server starten**
   ```bash
   npm run dev
   ```
   Die App ist unter `http://localhost:5173` erreichbar.

## Deployment (FTP)

Das Projekt beinhaltet ein integriertes Deployment-Script für FTP.

1. **Konfiguration**
   Erstellen Sie eine `.env` Datei basierend auf `.env.example`:
   ```ini
   FTP_HOST=hr-server.com
   FTP_USER=username
   FTP_PASSWORD=secret
   FTP_SECURE=false # oder true für FTPS / SFTP
   FTP_TLS_MIN_VERSION=TLSv1.2 # Optional, falls Secure Verbindung TLS erfordert
   FTP_REMOTE_DIR=/public_html/4gewinnt
   ```

2. **Deployen**
   ```bash
   npm run deploy
   ```
   Dieser Befehl baut das Projekt (`npm run build`) und lädt den `dist`-Ordner automatisch auf den Server hoch.

## Lizenz

MIT
