import { Component, computed, signal } from '@angular/core';

export type TestimonialFilter = 'taste' | 'energy' | 'focus' | 'work' | 'value';

export interface QuoteReview {
  filter: TestimonialFilter;
  headline: string;
  body: string;
  /** Attribution line after em dash; defaults to “Energy Strips user” */
  attr?: string;
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
    { key: 'energy', label: 'ENERGY' },
    { key: 'focus', label: 'FOCUS' },
    { key: 'work', label: 'WORK' },
    { key: 'value', label: 'VALUE' },
  ];

  readonly activeFilter = signal<TestimonialFilter>('taste');

  readonly quotes: QuoteReview[] = [
    {
      filter: 'taste',
      headline: 'Crisp, not chalky',
      body:
        'The spearmint actually tastes like spearmint, not a vitamin trying to be candy. Dissolves clean. No bitter aftertaste, no fake sweetness.',
      attr: 'ORAH USER',
    },
    {
      filter: 'taste',
      headline: 'Lemon hits',
      body:
        "Bright, not sour. Fresh enough to want one even when I don't need the focus boost. My favorite of any strip I've tried.",
      attr: 'ORAH USER',
    },
    {
      filter: 'taste',
      headline: 'They actually pair',
      body:
        "Mint in the morning, lemon mid-afternoon. They don't fight on your tongue the way coffee and chocolate would. Someone thought this through.",
      attr: 'ORAH USER',
    },
    {
      filter: 'focus',
      headline: 'No caffeine, real focus',
      body:
        "I don't drink caffeine after 1 PM. Focus lets me lock in for late writing sessions without trashing my sleep. The mushroom stack works.",
      attr: 'ORAH USER',
    },
    {
      filter: 'focus',
      headline: 'Better than nootropics',
      body:
        "Tried Magic Mind and Lion's Mane gummies. Orah Focus is the only thing that gives me clean concentration without the weirdness.",
      attr: 'ORAH USER',
    },
    {
      filter: 'focus',
      headline: 'Deep work mode',
      body:
        'One strip before a 2-hour focus block. Phone face down, calendar blocked, Orah on the tongue. Best two hours of my workday.',
      attr: 'ORAH USER',
    },
    {
      filter: 'work',
      headline: 'Saves the coffee run',
      body:
        'Used to walk to the café between meetings. Now I drop a strip and stay at my desk. 15 minutes of momentum saved every time.',
      attr: 'ORAH USER',
    },
    {
      filter: 'work',
      headline: 'No 3 PM crash',
      body:
        'Energy at 9, Focus at 1. Steady through 6 with no afternoon coffee anxiety. The dip is gone.',
      attr: 'ORAH USER',
    },
    {
      filter: 'work',
      headline: 'Meeting-friendly',
      body:
        'Cracking a Red Bull in a board meeting kills the vibe. A strip on the tongue is invisible. Focus stays high without the optics.',
      attr: 'ORAH USER',
    },
    {
      filter: 'energy',
      headline: 'Smooth, not jittery',
      body:
        'Clean lift without the heart-racing thing energy drinks do to me. One before a 6 AM padel match and I\'m steady through the whole hour.',
      attr: 'ORAH USER',
    },
    {
      filter: 'energy',
      headline: 'Quit Celsius after one box',
      body:
        'Was on 2 a day for two years. Switched to Orah three weeks ago. Same alertness, no afternoon dip, no carbonation bloat.',
      attr: 'ORAH USER',
    },
    {
      filter: 'energy',
      headline: '50mg is the right number',
      body:
        'Most products give you either a useless baby dose or 200mg that wrecks you. 50 paired with L-theanine is the right call for a working day.',
      attr: 'ORAH USER',
    },
    {
      filter: 'value',
      headline: 'Pays for itself week one',
      body:
        'I was on $5 coffee plus an afternoon Celsius. $200 a month, easy. One pouch of Orah lasts two weeks at half the price. The math is loud.',
      attr: 'ORAH USER',
    },
    {
      filter: 'value',
      headline: 'Bundle is the move',
      body:
        'Buying Energy and Focus together saved me about 20% per strip. I use both daily. Subscription means I never run out and never overpay.',
      attr: 'ORAH USER',
    },
    {
      filter: 'value',
      headline: 'No half-flat cans',
      body:
        "With energy drinks I'd open one and forget about it, half-warm by the afternoon. With Orah every strip lands. No waste, no toss-outs.",
      attr: 'ORAH USER',
    },
  ];

  readonly videos: VideoSpotlight[] = [
    { id: 'v1', filter: 'taste', label: 'TASTE' },
    { id: 'v2', filter: 'energy', label: 'ENERGY' },
    { id: 'v3', filter: 'focus', label: 'FOCUS' },
    { id: 'v4', filter: 'work', label: 'WORK' },
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
