var fs = require("fs");
var chalk = require("chalk");

const STRING_NOT_TRANSLATED = "__NOT_TRANSLATED__";

const getScannerConfig = ({ nsList }) => {
  return {
    input: [
      "src/**/*.{js,jsx}",
      "styleguide/**/*.{js,jsx}",
      // "!" to filter out files or directories
      "!src/i18n/**"
    ],
    options: {
      debug: false,
      removeUnusedKeys: true,
      plural: true,
      sort: true,
      lngs: ["en"],
      ns: nsList,
      defaultLng: "en",
      defaultNs: nsList[0],
      defaultValue: (lng, ns, val, options) => {
        if (options.defaultValue) return options.defaultValue;
        // Return val as the default value for English language
        if (lng === "en") return val;
        // Return the string '__NOT_TRANSLATED__' for other languages
        return STRING_NOT_TRANSLATED;
      },
      nsSeparator: false, // namespace separator
      keySeparator: false, // key separator
      interpolation: {
        prefix: "{{",
        suffix: "}}"
      },
      resource: {
        loadPath: "src/i18n/locales/{{lng}}/{{ns}}.json",
        savePath: "src/i18n/locales/{{lng}}/{{ns}}.json",
        jsonIndent: 2,
        lineEnding: "\n"
      },
      func: {
        list: ["i18next.t", "i18n.t", "t"],
        // Disables default parsing, so parseFuncFromString can take precidence
        extensions: []
        // extensions: [".js", ".jsx"]
      },
      trans: {
        // Disables default parsing, so parseTransFromString can take precidence
        extensions: [],
        // extensions: [".js", ".jsx"],
        component: "Trans",
        i18nKey: "i18nKey",
        defaultsKey: "defaults",
        fallbackKey: (ns, i18nKey) => {
          const [, key] = i18nKey.split(":");
          return key;
        }
      }
    },
    transform: function customTransform(file, enc, done) {
      "use strict";
      const parser = this.parser;
      const content = fs.readFileSync(file.path, enc);

      let ns;
      const match = content.match(/useTranslation\(.+\)/);
      if (match && match[0]) ns = match[0].split(/(\'|\")/)[2];

      let count = 0;
      // Handles multiple namespaces eg. t("nameSpace:someKey")
      parser.parseFuncFromString(content, { list: ["t"] }, function(
        val,
        options
      ) {
        let nameSpace = ns;
        let key = val;
        if (/.+:.+/.test(val)) [nameSpace, key] = val.split(":");
        parser.set(key, {
          ...options,
          ns: nameSpace,
          nsSeparator: false,
          keySeparator: false
        });
        ++count;
      });
      // Handles eg. <Trans i18nKey="nameSpace:someKey">The number is {{number}}</Trans>
      parser.parseTransFromString(
        content,
        { component: "Trans", i18nKey: "i18nKey" },
        function(i18nKey, options) {
          if (!/.+:.+/.test(i18nKey))
            return console.log(
              `Error: Trans key invalid: "${i18nKey}" in ${file.path}. Make sure you follow this format: <Trans i18nKey="nameSpace:someKey">`
            );
          const [nameSpace, key] = i18nKey.split(":");
          parser.set(key, {
            ...options,
            ns: nameSpace,
            nsSeparator: false,
            keySeparator: false
          });
          ++count;
        }
      );
      if (count > 0)
        console.log(
          `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
            JSON.stringify(file.relative)
          )}`
        );
      done();
    }
  };
};
module.exports = getScannerConfig;
