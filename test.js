var jstate;
var jcity;
var jaddress1;
var jaddress2;

function test(){
    jstate = document.getElementById("state").value;
    jcity = document.getElementById("city").value;
    jaddress1 = document.getElementById("address1").value;
    jaddress2 =  document.getElementById("address2").value;
    jall = jstate +"  "+ jcity + "  " + jaddress1 + "  " + jaddress2;
}


Vue.component('todo-item', {
  props: {
    todo: {
      type: Object,
      required: true
    }
 },
 template: '<div>' +
  '<input type="checkbox" v-model="todo.completed">'  +
  '<span>{{ todo.text }}</span>'  +
  '<button type="button" v-on:click="onClickRemove" class="btn-danger">削除</button>' +
 '</div>',

 methods: {
   onClickRemove: function () {
     this.$emit('remove')
   }
 }
});

var vm = new Vue({
 el: '#app',
  data: {
    input: ' ',
    todos: [
    ]
  },
  methods: {
    addTodo: function () {
      this.todos.push({
        completed: false,
        text: jall
      })
      input = ' '
    }
  }
});

// 郵便番号から住所を取得
function setState() {
    var zip = $('#zip').val();

    // ここでzipのバリデーションを行ってください

    $.ajax({
        type : 'get',
        url : 'https://maps.googleapis.com/maps/api/geocode/json',
        crossDomain : true,
        dataType : 'json',
        data : {
            address : zip,
            language : 'ja',
            sensor : false
        },
        success : function(resp){
            if(resp.status == "OK"){
                // APIのレスポンスから住所情報を取得
                var obj = resp.results[0].address_components;
                if (obj.length < 5) {
                    alert('正しい郵便番号を入力してください');
                    return false;
                }
                //$('#country').val(obj[4]['long_name']); // 国
                $('#state').val(obj[3]['long_name']); // 都道府県
                $('#city').val(obj[2]['long_name']);  // 市区町村
                $('#address1').val(obj[1]['long_name']); // 番地
            }else{
                alert('住所情報が取得できませんでした');
                return false;
            }
        }
    });
}
