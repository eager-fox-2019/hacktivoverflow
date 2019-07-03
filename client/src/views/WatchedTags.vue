<template>
    <div class="my-container__small">
        <Sidebar />

         <div style="width: 740px;">
            <div class="heads">
                <h5 slot="header">Watched Tags</h5>
            </div>
            <small>
                Watched tags like subscribe to topic of question that you interest
            </small>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
    components: {
        Sidebar
    }
}
</script>

<style>

</style>
