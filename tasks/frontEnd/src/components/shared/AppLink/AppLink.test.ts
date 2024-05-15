import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AppLink from '@/components/shared/AppLink/index.vue'; 
import { createRouter, createWebHistory } from 'vue-router';

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('AppLink.vue', () => {
  it('renders external link correctly', () => {
    const wrapper = mount(AppLink, {
      props: {
        to: 'http://external.com',
      },
      slots: {
        default: '<span>External Link</span>',
      },
      global: {
        plugins: [router]
      }
    });

    // Check if the external link is rendered
    const aTag = wrapper.find('a');
    expect(aTag.exists()).toBe(true);
    expect(aTag.attributes('href')).toBe('http://external.com');
    expect(aTag.attributes('target')).toBe('_blank');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders internal link correctly', async () => {
    const wrapper = mount(AppLink, {
      global: {
        plugins: [router],
      },
      props: {
        to: '/',
        activeClass: 'active',
        inactiveClass: 'inactive',
      },
      slots: {
        default: '<span>Internal Link</span>',
      },
    });

    // Check if the internal link is rendered
    const aTag = wrapper.find('a');
    expect(aTag.exists()).toBe(true);
    expect(aTag.attributes('href')).toBe('/');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('applies active and inactive classes correctly', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(AppLink, {
      global: {
        plugins: [router],
      },
      props: {
        to: '/',
        activeClass: 'active',
        inactiveClass: 'inactive',
      },
      slots: {
        default: '<span>Internal Link</span>',
      },
    });

    const aTag = wrapper.find('a');
    expect(aTag.classes()).toContain('active');

    await router.push('/another-path');
    expect(aTag.classes()).toContain('inactive');
  });

  it('navigates to internal link on click', async () => {
    const navigateMock = vi.fn();

    const wrapper = mount(AppLink, {
      global: {
        plugins: [router],
        mocks: {
          navigate: navigateMock,
        },
      },
      props: {
        to: '/',
      },
      slots: {
        default: '<span>Internal Link</span>',
      },
    });

    const aTag = wrapper.find('a');
    await aTag.trigger('click');
    expect(navigateMock).toHaveBeenCalled();
  });
});
