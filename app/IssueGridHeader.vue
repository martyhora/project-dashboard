<template>
    <tr>
        <th>Projekt</th>
        <th style="width: 50px;">ID</th>
        <th style="width: 350px">Název</th>
        <th style="width: 200px;">Přiřazeno</th>
        <th style="width: 100px;">Priorita</th>
        <th style="width: 180px;">Stav</th>
        <th style="text-align: right; width: 50px;">Čas</th>
        <th style="text-align: right; width: 100px;">Max. čas</th>
        <th style="width: 90px;">Termín</th>
        <th style="text-align: right; width: 100px;">Bez reakce</th>
        <th style="text-align: center; width: 90px;">Hotovo</th>
        <th style="text-align: center; width: 90px;">Akce</th>
    </tr>
</template>

<script>
    export default {
        name: 'issue-grid-header',
    }
</script>