import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import AppModal from '@/components/shared/AppModal/index.vue';

describe('AppModal.vue', () => {
  it('renders modal when show is true', async () => {
    const wrapper = mount(AppModal, {
      props: { show: true },
      slots: {
        default: '<div class="modal-content">Modal Content</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // it('does not render modal when show is false', () => {
  //   const wrapper = mount(AppModal, {
  //     props: { show: false },
  //   });

  //   expect(wrapper.find('.fixed.z-[1000].inset-0').exists()).toBe(false);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('emits hide event when clicking outside the modal', async () => {
  //   const wrapper = mount(AppModal, {
  //     props: { show: true },
  //     slots: {
  //       default: '<div class="modal-content">Modal Content</div>',
  //     },
  //   });

  //   await wrapper.find('.fixed.inset-0').trigger('click', {
  //     target: { dataset: { nonActive: true } },
  //   });

  //   expect(wrapper.emitted('hide')).toBeTruthy();
  //   expect(wrapper.emitted('hide')![0]).toEqual([false]);
  // });

  // it('renders slot content correctly', () => {
  //   const wrapper = mount(AppModal, {
  //     props: { show: true },
  //     slots: {
  //       default: '<div class="modal-content">Modal Content</div>',
  //     },
  //   });

  //   expect(wrapper.find('.modal-content').exists()).toBe(true);
  //   expect(wrapper.find('.modal-content').text()).toBe('Modal Content');
  // });

  // it('renders with default props', () => {
  //   const wrapper = mount(AppModal, {
  //     props: { show: true },
  //   });

  //   const modalDiv = wrapper.find('.absolute');
  //   expect(modalDiv.classes()).toContain('top-1/2');
  //   expect(modalDiv.classes()).toContain('left-1/2');
  //   expect(modalDiv.classes()).toContain('-translate-x-1/2');
  //   expect(modalDiv.classes()).toContain('-translate-y-1/2');
  //   expect(modalDiv.classes()).toContain('w-full');
  //   expect(modalDiv.classes()).toContain('px-4');
  // });
});
