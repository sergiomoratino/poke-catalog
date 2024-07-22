import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../src/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  it('emits search event with input value', async () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input[type="text"]');

    await input.setValue('Pikachu');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')![0]).toEqual(['Pikachu']);
  });
});
