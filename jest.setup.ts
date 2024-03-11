import { config } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

config.global.components = {
  ...config.global.components,
  'font-awesome-icon': FontAwesomeIcon
};