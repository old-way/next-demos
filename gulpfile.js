const gulp = require("gulp");
const rename = require("gulp-rename");
const sequence = require("gulp-sequence");
const ts = require("@notadd/gulp-typescript");
const tslint = require("gulp-tslint");

const packages = {
    "addon-demo": ts.createProject("src/addon-demo/tsconfig.json"),
    "extension-demo": ts.createProject("src/extension-demo/tsconfig.json"),
    "module-demo": ts.createProject("src/module-demo/tsconfig.json"),
};

const source = "src";
const distId = process.argv.indexOf("--dist");
const dist = distId < 0 ? "node_modules/@notadd" : process.argv[distId + 1];

const modules = Object.keys(packages);

gulp.task("default", function () {
    tasks();
});

modules.forEach(module => {
    gulp.task(module, () => {
        return packages[module]
            .src()
            .pipe(tslint({
                formatter: "verbose",
            }))
            .pipe(tslint.report({
                emitError: false,
                summarizeFailureOutput: true,
            }))
            .pipe(packages[module]())
            .pipe(gulp.dest(`${dist}/${module}`));
    });
});

gulp.task("build", function (cb) {
    sequence("addon-demo", modules.filter((module) => module !== "addon-demo"), cb);
});

function tasks() {
    modules.forEach(module => {
        watchGraphql(source, module);
        watchTypescript(source, module);
    });
}

function watchGraphql(source, module) {
    gulp.watch(
        [
            `${source}/${module}/**/*.graphql`,
            `${source}/${module}/*.graphql`,
        ],
        [
            module,
        ]
    ).on("change", function (event) {
        console.log("File " + event.path + " was " + event.type + ", running tasks...");
        gulp.src([
            `${source}/${module}/**/*.graphql`,
            `${source}/${module}/*.graphql`,
        ]).pipe(rename(function (path) {
            path.basename = path.basename.replace(".original", ".types");
        })).pipe(gulp.dest(`${dist}/${module}`));
    });
}

function watchTypescript(source, module) {
    gulp.watch(
        [
            `${source}/${module}/**/*.ts`,
            `${source}/${module}/**/*.tsx`,
            `${source}/${module}/*.ts`,
            `${source}/${module}/*.tsx`,
        ],
        [
            module,
        ]
    ).on("change", function (event) {
        console.log("File " + event.path + " was " + event.type + ", running tasks...");
    });
}
