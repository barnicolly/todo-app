import { shallowMount, mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import EditForm from '@/components/ToDo/EditForm.vue';

describe('EditForm.vue', () => {
  let wrapper;
  let id;
  let title;

  beforeEach(() => {
    id = faker.string.uuid();
    title = faker.lorem.sentence();
    wrapper = mount(EditForm, {
      props: {
        title,
        id,
      },
      attachTo: document.body,
    });
  });

  it('should correct initialize', () => {
    const input = wrapper.find('.todo-item__edit-input');
    expect(wrapper.vm.newTitle).toBe(title);
    expect(input.element.value).toContain(title);
    expect(document.activeElement).toBe(input.element);
  });

  it('click cancel btn', () => {
    wrapper.find('.btn--cancel').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('edit-cancelled');
  });

  it('click save btn', async () => {
    const input = wrapper.find('.todo-item__edit-input');

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
