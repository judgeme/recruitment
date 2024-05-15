import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { describe, it, expect } from 'vitest';

import AppButton from '@/components/shared/AppButton/index.vue'; 

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('AppButton.vue', () => {
  it('renders button element correctly with default props', () => {
    const wrapper = mount(AppButton);

    // Check if the button element is rendered
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);

    // Check if default classes are applied
    expect(button.classes()).toContain('py-3');
    expect(button.classes()).toContain('px-6');
    expect(button.classes()).toContain('bg-primary');
    expect(button.classes()).toContain('text-white');

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('applies variant classes correctly', async () => {
    const wrapper = mount(AppButton, {
      props: { variant: 'secondary' },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain('bg-secondary');
    expect(button.classes()).toContain('text-primary');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders as anchor element with correct props', async () => {
    const wrapper = mount(AppButton, {
      props: { as: 'a', to: '/path' },
      global: {
        plugins: [router]
      }
    });

    const appLink = wrapper.findComponent({ name: 'AppLink' });
    expect(appLink.exists()).toBe(true);
    expect(appLink.props('to')).toBe('/path');

    expect(wrapper.html()).toMatchSnapshot();
  });

});
