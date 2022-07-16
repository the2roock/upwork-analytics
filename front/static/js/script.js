var global_data = {};
var global_searched_word = '';
var global_choosen_skills_id_list = [];
var global_searched_skills = null

function set_global_data_from_advanced_page(data){
  globalThis.global_data = data['result'];
  globalThis.global_searched_skills = data['searched_skills'];
}

function set_global_data(data){
  globalThis.global_data = data;
}

function create_table(input_data, show_elements_count, searched_word){
  var data = [];
  for (var i = 0; i < input_data.length; i++) {
    if (input_data[i]['name'].toLowerCase().includes(searched_word))
    {
      data.push(input_data[i]);
    }
  }
  try {
      document.getElementsByTagName('table')[0].remove();
  } catch (e) {

  }
  var table = document.createElement('table');
  var thead = document.createElement('thead');
  var thead_tr = document.createElement('tr');
  var thead_th1 = document.createElement('th');
  thead_th1.innerHTML = 'Skill';
  var thead_th2 = document.createElement('th');
  thead_th2.innerHTML = 'Jobs count';
  thead_tr.appendChild(thead_th1);
  thead_tr.appendChild(thead_th2);
  thead.appendChild(thead_tr);
  table.appendChild(thead);

  var tbody = document.createElement('tbody');
  for (var i=0; i<data.length; i++){
    try {
      var tbody_tr = document.createElement('tr');
      var tbody_td1 = document.createElement('td');
      if (globalThis.global_choosen_skills_id_list.includes(data[i]['slug'])){
        tbody_td1.innerHTML = "<div class=\"roundedOne\"><input onchange=\"change_choosen_skill(this)\" type='checkbox' checked id='checkbox-" + data[i]['slug'] + "' name='checkbox-" + data[i]['slug'] + "' value=''><label for='checkbox-" + data[i]['slug'] + "'></label></div><button type=\"button\" onclick=\"button_click(\'" + data[i]['name'] + "\')\">" + data[i]['name'] + "</button>";
      }else {
        tbody_td1.innerHTML = "<div class=\"roundedOne\"><input onchange=\"change_choosen_skill(this)\" type='checkbox' id='checkbox-" + data[i]['slug'] + "' name='checkbox-" + data[i]['slug'] + "' value=''><label for='checkbox-" + data[i]['slug'] + "'></label></div><button type=\"button\" onclick=\"button_click(\'" + data[i]['name'] + "\')\">" + data[i]['name'] + "</button>";
      }
      tbody_tr.appendChild(tbody_td1);
      var tbody_td2 = document.createElement('td');
      tbody_td2.innerHTML = data[i]['count'];
      tbody_tr.appendChild(tbody_td2);
      tbody.appendChild(tbody_tr);
    } catch (e) {
      break;
    }
  }
  table.appendChild(tbody);
  document.getElementsByClassName('table_content')[0].appendChild(table);
  document.getElementsByClassName('table_content')[0].style.maxHeight = (30*show_elements_count).toString() + 'px';
}

function button_click(skill_name){
  if (globalThis.global_searched_skills == null) {
    window.location.replace('http://localhost:5001/advanced-statistic/'+skill_name.toLowerCase().replace(' ', '-'));
  }else {
    button_click_from_advanced_page(skill_name);
  }
}

function button_click_from_advanced_page(skill_name){
  var request_data = skill_name.toLowerCase().replace(' ', '-');
  for (var i = 0; i < globalThis.global_searched_skills.length; i++) {
    request_data += ',' + globalThis.global_searched_skills[i]['slug'];
  }
  window.location.replace('http://localhost:5001/advanced-statistic/'+request_data);
}

function change_table(){
  var show_elements_count = parseInt(document.getElementById('show_elements_count').value);
  var searched_word = document.getElementById('searched_word').value.toLowerCase();
  create_table(globalThis.global_data, show_elements_count, searched_word);
}

function change_choosen_skill(element){
  if (element.checked){
    add_choosen_skill(element);
  }else {
    delete_choosen_skill(element);
  }
}

function add_choosen_skill(element){
  globalThis.global_choosen_skills_id_list.push(element.name.split('-')[1]);
}

function delete_choosen_skill(element){
  globalThis.global_choosen_skills_id_list.splice(globalThis.global_choosen_skills_id_list.indexOf(element.name.split('-')[1]), 1);
}

function get_advancedinfo(){
  try {
    var request_data = globalThis.global_choosen_skills_id_list.join();
    window.location.replace('http://localhost:5001/advanced-statistic/' + request_data);
  } catch (e) {
    alert('Something went wrong');
  }
}

function get_advancedinfo_from_advanced_page(){
  try {
    var request_data = globalThis.global_choosen_skills_id_list.join()
    for (var i = 0; i < globalThis.global_searched_skills.length; i++) {
      request_data += ',' + globalThis.global_searched_skills[i]['slug'];
    }
    window.location.replace('http://localhost:5001/advanced-statistic/' + request_data);
  } catch (e) {
    alert('Something went wrong');
  }
}
