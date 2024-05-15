import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppCard from '@/components/shared/AppCard/index.vue'; 

describe('AppCard.vue', () => {
  it('renders card with provided slot content', () => {
    const slotContent = 'This is the content of the card';

    const wrapper = mount(AppCard, {
      slots: {
        default: slotContent,
      },
    });

    // Check if the card element is rendered
    const card = wrapper.find('div');
    expect(card.exists()).toBe(true);

    // Check if the provided slot content is rendered
    expect(card.text()).toContain(slotContent);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
