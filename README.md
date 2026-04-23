# APEX — AI Patient Experience Framework

An interactive digital framework document for health organisations evaluating patient-facing AI systems.

## Overview

APEX presents a structured evaluation framework across two interactive views. It is built as a standalone vanilla HTML/CSS/JavaScript application — no dependencies, no build tools, no package manager.

## Pages

### Framework explorer (`pages/framework.html`)

Presents the seven APEX principles as a clickable grid. Select a principle to open a detail panel with three tabs:

- **Overview** — the interaction moment, system impact, and failure consequence
- **Failure modes** — named failure patterns with context, breakdown description, and consequence
- **Vendor assessment** — structured questions categorised by Capability, Evidence, Governance, or Accountability

### Patient journey map (`pages/journey.html`)

A service design artefact mapping six stages of a patient's interaction with an AI-assisted health service. Each stage column shows patient tension level, active APEX conditions, and the top key risks. Selecting a stage opens a detail panel with a full breakdown of what is happening, conditions in play, and where it can fail. Collapses to a vertical accordion on mobile.

## Running the application

Open `index.html` directly in a browser, or use VS Code Live Server:

1. Open the project folder in VS Code
2. Right-click `index.html` → **Open with Live Server**

No server, no install, no build step required.

## Content

All content for both pages lives in `scripts/data.js`. This is the single source of truth — edit it to update principles, failure modes, vendor questions, journey stages, patient voice quotes, conditions, or risks. The rendering logic in `framework.js` and `journey.js` reads from this file dynamically; nothing is hardcoded in HTML.

## Structure

```
apex-framework/
├── index.html              Landing page
├── styles/
│   ├── base.css            Design system variables, reset, typography, navigation
│   ├── framework.css       Framework explorer page styles
│   └── journey.css         Patient journey map page styles
├── scripts/
│   ├── data.js             All content (principles + journey stages)
│   ├── framework.js        Framework page rendering logic
│   └── journey.js          Journey map rendering logic
├── pages/
│   ├── framework.html      Framework explorer
│   └── journey.html        Patient journey map
└── README.md
```
