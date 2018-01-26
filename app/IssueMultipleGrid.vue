<template>
    <table class="table table-striped" v-if="data.length > 0">
        <thead>
            <issue-grid-header></issue-grid-header>
        </thead>
        <tbody v-for="dataRow in data" v-if="!isLoading">
            <tr>
                <td colspan="12"><strong style="font-size: 17px;">{{ dataRow[gridHeaderColumn] ? dataRow[gridHeaderColumn] : '-' }} ({{ dataRow[dataColumn].length }})</strong></td>
            </tr>
            <issue-grid-row v-for="issue in dataRow[dataColumn]" :issue="issue"></issue-grid-row>
        </tbody>
        <tbody v-if="isLoading">
            <tr>
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
    name: 'issue-multiple-grid',
    props: ['data', 'gridHeaderColumn', 'dataColumn', 'isLoading'],
    components: { 'issue-grid-row': IssueGridRow, 'issue-grid-header': IssueGridHeader }
}
</script>