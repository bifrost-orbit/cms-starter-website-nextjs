import type { CmsBookingService, CmsBookingStaff, CmsCareersJob, CmsCommerceCollection, CmsCommerceProduct, CmsDeparture, CmsDestination, CmsEntry, CmsImage, CmsJobFilter, CmsLink, CmsNode, CmsReviewLocation, CmsRichText, CmsTrip } from "@bifrost-orbit-cms/sdk";

export interface HeadingBlock {
  type: "heading"
  text: string
  level: "h1" | "h2" | "h3"
}

export interface RichtextBlock {
  type: "richtext"
  body: CmsRichText
}

export interface ImageBlock {
  type: "image"
  asset: CmsImage | null
  alt?: string
  caption?: string
}

export interface ButtonBlock {
  type: "button"
  label: string
  link: CmsLink | null
  variant?: "primary" | "secondary" | "ghost"
}

export interface HeroBlock {
  type: "hero"
  eyebrow?: string
  heading: string
  description?: CmsRichText
  image?: CmsImage | null
  button?: CmsNode<ButtonBlock> | null
}

export interface CardBlock {
  type: "card"
  image?: CmsImage | null
  heading: string
  body?: CmsRichText
  button?: CmsNode<ButtonBlock> | null
}

export interface ProductCardBlock {
  type: "productCard"
  title: string
  price?: string
  summary?: CmsRichText
  product?: CmsEntry | null
}

export interface TestimonialBlock {
  type: "testimonial"
  quote: CmsRichText
  author?: string
  rating?: number
}

export interface GridBlock {
  type: "grid"
  columns: "2" | "3" | "4"
  items?: CmsNode<CardBlock | ProductCardBlock | TestimonialBlock | QuoteBlock>[]
}

export interface SectionBlock {
  type: "section"
  title?: string
  background?: "default" | "muted" | "brand"
  blocks?: CmsNode[]
}

export interface CtaBlock {
  type: "cta"
  heading: string
  body?: CmsRichText
  button: CmsNode<ButtonBlock> | null
}

export interface FeaturesBlock {
  type: "features"
  eyebrow?: string
  heading?: string
  intro?: CmsRichText
  items?: CmsNode<FeatureItemBlock>[]
}

export interface FeatureItemBlock {
  type: "featureItem"
  icon?: string
  heading: string
  body?: CmsRichText
}

export interface ImageTextBlock {
  type: "imageText"
  eyebrow?: string
  heading: string
  body?: CmsRichText
  image?: CmsImage | null
  imageSide?: "left" | "right"
  button?: CmsNode<ButtonBlock> | null
}

export interface StatsBlock {
  type: "stats"
  heading?: string
  items?: CmsNode<StatBlock>[]
}

export interface StatBlock {
  type: "stat"
  value: string
  label: string
}

export interface FaqBlock {
  type: "faq"
  heading?: string
  intro?: CmsRichText
  items?: CmsNode<FaqItemBlock>[]
}

export interface FaqItemBlock {
  type: "faqItem"
  question: string
  answer: CmsRichText
}

export interface TeamBlock {
  type: "team"
  heading?: string
  intro?: CmsRichText
  members?: CmsNode<TeamMemberBlock>[]
}

export interface TeamMemberBlock {
  type: "teamMember"
  photo?: CmsImage | null
  name: string
  role?: string
  bio?: string
}

export interface GalleryBlock {
  type: "gallery"
  heading?: string
  images?: CmsImage[]
}

export interface LogosBlock {
  type: "logos"
  heading?: string
  items?: CmsNode<LogoBlock>[]
}

export interface LogoBlock {
  type: "logo"
  image: CmsImage | null
  name: string
  link?: CmsLink | null
}

export interface StepsBlock {
  type: "steps"
  heading?: string
  intro?: CmsRichText
  items?: CmsNode<StepBlock>[]
}

export interface StepBlock {
  type: "step"
  heading: string
  body?: CmsRichText
}

export interface QuoteBlock {
  type: "quote"
  quote: CmsRichText
  author?: string
  role?: string
  photo?: CmsImage | null
}

export interface ContactDetailsBlock {
  type: "contactDetails"
  heading?: string
  intro?: CmsRichText
  email?: string
  phone?: string
  address?: string
  openingHours?: string
  button?: CmsNode<ButtonBlock> | null
}

export interface PricingBlock {
  type: "pricing"
  heading?: string
  intro?: CmsRichText
  plans?: CmsNode<PricingPlanBlock>[]
}

export interface PricingPlanBlock {
  type: "pricingPlan"
  name: string
  price: string
  period?: string
  features?: string
  highlighted?: boolean
  button?: CmsNode<ButtonBlock> | null
}

export interface EntryListBlock {
  type: "entryList"
  heading?: string
  contentType: string
  limit?: number
  layout?: "cards" | "list"
}

export interface VideoBlock {
  type: "video"
  url: string
  caption?: string
}

export interface CalloutBlock {
  type: "callout"
  tone?: "info" | "tip" | "warning"
  heading?: string
  body: CmsRichText
}

export interface CountdownBlock {
  type: "countdown"
  label?: string
  endDate?: string
  endTime?: string
  timeZone?: "Europe/Berlin" | "Europe/Zurich" | "Europe/London" | "Europe/Dublin" | "America/New_York"
  startDate?: string
  style: "banner" | "lightning" | "blackFriday"
  icon?: string
  button?: CmsLink | null
  atZero: "hide" | "swap" | "ended"
  followUpText?: string
  followUpLink?: CmsLink | null
  endedText?: string
  audience: "everyone" | "guest" | "signedIn"
}

export interface CampaignImageBlock {
  type: "campaignImage"
  image?: CmsImage | null
  audience: "everyone" | "guest" | "signedIn"
}

export interface CampaignHeadingBlock {
  type: "campaignHeading"
  text?: string
  size: "large" | "medium" | "eyebrow"
  audience: "everyone" | "guest" | "signedIn"
}

export interface CampaignTextBlock {
  type: "campaignText"
  body?: CmsRichText
  audience: "everyone" | "guest" | "signedIn"
}

export interface CampaignMessageBlock {
  type: "campaignMessage"
  text?: string
  audience: "everyone" | "guest" | "signedIn"
}

export interface CampaignButtonBlock {
  type: "campaignButton"
  text?: string
  link?: CmsLink | null
  style: "primary" | "secondary" | "link"
  audience: "everyone" | "guest" | "signedIn"
}

export interface CampaignPromoCodeBlock {
  type: "campaignPromoCode"
  code?: string
  label?: string
  audience: "everyone" | "guest" | "signedIn"
}

export interface CampaignTermsBlock {
  type: "campaignTerms"
  text?: string
  audience: "everyone" | "guest" | "signedIn"
}

export interface CampaignFormBlock {
  type: "campaignForm"
  form: "newsletter" | "consultation" | "callback"
  submitText?: string
  audience: "everyone" | "guest" | "signedIn"
}

export interface TravelTripCardsBlock {
  type: "travelTripCards"
  heading?: string
  intro?: string
  trips: CmsTrip[]
}

export interface TravelTripListBlock {
  type: "travelTripList"
  heading?: string
  destination?: CmsDestination | null
  activity?: string
  area?: string
  limit?: number
}

export interface TravelBookButtonBlock {
  type: "travelBookButton"
  label: string
  trip: CmsTrip | null
  departure?: CmsDeparture | null
}

export interface TravelNextDeparturesBlock {
  type: "travelNextDepartures"
  heading?: string
  trip: CmsTrip | null
  limit?: number
}

export interface TravelContinentsBlock {
  type: "travelContinents"
  heading?: string
  intro?: string
}

export interface TravelCountriesBlock {
  type: "travelCountries"
  heading?: string
  intro?: string
  continent?: CmsDestination | null
  withTrips?: boolean
  limit?: number
}

export interface TravelCountryFactsBlock {
  type: "travelCountryFacts"
  heading?: string
  country: CmsDestination | null
}

export interface TravelGuidesBlock {
  type: "travelGuides"
  heading?: string
  intro?: string
  limit?: number
}

export interface CommerceProductCardBlock {
  type: "commerceProductCard"
  product: CmsCommerceProduct | null
  heading?: string
  buttonLabel?: string
}

export interface CommerceProductGridBlock {
  type: "commerceProductGrid"
  heading?: string
  intro?: string
  products?: CmsCommerceProduct[]
  collection?: CmsCommerceCollection | null
  limit?: number
}

export interface CommerceAddToCartBlock {
  type: "commerceAddToCart"
  label: string
  product: CmsCommerceProduct | null
}

export interface CommerceCollectionListBlock {
  type: "commerceCollectionList"
  heading?: string
  intro?: string
  limit?: number
}

export interface CareersJobListBlock {
  type: "careersJobList"
  heading?: string
  intro?: string
  filter?: CmsJobFilter | null
  limit?: number
  emptyText?: string
}

export interface CareersFeaturedJobBlock {
  type: "careersFeaturedJob"
  job: CmsCareersJob | null
  heading?: string
  text?: string
  buttonLabel?: string
}

export interface BookingServiceListBlock {
  type: "bookingServiceList"
  eyebrow?: string
  heading?: string
  intro?: string
  services?: CmsBookingService[]
  bookLink?: CmsLink | null
  limit?: number
}

export interface BookingAppointmentBlock {
  type: "bookingAppointment"
  heading?: string
  intro?: string
  service?: CmsBookingService | null
  confirmation?: string
}

export interface BookingNextTimesBlock {
  type: "bookingNextTimes"
  heading?: string
  service: CmsBookingService | null
  bookLink?: CmsLink | null
  limit?: number
}

export interface BookingTeamBlock {
  type: "bookingTeam"
  eyebrow?: string
  heading?: string
  intro?: string
  staff?: CmsBookingStaff[]
}

export interface PresenceReviewsBlock {
  type: "presenceReviews"
  heading?: string
  intro?: string
  location?: CmsReviewLocation | null
  minRating?: number
  site?: "google" | "facebook" | "trustpilot" | "tripadvisor"
  language?: string
  limit?: number
  showSummary?: boolean
  showReplies?: boolean
}

export interface PresenceRatingBadgeBlock {
  type: "presenceRatingBadge"
  location?: CmsReviewLocation | null
  label?: string
  showCount?: boolean
}

export interface PresenceReviewCtaBlock {
  type: "presenceReviewCta"
  heading?: string
  text?: string
  buttonLabel: string
  location?: CmsReviewLocation | null
}

declare module "@bifrost-orbit-cms/sdk" {
  interface CmsBlockTypes {
    heading: HeadingBlock
    richtext: RichtextBlock
    image: ImageBlock
    button: ButtonBlock
    hero: HeroBlock
    card: CardBlock
    productCard: ProductCardBlock
    testimonial: TestimonialBlock
    grid: GridBlock
    section: SectionBlock
    cta: CtaBlock
    features: FeaturesBlock
    featureItem: FeatureItemBlock
    imageText: ImageTextBlock
    stats: StatsBlock
    stat: StatBlock
    faq: FaqBlock
    faqItem: FaqItemBlock
    team: TeamBlock
    teamMember: TeamMemberBlock
    gallery: GalleryBlock
    logos: LogosBlock
    logo: LogoBlock
    steps: StepsBlock
    step: StepBlock
    quote: QuoteBlock
    contactDetails: ContactDetailsBlock
    pricing: PricingBlock
    pricingPlan: PricingPlanBlock
    entryList: EntryListBlock
    video: VideoBlock
    callout: CalloutBlock
    countdown: CountdownBlock
    campaignImage: CampaignImageBlock
    campaignHeading: CampaignHeadingBlock
    campaignText: CampaignTextBlock
    campaignMessage: CampaignMessageBlock
    campaignButton: CampaignButtonBlock
    campaignPromoCode: CampaignPromoCodeBlock
    campaignTerms: CampaignTermsBlock
    campaignForm: CampaignFormBlock
    travelTripCards: TravelTripCardsBlock
    travelTripList: TravelTripListBlock
    travelBookButton: TravelBookButtonBlock
    travelNextDepartures: TravelNextDeparturesBlock
    travelContinents: TravelContinentsBlock
    travelCountries: TravelCountriesBlock
    travelCountryFacts: TravelCountryFactsBlock
    travelGuides: TravelGuidesBlock
    commerceProductCard: CommerceProductCardBlock
    commerceProductGrid: CommerceProductGridBlock
    commerceAddToCart: CommerceAddToCartBlock
    commerceCollectionList: CommerceCollectionListBlock
    careersJobList: CareersJobListBlock
    careersFeaturedJob: CareersFeaturedJobBlock
    bookingServiceList: BookingServiceListBlock
    bookingAppointment: BookingAppointmentBlock
    bookingNextTimes: BookingNextTimesBlock
    bookingTeam: BookingTeamBlock
    presenceReviews: PresenceReviewsBlock
    presenceRatingBadge: PresenceRatingBadgeBlock
    presenceReviewCta: PresenceReviewCtaBlock
  }
}
