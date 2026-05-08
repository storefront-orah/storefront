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

  readonly galleryThumbUrls = [
    '/product-pdp-hero.png',
    '/energy-moves-products.png',
    '/hero-bg.png',
    '/energy-moves-products.png',
    '/product-pdp-hero.png',
    '/hero-bg.png',
  ];

  readonly activeGalleryIndex = signal(0);

  readonly activeGallerySrc = computed(() => this.galleryThumbUrls[this.activeGalleryIndex()] ?? '/product-pdp-hero.png');

  /** PDP step 1 — energy / focus / stack (drives flavor display) */
  readonly pdpEffect = signal<'energy' | 'focus' | 'stack'>('energy');

  /** PDP step 3 — subscribe vs one-time */
  readonly purchaseMode = signal<'subscribe' | 'onetime'>('subscribe');

  selectGallery(index: number): void {
    this.activeGalleryIndex.set(index);
  }

  setPdpEffect(effect: 'energy' | 'focus' | 'stack'): void {
    this.pdpEffect.set(effect);
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
