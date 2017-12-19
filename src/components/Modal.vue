<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption">
        <span class="desktop-only">Click</span>
        <span class="mobile-only">Tap</span>
        on each type to see it in action.
      </p>

      <q-list style="max-width: 600px;">
        <q-item
          link
          v-for="modal in types"
          :key="modal"
          @click="$refs.minimizedModal.open()"
          v-ripple.mat
        >
          <q-item-side icon="open_in_new" />
          <q-item-main :label="modal.label" />
          <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
      </q-list>

    </div>
    
    <q-modal ref="minimizedModal" minimized :content-css="{padding: '50px'}">
      <h4>Minimized Modal</h4>
      <p>This one has backdrop on small screens too.</p>
      <q-btn color="red" @click="$refs.minimizedModal.close()">Close Me</q-btn>
    </q-modal>

  </div>
</template>

<script>
import {
  Toast,
  Ripple,
  QBtn,
  QIcon,
  QModal,
  QModalLayout,
  QToolbar,
  QToolbarTitle,
  QSearch,
  QList,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'

export default {
  components: {
    QBtn,
    QIcon,
    QModal,
    QModalLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QList,
    QItem,
    QItemSide,
    QItemMain
  },
  directives: {
    Ripple
  },
  data () {
    return {
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
  methods: {
    notify (eventName) {
      Toast.create(`Event "${eventName}" was triggered.`)
    },
    openSpecialPosition (position) {
      this.position = position
      this.$nextTick(() => {
        this.$refs.positionModal.open()
      })
    }
  }
}
</script>