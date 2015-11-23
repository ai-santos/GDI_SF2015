// insert your new code here
var areGirlDevelopersCool = true;
console.log("Yes we are");

var Person = Backbone.Model.extend({
  defaults: {
    role: "developer",
    imgUrl: "http://img2-3.timeinc.net/people/i/2013/pets/news/130722/crochet-cat-600.jpg",
    firstName: '',
    lastName: '',
  },
  generateUserName: function() {
     var newUserName = this.get('firstName') + this.get('lastName');
      this.set('userName', newUserName);
      return newUserName;
  },
  initialize: function() {
    this.generateUserName();
  },
});

var person = new Person();

var People = Backbone.Collection.extend({
  model: Person,
  comparator: function(model) {
    return model.get('lastName').toLowerCase();
  }
});

var people = new People([
  {firstName: "Aileen", 
  lastName: "Santos"
  },
  {firstName: "Joy",
  lastName: "Ravina"
  },
  {firstName: "Jenny",
  lastName: "Weston"
  }
]);

people.add([
  {firstName: "Pia",
  lastName: "Bababz"
  }
]);

var PersonView = Backbone.View.extend({
  tagName: 'div',
  className: "rolodex",
  render: function() {
    var imgUrl = this.model.get('imgUrl');
    var newNode = $('<img src="' + imgUrl + '">');
    this.$el.append(newNode);
    return this;
  },
    events: { 
      'click' : 'onClick'
    },
    onClick: function(e) {
      this.$el.animate({width: "300px"});
    }
});



var personView = new PersonView({model: person})

$(document).ready(function(e) {
  $('body').append(personView.render().$el);
});  

var RolodexView = Backbone.View.extend({
    initialize: function() {
    this.listenTo(this.collection, 'change', this.render);
  },
    render: function() {
    return this;
  }
});

var rolodexView = new RolodexView([
{firstName: "Chunky",
lastName: "Bacon"
},
{firstName: "Leafy",
lastName: "Greens"
},
{firstName: "Ursula",
lastName: "LeGuin"
}
]);
