
## Описание

Данный проект был выполнен как тестовое задание для компании Valantis. Этот проект создан с использованием следующих технологий и инструментов:

- [React](https://reactjs.org/) - библиотека для разработки пользовательских интерфейсов.
- [TypeScript](https://www.typescriptlang.org/) - язык программирования с типизацией для JavaScript.
- [Vite](https://vitejs.dev/) - быстрая инструментальная панель для разработки веб-приложений.
- [Axios](https://axios-http.com/?ref=blog) - это библиотека для выполнения HTTP-запросов из браузера или из Node.js.
- [md5](https://www.npmjs.com/package/ts-md5) - библиотека для работы с данными в хэшированными данными

## Установка

1. Склонируйте репозиторий на свою локальную машину:

   ```
   git clone https://github.com/dimkabrz/dimkabrz.github.io.git
   ```

2. Перейдите в директорию проекта:

   ```
   cd your-project
   ```

3. Установите зависимости:

   ```
   npm install
   ```

## Запуск

Чтобы запустить проект, выполните следующие команды:

```
npm run dev
```

Проект будет доступен по адресу: ` http://localhost:517

Задание

Используя предоставленный апи создать страницу, которая отражает список товаров. Для каждого товара должен отображаться его id, название, цена и бренд.
Требования:
• выводить по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны.
• возможность фильтровать выдачу используя предоставленное апи по названию, цене и бренду

Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются.
Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.

Пароль для доступа к апи: Valantis
API доступно по адресу: https://api.valantis.store:41000/


Форма подачи:
Выполненное задание разместите на github pages или аналогичном сервисе.
В сообщении на hh отправить ссылку на сайт и на исходник.
Работы без ссылки на рабочий проект рассматриваться не будут.
