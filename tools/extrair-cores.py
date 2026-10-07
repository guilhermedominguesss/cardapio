"""
Extrai as cores reais da logo (img/logo.png) para usar no style.css.

Uso (precisa de Python 3 + Pillow):
    pip install pillow
    python tools/extrair-cores.py

Copie o bloco :root impresso no final para o topo do style.css
(e o valor de --bg-logo também para <meta name="theme-color"> no index.html).
"""
from collections import Counter
from pathlib import Path
import colorsys
import sys

from PIL import Image

LOGO = Path(__file__).resolve().parent.parent / "img" / "logo.png"


def hexa(rgb):
    return "#{:02X}{:02X}{:02X}".format(*rgb)


def escurecer(rgb, fator):
    return tuple(round(c * (1 - fator)) for c in rgb)


def dominante(pixels, filtro):
    """Cor mais frequente (quantizada em passos de 8) entre os pixels que passam no filtro."""
    cont = Counter()
    for r, g, b in pixels:
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        if filtro(h * 360, l, s):
            cont[(r // 8 * 8 + 4, g // 8 * 8 + 4, b // 8 * 8 + 4)] += 1
    if not cont:
        return None
    # média real dos pixels do grupo mais frequente
    alvo = cont.most_common(1)[0][0]
    grupo = [p for p in pixels if all(abs(p[i] - alvo[i]) <= 4 for i in range(3))]
    return tuple(round(sum(c[i] for c in grupo) / len(grupo)) for i in range(3))


def main():
    if not LOGO.exists():
        sys.exit(f"Arquivo não encontrado: {LOGO}")

    img = Image.open(LOGO).convert("RGB")
    fundo = img.getpixel((5, 5))

    pequena = img.copy()
    pequena.thumbnail((300, 300))
    pixels = list(pequena.getdata())

    vermelho = dominante(pixels, lambda h, l, s: (h < 15 or h > 345) and s > 0.5 and 0.3 < l < 0.7)
    amarelo = dominante(pixels, lambda h, l, s: 38 < h < 58 and s > 0.6 and 0.4 < l < 0.75)
    branco = dominante(pixels, lambda h, l, s: l > 0.9)

    vermelho = vermelho or (0xE8, 0x29, 0x2D)
    amarelo = amarelo or (0xFF, 0xCB, 0x2B)
    branco = branco or (0xFF, 0xFF, 0xFF)

    print(":root {")
    print(f"  --bg-logo: {hexa(fundo)};")
    print(f"  --vermelho: {hexa(vermelho)};")
    print(f"  --amarelo: {hexa(amarelo)};")
    print(f"  --branco: {hexa(branco)};")
    print(f"  --bg-escuro: {hexa(escurecer(fundo, 0.35))}; /* 35% mais escuro */")
    print(f"  --card: {hexa(escurecer(fundo, 0.12))};      /* 12% mais escuro */")
    print(f"  --borda: rgba({amarelo[0]}, {amarelo[1]}, {amarelo[2]}, 0.15);")
    print("}")


if __name__ == "__main__":
    main()
