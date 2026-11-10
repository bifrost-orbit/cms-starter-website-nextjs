# CMS Orbit website for Next.js

A ready-made website for [CMS Orbit](https://bifrostorbit.com/products/cms-orbit/), the headless CMS in Bifröst Orbit. Pick a template when you create a space (business website, blog, landing page, shop content, tour operator, local business, careers site or help centre), point this website at it and you have a real site to publish from day one: every page and entry at its own address, the header and footer menus, your contact details, drafts in the live preview as editors type, and a refresh when editors publish.

It draws every component the templates use, so editors can rearrange pages without waiting for a developer. When you want your own look, change the styles or swap in your own components one at a time.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbifrost-orbit%2Fcms-starter-website-nextjs&env=CMS_API_URL,CMS_PUBLIC_KEY,CMS_DEFAULT_REGION&envDescription=The%20API%20address%2C%20public%20key%20and%20region%20from%20CMS%20Orbit&envLink=https%3A%2F%2Fdocs.bifrostorbit.com%2Fcms%2Fdevelopers%2Fquickstart-nextjs%2F&project-name=website&repository-name=website)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/bifrost-orbit/cms-starter-website-nextjs?quickstart=1)

The Vercel button asks for `CMS_API_URL`, `CMS_PUBLIC_KEY` and `CMS_DEFAULT_REGION`. Add `CMS_PREVIEW_KEY` for previews and `CMS_WEBHOOK_SECRET` for refresh on publish in the project's settings afterwards.

## Set up

1. **Create your copy:** Select **Use this template** on GitHub, or run `gh repo create my-website --template bifrost-orbit/cms-starter-website-nextjs --private --clone`.
2. **Add your settings:** Copy `.env.example` to `.env.local` and fill in the API address, keys and region from **Configuration › API keys** and **Configuration › Environments** in CMS Orbit.
3. **Run it:** Run `npm install`, then `npm run dev`, and open `http://localhost:3000`.

## Settings

| Variable | What it is |
| --- | --- |
| `CMS_API_URL` | The API address from **Configuration › API keys** |
| `CMS_PUBLIC_KEY` | A public key (`cms_pk_…`) for published content |
| `CMS_DEFAULT_REGION` | The region to read, from **Configuration › Environments** |
| `CMS_PREVIEW_KEY` | A secret key (`cms_sk_…`) for drafts in the live preview. It stays on the server. |
| `CMS_WEBHOOK_SECRET` | The secret of the webhook that calls `/api/revalidate` when editors publish |

## What's inside

| File | What it does |
| --- | --- |
| `lib/cms.ts` | The CMS Orbit client, cached for 60 seconds with cache tags |
| `lib/site.ts` | Reads **Site settings** and the `header` and `footer` menus, and the banners |
| `lib/prepare.ts`, `lib/enrich.ts` | Fetches the entries a **List of entries** component shows, before the page renders |
| `app/[[...slug]]/page.tsx` | One route for every address: pages, entries, redirects, not found, title and description |
| `app/layout.tsx` | The banner, header and footer around every page |
| `components/site/` | The header with dropdowns and a mobile menu, the footer and the banner |
| `components/entry-header.tsx` | The article layout for entries that aren't pages: image, date, author and reading time |
| `cms/registry.tsx` | Which React component draws which CMS component |
| `cms/types.ts` | The fields of every component, for TypeScript |
| `components/blocks/` | The components themselves, grouped by kind |
| `proxy.ts`, `app/api/preview/` | Drafts in the editor's live preview |
| `app/api/revalidate/route.ts` | The signed webhook that refreshes pages when editors publish |
| `app/sitemap.xml/`, `app/robots.txt/` | The sitemap and robots file, as CMS Orbit writes them |

## The components it draws

| Kind | Components |
| --- | --- |
| Basics | `heading`, `richtext`, `image`, `button`, `video`, `callout` |
| Sections | `hero`, `cta`, `section`, `grid`, `features`, `imageText`, `stats`, `faq`, `team`, `gallery`, `logos`, `steps`, `contactDetails`, `pricing` |
| Parts | `card`, `productCard`, `testimonial`, `quote`, `featureItem`, `stat`, `faqItem`, `teamMember`, `logo`, `step`, `pricingPlan` |
| Content | `entryList`, which lists entries of any content type as cards or a list |
| Marketing | `countdown` on pages, and banners above or under the header |
| Travel Orbit | `travelTripCards`, `travelTripList`, `travelBookButton`, `travelNextDepartures`, `travelContinents`, `travelCountries`, `travelCountryFacts`, `travelGuides` |
| Commerce Orbit | `commerceProductCard`, `commerceProductGrid`, `commerceAddToCart`, `commerceCollectionList` |
| Careers Orbit | `careersJobList`, `careersFeaturedJob` |
| Booking Orbit | `bookingServiceList`, `bookingAppointment`, `bookingNextTimes`, `bookingTeam` |
| Presence Orbit | `presenceReviews`, `presenceRatingBadge`, `presenceReviewCta` |

Components from Travel, Commerce, Careers, Booking and Presence Orbit show what CMS Orbit delivers and nothing at all while the space isn't connected yet, so a page never breaks. **Book an appointment** links each service to Booking Orbit's own booking page; add the Booking Orbit SDK if you want the whole booking on your site.

Entries that aren't pages, such as articles, authors, guides or team stories, get an article layout: the title, the image, the date, the author's name and photo, the reading time when it's set, then the entry's own components. The header and footer read **Site settings**: the site name or logo, tagline, email, phone, address, social links (one per line) and footer note.

## Make it yours

- The colours, type and spacing are CSS variables at the top of `app/globals.css`, with a dark version for people whose device is set to dark mode. Each part has its own CSS module next to it.
- Dates and prices use British English (`en-GB`). Change `LOCALE` in `lib/values.ts` for another.
- Run `npm run cms:types` to write your space's own components to `cms/types.ts`. `defineRegistry` then tells you about any component in your space that has no React component yet.
- For the live preview, set **Preview URL** in the space's **Settings**. For refresh on publish, add a webhook to `https://your-website/api/revalidate` and put its secret in `CMS_WEBHOOK_SECRET`. The [quickstart](https://docs.bifrostorbit.com/cms/developers/quickstart-nextjs/) explains both.

Needs Node.js 20 or later and `@bifrost-orbit-cms/sdk` 0.13.

## Licence

MIT. See [LICENSE](LICENSE).
