#!/bin/bash
npx tailwindcss -i ./css/style.css -o ./css/output.css
python3 -m http.server 8000
