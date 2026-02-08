# @pagebase/kit

Shared component library for Pagebase client websites.

## Installation

```bash
npm install github:will-break-it/pagebase-kit
```

## Usage

### Content Setup

Create content files in your client repo:

```
content/
├── config.json    # Site configuration
├── de.json        # German content
├── en.json        # English content
└── assets/        # Images
```

### Content Loader

```typescript
// src/content/index.ts
import { createContentLoader, loadConfig } from '@pagebase/kit/content';
import configJson from '../../content/config.json';
import deContent from '../../content/de.json';
import enContent from '../../content/en.json';

export const config = loadConfig(configJson);
export const getContent = createContentLoader(deContent, enContent);
```

### Layout

```astro
---
import PracticeLayout from '@pagebase/kit/layouts/PracticeLayout.astro';
import { config, getContent } from '../content';

const content = getContent('de');
---

<PracticeLayout config={config} content={content} locale="de">
  <!-- Your content -->
</PracticeLayout>
```

### Sections

```astro
---
import HeroSection from '@pagebase/kit/sections/HeroSection.astro';
import ContactSection from '@pagebase/kit/sections/ContactSection.astro';
import BookingSection from '@pagebase/kit/sections/BookingSection.astro';
import FAQSection from '@pagebase/kit/sections/FAQSection.astro';
---

<HeroSection config={config} content={content} />
<ContactSection config={config} content={content} />
<BookingSection config={config} content={content} locale="de" />
<FAQSection content={content} />
```

## Components

### Layouts
- `PracticeLayout.astro` - Full page layout with header, footer, nav

### Sections
- `HeroSection.astro` - Hero with photo, title, CTA
- `ContactSection.astro` - Contact cards (address, hours, email)
- `BookingSection.astro` - Embedded calendar booking
- `FAQSection.astro` - Expandable FAQ items

### Utilities
- `createContentLoader()` - Creates locale-aware content getter
- `loadConfig()` - Loads and types config JSON
- `getFormattedAddress()` - Formats address from config
