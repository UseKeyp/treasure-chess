# `localization`

This packages does the following:

1. Contains the shared configuration for `i18next-scanner`
2. Compiles locales from all workspaces
3. Gets the translations using Locize

## Setup

```js
yarn global add locize-cli
```

## Developing

Use this script if you need to continue development, without waiting for translations.

```bash
# Compile to src/locales
yarn compile
```

That's it you're done!

When you add new language you **must** include it in `src/importLocale.js` because locales in `day.js` library have to be imported individually. See all available locales in the [dayjs repo](https://github.com/iamkun/dayjs/tree/dev/src/locale)

```js
import 'dayjs/locale/fr'
import 'dayjs/locale/de'
import 'dayjs/locale/ru'
// more languages
```

## Going to Production

#### 1. Gather all the locales

```bash
# Compile to src/locales
yarn compile
```

#### 2. Upload (See options below)

## Crowdin

```bash
# Upload sources
yarn crowdin upload sources

yarn crowdin status
yarn crowdin status proofreading

# Download translations
yarn crowdin download
yarn crowdin download --dryrun
```

## Locize

Create a new project in Locize. Go to Project > Settings and scroll down four your API keys. Use `.template.locize` to save your keys to a file named `.locize`. Now you have two options:

Option A - I want to be extra careful

```bash
# Check that everything looks good in a dry run
yarn sync

# Perform the sync
yarn sync-confirm
```

Option B - I know what I'm doing

```bash
# Only save the missing keys
locize save-missing --path src/locales --dry true

# Run this to check, then run without "--dry true"
locize sync --path src/locales --skip-delete true --format flat --update-values true --dry true

# Updates values for existing keys (eg. you edited the reference language text)
locize sync --path src/locales --update-values true --skip-delete true --dry true

# Warning: Permanently deletes keys & translations(!) no longer included in reference language. Translations can be recovered in the Locize app under the Project Settings > Backups.
locize sync --path src/locales --dry true
```

#### 3. Purchase translations on locize

Go to Project > Settings and add a translation "Service" by adding it's API key (eg. OneHourTranslation)

#### 4. Download translated locales from Locize

> Since some of our keys container periods eg ".", we need to pass the `flat` format flag.

```bash
locize sync --path src/locales --skip-delete true --format flat --dry true
```

#### 5. Push the translated locales to the app

No action needed, the app will automatically pull locales from this package using a script in `gatsby-node.js`.

## Variables

> NOTE: This section really only applies to pre-rendered code, such as in Gatsby

`i18next-scanner` does not pre-compute keys for `i18next`. For example doing a dynamically generated `t({campaign.headerText})` in the campaign pages will not work, since the scanner doesn't know the value of `campaign.headerText`.

To get around this, a script `generateCampaignLocale` is used to generate a new locale for each campaign. It is run automatically during `compileLocales()`.

## Other

#### Codes

Should adhere to ISO 639-1 ([list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)) and ISO 3166-1 ([list](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes)) separated with a hyphen.

#### Labeling languages

Languages should always appear using their native text. See `src/index.js`

#### One Hour translation API keys

See https://www.onehourtranslation.com/profile/apiKeys
