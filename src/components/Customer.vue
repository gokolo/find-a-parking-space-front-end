<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <h5>Account Details</h5>
      <q-list>
        <q-item>
          <q-item-side icon="account box" />
          <q-item-main>
            <q-item-tile label>John Doe</q-item-tile>
            <q-item-tile sublabel>Name</q-item-tile>
          </q-item-main>
        </q-item>
        
        <q-item>
          <q-item-main inset>
            <q-item-tile label>john.doe</q-item-tile>
            <q-item-tile sublabel>Username</q-item-tile>
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-main inset>
            <q-btn icon="mode edit" color="primary" v-on:click="update()">Update</q-btn>
          </q-item-main>
        </q-item>
      </q-list>
      
    </div>
  </div>
</template>

<script>
import {
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QItemSide,
  QItemMain,
  QItemTile,
  QBtn
} from 'quasar'

export default {
  components: {
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile,
    QBtn
  },
  data () {
    return {
      
    }
  },

  methods: {
    
  }
}
</script>