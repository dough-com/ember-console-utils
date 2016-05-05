module.exports = {
  name: 'ember-console-utils',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/ember-console-utils.js');
  }
};
