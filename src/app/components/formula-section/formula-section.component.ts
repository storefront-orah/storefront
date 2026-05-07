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
      detail: '150 mg — about two small cups of coffee',
      foundIn: 'Coffee beans & tea leaves',
      benefits: 'Sharpens concentration, fights fatigue, and pairs cleanly with L-theanine for a smoother feel.',
      imageUrl:
        'https://images.unsplash.com/photo-1559056199-641bd08bd746?w=520&q=80',
      imageAlt: 'Roasted coffee beans',
    },
    {
      name: 'L-Theanine',
      detail: 'Balances stimulation from caffeine',
      foundIn: 'Green tea',
      benefits: 'Supports calm focus, mood balance, and helps take the edge off jitters.',
      imageUrl:
        'https://images.unsplash.com/photo-1564890369479-c89cdf646ddf?w=520&q=80',
      imageAlt: 'Fresh green tea leaves',
    },
    {
      name: 'Vitamin B12',
      detail: 'Methylcobalamin — active form your body can use',
      foundIn: 'Fortified foods & fermentation-derived sources',
      benefits: 'Supports natural energy metabolism and mental clarity.',
      imageUrl:
        'https://images.unsplash.com/photo-1587735243475-221cf8599353?w=520&q=80',
      imageAlt: 'Vitamin supplement tablets',
    },
    {
      name: "Lion's mane",
      detail: 'Traditionally used nootropic mushroom extract',
      foundIn: 'Hericium erinaceus',
      benefits: 'Supports cognitive clarity and focus alongside your daily routine.',
      imageUrl:
        'https://images.unsplash.com/photo-1576678927459-525cf292c987?w=520&q=80',
      imageAlt: "Lion's mane mushroom",
    },
  ];

  private readonly focusIngredients: FormulaIngredient[] = [
    {
      name: 'L-Theanine',
      detail: 'Calm-alert balance for sustained attention',
      foundIn: 'Green tea',
      benefits: 'Helps smooth mental stimulation so you can stay on task without feeling wired.',
      imageUrl:
        'https://images.unsplash.com/photo-1564890369479-c89cdf646ddf?w=520&q=80',
      imageAlt: 'Fresh green tea leaves',
    },
    {
      name: "Lion's mane",
      detail: 'Traditionally used nootropic mushroom extract',
      foundIn: 'Hericium erinaceus',
      benefits: 'Often chosen for cognitive clarity and staying sharp through long days.',
      imageUrl:
        'https://images.unsplash.com/photo-1576678927459-525cf292c987?w=520&q=80',
      imageAlt: "Lion's mane mushroom",
    },
    {
      name: 'Caffeine',
      detail: '150 mg — clean alertness when you need it',
      foundIn: 'Coffee beans & tea leaves',
      benefits: 'Keeps reaction time and attention sharp while theanine smooths the ride.',
      imageUrl:
        'https://images.unsplash.com/photo-1559056199-641bd08bd746?w=520&q=80',
      imageAlt: 'Roasted coffee beans',
    },
    {
      name: 'Vitamin B12',
      detail: 'Methylcobalamin — active form your body can use',
      foundIn: 'Fortified foods & fermentation-derived sources',
      benefits: 'Supports brain and nerve health as part of your overall energy picture.',
      imageUrl:
        'https://images.unsplash.com/photo-1587735243475-221cf8599353?w=520&q=80',
      imageAlt: 'Vitamin supplement tablets',
    },
  ];

  readonly visibleIngredients = computed(() =>
    this.mode() === 'energy' ? this.energyIngredients : this.focusIngredients,
  );

  readonly cardBadge = computed(() => (this.mode() === 'energy' ? 'Energy' : 'Focus'));

  readonly cardDescription = computed(() =>
    this.mode() === 'energy'
      ? 'Instant, jitter-free energy and focus in a slim strip—perfect before workouts, travel, or whenever you need a clear lift.'
      : 'Dial in calm, sustained concentration—ideal for deep work, study sessions, and staying sharp without the crash.',
  );

  toggleMode(): void {
    this.mode.update((m) => (m === 'energy' ? 'focus' : 'energy'));
  }

  isFocusActive(): boolean {
    return this.mode() === 'focus';
  }
}
