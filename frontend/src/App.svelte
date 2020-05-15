<script>
  import { onMount } from "svelte";
  import Menu from "./Menu.svelte"
  import Panel from "./Panel.svelte"
  import "./style/global.scss";
  let users;
  async function getSpec() {
    return await (await fetch(`/api/users`)).json();
  }
  function specLoader() {
    getSpec()
      .then(res => {
        users = res;
        console.log(res);
      })
      .catch(() => {
        retry();
      });
  }
  // At the start of the components lifecycle
  onMount(async () => {
    specLoader();
  });
</script>


<main>
    <Menu/>
    {#await users}
      <p>...waiting</p>
    {:then users}
    {#if users != undefined}
    <Panel users={users}/>
    {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
</main>
