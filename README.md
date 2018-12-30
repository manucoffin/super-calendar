# Super Calendar

Un grand calendrier implique de grandes responsabilités. <br>
Fait en VueJS.

## Organisation du projet
La plupart du code se trouve dans le dossier `/modules`. Dans ce dossier, le code est réparti dans des sous-dossiers, chacun correspondant à un module de l'application.

Chaque module a pour point d'entrée un fichier `index.vue`. Ce fichier sert notamment à enregistrer un sous module dans le store (ainsi chaque module a son propre store), et à requêter les éléments nécessaire au fonctionnement du module. De manière générale, tout ce qui sert dans l'ensemble du module devrait être initialisé dans ce fichier.<br>
Afin d'éviter la duplication de code, le code commun à tous les modules a été stocké dans la mixin `/mixins/module-init.ts`. Le composant `index.ts` doit étendre cette mixin. 

Chaque module comprend également un dossier `components` qui contient les composants (fichiers .vue) propre à ce module.

Enfin, un module peut comporter un dossier `store`, dans lequel on retrouve le store privé du module (store non accessible depuis un autre module). <br>
Le point d'entrée du store est le fichier `store/index.ts`, dans lequel on définit le state et ou on importe les fichiers d'actions, mutations et getters.

À la racine du projet, on retrouve un dossier `/components` dans lequel on peut mettre les composants globaux à l'application. <br>

Le dossier `/store` sert à initialiser le store global de l'application, et à importer les store de chaque module.

Le dossier `/mixins` contient les mixins de l'application (code réutilisable partagé entre plusieurs composants).

Le dossier `/models` comprend toutes les interfaces d'objet utilisées dans l'application.

Le dossier `/assets` comporte entre autre les styles globaux à l'application, ainsi que les typographies et images. <br>
Il est possible de charger des fichiers de style dans chaque composant à l'aide du module webpack `sass-resources-loader`. Pour ce faire, il suffit de rajouter le chemin du fichier dans le tableau `resources` dans le fichier `/vue.config.js`. 

## Project setup
Copier `.env.dist` et le renommer `.env`. <br>
Il faudra ensuite affecter les variables d'environnement. 

Puis, installer les dépendances à l'aide de la commande :
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