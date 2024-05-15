import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppTextAreaField from '@/components/shared/AppTextAreaField/index.vue';

describe('AppTextAreaField.vue', () => {
  it('renders textarea element with default props', () => {
    const wrapper = mount(AppTextAreaField);

    // Check if the textarea element is rendered
    const textarea = wrapper.find('textarea');
    expect(textarea.exists()).toBe(true);

    // Check if default classes are applied
    expect(textarea.classes()).toContain('block');
    expect(textarea.classes()).toContain('w-full');
    expect(textarea.classes()).toContain('py-[15px]');
    expect(textarea.classes()).toContain('px-5');
    expect(textarea.classes()).toContain('text-primary');
    expect(textarea.classes()).toContain('bg-white');
    expect(textarea.classes()).toContain('border');
    expect(textarea.classes()).toContain('outline-0');
    expect(textarea.classes()).toContain('transition-colors');
    expect(textarea.classes()).toContain('placeholder:text-grey-deep');

    // Check if default attributes are applied
    expect(textarea.attributes('autocomplete')).toBe('off');

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('applies custom props and classes correctly', async () => {
    const wrapper = mount(AppTextAreaField, {
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

    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('id')).toBe('test-id');
    expect(textarea.attributes('name')).toBe('test-name');
    expect(textarea.attributes('autocomplete')).toBe('off');
    expect(textarea.classes()).toContain('border-danger');

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits blur event on textarea blur', async () => {
    const wrapper = mount(AppTextAreaField);
    const textarea = wrapper.find('textarea');

    await textarea.trigger('blur');

    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('emits model value event on textarea changes', async () => {
    const wrapper = mount(AppTextAreaField);
    const textarea = wrapper.find('textarea');

    await textarea.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

});
