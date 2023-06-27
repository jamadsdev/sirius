<script>
  export let parent;

  import * as api from "$lib/wxc_api";
  import { modalStore } from "@skeletonlabs/skeleton";

  // Base Classes
  const cBase = "card p-4 w-modal shadow-xl space-y-4";
  const cHeader = "text-2xl font-bold";
  const cForm =
    "border border-surface-500 p-4 space-y-4 rounded-container-token";

  console.log("Modal Data", $modalStore[0].data.id);

  const submiteReset = async (userId) => {
    const results = await api.post(
      `people/${userId}/features/voicemail/actions/resetPin/invoke`,
      locals.userId.access
    );
    console.log(results);
  };

  const result = submiteReset($modalStore[0].data.id);
</script>
