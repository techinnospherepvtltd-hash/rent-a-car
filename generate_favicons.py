import os
from PIL import Image, ImageDraw, ImageFont

public_dir = os.path.join(os.path.dirname(__file__), "public")
os.makedirs(public_dir, exist_ok=True)

def create_n10_brand_icon(size):
    # High resolution canvas
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Outer luxury rounded badge
    pad = int(size * 0.04)
    radius = int(size * 0.22)
    
    # Carbon / obsidian background
    draw.rounded_rectangle(
        [(pad, pad), (size - pad, size - pad)],
        radius=radius,
        fill=(14, 15, 20, 255),
        outline=(229, 176, 66, 255),  # Metallic Gold border
        width=max(1, int(size * 0.045))
    )
    
    # Subtle inner border for luxury depth
    inner_pad = pad + max(2, int(size * 0.05))
    inner_rad = max(2, radius - int(size * 0.05))
    draw.rounded_rectangle(
        [(inner_pad, inner_pad), (size - inner_pad, size - inner_pad)],
        radius=inner_rad,
        outline=(50, 52, 65, 180),
        width=max(1, int(size * 0.015))
    )
    
    # Draw geometric N10 monogram using sharp automotive vectors
    # Center bounds
    cx, cy = size / 2, size / 2
    
    # Let's draw stylized 'N' on left, '10' on right or combined badge
    # Golden gradient colors: (245, 197, 85) to (212, 152, 38)
    gold_main = (245, 197, 85, 255)
    gold_acc = (255, 220, 130, 255)
    gold_dark = (200, 140, 30, 255)
    
    # Stylized N:
    # 3 lines of N with angled diagonal
    w = size
    h = size
    
    # Left stem of N
    x1 = int(w * 0.22)
    x2 = int(w * 0.32)
    y_top = int(h * 0.28)
    y_bot = int(h * 0.72)
    
    draw.polygon([
        (x1, y_bot), (x1, y_top), (x2, y_top), (x2, y_bot)
    ], fill=gold_main)
    
    # Right stem of N
    x3 = int(w * 0.44)
    x4 = int(w * 0.54)
    draw.polygon([
        (x3, y_bot), (x3, y_top), (x4, y_top), (x4, y_bot)
    ], fill=gold_main)
    
    # Diagonal of N
    draw.polygon([
        (x1, y_top), (x2, y_top), (x4, y_bot), (x3, y_bot)
    ], fill=gold_acc)
    
    # '1' of 10
    x_one_1 = int(w * 0.60)
    x_one_2 = int(w * 0.68)
    draw.polygon([
        (x_one_1, y_bot), (x_one_1, y_top + int(h * 0.06)),
        (x_one_1 - int(w*0.04), y_top + int(h * 0.12)),
        (x_one_1, y_top),
        (x_one_2, y_top), (x_one_2, y_bot)
    ], fill=gold_main)
    
    # '0' of 10 (or circular speed ring)
    x_zero_c = int(w * 0.78)
    y_zero_c = int(h * 0.50)
    rx = int(w * 0.10)
    ry = int(h * 0.22)
    
    draw.ellipse([
        (x_zero_c - rx, y_zero_c - ry),
        (x_zero_c + rx, y_zero_c + ry)
    ], fill=None, outline=gold_main, width=max(2, int(w * 0.075)))
    
    # Dynamic speed dash under N10
    dash_y = int(h * 0.81)
    dash_h = max(2, int(h * 0.035))
    draw.polygon([
        (int(w * 0.22), dash_y),
        (int(w * 0.88), dash_y),
        (int(w * 0.84), dash_y + dash_h),
        (int(w * 0.18), dash_y + dash_h)
    ], fill=gold_acc)
    
    return img

# Generate all favicon sizes
sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
}

master_img = create_n10_brand_icon(512)
master_img.save(os.path.join(public_dir, "android-chrome-512x512.png"))

for filename, sz in sizes.items():
    if sz == 512:
        continue
    scaled = master_img.resize((sz, sz), Image.Resampling.LANCZOS)
    scaled.save(os.path.join(public_dir, filename))

# Save ICO containing 16, 32, 48
ico_img_16 = master_img.resize((16, 16), Image.Resampling.LANCZOS)
ico_img_32 = master_img.resize((32, 32), Image.Resampling.LANCZOS)
ico_img_48 = master_img.resize((48, 48), Image.Resampling.LANCZOS)
ico_img_32.save(
    os.path.join(public_dir, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)]
)

# SVG version for modern browsers
svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd778"/>
      <stop offset="50%" stop-color="#e5b042"/>
      <stop offset="100%" stop-color="#b88318"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181920"/>
      <stop offset="100%" stop-color="#0a0b0e"/>
    </linearGradient>
  </defs>
  <rect x="20" y="20" width="472" height="472" rx="110" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="22"/>
  <rect x="44" y="44" width="424" height="424" rx="90" fill="none" stroke="#2a2c38" stroke-width="6"/>
  <!-- N -->
  <polygon points="112,368 112,144 164,144 164,368" fill="url(#goldGrad)"/>
  <polygon points="225,368 225,144 276,144 276,368" fill="url(#goldGrad)"/>
  <polygon points="112,144 164,144 276,368 225,368" fill="#ffd778"/>
  <!-- 1 -->
  <polygon points="307,368 307,174 286,204 307,144 348,144 348,368" fill="url(#goldGrad)"/>
  <!-- 0 -->
  <ellipse cx="400" cy="256" rx="52" ry="112" fill="none" stroke="url(#goldGrad)" stroke-width="38"/>
  <!-- Speed Dash -->
  <polygon points="112,414 452,414 432,432 92,432" fill="url(#goldGrad)"/>
</svg>"""

with open(os.path.join(public_dir, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

# site.webmanifest
manifest = """{
  "name": "N10 Rent A Car - Luxury & Exotic Fleet",
  "short_name": "N10 Rentals",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#0a0b0e",
  "background_color": "#0a0b0e",
  "display": "standalone"
}"""

with open(os.path.join(public_dir, "site.webmanifest"), "w", encoding="utf-8") as f:
    f.write(manifest)

print("Favicon assets generated successfully!")
