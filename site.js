var goal = 100000; // Target value to be raised.
var raised = 25000; // Value raised so far.
var backers = 250; // Number of folks donated.

// Helper function: Add commas to longer integers.
function commaNum(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Helper function: Turn form values into an object.
function formValues(form) {
    var record = {};
    ['input', 'textarea'].forEach(function(type) {
        d3.select(form).selectAll(type).each(function() {
            if (this.value.length < 1 ||
                this.name === '') return;
            if (this.type === 'checkbox') {
                record[this.name] = this.checked ? true : false;
            } else if (this.type === 'radio') {
                if (!this.checked) return;
                record[this.name] = this.id;
            } else {
                record[this.name] = this.value;
            }
        });
    });
    return record;
}

d3.select('#js-raised').text('£' + commaNum(raised));
d3.select('#js-progress').style('width', (raised / goal) * 100 + '%');
d3.select('#js-backers').text(backers);

// Form submission
d3.select('#donate').on('submit', function(e) {
  var array = formValues(this), amount;
  if (array.amount === 'amount-custom') {
    amount = array['custom-value'];
  } else {
    amount = array.amount.split('-')[1];  
  }

  // Amount to be submitted to
  // payment vendor.
  console.log(amount);
  return false;
});

// Tab selection
d3.selectAll('.tabs a').on('click', function(e) {
  var slidecontainer = d3.select('.sliding');
  var tab = d3.select(this).attr('href').split('#')[1];
  d3.selectAll('.tabs a').classed('active', false);
  d3.select(this).classed('active', true);
  var current = slidecontainer.attr('class').match(/active[0-9]+/);
  if (current) slidecontainer.classed(current[0], false);
  slidecontainer.classed(tab, true);
  return false;
});

d3.csv('donors.csv')
  .get(function(err, rows) {
    var el = d3.select('#donor-list')
      .selectAll('tr')
      .data(rows)
      .enter()
      .append('tr')
      .each(function(d) {
        var selection = d3.select(this);
        selection.append('td')
          .text(d.name);
        selection.append('td')
          .text('£' + d.amount);
      });
  });
