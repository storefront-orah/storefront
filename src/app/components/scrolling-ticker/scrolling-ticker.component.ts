import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export type TickerIcon =
  | 'fresh'
  | 'zero-sugar'
  | 'no-liquid'
  | 'clock'
  | 'pocket'
  | 'vitamins'
  | 'check'
  | 'package'
  | 'globe';

export interface TickerItem {
  label: string;
  icon: TickerIcon;
}

@Component({
  selector: 'app-scrolling-ticker',
  standalone: true,
  imports: [NgClass],
  templateUrl: './scrolling-ticker.component.html',
  styleUrl: './scrolling-ticker.component.css',
})
export class ScrollingTickerComponent {
  @Input({ required: true }) items: TickerItem[] = [];
  /** light: white band / navy • blue: mid blue bar • promo: darker strip, sentence-case promo line */
  @Input() variant: 'light' | 'blue' | 'promo' = 'light';
  /** When false, content is centered with no marquee (use for promo / subscription strip). */
  @Input() scroll = true;
}
