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

      <template slot='col-action' scope='cell'>
        <q-btn icon="mode edit" color="primary" @click.prevent="rowClick(cell.row.id)"></q-btn>
      </template>     
  <!-- v-if="paying_status = "UNPAID""  @click='pay_booking(cell.row.id) $refs.minimizedModal.close()'-->
    </q-data-table>

    <q-modal ref="minimizedModal" minimized :content-css="{padding: '50px'}">
      <div>      
        <p class="caption">Payment accepted! Booking complete...</p>
      </div>
    </q-modal>

  </div>
</template>

<script>
import {
  QDataTable,
  QModal,
  QField,
  QInput,
  QCheckbox,
  QSelect,
  QSlider,
  QBtn,
  QIcon,
  QTooltip,
  QList,
  QCollapsible,
  clone
} from 'quasar'
import auth from "./auth"
import axios from "axios";
import { Toast } from 'quasar';

let BASE_URL = DEV ? 'http://localhost:4000' : 'http://localhost:4000';

export default {
  components: {
    QDataTable,
    QModal,
    QList,
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
      console.log("refreshed!")
    },
    selection (number, rows) {
      console.log(`selected ${number}: ${rows}`)
    },
    rowClick (row) {
      var id = row.id
      if (id != undefined) {
        axios.patch(BASE_URL+"/api/pay/"+id, {id: id}, { headers: auth.getAuthHeader() })
        .then(response => {
          this.notify()
        })
      }
      console.log('clicked on a row',row)
    },
    pay_booking (id) {
      console.log(id)
      axios.patch(BASE_URL+"/api/pay/"+id)
        .then(response => {
          $refs.minimizedModal.close()
        })
    },
    fetchBookings (options) {
      axios.get(BASE_URL+"/api/bookings/summary", options)
        .then(response => {
          this.bookings = response.data
        })
    },
    notify () {
      Toast.create('Payment Successful!')
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
        refresh: true,
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
          label: 'Parking Date',
          field: 'inserted_at',
          filter: true,
          sort: true,
          type: 'date',
          width: '100px',
          format (value, row) {
            return new Date(value).toLocaleString()
          }
        },
        {
          label: 'Parking Time (minutes)',
          field: 'estimated_time',
          filter: true,
          sort: false,
          type: 'string',
          width: '100px'
        },
        {
          label: 'Cost of Parking',
          field: 'estimated_cost',
          filter: true,
          sort: false,
          classes: 'bg-orange-2',
          type: 'string',
          width: '100px'
        },
        {
          label: 'Payment Type',
          field: 'pay_type',
          filter: true,
          sort: false,
          classes: 'bg-orange-2',
          type: 'string',
          width: '100px'
        },
        {
          label: 'Payment Status',
          field: 'paying_status',
          filter: true,
          sort: false,
          classes: 'bg-orange-2',
          type: 'date',
          width: '100px'
        },
        {
          label: 'Payment Action',
          field: 'action',
          filter: true,
          sort: false,
          type: 'string',
          width: '120px'          
        }
      ],
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'maxHeight',
      bodyHeight: 500,
      search: '',
      types: [
        {
          label: 'Always Minimized',
          ref: 'minimizedModal'
        }
      ],
      position: 'bottom'
    }
  },
  created: function() {
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