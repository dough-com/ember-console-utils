Ember.ConsoleUtils = Ember.Object.extend({
  application: Ember.computed(function() {
    return Ember.A(Ember.Namespace.NAMESPACES).find(function(namespace) {
      return namespace instanceof Ember.Application;
    });
  }),

  viewRegistry: Ember.computed('application.__container__', function() {
    return this.get('application.__container__').lookup('-view-registry:main') || Ember.View.views;
  }),

  findView: function(id) {
    return this.get('viewRegistry')[id];
  }
})

Ember.ConsoleUtils.instance = Ember.ConsoleUtils.create();

HTMLElement.prototype.component = HTMLElement.prototype.view = function() {
  var viewEl = this;
  if (!viewEl.classList.contains('ember-view')) {
    viewEl = $(viewEl).parents('.ember-view:first')[0];
  }
  return Ember.ConsoleUtils.instance.findView(viewEl.id);
};

HTMLElement.prototype.controller = function() {
  var viewObj = this.view();
  return viewObj.get('controller');
};

HTMLElement.prototype.template = function() {
  var viewObj = this.view(),
      templateName = viewObj.templateName;
  if (!templateName) {
    templateName = viewObj.nearestWithProperty('templateName').templateName;
  }
  return templateName;
};

HTMLElement.prototype.model = function() {
  var viewObj = this.view(),
      viewContext = viewObj.get('context'),
      viewController = this.controller();
  return viewContext === viewController ? viewController.get('content') : viewContext;
};
