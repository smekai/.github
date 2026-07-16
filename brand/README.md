# smek.ai brand mark

Comic-book **SMEK AI** impact burst for the [`smekai`](https://github.com/smekai) GitHub org.

Yellow `SMEK` in front, white `AI` clipped inside the red burst, blue field.

## Palette

| Token | Hex | Use |
|---|---|---|
| Comic blue | `#1E90FF` | Field |
| Comic red | `#E22B2B` | Burst |
| Deep red | `#9B1515` | Halftone on red |
| Comic yellow | `#FFE135` | SMEK wordmark |
| White | `#FFFFFF` | AI wordmark |
| Ink black | `#0A0A0A` | Outlines + offset shadow |

## Files

| File | Use |
|---|---|
| [`master/smek-burst.svg`](master/smek-burst.svg) | Source lockup |
| [`exports/org-avatar.png`](exports/org-avatar.png) | GitHub org profile picture (512) |

## Regenerate exports

```bash
npm install --prefix brand
npm run rasterize --prefix brand
```

Also writes `avatar-512/256/128.png` and favicons into `exports/` (not committed; rebuild when needed).

## GitHub org avatar

Upload [`exports/org-avatar.png`](exports/org-avatar.png) under
[github.com/organizations/smekai/settings/profile](https://github.com/organizations/smekai/settings/profile).
