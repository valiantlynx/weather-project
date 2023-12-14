# weatherProject
use of openweather.org api

### adding new projects with their own git history
```sh
git subtree add --prefix=apps/weather-project https://github.com/valiantlynx/weather-project.git master --squash
git subtree pull --prefix=apps/weather-project https://github.com/valiantlynx/weather-project.git master --squash
git subtree push --prefix=apps/weather-project https://github.com/valiantlynx/weather-project.git master

```
