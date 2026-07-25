from collections import deque
from pathlib import Path
import sys

from PIL import Image


SOURCE = Path(sys.argv[1])
OUTPUT = Path(sys.argv[2])

# Source coordinates include a small safety margin around each cutout.
CROPS = {
    "aged-paper": (26, 26, 416, 492),
    "text-fragments": (440, 32, 726, 242),
    "many-eyed-sun": (752, 22, 1000, 274),
    "palmistry-hands": (408, 276, 592, 538),
    "marble-head": (602, 274, 780, 538),
    "weeping-eye": (772, 315, 1018, 532),
}


def is_checker_pixel(pixel: tuple[int, int, int]) -> bool:
    red, green, blue = pixel
    neutral = max(pixel) - min(pixel) <= 10
    # The source checkerboard is compressed into a range of white and grey
    # values. Restrict the key to edge-connected pixels, so paper and ink stay.
    return neutral and 145 <= red <= 255


def remove_checkerboard(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    width, height = image.size
    pixels = image.load()
    transparent = set()
    queue = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in transparent or not is_checker_pixel(pixels[x, y][:3]):
            continue
        transparent.add((x, y))
        for offset_x, offset_y in ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)):
            next_x, next_y = x + offset_x, y + offset_y
            if 0 <= next_x < width and 0 <= next_y < height:
                queue.append((next_x, next_y))

    for x, y in transparent:
        red, green, blue, _ = pixels[x, y]
        pixels[x, y] = (red, green, blue, 0)

    return image


def keep_largest_component(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    width, height = image.size
    pixels = alpha.load()
    visited = set()
    components = []

    for y in range(height):
        for x in range(width):
            if (x, y) in visited or pixels[x, y] < 32:
                continue
            component = []
            queue = deque([(x, y)])
            visited.add((x, y))
            while queue:
                current_x, current_y = queue.popleft()
                component.append((current_x, current_y))
                for offset_x, offset_y in ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)):
                    next_x, next_y = current_x + offset_x, current_y + offset_y
                    if (
                        0 <= next_x < width
                        and 0 <= next_y < height
                        and (next_x, next_y) not in visited
                        and pixels[next_x, next_y] >= 32
                    ):
                        visited.add((next_x, next_y))
                        queue.append((next_x, next_y))
            components.append(component)

    if not components:
        return image

    largest = max(components, key=len)
    keep = set(largest)
    rgba = image.load()
    for y in range(height):
        for x in range(width):
            if (x, y) not in keep:
                red, green, blue, _ = rgba[x, y]
                rgba[x, y] = (red, green, blue, 0)
    return image


OUTPUT.mkdir(parents=True, exist_ok=True)
source = Image.open(SOURCE).convert("RGB")

for name, crop in CROPS.items():
    cutout = remove_checkerboard(source.crop(crop))
    if name == "marble-head":
        cutout = keep_largest_component(cutout)
    alpha = cutout.getchannel("A")
    bounds = alpha.getbbox()
    if bounds:
        left, top, right, bottom = bounds
        padding = 8
        bounds = (
            max(0, left - padding),
            max(0, top - padding),
            min(cutout.width, right + padding),
            min(cutout.height, bottom + padding),
        )
        cutout = cutout.crop(bounds)
    cutout.save(OUTPUT / f"{name}.png")
