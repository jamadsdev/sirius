<script>
  /** @type {import('./$types').PageData} */
  import * as api from "$lib/wxc_api";

  import { enhance } from "$app/forms";
  import { modalStore } from "@skeletonlabs/skeleton";
  import ResetPinModal from "$lib/components/modals/ResetPinModal.svelte";

  export let data;

  const normalizePhones = (phones) => {
    let data = {
      did: "",
      extension: "",
    };

    for (let i = 0; i < phones.length; i++) {
      if (phones[i]["primary"]) {
        if (phones[i]["type"] == "work_extension") {
          data.extension = phones[i]["value"];
        } else if (phones[i]["type"] == "work") {
          data.did = phones[i]["value"];
        }
      }
    }

    if (!data.did && !data.extension) {
      return "";
    } else {
      return `${data.did} ext: ${data.extension}`;
    }
  };

  // function resetPinModal(user) {
  //   const c = { ref: ResetPinModal };
  //   const d = {
  //     type: "component",
  //     title: "VM PIN Reset",
  //     body: "Complete the form below and then press upload.",
  //     data: user,
  //     component: c,
  //     response: (r) => {
  //       if (r) console.log("response:", r);
  //     },
  //   };
  //   modalStore.trigger(d);
  // }
  // function resetPin(userId) {
  //   const results = api.post(
  //     `people/${userId}/features/voicemail/actions/resetPin/invoke`,
  //     locals.userId.access
  //   );
  //   console.log(results);
  // }
</script>

<div class="p-5">
  {#await data.streamed.users}
    <div class="grid grid-cols-4 gap-4">
      <div class="placeholder animate-pulse" />
      <div class="placeholder animate-pulse" />
      <div class="placeholder animate-pulse" />
      <div class="placeholder animate-pulse" />
    </div>
  {:then users}
    {#if users == "noDefPIN"}
      <h3>
        The default voicemail PIN has not been set.<br />This must be set in
        order for an admin to reset a user's voicemail PIN
      </h3>
    {:else}
      <div class="table-container">
        <table class="table table-compact table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {#each users as user, i}
              <tr>
                <td>{user.displayName}</td>
                <td>{user.emails}</td>
                <td
                  >{#if user.phoneNumbers}
                    {normalizePhones(user.phoneNumbers)}
                  {/if}
                </td>
                <td>{user.locationId}</td>
                <td>
                  <form action="?/resetPin" method="POST" use:enhance>
                    <input type="hidden" id="id" name="id" value={user.id} />
                    <button type="submit" class="btn btn-sm variant-filled"
                      >Reset PIN</button
                    >
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/await}
</div>
