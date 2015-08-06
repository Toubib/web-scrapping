moment = require('moment.min.js');

var casper = require('casper').create({
    verbose: true,
	logLevel: "info",
});

var result_path = 'public';

casper.start('https://www.airchina.fr/FR/FR/Home');

casper.then(function() {
    this.fill('form.flight-search-form', {
		FSB1FromSource: 'Paris , Aéroport International Charles De Gaulle   (CDG), France',
		B_LOCATION_1: 'CDG',
		FSB1ToDestination: 'Shenyang, Aéroport International Taoxian  (SHE), Chine',
		E_LOCATION_1: 'SHE',
		B_DATE_1: '17/10/2015',
		B_DATE_2: '30/10/2015',
		NB_ADT: '2',
		NB_CHD: '1',
		NB_INF: '1'
		//CABIN: 'E'
	}, true);
});

casper.waitForUrl('https://www.airchina.fr/CAOnline/dyn/air/booking/availability',function() {
	this.captureSelector(result_path+'/'+moment().format('YYYY-MM-DD-hh-mm') + '.png','div.page-container');
});

casper.on('error', function(error) {
	    this.log(error);
});

casper.run();
