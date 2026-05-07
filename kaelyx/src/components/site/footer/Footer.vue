<template>
    <footer>
        <TwoColumn>
            <template #left>
                <div class="footer__copyright">
                    <span>© {{ new Date().getFullYear() }} Kaelyx.</span>
                </div>
            </template>
            <template #right>
                <div class="footer__links">
                    <Link v-for="(link, index) in getGroup('footer')" :key="`footer-${index}`" :href="link.href" :target="link.target" type="tertiary">
                        <SvgIcon v-if="link.icon" :name="link.icon" />
                    </Link>
                </div>
            </template>        
        </TwoColumn>
    </footer>
</template>
<script setup lang="ts">
import TwoColumn from '@component/layout/TwoColumn.vue';
import Link from '@component/base/links/Link.vue';
import SvgIcon from '@component/base/icons/SvgIcon.vue';
import { useLinks } from '@composable/useLinks';
const { getGroup } = useLinks();
</script>
