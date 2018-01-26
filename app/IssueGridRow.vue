<template>
    <tr>
        <td :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">
            <a :href="projectLink" target="_blank">{{ issue.projectName }}</a>
        </td>
        <td :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">
            <a :href="lastCommentProjectLink" :title="issue.lastCommentContent" target="_blank">{{ issue.id }}</a>
        </td>
        <td :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">
            <a :href="editIssueLink" :title="issue.lastCommentContent" target="_blank">{{ issue.subject }}</a>
        </td>
        <td :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">{{ issue.username }}</td>
        <td :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">{{ issue.priorityName }}</td>
        <td :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">{{ issue.statusName }}</td>
        <td style="text-align: right;" :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">
          <span :class="{ 'label label-warning': parseFloat(issue.jobTime) > parseFloat(issue.maxTime) * (this.jobTimePrewarningPercent / 100) && parseFloat(issue.jobTime) <= parseFloat(issue.maxTime), 'label label-danger': parseFloat(issue.jobTime) > parseFloat(issue.maxTime) }">
              {{ issue.jobTime }}
          </span>
        </td>
        <td style="text-align: right;" :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">
            {{ issue.maxTime }}
        </td>
        <td :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">{{ issue.dueDate }}</td>
        <td style="text-align: right;" :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">{{ issue.daysWithoutReaction }}</td>
        <td style="text-align: right;" :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }">
            <div class="progress">
                <div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" :aria-valuenow="issue.doneRatio" :title="`${issue.doneRatio} %`" aria-valuemin="0" aria-valuemax="100" :style="{ width: `${issue.doneRatio}%` }">
                    <span class="sr-only">{{ issue.doneRatio }} %</span>
                </div>
            </div>
        </td>
        <td :class="{ 'bg-danger': issue.isHigherPriority === '1', 'bg-info': issue.isLowPriority === '1' }" style="text-align: center;">
            <span :data-clipboard-text="issue.id" class="copy-btn glyphicon glyphicon-copy text-info" style="cursor: pointer;" title="Zkopírovat ID ticketu"></span>
            <span :data-clipboard-text="copyIssueLinkLink" class="copy-btn glyphicon glyphicon-link text-info" style="cursor: pointer;" title="Zkopírovat odkaz do ticketovacího systému"></span>
        </td>
    </tr>
</template>

<script>
    export default {
        name: 'issue-grid-row',
        props: ['issue'],
        data: function() {
          return {
            jobTimePrewarningPercent: 80,
          }
        },
        // you can edit links below
        computed: {
          editIssueLink: function() {
            return `${this.issue.id}`;
          },
          projectLink: function() {
            return `${this.issue.projectIdentifier}`;
          },
          lastCommentProjectLink: function() {
            return `${this.issue.id}/${this.issue.lastComment}`;
          },
          copyIssueLinkLink: function() {
            return `${this.issue.id}`;
          }
        }
    }
</script>