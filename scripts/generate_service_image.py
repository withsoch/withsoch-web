#!/usr/bin/env python3
"""Generate a blog/hero image via Replicate and drop it into public/blog/.

Usage:
    python scripts/generate_service_image.py -s "Some Slug Or Title" -p "<prompt>"

Requires REPLICATE_API_TOKEN in the environment (loaded from .env if present).
"""

import argparse
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = REPO_ROOT / "public" / "blog"

MODEL = "black-forest-labs/flux-1.1-pro"
DEFAULT_ASPECT_RATIO = "3:2"


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate a blog hero/service image via Replicate.")
    parser.add_argument("-s", "--slug", required=True, help="Subject/title used to derive the output filename.")
    parser.add_argument("-p", "--prompt", required=True, help="Image generation prompt.")
    parser.add_argument("-o", "--output-dir", default=str(OUTPUT_DIR), help="Directory to save the image into.")
    parser.add_argument("--aspect-ratio", default=DEFAULT_ASPECT_RATIO, help="Aspect ratio, e.g. 3:2, 16:9, 1:1.")
    parser.add_argument("--model", default=MODEL, help="Replicate model ref to use.")
    args = parser.parse_args()

    load_dotenv(REPO_ROOT / ".env")

    if not os.environ.get("REPLICATE_API_TOKEN"):
        print("Error: REPLICATE_API_TOKEN not set (check .env).", file=sys.stderr)
        return 1

    try:
        import replicate
    except ImportError:
        print("Error: the 'replicate' package is not installed. Run: pip install replicate", file=sys.stderr)
        return 1

    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    filename = f"{slugify(args.slug)}.webp"
    out_path = out_dir / filename

    print(f"Generating image for '{args.slug}' via {args.model} ...")
    output = replicate.run(
        args.model,
        input={
            "prompt": args.prompt,
            "aspect_ratio": args.aspect_ratio,
            "output_format": "webp",
            "output_quality": 90,
            "safety_tolerance": 2,
        },
    )

    # replicate.run may return a single FileOutput or a list of them.
    file_output = output[0] if isinstance(output, list) else output

    data = file_output.read() if hasattr(file_output, "read") else bytes(file_output)
    out_path.write_bytes(data)

    print(f"Saved: {out_path.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
