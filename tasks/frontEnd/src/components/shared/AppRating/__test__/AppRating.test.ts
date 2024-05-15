import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppRating from '@/components/shared/AppRating/index.vue';
import AppIcon from '@/components/shared/AppIcon/index.vue';
import AppFormItem from '@/components/shared/AppFormItem/index.vue';

// Mock components if necessary
const components = {
  AppIcon,
  AppFormItem,
};

describe('AppRating.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(AppRating, {
      global: {
        components,
      },
    });

    // Check if the stars are rendered correctly
    const stars = wrapper.findAll('button');
    expect(stars.length).toBe(5); // Default rating is 5
  });

  it('sets rating correctly on click', async () => {
    const wrapper = mount(AppRating, {
      global: {
        components,
      },
    });

    const stars = wrapper.findAll('button');
    await stars[2].trigger('click');

    // Check if the third star is active
    expect(stars[0].classes()).toContain('text-secondary');
    expect(stars[1].classes()).toContain('text-secondary');
    expect(stars[2].classes()).toContain('text-secondary');
    expect(stars[3].classes()).not.toContain('text-secondary');
    expect(stars[4].classes()).not.toContain('text-secondary');
  });

  it('disables setting rating when disabled prop is true', async () => {
    const wrapper = mount(AppRating, {
      global: {
        components,
      },
      props: {
        disabled: true,
      },
    });

    const stars = wrapper.findAll('button');
    await stars[2].trigger('click');

    // Check if none of the stars are active
    stars.forEach((star) => {
      expect(star.classes()).not.toContain('text-secondary');
    });
  });

  it('renders the correct number of stars based on the ratings prop', () => {
    const wrapper = mount(AppRating, {
      global: {
        components,
      },
      props: {
        ratings: 7,
      },
    });

    const stars = wrapper.findAll('button');
    expect(stars.length).toBe(7);
  });
});