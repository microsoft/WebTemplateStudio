// This script was taken from https://github.com/bang88/typescript-react-intl/issues/19, it is used to extract strings
// to be localized from typescript source to .json resource files

// For default languages and languages use the VSCode language codes.
// A list of all locales supported by VSCode can be found here: https://code.visualstudio.com/docs/getstarted/locales

const DEFAULT_LANGUAGE = "en"; // for the default language, everything is automatically whitelisted
const LANGUAGES = []; // translations to generate---don't include the default language
const TARGET_DIRECTORY = "src/translations";
const EXTRACT_MESSAGE_FILE_PATTERN = "src/**/*.@(tsx|ts)";

const TEMP_DIR = "./temp";
const TEMP_MESSAGE_FILENAME = "allMessages.json";

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const rimraf = require("rimraf");
const parser = require("typescript-react-intl").default;
const manageTranslations = require("react-intl-translations-manager").default;
const {
  readMessageFiles,
  getDefaultMessages
} = require("react-intl-translations-manager");

function extractTranslations(pattern, cb) {
  let results = [];
  pattern = pattern || "src/**/*.@(tsx|ts)";
  glob(pattern, function(err, files) {
    if (err) {
      throw new Error(err);
    }
    files.forEach(function(f) {
      const contents = fs.readFileSync(f).toString();
      const res = parser(contents);
      results = results.concat(res);
    });

    cb && cb(results);
  });
}

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

const tempMessageFilePath = path.join(TEMP_DIR, TEMP_MESSAGE_FILENAME);

extractTranslations(EXTRACT_MESSAGE_FILE_PATTERN, function(messages) {
  fs.writeFileSync(tempMessageFilePath, JSON.stringify(messages, null, 2));

  manageTranslations({
    messagesDirectory: TEMP_DIR,
    translationsDirectory: TARGET_DIRECTORY,
    languages: [DEFAULT_LANGUAGE, ...LANGUAGES],
    // avoid reporting translation issues with default language - https://github.com/GertjanReynaert/react-intl-translations-manager/issues/76
    overrideCoreMethods: {
      provideWhitelistFile: language => {
        // Avoid reporting untranslated stuff in defaultLanguage
        if (language.lang === DEFAULT_LANGUAGE) {
          const messageFiles = readMessageFiles(TEMP_DIR);
          const messages = getDefaultMessages(messageFiles).messages;
          return Object.keys(messages);
        } else {
          if (!fs.existsSync(language.whitelistFilepath)) {
            return [];
          }
          return JSON.parse(
            fs.readFileSync(language.whitelistFilepath, "utf-8")
          );
        }
      }
    }
  });

  rimraf.sync(TEMP_DIR);
});
