import {
  Component,
  computed,
  signal,
  inject,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ScrollingTickerComponent,
  type TickerItem,
} from '../components/scrolling-ticker/scrolling-ticker.component';

import { TestimonialsSectionComponent } from '../components/testimonials-section/testimonials-section.component';
import { FormulaSectionComponent } from '../components/formula-section/formula-section.component';
import { ReviewsProComponent } from '../components/reviews-pro/reviews-pro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ScrollingTickerComponent,
    ReviewsProComponent,
    TestimonialsSectionComponent,
    FormulaSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private productObserver?: IntersectionObserver;

  readonly year = new Date().getFullYear();
  /** Bottom promo bar — hidden while #product is in view */
  readonly stickyBarVisible = signal(true);

  readonly promoTickerItems: TickerItem[] = [
    { label: 'Free shipping + 30% off all subscriptions', icon: 'package' },
  ];

  /** PDP step 1 — energy / focus / stack (drives flavor + product gallery) */
  readonly pdpEffect = signal<'energy' | 'focus' | 'stack'>('energy');

  private static readonly galleryEnergyUrls: readonly string[] = Array.from(
    { length: 6 },
    (_, i) => `/pics/product/energy/${i + 1}.webp`,
  );

  private static readonly galleryFocusUrls: readonly string[] = Array.from(
    { length: 7 },
    (_, i) => `/pics/product/focus/${i + 1}.webp`,
  );

  /** PDP gallery thumbs: Energy, Focus, or Stack (both sets) */
  readonly galleryThumbUrls = computed(() => {
    switch (this.pdpEffect()) {
      case 'energy':
        return [...HomeComponent.galleryEnergyUrls];
      case 'focus':
        return [...HomeComponent.galleryFocusUrls];
      case 'stack':
        return [...HomeComponent.galleryEnergyUrls, ...HomeComponent.galleryFocusUrls];
    }
  });

  readonly activeGalleryIndex = signal(0);

  readonly activeGallerySrc = computed(() => {
    const urls = this.galleryThumbUrls();
    if (!urls.length) return '/HeroImage.webp';
    const i = this.activeGalleryIndex();
    const clamped = Math.max(0, Math.min(i, urls.length - 1));
    return urls[clamped] ?? '/HeroImage.webp';
  });

  /** PDP step 3 — subscribe vs one-time */
  readonly purchaseMode = signal<'subscribe' | 'onetime'>('subscribe');

  selectGallery(index: number): void {
    this.activeGalleryIndex.set(index);
  }

  setPdpEffect(effect: 'energy' | 'focus' | 'stack'): void {
    this.pdpEffect.set(effect);
    this.activeGalleryIndex.set(0);
  }

  setPurchaseMode(mode: 'subscribe' | 'onetime'): void {
    this.purchaseMode.set(mode);
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.observeProductSection());
  }

  ngOnDestroy(): void {
    this.productObserver?.disconnect();
  }

  private observeProductSection(): void {
    const product = document.getElementById('product');
    if (!product) return;
    this.productObserver?.disconnect();
    this.productObserver = new IntersectionObserver(
      (entries) => {
        const intersecting = entries[0]?.isIntersecting ?? false;
        this.ngZone.run(() => this.stickyBarVisible.set(!intersecting));
      },
      { threshold: 0, rootMargin: '0px' },
    );
    this.productObserver.observe(product);
  }
}
