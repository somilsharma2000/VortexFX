#!/bin/bash
REPOS=(
  # Web Dev & Frontend
  "expressjs/express"
  "withastro/astro"
  "storybookjs/storybook"
  "shadcn-ui/ui"
  "vitejs/vite"
  "TanStack/query"
  "tailwindlabs/tailwindcss"
  "nolimits4web/swiper"
  # Backend, APIs & Database
  "fastapi/fastapi"
  "nestjs/nest"
  "axios/axios"
  "n8n-io/n8n"
  "Kong/kong"
  "apache/apisix"
  "swagger-api/swagger-ui"
  "trpc/trpc"
  "prisma/prisma"
  "dbeaver/dbeaver"
  "kubernetes/kubernetes"
  "hashicorp/terraform"
  # Automation & CRM
  "apache/airflow"
  "twentyhq/twenty"
  "odoo/odoo"
  "airbytehq/airbyte"
  "nangohq/nango"
  "espocrm/espocrm"
  "refinedev/refine"
  # Search & SEO
  "meilisearch/meilisearch"
  "typesense/typesense"
  # Marketing & Sales
  "apify/crawlee"
  "filip-michalsky/SalesGPT"
  "danielmiessler/fabric"
  "f/awesome-chatgpt-prompts"
  "gitroomhq/postiz-app"
  "inovector/mixpost"
  "mautic/mautic"
  "activepieces/activepieces"
  "knadh/listmonk"
  "posthog/posthog"
  "growthbook/growthbook"
  "penpot/penpot"
  "amicalhq/refref"
  "Refferq/Refferq"
  "qeeqbox/social-analyzer"
  "instaloader/instaloader"
  # E-commerce, Product & Content
  "medusajs/medusa"
  "saleor/saleor"
  "makeplane/plane"
  "PostHog/posthog"
  "strapi/strapi"
  "TryGhost/Ghost"
  "obsproject/obs-studio"
  "remotion-dev/remotion"
  "excalidraw/excalidraw"
  "blender/blender"
  "mrdoob/three.js"
  "ManimCommunity/manim"
  "motiondivision/motion"
  # Data, Analytics & Research
  "OpenBB-finance/OpenBB"
  "scrapy/scrapy"
  "d3/d3"
  "matplotlib/matplotlib"
  "scikit-learn/scikit-learn"
  "apache/spark"
  "cleanlab/cleanlab"
  "optuna/optuna"
  "JerBouma/FinanceToolkit"
  "unclecode/crawl4ai"
  "ranaroussi/yfinance"
  # AI/NLP & Blockchain
  "huggingface/transformers"
  "explosion/spaCy"
  "dair-ai/Prompt-Engineering-Guide"
  "bitcoin/bitcoin"
  "ethereum/go-ethereum"
  # QA, Testing & Security
  "microsoft/playwright"
  "cypress-io/cypress"
  "aquasecurity/trivy"
  "semgrep/semgrep"
  "DefectDojo/django-DefectDojo"
  "intuitem/ciso-assistant-community"
  # Strategy, Planning & Technical Writing
  "joelparkerhenderson/objectives-and-key-results"
  "MicrosoftDocs/cloud-adoption-framework"
  "yasserfarouk/negmas"
  "vinid/NegotiationArena"
  "formbricks/formbricks"
  "jupyterlab/ux-research"
  "mermaid-js/mermaid"
  "colinfwren/easy-user-journey-map"
  "Wandmalfarbe/pandoc-latex-template"
  "sjwhitworth/proposal-template"
  "pretix/pretix"
  "fossasia/eventyay"
  "matteofigus/awesome-speaking"
  "vmbrasseur/Public_Speaking"
  "davidturnbull/awesome-technical-writing"
  "google/styleguide"
  "alex/what-happens-when"
)

TOTAL=${#REPOS[@]}
SUCCESS=0
FAIL=0
FAILED_REPOS=""

for repo in "${REPOS[@]}"; do
  # Convert owner/repo to dir name (use repo name only to avoid nested dirs)
  repo_name=$(echo "$repo" | sed 's|.*/||')
  if [ -d "repos/$repo_name" ]; then
    echo "[SKIP] $repo_name already exists"
    SUCCESS=$((SUCCESS + 1))
    continue
  fi
  echo "[CLONING] $repo -> repos/$repo_name"
  if git clone --depth 1 "https://github.com/$repo.git" "repos/$repo_name" 2>/dev/null; then
    echo "  [OK] $repo_name cloned"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "  [FAIL] $repo_name failed"
    FAIL=$((FAIL + 1))
    FAILED_REPOS="$FAILED_REPOS\n  - $repo"
  fi
done

echo ""
echo "========================================="
echo "CLONE COMPLETE"
echo "Total: $TOTAL | Success: $SUCCESS | Failed: $FAIL"
if [ -n "$FAILED_REPOS" ]; then
  echo "Failed repos:"
  echo -e "$FAILED_REPOS"
fi
echo "========================================="
