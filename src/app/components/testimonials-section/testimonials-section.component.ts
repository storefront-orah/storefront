import { Component, computed, signal } from '@angular/core';

export type TestimonialFilter = 'taste' | 'jetLag' | 'sleep' | 'energy' | 'value';

export interface QuoteReview {
  filter: TestimonialFilter;
  headline: string;
  body: string;
}

export interface VideoSpotlight {
  id: string;
  filter: TestimonialFilter;
  label: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.css',
})
export class TestimonialsSectionComponent {
  readonly filters: { key: TestimonialFilter; label: string }[] = [
    { key: 'taste', label: 'TASTE' },
    { key: 'jetLag', label: 'JET LAG' },
    { key: 'sleep', label: 'SLEEP' },
    { key: 'energy', label: 'ENERGY' },
    { key: 'value', label: 'VALUE' },
  ];

  readonly activeFilter = signal<TestimonialFilter>('taste');

  readonly quotes: QuoteReview[] = [
    {
      filter: 'taste',
      headline: '10/10 would recommend',
      body:
        'The mint strips taste crisp—not chalky like some energy chews. No weird aftertaste on long flights; they stay in my carry-on.',
    },
    {
      filter: 'taste',
      headline: 'Actually enjoyable',
      body:
        'Variety pack lets me switch flavors without guessing. Peppermint before meetings, spearmint after lunch—both feel fresh.',
    },
    {
      filter: 'taste',
      headline: 'Not medicinal',
      body:
        'I was worried they’d taste like vitamins. They dissolve fast and feel more like a mint than a supplement.',
    },
    {
      filter: 'jetLag',
      headline: 'Easier redeyes',
      body:
        'I pair a strip with water on landing instead of another espresso loop. Helps me feel human through customs.',
    },
    {
      filter: 'jetLag',
      headline: 'Timezone hops',
      body:
        'Weekly coast-to-coast—having something pocket-size beats hunting for decent coffee in a new terminal.',
    },
    {
      filter: 'jetLag',
      headline: 'Carry-on friendly',
      body:
        'No liquids rule means these win every time. Pop one before the gate rush when sleep debt hits.',
    },
    {
      filter: 'sleep',
      headline: 'Wind-down ritual',
      body:
        'On nights when my brain won’t quit, I skip late caffeine and keep strips for earlier in the day—sleep stays sacred.',
    },
    {
      filter: 'sleep',
      headline: 'Red-eye recovery',
      body:
        'After landing I hydrate hard; strips helped me avoid stacking energy drinks that wreck sleep the next night.',
    },
    {
      filter: 'sleep',
      headline: 'Less jitter bedtime',
      body:
        'Because they’re quick-dissolve, I’m not slamming big sugary drinks right before trying to sleep.',
    },
    {
      filter: 'energy',
      headline: 'Clean lift',
      body:
        'Noticeable focus without feeling cracked out—nice before workouts when I don’t want a full pre-workout.',
    },
    {
      filter: 'energy',
      headline: 'Meeting mode',
      body:
        'Back-to-back calls used to mean endless cold brew. One strip mid-afternoon keeps me sharp but steady.',
    },
    {
      filter: 'energy',
      headline: 'No spill commute',
      body:
        'Bike to work + crowded train = no open cups. This fits in the coin pocket of my jeans.',
    },
    {
      filter: 'value',
      headline: 'Subscribe math works',
      body:
        'Per-strip cost beats boutique shots and I actually use the whole pack instead of wasting half a drink.',
    },
    {
      filter: 'value',
      headline: 'Travel insurance',
      body:
        'Cheap insurance against groggy airport mornings—especially when flight delays stack.',
    },
    {
      filter: 'value',
      headline: 'Shareable packs',
      body:
        'Split an 8-pack with my partner on trips; still cheaper than two fancy lattes a day.',
    },
  ];

  readonly videos: VideoSpotlight[] = [
    { id: 'v1', filter: 'taste', label: 'TASTE' },
    { id: 'v2', filter: 'jetLag', label: 'JET LAG' },
    { id: 'v3', filter: 'sleep', label: 'SLEEP' },
    { id: 'v4', filter: 'energy', label: 'ENERGY' },
    { id: 'v5', filter: 'value', label: 'VALUE' },
  ];

  readonly filteredQuotes = computed(() =>
    this.quotes.filter((q) => q.filter === this.activeFilter())
  );

  setFilter(key: TestimonialFilter): void {
    this.activeFilter.set(key);
  }

  isActive(key: TestimonialFilter): boolean {
    return this.activeFilter() === key;
  }

  playLabel(video: VideoSpotlight): string {
    return `Play ${video.label} testimonial video`;
  }
}
