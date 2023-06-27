/** @type {import('./$types').PageServerLoad} */
import * as api from "$lib/wxc_api";
import { fail } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  const fetchUsers = async () => {
    const results = await api.get(
      "telephony/config/voicemail/rules",
      locals.user.access
    );

    if (results.defaultVoicemailPinRules["defaultVoicemailPinEnabled"]) {
      const { items } = await api.get(
        "people?callingData=true",
        locals.user.access
      );
      return items;
    } else {
      return "noDefPIN";
    }
  };

  return {
    streamed: { users: fetchUsers() },
  };
};

export const actions = {
  resetPin: async ({ request, locals }) => {
    let data = await request.formData();

    let personId = data.get("id");
    let body = JSON.stringify({});

    const result = await api.post(
      `people/${personId}/features/voicemail/actions/resetPin/invoke`,
      body,
      locals.user.access
    );

    if (result.errors) return fail(400, result);
    console.log("PIN Reset", result);
  },
};
