<template>
  <div class="hello">
    <h1 class="display-2">Significant Interactions!</h1>
    <v-container grid-list-lg text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="green lighten-4 mx-4 px-4">
            <h5 class="display-1 pt-4">Who did you meet with?</h5>

            <!-- name -->
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  name='name'
                  label='Full Name'
                  v-model='newPerson.name'
                  required
                  :rules='[rules.required]'
                ></v-text-field>
              </v-flex>
            <!-- end of name -->
            <!-- grade -->
              <v-flex xs12 sm6>
                <v-select
                  :items="grades"
                  v-model="newPerson.grade"
                  label="Choose a grade"
                  single-line
                  bottom
                  dark
                ></v-select>
              </v-flex>  
              <!-- end of grade -->
              <!-- where -->
              <v-flex xs12 sm6>
                <v-text-field
                  name="where"
                  v-model="newPerson.where"
                  label="Where/Why"
                  required
                  bottom
                  :rules='[rules.required]'
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <span class="subheading">Girl or Guy: </span>
                <v-btn-toggle 
                dark 
                justify-start 
                v-model="newPerson.girlOrGuy">
                  <v-btn 
                  class='red darken-2' 
                  value="girl">
                    Girl
                  </v-btn>
                  <v-btn class='blue darken-2' value="guy">
                    Guy
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
              <!-- end of where -->

            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 md4 lg5 offset-lg1 class='mb-4'>
                <v-date-picker reactive class='grey darken-3' dark v-model="newPerson.datePicker"></v-date-picker>
              </v-flex>
              <v-flex xs12 md8 lg5>
                <!-- time picker -->
                <v-time-picker  :landscape='landscapeTimePicker' class='grey darken-3' light v-model="newPerson.timePicker"></v-time-picker>
                <!-- end of time picker -->
                <!-- add person button -->
                <v-flex xs4 offset-xs4>
                  <v-btn
                  large
                  class='mt-5'
                  :flat='!valid'
                  :outline='valid' 
                  :class='{ green: valid}'
                  @click='addPerson'
                  >Add to list</v-btn>
                </v-flex>
                </v-snackbar>
                  <!-- end of add person button -->
              </v-flex>
            </v-layout>

          </div>
        </v-flex>
      </v-layout>
    </v-container>

  <v-container grid-list-md text-xs-center class='px-4 mt-4'>
      <v-layout row wrap>
        <v-flex xs12>
          <table>
            <thead>
              <tr>
                <th v-for='header in headers' :key='header.id'>{{header}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='person in people' :key='person.id'>
                <td> {{person.name}} </td>          
                <td> {{person.grade}} </td>          
                <!-- <td> {{person.datePicker.toString()}} </td>           -->
                <td> {{person.girlOrGuy}} </td>
                <td v-if='dateIsNull'> {{formatDate(person.datePicker.toString())}} </td>          
                <td v-if='timeIsNull'> {{formatTime(person.timePicker)}} </td>          
                <td> {{person.where}} </td>          
                <td>
                    <v-btn flat icon @click='removePerson(person)'>
                      <i class="material-icons">delete</i>
                    </v-btn>
                    <v-snackbar
                      :timeout="3000"
                      bottom
                      right
                      vertical
                      v-model='snackbar.show'
                    >
                      {{ snackbar.message }}
                      <v-btn flat color="pink" @click.native="snackbar.show = false">Close</v-btn>
                    </v-snackbar>
                </td>
              </tr>
            </tbody>
          </table>
        </v-flex>
      </v-layout>
    </v-container>

 </div> 
</template>

<script>
import Firebase from 'firebase'

let config = {
    apiKey: "AIzaSyALU5BuU0TC9u3VQeAeolW0D7Hpr3Td1zY",
    authDomain: "fir-test-52feb.firebaseapp.com",
    databaseURL: "https://fir-test-52feb.firebaseio.com",
    projectId: "fir-test-52feb",
    storageBucket: "fir-test-52feb.appspot.com",
    messagingSenderId: "328131514642"
  };
let app_ = Firebase.initializeApp(config)
let db = app_.database()

let peopleRef = db.ref('people')

export default {
  name: 'HelloWorld',
  data () {
    return {
      landscapeTimePicker: false,
      headers: ['Name', 'Grade', 'Girl/Guy', 'Day', 'Time', 'Where/Why'],
      people: this.people,
      newPerson: {
                name: '',
                grade: '',
                where: '',
                girlOrGuy: null,
                datePicker: null,
                timePicker: null
               },
      name: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
      grades: [
      'Freshman', 'Sophomore','Junior','Senior', 'Grad'
      ],
      snackbar: {
        show: false,
        message: 'List Updated!'
      },
      valid: true,
      girlOrGuy: null,
      months: {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
      }
    }
  },
  created: function() {
    var elem = document.querySelector('select');
  },
  computed: {
    dateIsNull: function () {
      if (this.datePicker == null) {
        return true;
      }
      else {
        return false;
      }
    },
    timeIsNull: function () {
      if (this.timePicker == null) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {
    addPerson: function(event) {
      peopleRef.push(this.newPerson);
      this.snackbar.message = 'Interaction added!'
      this.snackbar.show = true
      // this.newPerson.name = '';
      // this.newPerson.grade = '';
      // this.newPerson.where = '';
      // this.newPerson.girlOrGuy = null;
      // this.newPerson.datePicker = null;
      // this.newPerson.timePicker = null;

    },
    removePerson: function(person) {
      peopleRef.child(person['.key']).remove();
      this.snackbar.message = 'Interaction deleted!'
      this.snackbar.show = true
    },
    formatDate: function (date) {
      // date is year-mo-da
      // date is 0123456789
      let year = date.slice(0,4);
      let month = date.slice(5,7)
      let day = date.slice(8,10)
      return `${day} ${this.months[month]}`;
      // Use below code for year
      // return `${day} ${this.months[month]} ${year}`;
    },
    formatTime: function (time) {
      // format is ho:mi in 24 hour format
      // time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      // if (time.length > 1) { // If time format correct
      //   time = time.slice (1);  // Remove full string match value
      //   time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      //   time[0] = +time[0] % 12 || 12; // Adjust hours
      // }
      return time;
    }
  },
  firebase: {
    people: peopleRef
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mt-2 {
  margin-top: 2em;
}
</style>
