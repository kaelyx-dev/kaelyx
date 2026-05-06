<script setup lang="ts">
import Button from '@component/base/buttons/Button.vue';
import Link from '@component/base/links/Link.vue';
</script>
<template>
  Home
  
        <Button type="primary">primary</Button>
      <Button type="secondary">secondary</Button>
      <Button type="tertiary">tertiary</Button>
      <Button type="link">Link</Button>
      <Button type="negative-link">Negative Link</Button>
      
      <Link type="primary" href="#">
        primary link
      </Link>
      <Link type="secondary" href="#">
        secondary link
      </Link>
      <Link type="tertiary" href="#">
        tertiary link
      </Link>
      <Link type="link" href="#">
        link link
      </Link>
      <Link type="negative-link" href="#">
        negative link
      </Link>
</template>
