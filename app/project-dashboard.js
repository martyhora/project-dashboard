import axios from 'axios'
import IssueGrid from './IssueGrid.vue'
import IssueMultipleGrid from './IssueMultipleGrid.vue'

// you can edit the API URL
const API_URL_BASE = 'api';

const LATEST_SPRINT = 'Sprint 1';
const DEFAULT_DAYS_WITHOUT_REACTION = 7;
const ISSUES_DAYS_AHEAD = 7;
const ISSUES_DAYS_BACK = 5;

const vm = {
    data: {
        afterDueIssues: [],
        issuesWithoutReaction: [],
        issuesAhead: [],
        latestUpdated: [],
        daysWithoutReaction: DEFAULT_DAYS_WITHOUT_REACTION,
        issuesDaysAhead: ISSUES_DAYS_AHEAD,
        issuesDaysBack: ISSUES_DAYS_BACK,
        projects: [],
        projectIssues: [],
        sprintIssues: [],
        projectId: null,
        sprint: LATEST_SPRINT,
        apiUrlBase: API_URL_BASE,
        menu: [
            { page: 'projects', title: 'Projekty', callback: null, },
            { page: 'afterDue', title: 'Po termínu', callback: 'fetchIssuesAfterDue' },
            { page: 'withoutReaction', title: 'Bez reakce', callback: 'fetchIssuesWithoutReaction' },
            { page: 'latestUpdated', title: 'Naposledy aktualizované', callback: 'fetchIssuesLatestUpdated' },
            { page: 'plan', title: 'Plán', callback: 'fetchIssuesAhead' },
            { page: 'sprint', title: 'Tickety podle sprintu', callback: 'fetchSprintIssues' },
        ],
        loading: {
            afterDue: true,
            withoutReaction: true,
            ahead: true,
            projects: true,
            latestUpdated: true,
            sprint: true,
            project: true,
        },
    },
    created: function() {
        this.fetchIssuesAfterDue();

        this.fetchIssuesWithoutReaction();

        this.fetchIssuesAhead();

        this.fetchProjects();

        this.fetchIssuesLatestUpdated();

        this.fetchSprintIssues();
    },
    components: {
        'issue-grid': IssueGrid,
        'issue-multiple-grid': IssueMultipleGrid,
    },
    methods: {
        fetchIssuesWithoutReaction: function() {
            this.loading.withoutReaction = true;

            axios.get(`${this.apiUrlBase}/?action=issuesWithoutReaction`, { params: { daysWithoutReaction: this.daysWithoutReaction } })
                .then(response => {
                    this.loading.withoutReaction = false;

                    this.issuesWithoutReaction = response.data;
                });
        },
        fetchIssuesAfterDue: function() {
            this.loading.afterDue = true;

            axios.get(`${this.apiUrlBase}/?action=afterDueIssues`)
                .then(response => {
                    this.loading.afterDue = false;

                    this.afterDueIssues = response.data;
                });
        },
        fetchIssuesAhead: function() {
            this.loading.ahead = true;

            axios.get(`${this.apiUrlBase}/?action=issuesAhead`, { params: { daysAhead: this.issuesDaysAhead } })
                .then(response => {
                    this.loading.ahead = false;

                    this.issuesAhead = response.data;
                });
        },
        fetchProjects: function() {
            this.loading.projects = true;

            axios.get(`${this.apiUrlBase}/?action=projects`)
                .then(response => {
                    this.loading.projects = false;

                    this.projects = response.data;
                });
        },
        fetchProject: function() {
            this.loading.project = true;

            axios.get(`${this.apiUrlBase}/?action=project`, { params: { projectId: this.projectId } })
                .then(response => {
                    this.loading.project = false;

                    this.projectIssues = response.data;
                });
        },
        fetchIssuesLatestUpdated: function() {
            this.loading.latestUpdated = true;

            axios.get(`${this.apiUrlBase}/?action=issuesLatestUpdated`, { params: { daysBack: this.issuesDaysBack } })
                .then(response => {
                    this.loading.latestUpdated = false;

                    this.latestUpdated = response.data;
                });
        },
        fetchSprintIssues: function() {
            this.loading.sprint = true;

            axios.get(`${this.apiUrlBase}/?action=sprint`, { params: { sprint: this.sprint } })
                .then(response => {
                    this.loading.sprint = false;

                    this.sprintIssues = response.data;
                });
        },
        setProject: function(projectId) {
            this.projectId = projectId;

            this.fetchProject();
        },
        setPage: function(page, callback = null) {
            if (callback !== null) {
                this[callback]();
            }

            const url = location.href;

            location.href = `#${page}`;

            history.replaceState(null, null, url);
        },
    },
    computed: {
        sprintVelocity: function() {
            let velocity = 0;

            this.sprintIssues.forEach(issue => {
                issue.data.forEach(issueData => {
                    velocity += parseInt(issueData.pokerRating);
                });
            });

            return velocity;
        },
        completedVelocity: function() {
            let velocity = 0;

            this.sprintIssues.forEach(issue => {
                issue.data.forEach(issueData => {
                    velocity += parseInt(issueData.pokerRating) * (parseInt(issueData.doneRatio) / 100);
                });
            });

            return Math.round(velocity * 10) / 10;
        }
    }
}

export default vm