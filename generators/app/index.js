var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    super(args, opts);
  }

  simpleCopy(fileArr = [], data) {
    fileArr.forEach(path => {
      this.fs.copyTpl(this.templatePath(path), this.destinationPath(path), data);
    });
  }

  prompting() {
    return this.prompt(
      [
        {
          type: "input",
          name: "name",
          message: "project name",
          default: "",
        },
        {
          type: "input",
          name: "description",
          message: "write some description",
          default: "",
        },
        {
          type: "input",
          name: "author",
          message: "author name",
          default: "",
        }
      ]).then((answers) => {
      this.answers = answers
      this.author = answers.author;
      this.name = answers.name;
      this.description = answers.description;
    });
  }

  writing() {

    const projectData = {
      name: this.name,
      author: this.author,
      description: this.description
    };

    this.simpleCopy([
      '.eslintrc.js',
      ".gitignore",
      'jest.config.js',
      'jest.setup.js',
      "package.json",
      "tsconfig.json",
      "src/index.ts",
    ], projectData);
  }
};
