module.exports = 'Feature: {{name}}\n' +
    'In order to {{description.motivation}}\n' +
    'As a {{description.beneficiary}}\n' +
    'I want to {{description.expectedBehaviour}}\n' +
    '{% for scenario in scenarios %}\n' +
    'Scenario: {{scenario.name}}\n' +
    '  {%- for givenStep in scenario.steps.given %}\n' +
    '  {% if loop.index0 == 0 %}Given {% else %}And {% endif -%}\n' +
    '  {{givenStep.value}}\n' +
    '  {%- for row in givenStep.table %}\n' +
    '    | {% for value in row %}{{value}} | {% endfor -%}\n' +
    '  {% endfor -%}\n' +
    '  {%- endfor -%}\n' +
    '  {%- for whenStep in scenario.steps.when %}\n' +
    '  {% if loop.index0 == 0 %}When {% else %}And {% endif -%}\n' +
    '    {{whenStep.value}}\n' +
    '    {%- for row in whenStep.table %}\n' +
    '    | {% for value in row %}{{value}} | {% endfor -%}\n' +
    '    {% endfor -%}\n' +
    '  {%- endfor -%}\n' +
    '  {%- for thenStep in scenario.steps.then %}\n' +
    '  {% if loop.index0 == 0 %}Then {% else %}And {% endif -%}\n' +
    '    {{thenStep.value}}\n' +
    '    {%- for row in thenStep.table %}\n' +
    '    | {% for value in row %}{{value}} | {% endfor -%}\n' +
    '  {% endfor -%}\n' +
    '  {%- endfor %}\n' +
    '{% endfor %}\n' +
    '\n';

