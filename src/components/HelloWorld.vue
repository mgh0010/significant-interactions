<template>
  <div class="sig-int">

    <!-- {{people[0]}} -->
    <v-container grid-list-sm text-xs-center>
      <v-layout row wrap>
        <template v-for='name in staff'>
          <v-flex xs2 sm1>
            <p>{{name}}: {{staffNum(name)}}</p>
          </v-flex>
        </template>
      </v-layout>
      <v-layout row wrap>
        <table>
          <tr>
            
          </tr>
        </table>
        <template v-for='(statVal,statKey) in statsInfo'>
          <v-flex xs5 sm3 md2>
            <p>{{statKey}}:{{statVal}} </p>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <v-btn @click='calculateStats'>{{calculateStatsBtnTxt}}</v-btn>

    <h1 class="display-2">Significant Interactions!</h1>
    <!-- form -->
    <v-container grid-list-lg text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="green lighten-4 pa-4">
            <h5 class="display-1">Who did you meet with?</h5>

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
                  label="Choose a grade..."
                  single-line
                  bottom
                  dark
                  required
                ></v-select>
              </v-flex>
              <!-- end of grade -->
              <!-- staff -->
              <v-flex xs12 sm6>
                <v-select
                  :items="staff"
                  v-model="newPerson.staff"
                  label="Who are you..."
                  single-line
                  bottom
                  dark
                  required
                ></v-select>
              </v-flex>
              <!-- end of staff -->
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

            <v-layout row wrap class='ml-3-neg'>
              <!-- date picker -->
              <v-flex xs12 md4 lg5 offset-lg1 class='mb-4'>
                <v-date-picker
                reactive
                class='grey darken-3'
                dark
                v-model="newPerson.datePicker"></v-date-picker>
              </v-flex>
              <!-- end of date picker -->

              <!-- time picker -->
              <v-flex xs12 md8 lg5>
                <v-time-picker
                :landscape='landscapeTimePicker'
                required
                class='grey darken-3'
                light
                v-model="newPerson.timePicker"></v-time-picker>
              <!-- end of time picker -->

                <!-- add person button -->
                <v-flex xs4 offset-xs4>
                  <v-btn
                  large
                  class='mt-5'
                  :flat='!valid'
                  :outline='valid'
                  :class='{ green: valid }'
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
    <!-- end of form -->

    <!-- stats -->
    <!-- <span class="subheading">{{interactionLeader}}</span> -->
    <!-- end of stats -->

    <!-- table -->
    <v-container grid-list-md text-xs-center class='px-4 mt-4'>
      <v-layout row wrap>
        <v-flex xs12>
          <template>
            <v-data-table
              :headers="dataHeaders"
              :items="people"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">

                <td :class='colorGivenPersonTwo(props.item.staff)'>{{ props.item.name }}</td>
                <td :class='colorGivenPersonTwo(props.item.staff)' class="text-xs-right">{{ props.item.grade }}</td>
                <td :class='colorGivenPersonTwo(props.item.staff)' class="text-xs-right">{{ props.item.girlOrGuy }}</td>
                <td :class='colorGivenPersonTwo(props.item.staff)' class="text-xs-right">{{ props.item.staff }}</td>
                <td :class='colorGivenPersonTwo(props.item.staff)' class="text-xs-right">
                  {{ formatDate(props.item.datePicker) }}</td>
                <td :class='colorGivenPersonTwo(props.item.staff)' class="text-xs-right">
                  {{ formatTime(props.item.timePicker) }}</td>
                <td :class='colorGivenPersonTwo(props.item.staff)' class="text-xs-right">{{ props.item.where }}</td>
                <td class="red lighten-4">
                  <v-btn flat icon @click='removePerson(props.item)'>
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
              </template>
            </v-data-table>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- end of table -->

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
let app_ = Firebase.initializeApp(config);
let db = app_.database();

let peopleRef = db.ref('people');

export default {
  name: 'SigInt',
  data () {
    return {
      landscapeTimePicker: false,
      headers: ['', 'Name', 'Grade', 'Girl/Guy', 'Day', 'Time', 'Where/Why', 'Staff'],
      dataHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Grade', value: 'grade' },
        { text: 'Girl/Guy', value: 'girlOrGuy' },
        { text: 'Staff', value: 'staff' },
        { text: 'Day', value: 'datePicker' },
        { text: 'Time', value: 'timePicker' },
        { text: 'Where/Why', value: 'where' },
        { text: '', value: 'remove' }
      ],
      statsInfo: {},
      people: null,
      newPerson: {
                name: '',
                grade: '',
                where: '',
                girlOrGuy: '',
                datePicker: null,
                timePicker: null,
                staff: ''
               },
      name: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
      grades: [
      'Freshman', 'Sophomore','Junior','Senior', 'Grad'
      ],
      staff: [
      'Brandon', 'Chris', 'Kate', 'McCay', 'Daniel', 'Sharon', 'Michael', 'Trey', 'Simon', 'Neiman',
      'Hank'],
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
      },
      calculateStatsBtnTxt: 'Calculate Stats'
    }
  },
  mounted: function() {
    // this.calculateStats();
  },
  created: function() {
    var elem = document.querySelector('select');
    peopleRef.on('value', function(snapshot) {
      // this.people = snapshot.val();
    });
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
    calculateStats: function() {
      this.calculateStatsBtnTxt = 'Update Stats';
      let staffInteractions = 0;
      let numFreshmanGuys = 0; let numFreshmanGirls = 0;let numSophomoreGuys = 0;let numSophomoreGirls = 0; let numJuniorGuys = 0; let numJuniorGirls = 0; let numSeniorGuys = 0; let numSeniorGirls = 0; let numGradGuys = 0; let numGradGirls = 0;
      Object.keys(this.people).forEach((current) => {
        let person = this.people[current];
        if (person.grade == 'Freshman') { 
          if (person.girlOrGuy == 'guy') { numFreshmanGuys++; }
          else { numFreshmanGirls++; }
        }
        if (person.grade == 'Sophomore') { 
          if (person.girlOrGuy == 'guy') { numSophomoreGuys++; }
          else { numSophomoreGirls++; }
        }
        if (person.grade == 'Junior') { 
          if (person.girlOrGuy == 'guy') { numJuniorGuys++; }
          else { numJuniorGirls++; }
        }
        if (person.grade == 'Senior') { 
          if (person.girlOrGuy == 'guy') { numSeniorGuys++; }
          else { numSeniorGirls++; }
        }
        if (person.grade == 'Grad') { 
          if (person.girlOrGuy == 'guy') { numGradGuys++; }
          else { numGradGirls++; }
        }
      });

      this.statsInfo = {'numFreshmanGuys': numFreshmanGuys, 'numFreshmanGirls': numFreshmanGirls,
      'numSophomoreGuys': numSophomoreGuys, 'numSophomoreGirls': numSophomoreGirls,
      'numJuniorGuys': numJuniorGuys, 'numJuniorGirls': numSophomoreGirls,
      'numSeniorGuys': numSeniorGuys, 'numSeniorGirls': numSeniorGirls,
      'numGradGuys': numGradGuys, 'numGradGirls': numGradGirls
      };
    },
    addPerson: function(event) {
      console.log(this.timePicker);
      if (this.timePicker == null) {
        this.timePicker = '';
      }
      if (this.datePicker == null) {
        this.datePicker = '';
      }
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
      try {
        var dateString = date.toString();
      }
      catch(err) {
        console.log(err.message);
        return '';
      }
      // date is year-mo-da
      // date is 0123456789
      let year = dateString.slice(0,4);
      let month = dateString.slice(5,7)
      let day = dateString.slice(8,10)
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
    },
    colorGivenPersonTwo: function (staff) {
      if (staff == 'Michael') {
        return 'green lighten-4'
      }
      else if (staff == 'Brandon') {
        return 'red lighten-4'
      }
      else if (staff == 'Chris') {
        return 'blue lighten-4'
      }
      else if (staff == 'Kate') {
        return 'pink lighten-4'
      }
      else if (staff == 'McCay') {
        return 'indigo lighten-4'
      }
      else if (staff == 'Daniel') {
        return 'light-blue lighten-4'
      }
      else if (staff == 'Sharon') {
        return 'cyan lighten-4'
      }
      else if (staff == 'Trey') {
        return 'teal lighten-4'
      }
      else if (staff == 'Simon') {
        return 'lime lighten-4'
      }
      else if (staff == 'Neiman') {
        return 'orange lighten-4'
      }
      else if (staff == 'Hank') {
        return 'blue-grey lighten-4'
      }
    },
    staffNum: function (staff) {
      let staffInteractions = 0;
      for (let i = 0; i < this.people.length; ++i) {
        let person = this.people[i];
        if (person.staff == staff) { staffInteractions++; }
      }
      return staffInteractions;
    }
  },
  firebase: {
    people: peopleRef
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ml-3-neg {
  margin-left: -16px;
}

</style>
