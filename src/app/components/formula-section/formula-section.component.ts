import { Component, computed, signal } from '@angular/core';

export interface FormulaIngredient {
  name: string;
  detail: string;
  foundIn: string;
  benefits: string;
  imageUrl: string;
  imageAlt: string;
}

@Component({
  selector: 'app-formula-section',
  standalone: true,
  templateUrl: './formula-section.component.html',
  styleUrl: './formula-section.component.css',
})
export class FormulaSectionComponent {
  readonly mode = signal<'energy' | 'focus'>('energy');

  private readonly energyIngredients: FormulaIngredient[] = [
    {
      name: 'Caffeine',
      detail:
        '50 mg, about 1 cup of coffee. Sourced naturally from tea leaves',
      foundIn: 'Green tea leaves',
      benefits: 'Sharpens concentration, fights fatigue, and pairs cleanly with L-theanine for a smoother feel.',
      imageUrl: '/pics/ingredients/energy/caffeine.webp',
      imageAlt: 'Roasted coffee beans',
    },
    {
      name: 'L-Theanine',
      detail: 'Supports the production of serotonin, dopamine, and GABA.',
      foundIn: 'Green tea',
      benefits: 'Regulates mood and behavior, and reduces jitters when paired with caffeine.',
      imageUrl: '/pics/ingredients/energy/theanine.webp',
      imageAlt: 'Fresh green tea leaves',
    },
    {
      name: 'Vitamin B12',
      detail: 'Potent adaptogen with stress-reducing and energizing effects.',
      foundIn: 'Mushrooms',
      benefits: 'Reduces stress, modulates cortisol, improves mood.',
      imageUrl: '/pics/ingredients/energy/b12.webp',
      imageAlt: 'Mushrooms',
    },
    {
      name: 'Ginseng',
      detail: 'Traditionally used adaptogenic root extract.',
      foundIn: 'Red Korean ginseng',
      benefits: 'Supports cognitive clarity and focus alongside your daily routine.',
      imageUrl: '/pics/ingredients/energy/ginseng.webp',
      imageAlt: 'Dried Korean red ginseng roots',
    },
  ];

  private readonly focusIngredients: FormulaIngredient[] = [
    {
      name: "Lion's mane",
      detail:
        'Nootropic mushroom traditionally linked to cognitive clarity, memory, and nerve health.',
      foundIn: 'Hericium erinaceus',
      benefits:
        'Supports calm focus and mental sharpness when you need to think clearly under pressure.',
      imageUrl: '/pics/ingredients/focus/lions-mane.webp',
      imageAlt: "Lion's mane mushroom",
    },
    {
      name: 'Shiitake',
      detail:
        'Rich in beta glucans. Used for centuries in East Asian wellness traditions.',
      foundIn: 'Lentinula edodes',
      benefits:
        'Helps reinforce immune resilience and everyday vitality as part of a balanced routine.',
      imageUrl: '/pics/ingredients/focus/shiitake.webp',
      imageAlt: 'Shiitake mushrooms',
    },
    {
      name: 'Maitake',
      detail: 'Prized for metabolic balance and adaptive stress support.',
      foundIn: 'Grifola frondosa',
      benefits:
        'Supports steady energy and stress balance when workload and life stack up.',
      imageUrl: '/pics/ingredients/focus/maitake.webp',
      imageAlt: 'Maitake mushroom',
    },
    {
      name: 'Cordyceps',
      detail: 'Used for stamina and endurance in traditional herbal practice.',
      foundIn: 'Cordyceps militaris',
      benefits:
        'Supports steady output, breathing comfort, and resilient energy on long days without the wired spike.',
      imageUrl: '/pics/ingredients/focus/cordyceps.webp',
      imageAlt: 'Cordyceps militaris',
    },
  ];

  readonly visibleIngredients = computed(() =>
    this.mode() === 'energy' ? this.energyIngredients : this.focusIngredients,
  );

  readonly cardBadge = computed(() => (this.mode() === 'energy' ? 'Energy' : 'Focus'));

  readonly cardDescription = computed(() =>
    this.mode() === 'energy'
      ? '50mg of green coffee caffeine paired with L-theanine for calm focus, B12 for sustain, and Korean Red Ginseng for adaptive support.'
      : 'A four-mushroom stack of Lion\'s Mane, Shiitake, Maitake, and Cordyceps for clean cognition with zero caffeine',
  );

  toggleMode(): void {
    this.mode.update((m) => (m === 'energy' ? 'focus' : 'energy'));
  }

  isFocusActive(): boolean {
    return this.mode() === 'focus';
  }
}
