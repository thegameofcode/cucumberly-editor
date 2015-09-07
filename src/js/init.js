iris.locale('en_US', {
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  dateFormat: 'm/d/Y h:i:s',
  currency: {
    formatPos: 's n',
    formatNeg: '(s n)',
    decimal: '.',
    thousand: ',',
    precision: 2,
    symbol: '$'
  },
  number: {
    decimal: '.',
    thousand: ',',
    precision: 2
  }
});

iris.locale(
  'es_ES', {
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    dateFormat: 'd/m/Y H:i:s',
    currency: {
      formatPos: 'n s',
      formatNeg: '- n s',
      decimal: ',',
      thousand: '.',
      precision: 2,
      symbol: '€'
    },
    number: {
      decimal: ',',
      thousand: '.',
      precision: 2
    }
  }
);

var cucumberly = {};
cucumberly.util = {
  randomId: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
};

$(window.document).ready(function() {

  iris.baseUri('iris/');

  iris.events('featureNameChange');

  // show the initial screen
  iris.welcome(iris.path.screen.welcome.js);
});
