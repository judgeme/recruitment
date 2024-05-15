import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppTextField from '@/components/shared/AppTextField/index.vue';

describe('AppTextField.vue', () => {
  it('renders input element with default props', () => {
    const wrapper = mount(AppTextField);

    // Check if the input element is rendered
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);

    // Check if default classes are applied
    expect(input.classes()).toContain('block');
    expect(input.classes()).toContain('w-full');
    expect(input.classes()).toContain('py-[15px]');
    expect(input.classes()).toContain('px-5');
    expect(input.classes()).toContain('text-primary');
    expect(input.classes()).toContain('bg-white');
    expect(input.classes()).toContain('border');
    expect(input.classes()).toContain('outline-0');
    expect(input.classes()).toContain('transition-colors');
    expect(input.classes()).toContain('placeholder:text-grey-40');

    // Check if default attributes are applied
    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('autocomplete')).toBe('off');

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('applies custom props and classes correctly', async () => {
    const wrapper = mount(AppTextField, {
      props: {
        id: 'test-id',
        name: 'test-name',
        label: 'Test Label',
        type: 'email',
        required: true,
        invalid: true,
        helperText: 'Helper Text',
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('id')).toBe('test-id');
    expect(input.attributes('name')).toBe('test-name');
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('autocomplete')).toBe('off');
    expect(input.classes()).toContain('border-danger');
    expect(input.classes()).toContain('!bg-fairy');

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits blur event on input blur', async () => {
    const wrapper = mount(AppTextField);
    const input = wrapper.find('input');

    await input.trigger('blur');

    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('emits model value event on input changes', async () => {
    const wrapper = mount(AppTextField);
    const input = wrapper.find('input');

    await input.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

});
