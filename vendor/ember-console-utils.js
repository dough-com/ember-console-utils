function lookup(id) {
  var app = Ember.A(Ember.Namespace.NAMESPACES).find(function(namespace) {
    return namespace instanceof Ember.Application;
  });

  if (!app) {
    return;
  }

  var registry = Ember.get(app, '__container__').lookup('-view-registry:main') || Ember.View.views;
  return registry[id];
}

HTMLElement.prototype.component = HTMLElement.prototype.view = function() {
  var viewEl = this;
  if (!viewEl.classList.contains('ember-view')) {
    viewEl = $(viewEl).parents('.ember-view:first')[0];
  }
  return lookup(viewEl.id);
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
