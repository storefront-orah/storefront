import { Component, computed, signal } from '@angular/core';

export interface ReviewEntry {
  author: string;
  date: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'app-reviews-pro',
  standalone: true,
  templateUrl: './reviews-pro.component.html',
  styleUrl: './reviews-pro.component.css',
})
export class ReviewsProComponent {
  readonly avgRating = 4.9;
  readonly reviewCount = 905;

  private readonly visibleCount = signal(4);

  readonly reviews: ReviewEntry[] = [
    {
      author: 'Nora F.',
      date: '4/15/2026',
      rating: 5,
      text:
        'These strips are my go-to before long meetings. Fast, clean energy—no jittery coffee crash. The mint flavor is genuinely refreshing.',
    },
    {
      author: 'Hudson V.',
      date: '4/11/2026',
      rating: 5,
      text:
        'Slips in my gym bag perfectly. I take one before cardio and feel dialed in without dealing with drinks or clutter.',
    },
    {
      author: 'Stella Q.',
      date: '4/09/2026',
      rating: 5,
      text:
        'Finally something that works on night shifts. Dissolves quick, tastes great, and I can control the dose easily.',
    },
    {
      author: 'Lincoln J.',
      date: '4/02/2026',
      rating: 5,
      text:
        'Ordered for work travel—TSA-friendly and no spills in the rental car. Shipping was quick and the variety pack is fun to share.',
    },
    {
      author: 'Elena B.',
      date: '3/28/2026',
      rating: 5,
      text:
        'Clean ingredients matter to me. Clear labeling, no sugar bomb—just a smooth lift when I need to focus.',
    },
    {
      author: 'Miles W.',
      date: '3/24/2026',
      rating: 5,
      text:
        'Subscribe & save has been seamless. Consistent quality batch to batch and customer service answered my question same day.',
    },
    {
      author: 'Hazel D.',
      date: '3/20/2026',
      rating: 5,
      text:
        'Premium feel without the boutique price. The strips dissolve evenly—no chalky aftertaste like some competitors.',
    },
    {
      author: 'Christian L.',
      date: '3/16/2026',
      rating: 5,
      text:
        'I split a strip when I only need a light boost; full strip before presentations. Versatile and predictable.',
    },
  ];

  readonly displayReviews = computed(() =>
    this.reviews.slice(0, this.visibleCount())
  );

  readonly showLoadMore = computed(() => this.visibleCount() < this.reviews.length);

  loadMore(): void {
    this.visibleCount.set(this.reviews.length);
  }

  starFillPercents(overall: number): number[] {
    return [0, 1, 2, 3, 4].map((k) => Math.min(Math.max(overall - k, 0), 1) * 100);
  }

  ariaSummaryStars(): string {
    return `Rating ${this.avgRating} out of 5 stars`;
  }

  ariaReviewStars(rating: number): string {
    return `${rating} out of 5 stars`;
  }
}
