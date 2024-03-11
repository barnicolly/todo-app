import { defineStore } from 'pinia';

interface AlertState {
  alert: string;
}

export const useAlertStore = defineStore({
  id: 'alert',
  state: (): AlertState => ({
    alert: '',
  }),
  actions: {
    showAlert(alert: string) {
      this.alert = alert;
    },
    removeAlert() {
      this.alert = '';
    },
  },
});
