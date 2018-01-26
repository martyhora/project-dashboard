<template>
    <table class="table table-striped">
        <thead>
            <issue-grid-header></issue-grid-header>
        </thead>
        <tbody>
            <issue-grid-row v-for="issue in data" :issue="issue" v-if="!isLoading"></issue-grid-row>
            <tr v-if="isLoading">
                <td colspan="12" style="text-align: center;">
                    <span class="glyphicon glyphicon-refresh glyphicon-spin text-info" style="font-size: 20px; margin-top: 4px;"></span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import IssueGridRow from './IssueGridRow.vue'
import IssueGridHeader from './IssueGridHeader.vue'

export default {
    name: 'issue-grid',
    props: ['data', 'isLoading'],
    components: { 'issue-grid-row': IssueGridRow, 'issue-grid-header': IssueGridHeader }
}
</script>