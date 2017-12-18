<template>
  <div class="layout-padding">
    <h5>Parking Space Bookings</h5>
    <q-data-table
      :data="bookings"
      :config="config"
      :columns="columns"
      @refresh="refresh"
      @selection="selection"
      @rowclick="rowClick"
    >
      <template slot="col-message" slot-scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
      </template>
      <template slot="col-source" slot-scope="cell">
        <div v-if="cell.data === 'Audit'" class="my-label text-white bg-primary">
          Audit
          <q-tooltip>Some data</q-tooltip>
        </div>
        <div v-else class="my-label text-white bg-negative">{{cell.data}}</div>
      </template>

      <template slot="selection" slot-scope="props">
        <!-- <q-btn flat color="primary" @click="changeMessage(props)">
          <q-icon name="edit" />
        </q-btn> -->
        <q-btn flat color="primary" @click="deleteRow(props)">
          <q-icon name="delete" />
        </q-btn>
      </template>
    </q-data-table>
  </div>
</template>

<script>
import {
  QDataTable,
  QField,
  QInput,
  QCheckbox,
  QSelect,
  QSlider,
  QBtn,
  QIcon,
  QTooltip,
  QCollapsible,
  clone
} from 'quasar'
import auth from "./auth"
import axios from "axios";
//import table from '../data/table.json'

let BASE_URL = DEV ? 'http://localhost:4000' : 'http://localhost:4000';

export default {
  components: {
    QDataTable,
    QField,
    QInput,
    QCheckbox,
    QSelect,
    QSlider,
    QBtn,
    QIcon,
    QTooltip,
    QCollapsible
  },
  methods: {
    changeMessage (props) {
      props.rows.forEach(row => {
        row.data.message = 'Gogu'
      })
    },
    deleteRow (props) {
      props.rows.forEach(row => {
        this.bookings.splice(row.index, 1)
        
      })
    },
    refresh (done) {
      this.timeout = setTimeout(() => {
        done()
      }, 5000)
    },
    selection (number, rows) {
      console.log(`selected ${number}: ${rows}`)
    },
    rowClick (row) {
      console.log('clicked on a row', row)
    },
    fetchBookings (options) {
      axios.get(BASE_URL+"/api/bookings/summary", options)
        .then(response => {
          this.bookings = response.data
          //console.log(response.data)
          //console.log(response.data[0])
        })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  name: 'bookings',
  data () {
    return {
      bookings: [],
      config: {
        title: '',
        refresh: false,
        noHeader: false,
        columnPicker: false,
        leftStickyColumns: 0,
        rightStickyColumns: 0,
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: '50px',
        responsive: true,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500]
        },
        selection: 'multiple'
      },
      columns: [        
        {
          label: 'Parking Time (minutes)',
          field: 'estimated_time',
          filter: true,
          sort: true,
          type: 'string',
          width: '100px'
        },
        {
          label: 'Cost of Parking',
          field: 'estimated_cost',
          filter: true,
          sort: true,
          classes: 'bg-orange-2',
          type: 'string',
          width: '100px'
        },
        {
          label: 'Payment Type',
          field: 'pay_type',
          filter: true,
          sort: true,
          classes: 'bg-orange-2',
          type: 'string',
          width: '100px'
        },
        // {
        //   label: 'Payment Method',
        //   field: 'payment_method',
        //   filter: true,
        //   sort: true,
        //   classes: 'bg-orange-2',
        //   type: 'string',
        //   width: '100px'
        // },
        {
          label: 'Payment Status',
          field: 'paying_status',
          filter: true,
          sort: true,
          classes: 'bg-orange-2',
          type: 'string',
          width: '100px'
        }
      ],
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'maxHeight',
      bodyHeight: 500
    }
  },
  created: function() {
    console.log('created!!')
    this.fetchBookings({ headers: auth.getAuthHeader() })
  },
  watch: {
    pagination (value) {
      if (!value) {
        this.oldPagination = clone(this.config.pagination)
        this.config.pagination = false
        return
      }
      this.config.pagination = this.oldPagination
    },
    rowHeight (value) {
      this.config.rowHeight = value + 'px'
    },
    bodyHeight (value) {
      let style = {}
      if (this.bodyHeightProp !== 'auto') {
        style[this.bodyHeightProp] = value + 'px'
      }
      this.config.bodyStyle = style
    },
    bodyHeightProp (value) {
      let style = {}
      if (value !== 'auto') {
        style[value] = this.bodyHeight + 'px'
      }
      this.config.bodyStyle = style
    }
  }
}
</script>

<style lang="stylus">
.my-label
  padding 5px
  border-radius 3px
  display inline-block
</style>