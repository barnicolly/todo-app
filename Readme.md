Демонстрационное приложение "Список дел" (Live demo: http://vue-todo-app.ratnikovmikhail.ru)

### Технологический стек

1. vue 3 (composition api)
2. сторонние библиотеки
   1. draggable https://github.com/SortableJS/vue.draggable.next
   2. coreui (алерты) https://coreui.io/vue/docs/4.x/getting-started/introduction.html
3. pinia (какое-то время был vuex в качестве state менеджера). Выбран pinia,
   т.к:
   1. проще тестировать
   2. написан на typescript (лучшая поддержка ide, меньше магии)
   3. vue рекомендует в качестве state менеджера по умолчанию
4. jest (установлено минимальное покрытие в 75%)
   1. функциональные тесты компонентов + snapshots
   2. unit тесты state (pinia)
5. eslint (код стайл от airbnb)
6. prettier
7. sass + БЭМ
8. docker

### Code coverage

![code coverage](./doc/code-coverage.png)

### Документация:

1. https://fakerjs.dev/api/
2. https://test-utils.vuejs.org/api/
3. https://vuejs.org/guide/introduction.html
4. https://pinia.vuejs.org/core-concepts/actions.html

### Разработка

1. запустить команду `make go`
2. перейти по адресу http://127.0.0.1:8200/
