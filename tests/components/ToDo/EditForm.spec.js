import { shallowMount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import EditForm from '@/components/ToDo/EditForm.vue';

describe('EditForm.vue', () => {
  let wrapper;
  let id;
  let title;

  beforeEach(() => {
    id = faker.string.uuid();
    title = faker.lorem.sentence();
    wrapper = shallowMount(EditForm, {
      props: {
        title,
        id,
      },
    });
  });

  it('should correct initialize', () => {
    const input = wrapper.find('input');
    expect(wrapper.vm.newTitle).toBe(title);

    expect(input.attributes().id).toBe(id);
    expect(input.element.value).toContain(title);
  });

  it('click cancel btn', () => {
    wrapper.find('.btn--cancel').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('edit-cancelled');
  });

  it('click save btn', async () => {
    const input = wrapper.find('input');

    input.element.value = 'new value';
    await input.trigger('change');

    expect(wrapper.vm.newTitle).toBe('new value');
    wrapper.find('.btn--save').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('item-edited');
  });
});

describe('EditForm.vue Snapshot', () => {
  it('has same HTML structure', () => {
    const wrapper = shallowMount(EditForm, {
      props: {
        title: 'some-title',
        id: 'some-uuid',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
