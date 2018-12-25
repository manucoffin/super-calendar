# Super Calendar

A super hero themed calendar, made with VueJs.

## Project setup
Copy `.env.dist` and rename it `.env`. 
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
  events:[
    '{{repeat(30)}}',
    {
      id: '{{index(1)}}',
      date_start: '{{ date(new Date(2018, 0, 1), new Date(), "YYYY-MM-dd HH:mm:ss") }}',
      duration: '{{integer(1, 4320)}}',
      label: '{{firstName()}}',
      description: '{{lorem(1, "paragraphs")}}',
      place: '{{city()}}',
      categories: [
		'{{repeat(integer(1, 3))}}',
        {
          id: '{{index(1)}}',
          label: function (tags) {
                var categories = ['Sport', 'Musique', 'Randonnée', 'Cinéma', 'Restaurant'];
                return categories[tags.integer(0, categories.length - 1)];
              }
        }
      ]
    }
  ]
}
```