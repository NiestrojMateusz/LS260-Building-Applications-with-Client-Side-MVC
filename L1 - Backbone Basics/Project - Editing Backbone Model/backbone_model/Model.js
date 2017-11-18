const ProductModel = Backbone.Model.extend({
  setDatetime: function() {
    let datetime = formatDatetime(this.get("date"));
    this.set("datetime", datetime);
  },
  setDateFormatted: function() {
    let date_formatted = formatDate(this.get("date"));
    this.set("date_formatted", date_formatted);
  },
  initialize: function() {
    this.setDatetime();
    this.setDateFormatted();
  }
});

const product = new ProductModel(product_json);

const templates = {};

$("[type='text/x-handlebars']").each(function() {
  let $template = $(this);
  templates[$template.attr("id")] = Handlebars.compile($template.html())
})

renderProduct();
renderForm();

$("form").on("submit", function(e) {
  e.preventDefault();
  var inputs = $(this).serializeArray(),
      date = new Date().valueOf(),
      attrs = {};

  inputs.forEach(function(input){
    attrs[input.name] = input.value;
  });

  attrs.datetime = formatDatetime(date);
  attrs.date_formatted = formatDate(date);
  attrs.date = date;
  product.set(attrs);
  renderProduct();
})

function formatDatetime(date) {
  return moment(date).format('YYYY-MM-DDThh:mm:ss');
  // let datetime= `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
  // datetime += `T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  // return datetime;
}

function formatDate(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //     suffix_overrides = ["st", "nd", "rd"],
  //     date_suffix = "th",
  //     date_formatted;

  // if (date.getDate() <= suffix_overrides.length) {
  //   date_suffix = suffix_overrides[date.getDate() - 1];
  // }

  // date_formatted = `${months[date.getMonth()]} ${date.getDate()}${date_suffix}, ${date.getFullYear()}`;
  // date_formatted += ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  // return date_formatted;
}

function renderProduct() {
  $("article").html(templates.product(product.toJSON()));
}

function renderForm() {
  $("fieldset").html(templates.form(product.toJSON()));
}