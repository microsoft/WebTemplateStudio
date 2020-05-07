/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");

const path = require("path");

const typescript = require("typescript");

const del = require("del");
const es = require("event-stream");

const vsce = require("vsce");
const nls = require("vscode-nls-dev");

const tsProject = ts.createProject("./tsconfig.json", { typescript });

const inlineMap = true;
const inlineSource = false;
const outDest = "out";

// A list of all locales supported by VSCode can be found here: https://code.visualstudio.com/docs/getstarted/locales
const languages = [{ folderName: "en", id: "en" }];

function compile(buildNls) {
  const r = tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(buildNls ? nls.rewriteLocalizeCalls() : es.through())
    .pipe(
      buildNls
        ? nls.createAdditionalLanguageFiles(languages, "locales", "out")
        : es.through()
    );

  if (inlineMap && inlineSource) {
    r = r.pipe(sourcemaps.write());
  } else {
    r = r.pipe(
      sourcemaps.write("../out", {
        // no inlined source
        includeContent: inlineSource,
        // Return relative source map root directories per file.
        sourceRoot: "../src"
      })
    );
  }

  // Copy configuration.json to out folder because gulp-typescript-package
  // has a issue with resolveJsonModule option
  // (https://github.com/ivogabe/gulp-typescript/issues/609)
  gulp.src('src/configuration.json')
    .pipe(gulp.dest(outDest));

  return r.pipe(gulp.dest(outDest));
}

gulp.task("clean", function() {
  return del(
    [
      "out/**",
      "package.nls.*.json",
      "../../dist/webts-0.0.0-UNTRACKEDVERSION.vsix"
    ],
    { force: true }
  );
});

gulp.task("internal-compile", function() {
  return compile(false);
});

gulp.task("internal-nls-compile", function() {
  return compile(true);
});


gulp.task("vsce:publish", function() {
  return vsce.publish();
});

gulp.task("vsce:package", function() {
  return vsce.createVSIX({
    useYarn: "true",
    packagePath: "../../distVsix/webts-0.0.0-UNTRACKEDVERSION.vsix"
  });
});

gulp.task(
  "compile",
  gulp.series("clean", "internal-compile", callback => {
    callback();
  })
);

gulp.task(
  "build",
  gulp.series("clean", "internal-nls-compile", callback => {
    callback();
  })
);

gulp.task(
  "publish",
  gulp.series("compile", "vsce:publish", callback => {
    callback();
  })
);

gulp.task(
  "package",
  gulp.series("vsce:package", callback => {
    callback();
  })
);

//---- internal


