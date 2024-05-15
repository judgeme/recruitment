import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppLoader from '@/components/shared/AppLoader/index.vue';

describe('AppLoader.vue', () => {
  it('matches the snapshot', () => {
    const wrapper = mount(AppLoader);
    expect(wrapper.html()).toMatchSnapshot();
  });
  
  it('should render correctly with the specified classes and styles', () => {
    const wrapper = mount(AppLoader);

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);

    // Check the span element with the loader class
    const loaderSpan = wrapper.find('span.loader');
    expect(loaderSpan.exists()).toBe(true);

    // Check for the classes applied to the span element
    expect(loaderSpan.classes()).toContain('w-12');
    expect(loaderSpan.classes()).toContain('h-12');
    expect(loaderSpan.classes()).toContain('rounded-full');
    expect(loaderSpan.classes()).toContain('inline-block');
    expect(loaderSpan.classes()).toContain('relative');
    expect(loaderSpan.classes()).toContain('border-solid');
    expect(loaderSpan.classes()).toContain('border-[3px]');
    expect(loaderSpan.classes()).toContain('border-t-primary');
    expect(loaderSpan.classes()).toContain('border-r-primary');
    expect(loaderSpan.classes()).toContain('border-b-transparent');
    expect(loaderSpan.classes()).toContain('border-l-transparent');
    expect(loaderSpan.classes()).toContain('animate-spin');
  });
});
