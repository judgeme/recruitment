import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppActivityLoader from '@/components/shared/AppActivityLoader/index.vue';
import AppLoader from '@/components/shared/AppLoader/index.vue';

describe('AppActivityLoader.vue', () => {
  it('renders correctly and matches snapshot when loading is false', () => {
    const wrapper = mount(AppActivityLoader, {
      props: { loading: false },
      slots: {
        default: '<p>Some default content here</p>',
      },
    });

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);

    // Check if the AppLoader is not rendered
    expect(wrapper.findComponent(AppLoader).exists()).toBe(false);

    // Snapshot test
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly and matches snapshot when loading is true', () => {
    const wrapper = mount(AppActivityLoader, {
      props: { loading: true },
      slots: {
        default: '<p>Some default content here</p>',
      },
    });

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);

    // Check if the AppLoader is rendered
    expect(wrapper.findComponent(AppLoader).exists()).toBe(true);

    // Snapshot test
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders slot content correctly', () => {
    const wrapper = mount(AppActivityLoader, {
      props: { loading: false },
      slots: {
        default: '<p>Some default content here</p>',
      },
    });

    // Check if the slot content is rendered
    expect(wrapper.html()).toContain('Some default content here');
  });
});
