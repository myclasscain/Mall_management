<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Obverse></Obverse>
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Sale'
import Obverse from './Obverse'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    Obverse
  },
  mounted() {
    this.$store.dispatch('getData')
  }
}
</script>

<style></style>
