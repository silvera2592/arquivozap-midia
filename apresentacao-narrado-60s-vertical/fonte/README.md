# Apresentação ArquivoZap — 60s narrado — 9:16

`../01-apresentacao-9x16.mp4` — 1080×1920, 30 fps, 60 s, H.264 + AAC.

Versão retrato da apresentação narrada de 60 s. O áudio é o original, sem
reprocessamento; os 12 slides foram redesenhados em 1080×1920 e remontados nos
mesmos pontos de corte do vídeo 16:9, quadro a quadro:

| slide | entra em | duração |
|-------|----------|---------|
| 01 capa                  | 0,000 s  | 5,267 s |
| 02 guia de início        | 5,267 s  | 3,200 s |
| 03 passo 1               | 8,467 s  | 3,800 s |
| 04 passo 2               | 12,267 s | 6,933 s |
| 05 passo 3               | 19,200 s | 9,000 s |
| 06 nos bastidores        | 28,200 s | 7,567 s |
| 07 no dia a dia          | 35,767 s | 3,767 s |
| 08 sem susto             | 39,533 s | 4,067 s |
| 09 bônus                 | 43,600 s | 3,933 s |
| 10 vá além               | 47,533 s | 5,433 s |
| 11 se travar             | 52,967 s | 3,000 s |
| 12 final                 | 55,967 s | 4,033 s |

## Como regerar

Os slides são HTML (`deck.html`), com Poppins e Inter embutidas como `.woff2`
locais — nada é buscado na rede na hora de renderizar.

```sh
# 1. exporta os 12 PNG 1080×1920 (precisa de playwright + chromium)
node render.mjs <pasta-de-trabalho>     # espera <pasta>/build/deck.html, grava em <pasta>/out

# 2. remonta o vídeo com o áudio do original
ffmpeg -f concat -safe 0 -i concat.txt -i <original-16x9.mp4> \
  -map 0:v -map 1:a -c:a copy \
  -vf "fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 20 \
  -profile:v high -level 4.0 -movflags +faststart -t 60 \
  01-apresentacao-9x16.mp4
```

`concat.txt` já traz as durações de cada slide em segundos.
