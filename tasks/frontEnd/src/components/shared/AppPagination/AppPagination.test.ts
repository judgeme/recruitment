import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AppPagination from '@/components/shared/AppPagination/index.vue';
import { nextTick } from 'vue';

describe('AppPagination', () => {

  it('renders pagination correctly with page numbers and navigation buttons', async () => {
    const wrapper = mount(AppPagination, {
      props: {
        totalCount: 15,
        pageSize: 5,
        currentPage: 1,
      },
    });

    await nextTick();

    const paginationNav = wrapper.find('nav');
    expect(paginationNav.exists()).toBe(true);

    const pageButtons = wrapper.findAll('button');
    expect(pageButtons.length).toBe(3 + 1 + 1);
  });

  it('emits onPageChange event correctly on page click', async () => {
    const wrapper = mount(AppPagination, {
      props: {
        totalCount: 25,
        pageSize: 5,
        currentPage: 2,
      },
    });

    await nextTick();

    const pageButtons = wrapper.findAll('button');
    await pageButtons[1].trigger('click');

    expect(wrapper.emitted('onPageChange')).toBeTruthy();
  });

  it('emits onPageChange event correctly on navigation button click', async () => {
    const wrapper = mount(AppPagination, {
      props: {
        totalCount: 25,
        pageSize: 5,
        currentPage: 3,
      },
    });

    await nextTick();

    const nextPageButton = wrapper.find('[aria-label="next"]');
    await nextPageButton.trigger('click');

    expect(wrapper.emitted('onPageChange')).toBeTruthy();
  });
});
