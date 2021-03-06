iris.ui(function(self) {
  'use strict';

  var book = iris.resource(iris.path.resource.book.js);
  var episodeId;
  var featureId;
  var scenarioId;

  self.create = function() {
    self.tmpl(iris.path.ui.scenario.html);

    UICard.init(self.get());

    self.get('btnClose').on('click', onBtnCloseClick);
    self.ui('scenarioName', iris.path.ui.editableLabel.js).on('change', onScenarioNameChange);

    episodeId = self.setting('episodeId');
    featureId = self.setting('featureId');
    scenarioId = self.setting('scenario').id;

    loadScenario(self.setting('scenario'));
    self.get().hide().fadeIn();
  };

  function loadScenario(scenario) {
    iris.log('Load scenario', scenario);
    self.ui('scenarioName').text(scenario.name);

    var stepNames = ['Given', 'When', 'Then'];
    stepNames.forEach(function(stepName) {
      var steps = scenario.steps[stepName.toLowerCase()];
      if (steps && steps.length > 0) {
        for (var f = 0; f < steps.length; f++) {
          createStep(stepName.toLowerCase(), (f === 0) ? stepName : 'And', steps[f]);
        }
      }
    });

    var ciStatusClassName = 'style-primary';
    switch (scenario.ciStatus) {
      case book.CI_STATUS.SUCCESS:
        ciStatusClassName = 'style-success';
        break;
      case book.CI_STATUS.ERROR:
        ciStatusClassName = 'style-danger';
        break;
      case book.CI_STATUS.PENDING:
        ciStatusClassName = 'style-warning';
        break;
    }
    self.get('scenarioCard').addClass(ciStatusClassName);

    if (scenario.tags) {
      scenario.tags.forEach(function(tag) {
        $('<img>').attr('src', 'img/scenario/tag/' + tag + '-' + scenario.ciStatus + '.png').
            addClass('scenarioTag').appendTo(self.get('scenarioTags'));
      });
    }

    UIForm.init(self.get()); // position of floating labels TODO move to step UI
  }

  function onScenarioNameChange() {
    updateScenario();
  }

  function onNewStep(stepUi) {
    var newStepUi = createStep(stepUi.setting('stepName'), 'And');
    newStepUi.get().detach().appendTo(stepUi.get());
    newStepUi.focus();
  }

  function createStep(stepName, label, step) {
    var stepUi = self.ui('steps', iris.path.ui.step.js, {
      stepName: stepName,
      label: label,
      step: step
    }, self.APPEND);

    stepUi.on('newStep', onNewStep);
    stepUi.on('stepChange', onStepChange);

    UIForm.init(self.get()); // position of floating labels TODO move to step UI

    return stepUi;
  }

  function data() {
    var result = {name: self.ui('scenarioName').text(), steps: {given: [], when: [], then: []}};
    var stepUis = self.ui('steps');
    if (stepUis && stepUis.length > 0) {
      stepUis.forEach(function(stepUi) {
        result.steps[stepUi.data().stepName].push(stepUi.data().value);
      });
    }

    return result;
  }

  function onStepChange() {
    updateScenario();
  }

  function updateScenario() {
    book.updateScenario(episodeId, featureId, scenarioId, data(), function(err) {
      if (err) return alert(err);
    });
  }

  function onBtnCloseClick() {
    book.removeScenario(episodeId, featureId, scenarioId, function() {
      self.get().fadeOut(function() {
        self.destroyUI();

        /*toastr.clear();

         toastr.options.closeButton = false;
         toastr.options.progressBar = false;
         toastr.options.debug = false;
         toastr.options.positionClass = 'toast-top-full-width';
         toastr.options.showDuration = 333;
         toastr.options.hideDuration = 333;
         toastr.options.timeOut = 0;
         toastr.options.extendedTimeOut = 1000;
         toastr.options.showEasing = 'swing';
         toastr.options.hideEasing = 'swing';
         toastr.options.showMethod = 'slideDown';
         toastr.options.hideMethod = 'slideUp';

         var message = 'Scenario removed. <button type="button" id="okBtn" class="btn btn-flat btn-success toastr-action">Undo</button>';

         toastr.info(message, '');*/
      });
    });
  }

}, iris.path.ui.scenario.js);
