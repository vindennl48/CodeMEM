function loadCategory1() {
  fetch('/filter', {
    method: "post",
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': Rails.csrfToken(),
    },
    credentials: 'same-origin'
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    let options = new Set();
    for (var i=0; i<data.length; i++) {
      options.add(`<option value ='`+data[i].category1+`'>`);
    }
    document.getElementById('category_1').innerHTML = [...options].join('');
  });
}

function onCategory1Change() {
  // clear categories 2 and 3
  document.getElementById('post_category2').value = "";
  if (!this.value) {
    document.getElementById('category_2_field').style.display = 'none';
  } else {
    document.getElementById('category_2_field').style.display = '';
  }
  document.getElementById('post_category3').value = "";
  document.getElementById('category_3_field').style.display = 'none';

  // get new category data for 2
  fetch('/filter', {
    method:  "post",
    body:    JSON.stringify({ category1: this.value }),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': Rails.csrfToken(),
    },
    credentials: 'same-origin'
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    let options = new Set();
    for (var i=0; i<data.length; i++) {
      options.add(`<option value ='`+data[i].category2+`'>`);
    }
    document.getElementById('category_2').innerHTML = [...options].join('');
  });
}

function onCategory2Change() {
  // clear categories 2 and 3
  document.getElementById('post_category3').value = "";
  if (!this.value) {
    document.getElementById('category_3_field').style.display = 'none';
  } else {
    document.getElementById('category_3_field').style.display = '';
  }

  // get new category data for 2
  fetch('/filter', {
    method: "post",
    body: JSON.stringify({
      category1: document.getElementById('post_category1').value,
      category2: this.value
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': Rails.csrfToken(),
    },
    credentials: 'same-origin'
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    let options = new Set();
    for (var i=0; i<data.length; i++) {
      options.add(`<option value ='`+data[i].category3+`'>`);
    }
    document.getElementById('category_3').innerHTML = [...options].join('');
  });
}

function postsNewFormOnLoad() {
  // clear and disable categories 2 and 3
  document.getElementById('category_2_field').style.display = 'none';
  document.getElementById('category_3_field').style.display = 'none';

  // load the first dropdown category
  loadCategory1();

  // -- Event Listeners --
  document.getElementById('post_category1').addEventListener('change', onCategory1Change);
  document.getElementById('post_category2').addEventListener('change', onCategory2Change);
};

function postsIndexLoadPosts() {
  let category1 = document.getElementById('post_category1').value;
  let category2 = document.getElementById('post_category2').value;
  let category3 = document.getElementById('post_category3').value;
  let categories = []

  if (category1 != "") {
    categories.push(`category1=`+category1);
  }
  if (category2 != "") {
    categories.push(`category2=`+category2);
  }
  if (category3 != "") {
    categories.push(`category3=`+category3);
  }

  Rails.ajax({
    url: '/filter',
    type: 'post',
    dataType: 'script',
    data: [...categories].join('&'),
    success: function(response) {},
    error: function(response) {},
  })
}

function postsIndexOnLoad() {
  // clear and disable categories 2 and 3
  document.getElementById('category_2_field').style.display = 'none';
  document.getElementById('category_3_field').style.display = 'none';

  // load the first dropdown category
  loadCategory1();

  postsIndexLoadPosts();

  // -- Event Listeners --
  document.getElementById('post_category1').addEventListener('change', onCategory1Change);
  document.getElementById('post_category1').addEventListener('change', postsIndexLoadPosts);

  document.getElementById('post_category2').addEventListener('change', onCategory2Change);
  document.getElementById('post_category2').addEventListener('change', postsIndexLoadPosts);

  document.getElementById('post_category3').addEventListener('change', postsIndexLoadPosts);
};
