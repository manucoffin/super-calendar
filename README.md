# Vue + TypeScript starter project

This project consist of a basic blog app with some components, routes and a store as examples to get started for larger applications.
It is created with vue-cli, with a modules oriented folders structure, and it uses:
- Typsecript
- Vuex
- Vue-router

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Pour générer un JSON
[json-generator](https://www.json-generator.com/)
```javascript
{
  articles:[
    '{{repeat(30)}}',
    {
      _id: '{{objectId()}}',
      title: '{{firstName()}}',
      content: '{{lorem(1, "paragraphs")}}',
      author: {
        id: '{{objectId()}}',
        firstname: '{{firstName()}}',
        lastname: '{{surname()}}'
      },
      created_at: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
      comments: [
        '{{repeat(random(0,6))}}',
        {
          content: '{{lorem(random(1,3), "paragraphs")}}',
          author: {
            id: '{{objectId()}}',
            firstname: '{{firstName()}}',
            lastname: '{{surname()}}'
          },
          created_at: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}'
        }
      ]
    }
  ]
}
```