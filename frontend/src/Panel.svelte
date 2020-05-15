<script>
export let users;

</script>

<nav class="panel">
  <p class="panel-heading">
    Users
  </p>
  {#each users.results as user}
    <a class="panel-block" href="{user.url}">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
    {user.username}
    </a>
  {/each}
</nav>