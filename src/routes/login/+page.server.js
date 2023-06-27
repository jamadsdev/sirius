import { error, redirect } from "@sveltejs/kit";
import { refreshToken } from "$lib/utils";
import eventsource from "eventsource";

global.EventSource = eventsource;

export const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    let location = "/docs/howto";

    try {
      if (!body.email) {
        // console.log("Attempting to Login with Webex");
        // await locals.pb
        //   .collection("users")
        //   .authWithOAuth2({ provider: "oidc" });
      } else {
        await locals.pb
          .collection("users")
          .authWithPassword(body.email, body.password);
      }

      if (!locals.pb?.authStore?.model?.verified) {
        locals.pb.authStore.clear();
        return {
          notVerified: true,
        };
      }

      // Verify access token
      const { items } = await locals.pb.collection("users").getList();

      if (items[0]?.access) {
        console.log("Stored Access", items[0].access);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${items[0].access}`);
        let url = "https://webexapis.com/v1/people/me";
        fetch(url, {
          method: "GET",
          headers: myHeaders,
        })
          .then((res) => res.json())
          .then(async (data) => {
            // console.log('Data', data);
            if (data.errors) {
              // refresh token
              let newTokens = await refreshToken(items[0].refresh);
              // console.log('NewTokens', newTokens);
              try {
                await locals.pb.collection("users").update(items[0].id, {
                  access: newTokens.access_token,
                  refresh: newTokens.refresh_token,
                });
              } catch (err) {
                console.error("Token Update Error: ", err);
              }
            }
          });
      } else {
        console.log("No Access Token");
        location = "/webex/login";
      }
    } catch (err) {
      console.log("Login Error: ", err);
      throw error(500, "Something went wrong logging in");
    }
    throw redirect(303, location);
  },
};
