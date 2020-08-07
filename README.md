![Test](https://github.com/tourhero/travel-reopening/workflows/Test%20and%20Build/badge.svg)

# Project Travel Reopening

![The Ultimate Guide to COVID-19 Travel Restrictions](public/img/travel-reopening-cover.jpg)

[Project Travel Reopening](https://www.tourhero.com/en/ultimate-guide-covid19-travel-restrictions-reopening/) is a free and open-source project by [TourHero](https://www.tourhero.com/). It provides an up-to-date view of travel restrictions around the world due to the COVID-19 pandemic. We hope this information will be useful to businesses and individuals who require insights into the global situation in planning their travel.

Our data is pulled from multiple sources including official government websites and news outlets. Selecting a country will display detailed information on domestic travel, international travel, and visa and quarantine regulations current to the destination, as well as relevant links to sources.

### How You Can Contribute

As the situation changes rapidly around the world, keeping information up-to-date can be challenging. If you spot any incorrect or outdated information, we encourage you to contribute to the project. Alternatively, you can submit data or situation reports from your region to [travel-map@tourhero.com](mailto:travel-map@tourhero.com).

### About Our Data

We gather our data from hundreds of sources to ensure that our information
is up-to-date. Our sources include official government websites
and reputable news outlets. Please note, however, that advisories may change
without warning. We encourage you to check the official government websites
before traveling.

We also provide community COVID-19 statistics to help you make an informed
travel decision. These statistics come from the [European Centre for Disease Prevention and Control](https://www.ecdc.europa.eu/en/covid-19-pandemic),
and show daily new confirmed cases, total confirmed cases, and total deaths.

**Daily new confirmed cases:** Reflects the daily number of COVID-19 cases
in given country.

**Total confirmed cases:** Reflects the total number of positive COVID-19 cases
in given country.

**Total deaths:** Reflects the total number of deaths caused by COVID-19
in given country.

## Project Setup

Mac Requirements:

1. `Xcode` - Install this from [App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
1. [`homebrew`](https://brew.sh/) - Software package manager: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
1. [`asdf`](https://asdf-vm.com/#/core-manage-asdf-vm?id=install) - Multiple runtime versions manager: `brew install asdf`
1. Add `. $(brew --prefix asdf)/asdf.sh` to your shell - See [asdf documentation](https://asdf-vm.com/#/core-manage-asdf-vm?id=add-to-your-shell)
1. [`yarn`](https://yarnpkg.com/) - Install yarn via asdf: `asdf plugin-add yarn; asdf install yarn latest`

**Note:** If you get the following error while trying to install yarn via asdf: `Missing one or more of the following dependencies: tar, gpg`, run `brew install gpg` and `brew link --overwrite gnupg` first, and then run `asdf install yarn latest` again.

Clone this project from GitHub then run:

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

### Compiles and minifies for production

```sh
yarn build
```

### Run your unit tests

```sh
yarn test:unit
```

### Lints and fixes files

```sh
yarn lint
```
