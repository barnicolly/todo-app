import { faker } from '@faker-js/faker';

import { setActivePinia, createPinia } from 'pinia';
import { useAlertStore } from '@/store/alert';

describe('Alert state, actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    useAlertStore();
  });

  it('showAlert', () => {
    const store = useAlertStore();
    expect(store.alert).toBe('');
    const alert = faker.lorem.sentence();
    store.showAlert(alert);
    expect(store.alert).toBe(alert);
  });

  it('removeAlert', () => {
    const store = useAlertStore();
    store.alert = faker.lorem.sentence();
    store.removeAlert();
    expect(store.alert).toBe('');
  });
});
